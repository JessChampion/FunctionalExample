const getTotal = (items) => {
  let total = 0;
  for (let index in items) {
    let item = items[index];
    total += item.price * item.quantity;
  }
  return total;
};

class Cart {
  constructor(items = []) {
    this.items = items;
    this.total = getTotal(items);
  }

  // Get Total
  // calculate total of items in the cart
  // ----------------------------------------------
  getTotal(items) {
    let total = 0;
    for (let index in items) {
      let item = this.items[index];
      total += item.price * item.quantity;
    }
    return total;
  }

  // Add Item
  // add an item to the cart
  // ----------------------------------------------
  addItem(newItem) {
    for (let index in this.items) {
      let item = this.items[index];
      if (item.id === newItem.id) {
        item.quantity += newItem.quantity;
        this.total = getTotal(this.items);
        return;
      }
    }

    this.items.push(newItem);
    this.total = getTotal(this.items);
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