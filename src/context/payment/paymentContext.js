'use client'
import { createContext, useContext, useReducer } from "react";
import paymentReducers from "@/reducers/paymentReducers";
// import accountReducers from "../../reducers/accountReducers";
import { store } from "../store";




export const PaymentContext = createContext(null);
export const PaymentDispatchContext = createContext(null)

export default function PaymentProvider({ children }){
    const [payment, dispatchPayment] = useReducer(paymentReducers, store['payment']);

    return (
        <PaymentContext.Provider value={payment}>
            <PaymentDispatchContext.Provider value={dispatchPayment}>
                {children}
            </PaymentDispatchContext.Provider>
        </PaymentContext.Provider>
    )
}
