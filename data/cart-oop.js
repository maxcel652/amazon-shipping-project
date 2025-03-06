function Cart(localStorageKey){
  const cart = {
      cartItems: undefined,
  
      loadFromStorage(){
          this.cartItems  = JSON.parse(localStorage.getItem(localStorageKey));
          if (!this.cartItems){
            this.cartItems = [{
              productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity:2,
              deliveryOptionId:'1'
            },{
              productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity:1,
              deliveryOptionId:'2'
            }]
          }
      },
  
      //saving our cart to local storgae
      saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      },
  
      //function to add items to cart
  
      addToCart(productId){
          let matchingItem;
          this.cartItems.forEach((cartItem)=>{
              if(productId === cartItem.productId){
                  matchingItem = cartItem;
              }
          });
      
          // const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`) ;
          // const quantity  = Number(quantitySelector.value) ;
          
      
          if (matchingItem) {
          matchingItem.quantity += 1;
          } else{
          this.cartItems.push({
              productId,
              quantity:1,
              deliveryOptionId:'1'
          });
      
          };
          this.saveToStorage();
    },
    //function to remove product from cart
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      // saveToStorage();
    
      // cart.forEach((cartItem) => {
      //   if (cartItem.productId === productId) {
      //     cart = cart.filter(item => item.productId !== productId)
      //   }
      // })
    
      
      this.saveToStorage()
      // window.location.href = "./checkout.html" 
    },
  
    calculateCartQuantity(){
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
    //updating the quantity
   updateQuantity(productId, newQuantity){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
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
    },
  
    updateDelivertOption(productId, deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
          if(productId === cartItem.productId){
              matchingItem = cartItem;
          }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    },
  
  }


  return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage()
businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)
 