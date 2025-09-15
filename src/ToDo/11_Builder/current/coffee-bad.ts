export class CoffeeBad {
  constructor(
    private type: string,
    private bean: string,
    private waterMl: number,
    private milkMl: number,
    private toppings: string[]
  ) {}

  show(): void {
    console.log(`☕ ${this.type}
      Grano: ${this.bean}
      Agua: ${this.waterMl}ml
      Leche: ${this.milkMl}ml
      Extras: ${this.toppings.length > 0 ? this.toppings.join(", ") : "Ninguno"}
    `);
  }
}
