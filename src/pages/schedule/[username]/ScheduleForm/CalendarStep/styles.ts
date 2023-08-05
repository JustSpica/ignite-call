import { Box, Text, styled } from '@ignite-ui/react'

export const Container = styled(Box, {
  maxWidth: '100%',
  margin: '$6 auto 0',
  padding: 0,
  position: 'relative',
  display: 'grid',

  variants: {
    open: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  width: 280,
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  padding: '$6 $6 0',
  borderLeft: '1px solid $gray600',
  overflowY: 'auto',
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

export const TimePickerItem = styled('button', {
  padding: '$2 0',
  fontSize: '$sm',
  lineHeight: '$base',
  border: 0,
  borderRadius: '$sm',
  backgroundColor: '$gray600',
  color: '$gray100',
  cursor: 'pointer',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
