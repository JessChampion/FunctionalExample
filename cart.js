const getItemTotal = (item) => item.price * item.quantity;

const sum = (total, value) => total + value;

const getTotal = (items) => {
  if (items.length === 0) {
    return 0;
  }
  const totals = items.map(getItemTotal);
  return totals.reduce(sum);
};

const matchesById = (targetId) => (item) => item.id === targetId;

const addItem = (newItem, items) => {
  const index = items.findIndex(matchesById(newItem.id));
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