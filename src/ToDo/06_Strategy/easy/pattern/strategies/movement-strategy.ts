export interface MoveContext {
  // Sólo lo necesario, no exponemos x/y públicamente
  getPosition(): { x: number; y: number };
  getPlayerPosition(): { x: number; y: number };
  translate(dx: number, dy: number): void; // API controlada para mover
}

export interface MovementStrategy {
  update(ctx: MoveContext): void;
}
