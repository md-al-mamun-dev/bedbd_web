import { useContext } from "react"
import { PaymentContext } from "./paymentContext"

export default function usePayment(){
    return useContext(PaymentContext)
}