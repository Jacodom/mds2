export class GameLoop {
  private lastTime = 0;
  private running = false;

  constructor(private onUpdate: (dt: number) => void) {}

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = Date.now();
    this.tick();
  }

  stop() {
    this.running = false;
  }

  private tick = () => {
    if (!this.running) return;
    const now = Date.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.onUpdate(dt);

    setTimeout(this.tick, 16); // ~60 FPS
  };
}
