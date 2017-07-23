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

const containsItem = (targetId, items) => items.findIndex(matchesById(targetId)) > 0;

const addQuantityToExistingItem = (index, quantity, items) => {
  items[index].quantity += quantity;
  return items;
};

const addNewItem = (newItem, items) => {
  items.push(newItem);
  return items;
};

const addItem = (newItem, items) => {
  const index = items.findIndex(matchesById(newItem.id));
  if (containsItem(newItem.id, items)) {
    return addQuantityToExistingItem(index, newItem.quantity, items);
  }
  return addNewItem(newItem, items);
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