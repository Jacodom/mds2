import { MoveContext, MovementStrategy } from "./strategies/movement-strategy";

export class Enemy implements MoveContext {
  private x = 0;
  private y = 0;
  private strategy: MovementStrategy;

  constructor(
    initialX: number,
    initialY: number,
    strategy: MovementStrategy,
    private readonly getPlayerPos: () => { x: number; y: number }
  ) {
    this.x = initialX;
    this.y = initialY;
    this.strategy = strategy;
  }

  // API requerida por las estrategias (no exponemos props crudas)
  getPosition() {
    return { x: this.x, y: this.y };
  }
  getPlayerPosition() {
    return this.getPlayerPos();
  }
  translate(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  setStrategy(s: MovementStrategy) {
    this.strategy = s;
  } // cambio en runtime

  update() {
    this.strategy.update(this);
  }

  // por si el motor necesita leer:
  snapshot() {
    return { x: this.x, y: this.y };
  }
}
