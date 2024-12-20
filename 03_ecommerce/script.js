document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product 1", price: 29.99 },
    { id: 2, name: "product 2", price: 19.99 },
    { id: 3, name: "product 3", price: 59.99 },
  ];
  //products..

  // state var

  let cart = JSON.parse(localStorage.getItem("tasks"))||[]; //get item from local storage if cart is not empty.

  // selectors.
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  //render all the products

  products.forEach((product) => {
    ///create div child , add class , etc , edit html , add to parent
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $ ${product.price.toFixed(2)}</span>
        <button data-id = "${product.id}">Add to Cart</button> 
        `; // unique id for the button...

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    // when addToCart button is clicked.
    // create each product , get data-id of button ,filter out any items whose data-id is not matching ,add that product to the cart.
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId); // find product by its id.
      // console.log(product)  ok working great.
      cart.push(product);
      savecart();
      // console.log(cart); ok does it functionality
      renderCart(cart);
    }
  });

  function renderCart(cart) {
    cartItems.textContent = ``; //clear out the content.
    // calculate the cart total price.

    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      // iterate through each item of cart ,
      cart.forEach((item, index) => {
        //  calculate totalPrice by adding cart ele prices to it
        totalPrice += item.price;

        // create each cart item , edit html , append to cartItems list.

        const cartItem = document.createElement("div");
          cartItem.innerHTML =
            `<span>${item.name} - $${item.price.toFixed(2)}</span>
            <button data-id = "${item.id}">Remove Items</button>
              `;
        
        cartItem.addEventListener("click", (e) => {
          if (e.target.dataset.id) {
            deleteItem(cartItem, item.id);
            cartItem.textContent = ""; //clear the dom after deleting .
          }
        })
        
        // console.log(cartItem); ok works fine.
          
          cartItems.appendChild(cartItem); // add to parent
          // get html of the total price.
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        savecart(); 
      });
      //
    } else {
        emptyCartMessage.classList.remove("hidden"); // remove the css
        totalPriceDisplay.textContent = "0.00";
    }
    }
    
    // checkout to cart..
    checkOutBtn.addEventListener("click", () => {
        cart.length = 0;
        alert("Checkout successfull");
        renderCart();
    })
  
  function savecart() {
    return localStorage.setItem("cart", JSON.stringify(cart));
  }

  //removing item function.
  function deleteItem(item, id) {
    //filter out items whose id doesnt match with the item id and save the filtered list to local storage.
    cart = cart.filter(item => item.id !== id); 
    savecart();
  }

});
