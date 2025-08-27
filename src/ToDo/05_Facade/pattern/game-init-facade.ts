import { AudioSystem } from "./audio-system";
import { GraphicsEngine } from "./graphic-system";
import { PhysicsEngine } from "./physics-system";

export class GameInitFacade {
  iniciarJuego() {
    const as = new AudioSystem();
    const gs = new GraphicsEngine();
    const ps = new PhysicsEngine();

    as.init();
    gs.init();
    ps.init();

    console.log("Juego iniciado!");
  }
}
