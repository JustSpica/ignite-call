import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'

import { AuthError, ConnectBox, ConnectItem } from './styles'
import { Container, Header } from '../styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleRedirectToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Agenda</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => signIn('google')}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button
          type="submit"
          disabled={!isSignedIn}
          onClick={handleRedirectToNextStep}
        >
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
