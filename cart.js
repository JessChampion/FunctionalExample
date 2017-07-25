const getItemTotal = R.compose(R.product, R.values, R.pick(['price', 'quantity']));

const getTotal = R.compose(R.sum, R.map(getItemTotal));

const matchesById = R.propEq('id');

const containsItem = (targetId) => R.any(matchesById(targetId));

const addQuantityToExistingItem = (id, extraQuantity) => R.ifElse(
  matchesById(id),
  R.evolve({
    quantity: R.add(extraQuantity)
  }),
  R.identity());

const addNewItem = R.append;

const addItem = (newItem) => R.ifElse(containsItem(newItem.id),
  R.map(addQuantityToExistingItem(newItem.id, newItem.quantity)),
  addNewItem(newItem));

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
    this.items = addItem(newItem)(this.items);
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