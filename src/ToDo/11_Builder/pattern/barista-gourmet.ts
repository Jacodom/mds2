import { CoffeeBuilder } from "./coffee-builder";
import { Coffee } from "./coffee";

export class GourmetBaristaBuilder implements CoffeeBuilder {
  private coffee: Coffee;

  constructor() {
    this.coffee = new Coffee();
  }

  reset(): void {
    this.coffee = new Coffee();
  }

  setType(type: string): void {
    this.coffee.setType(type + " Gourmet");
  }

  setBean(bean: string): void {
    // Siempre usa granos especiales
    this.coffee.setBean(bean + " (single origin)");
  }

  setWater(amount: number): void {
    this.coffee.setWater(amount);
  }

  setMilk(amount: number): void {
    // Añade leche orgánica
    this.coffee.setMilk(amount);
    this.coffee.addTopping("Organic Milk Foam");
  }

  addTopping(topping: string): void {
    this.coffee.addTopping("✨ " + topping);
  }

  getResult(): Coffee {
    return this.coffee;
  }
}
