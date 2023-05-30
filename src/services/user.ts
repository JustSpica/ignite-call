import { api } from 'lib/axios'

export async function createUser<T>(body: T) {
  try {
    await api.post<T>('/users', body)
  } catch (error) {
    console.error(error)
  }
}
