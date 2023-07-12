import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import * as zod from 'zod'

import { convertTimeStringToMinutes } from '@utils/convert-time-string-to-minutes'
import { getWeekDays } from '@utils/get-week-days'

import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalHours,
  IntervalItem,
  IntervalsContainer,
} from './styles'
import { Container, Header } from '../styles'

const timeIntervalsFormSchema = zod.object({
  intervals: zod
    .array(
      zod.object({
        enabled: zod.boolean(),
        startTime: zod.string(),
        endTime: zod.string(),
        weekDay: zod.number(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekday: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término precisa ser pelo menos 1 hora antes do início.',
      },
    ),
})

type TimeIntervalsFormInput = zod.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = zod.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<TimeIntervalsFormInput, any, TimeIntervalsFormOutput>({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
    resolver: zodResolver(timeIntervalsFormSchema),
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function hanldeSetTimeIntervals(data: TimeIntervalsFormOutput) {
    console.log(data)
  }

  const weekDays = getWeekDays()

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as={'form'} onSubmit={handleSubmit(hanldeSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((day, index) => (
            <IntervalItem key={day.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      id={`monday-checkbox-${index}`}
                      checked={value}
                      onCheckedChange={(checked) => {
                        onChange(checked === true)
                      }}
                    />
                  )}
                />
                <Text as="label" htmlFor={`monday-checkbox-${index}`}>
                  {weekDays[day.weekDay]}
                </Text>
              </IntervalDay>
              <IntervalHours>
                <TextInput
                  type="time"
                  size="sm"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  type="time"
                  size="sm"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalHours>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
