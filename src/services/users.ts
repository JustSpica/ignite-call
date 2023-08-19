import { api } from 'lib/axios'

import {
  AvailabilityHoursParams,
  AvailabilityHoursResponse,
  BlockedDatesParams,
  BlockedDatesResponse,
} from './@types/users'

export async function createUser<T>(body: T) {
  await api.post<T>('/users', body)
}

export async function createUserIntervals<T>(body: T) {
  await api.post<T>('/users/time-intervals', body)
}

export async function createUserScheduling() {
  await api.post(`/users/`)
}

export async function confirmUserSchedulingData<T>(username: string, body: T) {
  await api.post(`/users/${username}/schedule`, body)
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
