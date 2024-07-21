export const cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function cartSelectorFormat(quantitySelector){
    return parseInt(quantitySelector.value);

}

export function addToCart(productId, quantitySelector) {
    let matchingItems;
    
    cart.forEach((item)=>{
        if (productId === item.productId) {
           matchingItems = item;
        }
    });

    let selectedValue = cartSelectorFormat(quantitySelector);

    if (matchingItems) {
       matchingItems.quantity += selectedValue; 
    } else {
        cart.push({
            productId: productId,
            quantity: selectedValue,
            deliveryOptionId: '1'
        })
    }

    saveToStorage();
}

export function addedToCartMessageTimeout(messageAddedToCart){
    messageAddedToCart.classList.add("js-added-to-cart-appear");

    let addedMessageTimeoutID;
    if(addedMessageTimeoutID){
        clearTimeout(addedMessageTimeoutID);
    }

    const myTimeout_id = setTimeout(() =>{
        messageAddedToCart.classList.remove("js-added-to-cart-appear");
    }, 2000);

    addedMessageTimeoutID = myTimeout_id;
}


export function CartQuantityUpdate(){

    let CartQuantity = 0;

    cart.forEach((item) => {
        CartQuantity += item.quantity;
    })

    return CartQuantity;
}

export function removeFromCart(productId) {
    cart.forEach((item, index) => {
        if (item.productId === productId) {
            cart.splice(index, 1);
        }
    });

    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItems;
    
    cart.forEach((item)=>{
        if (productId === item.productId) {
           matchingItems = item;
        }
    });

    matchingItems.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

