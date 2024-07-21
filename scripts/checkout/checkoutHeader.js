//save data
//generate html
//interactive
import {cart} from "../../data/cart.js"
import {totalNoProductsInCart} from "../../data/products.js"

export function renderCheckoutHeader(){

    const checkoutHeaderHTML = `
      Checkout (${totalNoProductsInCart(cart)})
    `
    document.querySelector(".js-checkout-header").innerHTML = checkoutHeaderHTML;
}
