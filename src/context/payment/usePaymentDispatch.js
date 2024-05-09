import { useContext } from "react"
import { PaymentDispatchContext } from "./paymentContext"

export default function usePaymentDispatch(){
    return useContext(PaymentDispatchContext)
}