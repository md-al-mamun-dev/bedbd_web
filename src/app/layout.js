import { Inter } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AccountProvider from '@/context/account/accountContext'
import ControlProvider from '@/context/control/controlContext'
import DataProvider from '@/context/data/dataContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight:['400', '500', '600', '700'], })
const montserrat = Montserrat({ 
                      subsets: ['latin'] , 
                      weight:['400', '500', '600', '700'],
                    })

export const metadata = {
  title: 'Bedbd.com',
  description: 'Find your sweet place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={montserrat.className}>
        <AccountProvider>
          <DataProvider>
            <ControlProvider>
              {children}
            </ControlProvider>
          </DataProvider>
        </AccountProvider>
        </body>
      
    </html>
  )
}
