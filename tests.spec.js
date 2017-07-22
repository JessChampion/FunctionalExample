describe("A shopping cart", () => {
  describe("add item to the cart", () => {
    let testCart;

    beforeEach(() => {
      const initialItems = [{
        id: 1,
        price: 2,
        quantity: 3,
      }, {
        id: 2,
        price: 2.5,
        quantity: 4,
      }];
      testCart = new Cart(initialItems)
    });

    it("can add an item to and empty cart and calculate the total", () => {
      testCart = new Cart([]);
      const testItem = {
        id: 3,
        price: 2.5,
        quantity: 2
      };

      testCart.addItem(testItem);

      const result = testCart.toJson();
      expect(result.items.length).toBe(1);
      expect(result.items[0]).toEqual(testItem);
      expect(result.total).toBe(5);
    });

    it("can add an item of a new type to the cart", () => {
      const testItem = {
        id: 3,
        price: 2.5,
        quantity: 2
      };

      testCart.addItem(testItem);

      const result = testCart.toJson();
      expect(result.items.length).toBe(3);
      expect(result.items[2]).toEqual(testItem);
    });

    it("should correctly calculate the cart total when adding an item of a new type", () => {
      const testItem = {
        id: 3,
        price: 2.5,
        quantity: 2
      };

      testCart.addItem(testItem);

      const result = testCart.toJson();
      expect(result.items.length).toBe(3);
      expect(result.items[2]).toEqual(testItem);
    });

    it("can add another item of an existing type to the cart", () => {
      const testItem = {
        id: 2,
        price: 2.5,
        quantity: 2,
      };

      testCart.addItem(testItem);

      const result = testCart.toJson();
      expect(result.items.length).toBe(2);
      expect(result.items[1].quantity).toBe(6);
    });

    it("should correctly calculate the cart total when adding an item of an existing type", () => {
      let testItem = {
        id: 2,
        price: 2.5,
        quantity: 5,
      };

      testCart.addItem(testItem);

      const result = testCart.toJson();
      expect(result.total).toBe(28.5);
    });
  });
});