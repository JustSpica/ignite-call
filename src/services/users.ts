import { api } from 'lib/axios'

import {
  AvailabilityHoursParams,
  AvailabilityHoursResponse,
  BlockedDatesParams,
  BlockedDatesResponse,
  CreateTimeIntervalsParams,
} from './@types/users'

export async function createUser<T>(body: T) {
  await api.post<T>('/users', body)
}

export async function createUserIntervals(body: CreateTimeIntervalsParams) {
  await api.post('/users/time-intervals', body)
}

export async function updateBioProfile(bio: string) {
  await api.put('/users/profile', { bio })
}

export async function findBlockedDates(params: BlockedDatesParams) {
  const { username, ...queryParams } = params

  return await api.get<BlockedDatesResponse>(
    `/users/${username}/blocked-dates`,
    {
      params: queryParams,
    },
  )
}

export async function findAvailabilityHours(params: AvailabilityHoursParams) {
  const { username, ...queryParams } = params

  return await api.get<AvailabilityHoursResponse>(
    `/users/${username}/availability`,
    {
      params: queryParams,
    },
  )
}
