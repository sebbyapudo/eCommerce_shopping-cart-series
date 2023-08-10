// shopping cart js
let productsInCart = [];
const parentElement = document.getElementById('buyItems');
const cartSumPrices = document.getElementById('sum-prices');
const products = document.querySelectorAll('.product-under');

const countTheSumPrice = function (){
  let sumPrice = 0;
  productsInCart.forEach(product => {
    sumPrice += product.price;
  })
  return sumPrice;
}

const updateShoppingCartHTML = function () {
  if(productsInCart.length > 0) {
    let result = productsInCart.map(product => {
      return `
      <img src=${product.image}>
      <div>
        <h5>${product.name}</h5>
        <h6>$${product.price}</h6>
        <div>
          <button class="button-minus" data-id=${product.id}>-</button>
          <span class="countOfProduct">1</span>
          <button class="button-plus" data-id=${product.id}>+</button>
        </div>
      </div>
      `
    });
    parentElement.innerHTML = result.join('');
    document.querySelector('.checkout').classList.remove('.hidden');
    cartSumPrices.innerHTML = "$" + countTheSumPrice();
  }
  else {
    document.querySelector('.checkout').classList.add('.hidden');
    parentElement.innerHTML = `<h4 class="empty">Your shopping cart is empty</h4>`;
    cartSumPrices.innerHTML = "";
  }
}

function updateProductsInCart(product){
  for (let i=0 ;i<productsInCart.length; i++){
    if(productsInCart[i].id === product.id) {
        productsInCart[i].count += 1;
        productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
        return;
    }
  }
  productsInCart.push(product);
}

console.log(productsInCart);


products.forEach ((product) => {
  product.addEventListener('click', (e) => {
    if (e.target.classList.contains('addToCart')) {
      const productID = e.target.dataset.productId;
      const productName = document.querySelector('.productName').innerHTML;
      const productPrice = document.querySelector('.priceValue').innerHTML;
      const productImg = document.querySelector('img').src;
      let productToCart = {
        name: productName,
        image: productImg,
        id: productID,
        count: 1,
        price: +productPrice,
        basePrice: +productPrice,
      }
      updateProductsInCart(productToCart);
      updateShoppingCartHTML();
    }
  })
})

