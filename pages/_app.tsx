import type { AppProps } from 'next/app'
import '../src/base.css'
import '../src/app.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
