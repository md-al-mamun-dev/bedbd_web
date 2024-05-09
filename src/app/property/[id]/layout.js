import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AccountProvider from "@/context/account/accountContext"
import ReservationProvider from "@/context/reservation/reservationContext"
import DataProvider from "@/context/data/dataContext"
import PropertyReservationConfirmation from "./PropertyReservationConfirmation"

export const metadata = {
  title: 'Bedbd.com',
  description: 'Find your sweet place',
}

export default function RootLayout({ children }) {
  return (
    <>
      <AccountProvider>
        <Header/>
        <DataProvider>
          <ReservationProvider>
            {children}
          </ReservationProvider>
        </DataProvider>
      </AccountProvider>
      <Footer/>
    </>


  )
}
