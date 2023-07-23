import { api } from 'lib/axios'

export async function createUser<T>(body: T) {
  await api.post<T>('/users', body)
}

interface CreateTimeIntervalsProps {
  intervals: {
    weekDay: number
    startTimeInMinutes: number
    endTimeInMinutes: number
  }[]
}

export async function createUserIntervals(body: CreateTimeIntervalsProps) {
  await api.post('/users/time-intervals', body)
}

export async function updateBioProfile(bio: string) {
  await api.put('/users/profile', { bio })
}
