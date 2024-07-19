export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
},{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
}];

export function cartSelectorFormat(quantitySelector){
    return parseInt(quantitySelector.value);

}

export function addToCart(productId, quantitySelector) {
    let matchingItems;
    
    cart.forEach((item)=>{
        if (productId === item.productId) {
           matchingItems = item;
        }
    })

    let selectedValue = cartSelectorFormat(quantitySelector);

    if (matchingItems) {
       matchingItems.quantity += selectedValue; 
    } else {
        cart.push({
            productId: productId,
            quantity: selectedValue 
        })
    }
    
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
