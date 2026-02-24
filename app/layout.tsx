import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-merriweather' })

export const metadata: Metadata = {
  title: 'IEMA Pleno Santa Inês',
  description: 'Escola técnica do Governo do Maranhão oferecendo cursos de Logistica, Informática para Internet, Administração e Agricultura.',
}

export const viewport: Viewport = {
  themeColor: '#1a6bb5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_inter.variable} ${_merriweather.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
