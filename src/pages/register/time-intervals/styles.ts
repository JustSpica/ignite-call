import { Box, Text, styled } from '@ignite-ui/react'

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const IntervalsContainer = styled('div', {
  marginBottom: '$4',
  border: '1px solid $gray600',
  borderRadius: '$md',
})

export const IntervalItem = styled('div', {
  padding: '$3 $4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalHours = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
})

export const FormError = styled(Text, {
  marginBottom: '$4',
  color: '#F75A68',
})
