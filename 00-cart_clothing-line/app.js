/* app.js */
// select elements 

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subTotal = document.querySelector('.subtotal');
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');

// render products
function renderProducts(){
  products.forEach( (product) => {
    productsEl.innerHTML += `
    <!-- render porducts here -->
    <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src=${product.imgSrc} alt=${product.id}>
            </div>
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                    ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
    `
  } )
}

renderProducts()

// cart array
let cart = [];

// ADD TO CART
function addToCart(id){
  // check if product already exists in cart
  if(cart.some((item) => item.id === id)){
    changeNumberOfUnits("plus", id);
  }
  else{
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item, 
      numberOfUnits: 1,
    })

  }
  

  updateCart();
}

// update cart 
function updateCart(){
  renderCartItems();
  renderSubTotal();
}

// calculate and render subtotal
function renderSubTotal(){
  let totalPrice = 0, totalItems = 0;

  cart.forEach( (item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  })

  subTotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
  totalItemsInCartEl.innerHTML = `${totalItems}`
}

// Render cart Items 
function renderCartItems() {
  cartItemsEl.innerHTML = ''; // Clear cart items 
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <!-- render cart items here -->  
    <div class="cart-item">
      <div class="item-info">
        <img src=${item.imgSrc} alt=${item.name}>
        <h4>${item.name}</h4>
      </div>
      <div class="unit-price">
        <small>$</small>${item.price}
      </div>
      <div class="units">
        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
    </div>
    `
  });
}

// Change Number of units
function changeNumberOfUnits(action, id){
  cart = cart.map( (item) => {

    let numberOfUnits = item.numberOfUnits;

    if (item.id === id){
      if(action === "minus" && numberOfUnits > 1){
        numberOfUnits--
      }
      if(action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++
      } 
    }

    return {
      ...item,
      numberOfUnits,
    };
  })

  updateCart()
}