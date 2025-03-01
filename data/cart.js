// import { getCartCount } from "../scripts/checkout.js";

import { deliveryOptions } from "./deliverOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId:'1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }]
}
//saving our cart to local storgae
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


//function to add items to cart

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
          matchingItem = cartItem;
      }
  });

  const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`) ;
  const quantity  = Number(quantitySelector.value) ;
  

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else{
    cart.push({
        productId,
        quantity:1,
      deliveryOptionId:'1'
    });

  };
  saveToStorage();
 
};


//function to remove product from cart

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  // saveToStorage();

  // cart.forEach((cartItem) => {
  //   if (cartItem.productId === productId) {
  //     cart = cart.filter(item => item.productId !== productId)
  //   }
  // })

  
  saveToStorage()
  // window.location.href = "./checkout.html" 
};

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


//updating the quantity
export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
          matchingItem = cartItem;
          // matchingItem.quantity+=newQuantity
      }
  });
  
  matchingItem.quantity = newQuantity;

  // if (matchingItem) {
  //   matchingItem.quantity += quantity;
  // } else{
  //   cart.push({
  //       productId,
  //       quantity
  //   })
  // }
}

export function updateDelivertOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
          matchingItem = cartItem;
      }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}