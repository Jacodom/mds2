import { CoffeeBad } from "./coffee-bad";

// Espresso clásico
const espresso = new CoffeeBad("Espresso", "Arabica", 30, 0, []);
espresso.show();

// Latte clásico
const latte = new CoffeeBad("Latte", "Blend", 30, 150, ["Foam"]);
latte.show();

// Cappuccino clásico
const cappuccino = new CoffeeBad("Cappuccino", "Robusta", 30, 120, [
  "Foam",
  "Cocoa",
]);
cappuccino.show();
