const getItemTotal = R.compose(R.product, R.values, R.pick(['price', 'quantity']));

const getTotal = R.compose(R.sum, R.map(getItemTotal));

const matchesById = R.propEq('id');

const containsItem = (targetId) => R.any(matchesById(targetId));

const addQuantityToExistingItem = (id, extraQuantity) => R.map((item) => {
  if (item.id === id) {
    return R.evolve({
      quantity: R.add(extraQuantity)
    })(item);
  }
  return item;
});

const addNewItem = R.append;

const addItem = (newItem, items) => {
  if (containsItem(newItem.id)(items)) {
    return addQuantityToExistingItem(newItem.id, newItem.quantity)(items);
  }
  return addNewItem(newItem)(items)
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