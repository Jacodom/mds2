export class Coffee {
  private type: string;
  private bean: string;
  private waterMl: number;
  private milkMl: number;
  private toppings: string[];

  constructor() {
    this.type = "";
    this.bean = "";
    this.waterMl = 0;
    this.milkMl = 0;
    this.toppings = [];
  }

  setType(type: string): void {
    this.type = type;
  }

  setBean(bean: string): void {
    this.bean = bean;
  }

  setWater(amount: number): void {
    this.waterMl = amount;
  }

  setMilk(amount: number): void {
    this.milkMl = amount;
  }

  addTopping(topping: string): void {
    this.toppings.push(topping);
  }

  show(): void {
    console.log(`☕ ${this.type}
      Grano: ${this.bean}
      Agua: ${this.waterMl}ml
      Leche: ${this.milkMl}ml
      Extras: ${this.toppings.length > 0 ? this.toppings.join(", ") : "Ninguno"}
    `);
  }
}
