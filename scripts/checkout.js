import { renderOrderSummary } from "./checkout/Orderummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummarry.js";
import { loadFromStorage } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";

import { loadCart } from "../data/cart.js";

Promise.all([
    new Promise((resolve) =>{
        loadProducts(() =>{
            resolve('value1')
        });
    }),

    new Promise((resolve) =>{
        loadCart(() =>{
            resolve()
        })
    })
]).then(()=>{
    loadFromStorage()
    renderOrderSummary()
    renderPaymentSummary()
})

