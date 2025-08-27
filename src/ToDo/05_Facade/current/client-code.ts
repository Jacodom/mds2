import { AudioSystem } from "./audio-system";
import { GraphicsEngine } from "./graphic-system";
import { PhysicsEngine } from "./physics-system";

// En alguna parte del codigo de nuestro juego
function initGame() {
  /*
        paso 1: obtener informacion del jugador
        paso 2: obtener informacion de avance del jugador
        ...
        paso n: obtener informacion de otros jugadores
    */

  // inicializar sistemas internos del juego
  const audio = new AudioSystem();
  audio.init();

  const physics = new PhysicsEngine();
  physics.init();

  const graphics = new GraphicsEngine();
  graphics.init();
}

initGame();
