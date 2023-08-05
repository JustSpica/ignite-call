import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dayjs from 'dayjs'

import { Calendar } from '@components/Calendar'
import { findAvailabilityHours, findBlockedDates } from '@services/users'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()
  const username = String(router.query.username)

  const selectedDateWithoutTime = dayjs(selectedDate).format('YYYY-MM-DD')

  const currentYear = dayjs().set('date', 1).get('year')
  const currentMonth = dayjs().set('date', 1).get('month')

  const { data: availability } = useQuery({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await findAvailabilityHours({
        date: selectedDateWithoutTime,
        username,
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  const { data: blockedDates } = useQuery({
    queryKey: ['blocked-dates', currentYear, currentMonth],
    queryFn: async () => {
      const response = await findBlockedDates({
        month: currentMonth + 1,
        username,
        year: currentYear,
      })

      return response.data
    },
  })

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const describedDate =
    selectedDate && dayjs(selectedDate).format('DD[ de ]MMMM')

  return (
    <Container open={isDateSelected}>
      <Calendar blockedData={blockedDates} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
