/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { z } from 'zod'

import { prisma } from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const username = String(req.query.username)

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist.' })
    }

    const creteSchedulingBody = z.object({
      name: z.string(),
      email: z.string().email(),
      observations: z.string(),
      date: z.string().datetime(),
    })

    const { name, email, observations, date } = creteSchedulingBody.parse(
      req.body,
    )

    const schedulingDate = dayjs(date).startOf('hour')

    if (schedulingDate.isBefore(new Date())) {
      return res.status(400).json({
        message: 'Date is in the past.',
      })
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        user_id: user.id,
        date: schedulingDate.toDate(),
      },
    })

    if (conflictingScheduling) {
      return res.status(400).json({
        message: 'There are another scheduling at the same time.',
      })
    }

    await prisma.scheduling.create({
      data: {
        date: schedulingDate.toDate(),
        email,
        name,
        observations,
        user_id: user.id,
      },
    })

    return res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}
