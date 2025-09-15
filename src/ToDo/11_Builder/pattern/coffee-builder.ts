import { Coffee } from "./coffee";

export interface CoffeeBuilder {
  reset(): void;
  setType(type: string): void;
  setBean(bean: string): void;
  setWater(amount: number): void;
  setMilk(amount: number): void;
  addTopping(topping: string): void;
  getResult(): Coffee;
}
