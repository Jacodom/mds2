import { MoveContext, MovementStrategy } from "./movement-strategy";

export class KeepDistanceAndShoot implements MovementStrategy {
  constructor(private minRange = 6) {}
  update(ctx: MoveContext) {
    const { x, y } = ctx.getPosition();
    const { x: px, y: py } = ctx.getPlayerPosition();
    const dist = Math.hypot(px - x, py - y);
    if (dist < this.minRange) {
      ctx.translate(-Math.sign(px - x), 0); // retrocede un poco
    }
    // disparar sería otro sistema, acá solo movemos
  }
}
