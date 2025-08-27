export class Enemy {
  x: number = 0;
  y: number = 0;
  mode: "lineal" | "aleatorio";

  constructor(mode: "lineal" | "aleatorio") {
    this.mode = mode;
  }

  update() {
    if (this.mode === "lineal") {
      this.x += 1; // siempre avanza
    } else if (this.mode === "aleatorio") {
      this.x += Math.floor(Math.random() * 3) - 1; // -1, 0 o +1
      this.y += Math.floor(Math.random() * 3) - 1;
    }
  }

  setMode(mode: "lineal" | "aleatorio") {
    this.mode = mode;
  }
}
