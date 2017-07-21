class Cart {
  constructor(items = []) {
    this.items = items;
    this.total = 0;
    this.updateTotal();
  }

  // Update Total
  // calculate total of items in the cart
  // ----------------------------------------------
  updateTotal() {
    let total = 0;
    for (let index in this.items) {
      let item = this.items[index];
      total += item.price * item.quantity;
    }
    this.total = total;
  }

  // Add Item
  // add an item to the cart
  // ----------------------------------------------
  addItem(newItem) {
    for (let index in this.items) {
      let item = this.items[index];
      if (item.id === newItem.id) {
        item.quantity += newItem.quantity;
        this.updateTotal();
        return;
      }
    }

    this.items.push(newItem);
    this.updateTotal();
  }

  // To JSON
  // get a json representation of the cart data
  // ----------------------------------------------
  toJson() {
    return {
      items: this.items,
      total: this.total
    }
  }
}

// Demo Runner
// pay no attention to the man behind the curtain
// ----------------------------------------------
function runDemo() {
  const initialItems = [{
    id: 1,
    price: 2,
    quantity: 3,
  }, {
    id: 2,
    price: 2.5,
    quantity: 4,
  }];
  
  const demoItem = {
    id: 3,
    price: 2.5,
    quantity: 2
  };

  let cart = new Cart(initialItems);
  const initialCart = JSON.stringify(cart, null, 2);
  cart.addItem(demoItem);

  return {
    initialCart,
    demoItem,
    cart
  };
}