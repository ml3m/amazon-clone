
import {
    cart, 
    removeFromCart, 
    CartQuantityUpdate,
    updateQuantity,
    updateDeliveryOption
    } from "../../data/cart.js"
import {products} from "../../data/products.js"
import formatCurrency from "../utils/money.js";

// importing by remote
// import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";


function renderOrderSummary(){
    
    let cartItemsHTML = "";

    cart.forEach((cartItem)=>{

        const productId = cartItem.productId;
        let matchingProduct;

        products.forEach((product) => {
            if (productId === product.id) {
                matchingProduct = product;
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        cartItemsHTML +=  `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString} 
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
            <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
            Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link"
        data-product-id="${matchingProduct.id}">
            Save
            </span >
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
            </span>
            </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
            </div>
            </div>
            `;

    })

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = ''; 

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );

            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === 
                cartItem.deliveryOptionId;

            html +=`
                <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
            ${isChecked ? "checked"  : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
                >
                <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
                </div>
                </div>
                `
        });

        return html;
    }

    function updateCheckoutHeaderMiddleSection(){
        document.querySelector(".js-return-to-home-link").innerHTML = CartQuantityUpdate();
    }

    updateCheckoutHeaderMiddleSection();

    document.querySelector(".js-order-summary").innerHTML = cartItemsHTML;

    // delete link in cart

    function deleteitem(link){
        const productId = link.dataset.productId;
        removeFromCart(productId)

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCheckoutHeaderMiddleSection();
    }

    document.querySelectorAll(".js-delete-link").forEach((link) =>{
        link.addEventListener("click", () => {
            deleteitem(link);
        })
    });

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;

                const container = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );
                container.classList.add('is-editing-quantity');
            });
        });

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;

                const quantityInput = document.querySelector(
                    `.js-quantity-input-${productId}`
                );
                const newQuantity = Number(quantityInput.value);

                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }
                if(newQuantity === 0){
                    deleteitem(link);
                    return;
                }

                const container = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );

                container.classList.remove('is-editing-quantity');
                updateQuantity(productId, newQuantity);

                const quantityLabel = document.querySelector(
                    `.js-quantity-label-${productId}`
                );
                quantityLabel.innerHTML = newQuantity;

                updateQuantity(productId, newQuantity);
                updateCheckoutHeaderMiddleSection();
            });
        });

    document.querySelectorAll(".js-delivery-option")
        .forEach((element) => {
            element.addEventListener("click", () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });
        });
}

export default renderOrderSummary;