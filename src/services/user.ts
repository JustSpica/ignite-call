import { api } from 'lib/axios'

export async function createUser<T>(body: T) {
  await api.post<T>('/users', body)
}
