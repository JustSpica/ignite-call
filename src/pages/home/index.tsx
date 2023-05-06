import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import previewImage from 'assets/home_preview.png'

import { Hero, HomeContainer, Preview } from './styles'

export default function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando a aplicação em funcionamento"
        />
      </Preview>
    </HomeContainer>
  )
}
