import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;


});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) =>{
    button.addEventListener("click",() => {
        const productId = button.dataset.productId;
        let matchingItems;
        
        cart.forEach((item)=>{
            if (productId === item.productId) {
               matchingItems = item;
            }
        })
        const quantitySelector = document.querySelector(
          `.js-quantity-selector-${productId}`
        );

        const messageAddedToCart = document.querySelector(
            `.js-added-to-cart-${productId}`
        );

        messageAddedToCart.classList.add("js-added-to-cart-appear");

        let addedMessageTimeoutID;

        if(addedMessageTimeoutID){
            clearTimeout(addedMessageTimeoutID);
        }
        
        const myTimeout_id = setTimeout(() =>{
            messageAddedToCart.classList.remove("js-added-to-cart-appear");
        }, 1200);

        addedMessageTimeoutID = myTimeout_id;
        


        
        // it is a string
        //console.log(typeof(quantitySelector.value));
        
        let selectedValue = parseInt(quantitySelector.value);

        if (matchingItems) {
           matchingItems.quantity += selectedValue; 
        } else {
            cart.push({
                productId: productId,
                quantity: selectedValue 
            })
        }
        
        let CartQuantity = 0;

        cart.forEach((item) => {
            CartQuantity += item.quantity;
        })

        document.querySelector(".js-cart-quantity").innerHTML = CartQuantity;

        console.log(cart);
    })
});

