export interface CreateTimeIntervalsParams {
  intervals: {
    weekDay: number
    startTimeInMinutes: number
    endTimeInMinutes: number
  }[]
}

export interface BlockedDatesParams {
  month: number
  username: string
  year: number
}

export interface BlockedDatesResponse {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export interface AvailabilityHoursParams {
  username: string
  date: string
}

export interface AvailabilityHoursResponse {
  possibleTimes: number[]
  availableTimes: number[]
}
