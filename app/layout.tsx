import './globals.css'
import { Noto_Sans_Bengali, Hind_Siliguri } from 'next/font/google'
import { ReactNode } from 'react'

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla-sans',
  display: 'swap',
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla-display',
  display: 'swap',
})

export const metadata = {
  title: 'BalBook',
  description: 'A social media platform for Bangladesh',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.variable} ${hindSiliguri.variable} font-bangla-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}