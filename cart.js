const getItemTotal = (item) => {
    return item.price * item.quantity;
};

const sum = (total, value) => total + value;

const getTotal = (items) => {
  if (items.length === 0) { return 0; }
  const totals = items.map(getItemTotal);
  return totals.reduce(sum);
};

class Cart {
  constructor(items = []) {
    this.items = items;
    this.total = getTotal(items);
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