"use client"

import './globals.css'
import Login from '@/pages/login'
import { Providers } from '../redux/provider'

export default function Home() {
  return (
    <Providers><Login /></Providers>
  )
}
