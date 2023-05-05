import type { AppProps } from 'next/app'

import { globalstyles } from '@styles/global'

globalstyles()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
