import type { Engine } from "./engine";

export class GameLoop {
  constructor(private readonly engine: Engine) {}

  bootstrap() {
    this.engine.init(800, 600);
    this.engine.loadSprite("hero", "/assets/hero.png");
  }

  tick() {
    this.engine.clear();
    this.engine.drawSprite("hero", 100, 120);
    this.engine.update();
  }
}
