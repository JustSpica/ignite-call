import { Text, styled } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  padding: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const CalendarHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$gray200',
  },
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    lineHeight: 0,
    cursor: 'pointer',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})

export const CalendarTable = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    fontWeight: '$medium',
    fontSize: '$sm',
    color: '$gray200',
  },

  'tbody:before': {
    content: '.',
    display: 'block',
    lineHeight: '0.75rem',
    color: '$gray800',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  borderRadius: '$sm',
  textAlign: 'center',
  aspectRatio: '1 / 1',
  cursor: 'pointer',
  backgroundColor: '$gray600',

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },
})
