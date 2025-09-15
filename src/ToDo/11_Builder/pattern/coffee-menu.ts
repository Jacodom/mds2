import { CoffeeBuilder } from "./coffee-builder";

export class CoffeeMenu {
  private builder: CoffeeBuilder;

  constructor(builder: CoffeeBuilder) {
    this.builder = builder;
  }

  makeEspresso(): void {
    this.builder.reset();
    this.builder.setType("Espresso");
    this.builder.setBean("Arabica");
    this.builder.setWater(30);
    // this.builder.setMilk(0);
  }

  makeLatte(): void {
    this.builder.reset();
    this.builder.setType("Latte");
    this.builder.setBean("Blend");
    this.builder.setWater(30);
    this.builder.setMilk(150);
    this.builder.addTopping("Foam");
  }

  makeCappuccino(): void {
    this.builder.reset();
    this.builder.setType("Cappuccino");
    this.builder.setBean("Robusta");
    this.builder.setWater(30);
    this.builder.setMilk(120);
    this.builder.addTopping("Foam");
    this.builder.addTopping("Cocoa");
  }
}
