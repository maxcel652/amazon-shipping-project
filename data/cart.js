export let cart = JSON.parse(localStorage.getItem('cart'));
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
        quantity
    });

  };
  saveToStorage();
  console.log(quantity)
};


//function to remove product from cart

export function removeFromCart(productId){
  const newCart = [];
  // cart.forEach((cartItem) => {
  //   if(cartItem.productId !== productId){
  //     newCart.push(cartItem);
  //   }
  // });
  // cart = newCart;
  // saveToStorage();

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cart = cart.filter(item => item.productId !== productId)
    }
  })

  saveToStorage()
  window.location.href = "./checkout.html"
};

