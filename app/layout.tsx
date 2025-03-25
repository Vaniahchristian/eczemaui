import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EczemaAI',
  description: 'EczemaAI - Your Personalized Eczema Management Assistant',
  generator: 'EczemaAI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
