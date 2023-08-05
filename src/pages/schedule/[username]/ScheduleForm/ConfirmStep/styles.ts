import { Box, Text, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  marginBottom: '$2',
  paddingBottom: '$6',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})

export const FormActions = styled('div', {
  marginTop: '$2',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
})
