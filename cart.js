const getItemTotal = (item) => item.price * item.quantity;

const sum = (total, value) => total + value;

const getTotal = (items) => {
  if (items.length === 0) {
    return 0;
  }
  const totals = items.map(getItemTotal);
  return totals.reduce(sum);
};

const addItem = (newItem, items) => {
  const matchesById = (item) => item.id === newItem.id;
  const index = items.findIndex(matchesById);
  if (index >= 0) {
    items[index].quantity += newItem.quantity;
  } else {
    items.push(newItem);
  }
  return items;
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
    this.items = addItem(newItem, this.items);
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