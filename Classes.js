
class Item {
  constructor(name, price, quantity) {
   
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Abstract method to calculate the total price of the item
  getTotal() {
    
  }
}

// Concrete class for product items in the shopping cart
class Product extends Item {
  constructor(name, price, quantity) {
    super(name, price, quantity);
  }

  // Override the abstract method to calculate the total price of the product item
  getTotal() {
    return this.price * this.quantity;
  }
}


class ShoppingCart   {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    // Check if the product is already in the cart
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.name === product.name) {
        this.items[i].quantity += quantity;
        return;
      }
    }
    
    // If not, add a new item to the cart
    this.items.push({
      product: product,
      quantity: quantity
    });
  }
  
  removeItem(index) {
    this.items.splice(index, 1);
  }
  
  getTotal() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].product.price * this.items[i].quantity;
    }
    return total;
  }



  
  clearCart() {
    this.items = [];
  }
}

// Global variables
const cart = new ShoppingCart();

// Functions for interacting with the cart
function addToCart(name, price, description) {
  const product = new Product(name, price, description);
  cart.addItem(product, 1);
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.removeItem(index);
  updateCartDisplay();
}

function checkout() {
  const order = {
    items: cart.items,
    total: cart.getTotal()
  };
  alert(`Order placed! Total: $${order.total.toFixed(2)}`);
  cart.clearCart();
  updateCartDisplay();
}

// Function for updating the cart display
function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  
  // Clear the cart list
  cartList.innerHTML = '';
  
  // Add each item to the cart list
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    
    const li = document.createElement('li');
    li.className = 'cart-item';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'item-name';
    nameSpan.textContent = item.product.name;
    li.appendChild(nameSpan);
    
    const priceSpan = document.createElement('span');
    priceSpan.className = 'item-price';
    priceSpan.textContent = `$${item.product.price.toFixed(2)}`;
    li.appendChild(priceSpan);
    
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'item-quantity';
    quantitySpan.textContent = item.quantity;
    li.appendChild(quantitySpan);
    
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
      removeFromCart(i);
    };
    li.appendChild(removeButton);
    
    cartList.appendChild(li);
  }
  
  // Update the total
  const total = cart.getTotal();
  cartTotal.textContent = `$${total.toFixed(2)}`;
}
