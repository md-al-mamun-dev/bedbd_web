export default function paymentReducers(initialData, {type, data}) {
    switch (type) {
        case "payment/selectOption": {
            return {...initialData, selectedOption: data}
          }


        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}