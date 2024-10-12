import type { Metadata } from "next";

import '../styles/globals.css'

export const metadata: Metadata  = {
  title: 'Cleaner\'s Guide',
  description: 'A guide for cleaners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
