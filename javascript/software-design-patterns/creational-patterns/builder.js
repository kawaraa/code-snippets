// Builder Pattern: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

// Define a builder for creating a Pizza object
class PizzaBuilder {
  constructor() {
    this.pizza = {};
  }

  // Set the size of the pizza
  setSize(size) {
    this.pizza.size = size;
    return this; // Return the builder instance for method chaining
  }

  // Add toppings to the pizza
  addToppings(toppings) {
    this.pizza.toppings = toppings;
    return this; // Return the builder instance for method chaining
  }

  // Set whether the pizza has extra cheese
  setExtraCheese(extraCheese) {
    this.pizza.extraCheese = extraCheese;
    return this; // Return the builder instance for method chaining
  }

  // Build the final Pizza object
  build() {
    return this.pizza;
  }
}

// Example usage of the PizzaBuilder
let pizza = new PizzaBuilder()
  .setSize("Large")
  .addToppings(["Pepperoni", "Mushrooms", "Onions"])
  .setExtraCheese(true)
  .build();

console.log(pizza);
