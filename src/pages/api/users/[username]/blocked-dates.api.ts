/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    const username = String(req.query.username)
    const { year, month } = req.query

    if (!year || !month) {
      return res.status(400).json({ message: 'Year or month not specified' })
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist.' })
    }

    const availableWeekDays = await prisma.userTimeInterval.findMany({
      select: {
        week_day: true,
      },
      where: {
        user_id: user.id,
      },
    })

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

    const yearMonth = `${year}-${String(month).padStart(2, '0')}`

    const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
      SELECT 
        EXTRACT(DAY FROM schedulings.date) AS date,
        COUNT(schedulings.date) AS amount,
        ((intervals.time_end_in_minutes - intervals.time_start_in_minutes) / 60) AS size

      FROM schedulings

      LEFT JOIN user_time_intervals intervals
        ON intervals.week_day = WEEKDAY(DATE_ADD(schedulings.date, INTERVAL 1 DAY))

      WHERE schedulings.user_id = ${user.id}
        AND DATE_FORMAT(schedulings.date, "%Y-%m") = ${yearMonth}

      GROUP BY EXTRACT(DAY FROM schedulings.date),
        ((intervals.time_end_in_minutes - intervals.time_start_in_minutes) / 60)

      HAVING amount >= size
    `

    const blockedDates = blockedDatesRaw.map((item) => item.date)

    return res.json({ blockedWeekDays, blockedDates })
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}
