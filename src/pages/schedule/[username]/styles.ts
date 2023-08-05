import { Heading, Text, styled } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 852,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const UserHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    marginTop: '$2',
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
