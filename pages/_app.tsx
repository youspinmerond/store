import Layout from '@/components/Layout'
import '@/styles/globals.sass'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// App.getInitialProps = (ctx:any) => {
//   return {
//     props: {}
//   }
// }