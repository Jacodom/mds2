import { MoveContext, MovementStrategy } from "./movement-strategy";

export class ChasePlayer implements MovementStrategy {
  update(ctx: MoveContext) {
    const { x, y } = ctx.getPosition();
    const { x: px, y: py } = ctx.getPlayerPosition();
    ctx.translate(Math.sign(px - x), Math.sign(py - y));
  }
}
