import { renderOrderSummary } from "./checkout/Orderummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummarry.js";
import { loadFromStorage } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCart } from "../data/cart.js";

async function loadPage(){

    await loadProductsFetch()

    await new Promise((resolve) =>{
        loadCart(() =>{
            resolve()
        })
    })

        loadFromStorage()
    renderOrderSummary()
    renderPaymentSummary()
}
loadPage()

// Promise.all([
//     loadProductsFetch(),

//     new Promise((resolve) =>{
//         loadCart(() =>{
//             resolve()
//         })
//     })
// ]).then(()=>{
//     loadFromStorage()
//     renderOrderSummary()
//     renderPaymentSummary()
// })

