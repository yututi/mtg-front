// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'reset-css';
import "@/styles/global.scss"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
