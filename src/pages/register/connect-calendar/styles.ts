import { Box, Text, styled } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  marginBottom: '$4',
  padding: '$4 $6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid $gray600',
  borderRadius: '$md',
})

export const AuthError = styled(Text, {
  marginBottom: '$4',
  color: '#f75a68',
})
