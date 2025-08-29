import {
  addVectors,
  clampPoint,
  scaleVector,
  type Point,
} from "../shared/types";
import { World } from "../engine/world";

export class Player {
  position: Point = { x: 10, y: 10 };
  speed: number = 45; // unidades/seg

  // Para simplificar: vector de entrada ya resuelto (arriba/abajo/izq/der)
  private inputDirection: Point = { x: 0, y: 0 };

  setInputDirection(direction: Point) {
    this.inputDirection = direction;
  }

  update(dt: number, world: World) {
    const velocity = scaleVector(this.inputDirection, this.speed);
    const nextPos = addVectors(this.position, scaleVector(velocity, dt));
    this.position = clampPoint(nextPos, world.min, world.max);
  }
}
