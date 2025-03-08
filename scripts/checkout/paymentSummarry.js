import {cart, saveToStorage, updateQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliverOptions.js';
import { formatCurrency } from '../utils/money.js';
import { calculateCartQuantity } from '../../data/cart.js';
import { addOrder } from '../../data/order.js';


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem)=> {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliverOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += deliverOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummarry = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()} itmes):</div>
            <div class="payment-summary-money">$${formatCurrency( productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency( shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency( totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency( taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency( totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-your-order">
            Place your order
          </button>
          
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummarry;

    document.querySelector('.js-place-your-order').addEventListener('click', async () =>{
      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers:{
            'content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart:cart
          })
        });

        const order = await response.json();
        addOrder(order)
      } catch(error){
         console.log('Unexpected error. Try again later.')
      }

      window.location.href = 'orders.html'
    })
 

    saveToStorage();
}
