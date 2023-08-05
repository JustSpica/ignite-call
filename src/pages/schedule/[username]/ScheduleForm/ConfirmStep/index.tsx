import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { Form, FormActions, FormError, FormHeader } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 letras' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type CofirmFormType = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CofirmFormType>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: CofirmFormType) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label htmlFor="">
        <Text size="sm">E-mail</Text>
        <TextInput
          type="email"
          placeholder="jhondoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </FormActions>
    </Form>
  )
}
