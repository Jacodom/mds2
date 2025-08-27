import type { Point } from "../shared/types";

export class World {
  readonly min: Point = { x: 0, y: 0 };
  readonly max: Point;

  constructor(public width: number, public height: number) {
    this.max = { x: width, y: height };
  }
}
