// player-bad.ts
export class Player {
  private state: string;

  constructor() {
    this.state = "idle"; // quieto por defecto
  }

  handleInput(input: string) {
    if (this.state === "idle") {
      if (input === "press_arrow") {
        console.log("El personaje empieza a correr 🚀");
        this.state = "running";
      } else {
        console.log("El personaje sigue quieto 😴");
      }
    } else if (this.state === "running") {
      if (input === "release_arrow") {
        console.log("El personaje se detiene 🛑");
        this.state = "idle";
      } else {
        console.log("El personaje sigue corriendo 🏃");
      }
    }
  }
}

const player = new Player();

player.handleInput("press_arrow"); // El personaje empieza a correr 🚀
player.handleInput("release_arrow"); // El personaje se detiene 🛑
