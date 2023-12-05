import '@/styles/globals.css'
import { Providers } from '../redux/provider'
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
// import { store } from '@/redux/store'



export default function App({ Component, pageProps }) {
  return (

      <Providers><Component {...pageProps} /></Providers>

  )
}
