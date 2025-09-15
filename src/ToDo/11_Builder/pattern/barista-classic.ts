import { CoffeeBuilder } from "./coffee-builder";
import { Coffee } from "./coffee";

export class ClassicBaristaBuilder implements CoffeeBuilder {
  private coffee: Coffee;

  constructor() {
    this.coffee = new Coffee();
  }

  reset(): void {
    this.coffee = new Coffee();
  }

  setType(type: string): CoffeeBuilder {
    this.coffee.setType(type);
    return this;
  }

  setBean(bean: string): void {
    this.coffee.setBean(bean);
  }

  setWater(amount: number): void {
    this.coffee.setWater(amount);
  }

  setMilk(amount: number): void {
    this.coffee.setMilk(amount);
  }

  addTopping(topping: string): void {
    this.coffee.addTopping(topping);
  }

  getResult(): Coffee {
    return this.coffee;
  }
}
