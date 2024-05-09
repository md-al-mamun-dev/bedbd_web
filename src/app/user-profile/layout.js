
import Header from "@/components/Header"
import AccountProvider from "@/context/account/accountContext"
import PropertyProvider from "@/context/property/propertyContext"
import UserProfileProvider from "@/context/profile/userProfileContext"

export const metadata = {
  title: 'Bedbd.com',
  description: 'user profile',
}

export default function RootLayout({ children }) {
  return (
    <>
      <AccountProvider>
        <Header/>
      </AccountProvider>
      <PropertyProvider>
        <UserProfileProvider>
          {children}
        </UserProfileProvider>
      </PropertyProvider>        
      
    </>


  )
}
