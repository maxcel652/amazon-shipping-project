import { renderOrderSummary } from "./checkout/Orderummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummarry.js";
import { loadFromStorage } from "../data/cart.js";
// import '../data/cart-class.js'
import '../data/backend-practice.js'

renderOrderSummary();
renderPaymentSummary()
loadFromStorage();