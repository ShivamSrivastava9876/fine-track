import '@/styles/globals.css'
import { Providers } from '../redux/provider'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { store } from '@/redux/store'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function App({ Component, pageProps }) {
  return (

    <AlertProvider template={AlertTemplate} {...options}>
      <Providers><Component {...pageProps} /></Providers>
    </AlertProvider>

  )
}
