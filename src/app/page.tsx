"use client"

import './globals.css'
import { Providers } from '../redux/provider'
import Dashboard from '@/pages/dashboard'

export default function Home() {
  return (
    <Providers><Dashboard /></Providers>
  )
}
