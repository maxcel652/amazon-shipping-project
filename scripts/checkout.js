import { renderOrderSummary } from "./checkout/Orderummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummarry.js";
import { loadFromStorage } from "../data/cart.js";
// import '../data/cart-class.js'

renderOrderSummary();
renderPaymentSummary()
loadFromStorage();