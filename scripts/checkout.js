import {cart, removeFromCart,calculateCartQuantity ,updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";


let cartSummaryHTML ='';
cart.forEach((cartItem) => {
    const  productId = cartItem.productId;

    let matchingProduct;
    
    //looping through each product to find the matching product

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });


    cartSummaryHTML +=`
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <div class="save-quantity">
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary "
                    data-product-id = ${matchingProduct.id}
                    >Save</span>
                  </div>     
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
                <p class="update-validation-check-${matchingProduct.id}"></p>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    
    `
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


//updating count value

function calculateQuantity(){
  let getCartCount = () => {
    return cart.length
  }
  
  document.querySelector('.js-check-out-link').innerHTML = getCartCount();
}
calculateQuantity()

//removing item from cart
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId= link.dataset.productId;
        removeFromCart(productId)
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove()
        calculateQuantity()
   });
});

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-check-out-link').innerHTML = `${cartQuantity} items`

}
updateCartQuantity();


// adding event listener to the update links

document.querySelectorAll('.update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.classList.add('is-editing-quantity')
  });
});

//adding event listener to the save links
document.querySelectorAll('.save-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

    const newQuantity = Number(quantityInput.value);

    // checking quantity validation
    const quantityCheck = document.querySelector(`.update-validation-check-${productId}`)
    if(newQuantity<0 || newQuantity ===0 || newQuantity>200){
        if(newQuantity<0){
          quantityCheck.innerHTML = 'Quantities below 0 not alowed'
        }
    
        else if (newQuantity === 0) {
          quantityCheck.innerHTML = "You can't have a quantity of 0"
        }
        else if(newQuantity > 200){
          quantityCheck.innerHTML = "Quantities above 200 not alowed"
        }
        setTimeout(() => {
          quantityCheck.innerHTML = ''
        }, 2000);
   }
    
    else if (newQuantity>=1 && newQuantity <= 200){
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.remove('is-editing-quantity')

      updateQuantity(productId, newQuantity);
  
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      document.querySelector(`.update-validation-check-${productId}`).innerHTML = ''
      updateCartQuantity();
      quantityInput.value = ''

    }

  });
});
