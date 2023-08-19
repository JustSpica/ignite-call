/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'

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
    const date = String(req.query.date)

    if (!date) {
      return res.status(400).json({ message: 'Date not provided.' })
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist.' })
    }

    const referenceDate = dayjs(date)
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if (isPastDate) {
      return res.json({ availableTimes: [], possibleTimes: [] })
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: referenceDate.get('day'),
      },
    })

    if (!userAvailability) {
      return res.json({ availableTimes: [], possibleTimes: [] })
    }

    const { time_end_in_minutes, time_start_in_minutes } = userAvailability

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map(
      (_, index) => {
        return startHour + index
      },
    )

    const blockedTimes = await prisma.scheduling.findMany({
      select: {
        date: true,
      },
      where: {
        user_id: user.id,
        date: {
          gte: referenceDate.set('hour', startHour).toDate(),
          lte: referenceDate.set('hour', endHour).toDate(),
        },
      },
    })

    const availableTimes = possibleTimes.filter((time) => {
      const isTimeBlocked = blockedTimes.some((blockedTime) => {
        return blockedTime.date.getHours() === time
      })

      const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

      return !isTimeBlocked && !isTimeInPast
    })

    return res.json({ availableTimes, possibleTimes })
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}
