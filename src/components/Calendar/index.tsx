import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { getWeekDays } from '@utils/get-week-days'

import {
  CalendarActions,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTable,
  CalendarTitle,
} from './styles'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

export interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
  const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(() => {
    return dayjs().set('date', 1)
  })

  const calendarWeeks = useMemo(() => {
    const daysInCurrentMonth = Array.from({
      length: firstDayCurrentMonth.daysInMonth(),
    }).map((_, index) => {
      return firstDayCurrentMonth.set('date', index + 1)
    })

    const firstWeekDay = firstDayCurrentMonth.get('day')

    const daysOfPreviousMonth = Array.from({ length: firstWeekDay })
      .map((_, index) => {
        return firstDayCurrentMonth.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = firstDayCurrentMonth.set(
      'date',
      firstDayCurrentMonth.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const daysOfNextMonth = Array.from({ length: 7 - (lastWeekDay + 1) }).map(
      (_, index) => {
        return lastDayInCurrentMonth.add(index + 1, 'day')
      },
    )

    const calendarDays = [
      ...daysOfPreviousMonth.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInCurrentMonth.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...daysOfNextMonth.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [firstDayCurrentMonth])

  const shortWeekdays = getWeekDays({ short: true })

  function handlePreviousMonth() {
    const previousMonthDate = firstDayCurrentMonth.subtract(1, 'month')

    setFirstDayCurrentMonth(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = firstDayCurrentMonth.add(1, 'month')

    setFirstDayCurrentMonth(nextMonthDate)
  }

  const currentMonth = firstDayCurrentMonth.format('MMMM')
  const currentYear = firstDayCurrentMonth.format('YYYY')

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarTable>
        <thead>
          <tr>
            {shortWeekdays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ days, week }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    disabled={disabled}
                    onClick={() => onDateSelected(date.toDate())}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
    </CalendarContainer>
  )
}
