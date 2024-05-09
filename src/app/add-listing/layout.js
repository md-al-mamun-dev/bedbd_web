// "use client"
import { Inter } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AccountProvider from '@/context/account/accountContext'
import ControlProvider from '@/context/control/controlContext'
import DataProvider from '@/context/data/dataContext'
import PropertyProvider from '@/context/property/propertyContext'
import 'mapbox-gl/dist/mapbox-gl.css';
import AddPropertySessionProvider from '@/context/addListing/AddPropertySessionContext'
// import useAddPropertySession from '@/context/addListing/useAddPropertySession'

export default function Layout({ children }) {
  // const data = useAddPropertySession()

  return (
    <PropertyProvider>
      <AddPropertySessionProvider>
        { children }
      </AddPropertySessionProvider>
    </PropertyProvider>
  )
}
