import AddListing from "./AddListing"
import PropertyProvider from "@/context/property/propertyContext"
import AccountProvider from "@/context/account/accountContext"
import 'mapbox-gl/dist/mapbox-gl.css'
import AddPropertySessionProvider from "@/context/addListing/AddPropertySessionContext"

export default function page() {
  return (
    // <PropertyProvider>
      
        <AddListing/>
      
    // </PropertyProvider>
  )
}
