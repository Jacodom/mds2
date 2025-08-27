import { AudioSystem } from "./audio-system";
import { GameInitFacade } from "./game-init-facade";
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
  const initGameFacade = new GameInitFacade();
  initGameFacade.iniciarJuego();
}

initGame();
