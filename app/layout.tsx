import { Inter } from 'next/font/google'
import './globals.css'
import { CBREThemeProvider } from '../src/components/cbre/CBREThemeProvider'
import { financierDisplay, calibre } from './fonts'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CBRE Capital Market Landmark Deals',
  description: 'Discover significant real estate transactions across Asia Pacific',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${financierDisplay.variable} ${calibre.variable}`}>
        <CBREThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
      >
        {children}
        </CBREThemeProvider>
      </body>
    </html>
  )
}
