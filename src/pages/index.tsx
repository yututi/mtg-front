import Head from 'next/head'
import Slider from '@/components/Slider'
import { CachedPageProvider } from '@/state/CachedPageContext'
import { PaginationProvider } from '@/state/PaginationContext'


export default function Home() {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <PaginationProvider>
          <CachedPageProvider>
            <Slider />
          </CachedPageProvider>
        </PaginationProvider>
      </main>
    </>
  )
}