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