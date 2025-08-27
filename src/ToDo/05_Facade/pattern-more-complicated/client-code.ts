import { GameInitializerFacade } from "./game-init-facade";

// En alguna parte del codigo de nuestro juego
function initGame() {
  /*
        paso 1: obtener informacion del jugador
        paso 2: obtener informacion de avance del jugador
        ...
        paso n: obtener informacion de otros jugadores
    */

  // inicializar sistemas internos del juego
  const gameInitializer = new GameInitializerFacade();
  gameInitializer.startGame();
}

initGame();

function initGameMoreSystems() {
  // 🧪 Uso desde el “cliente” (por ejemplo, una UI o main.ts)
  const game = new GameInitializerFacade({
    width: 1920,
    height: 1080,
    bgm: "level-1.ogg",
  });

  game.startGame();
  // ... usuario abre menú de pausa
  game.pauseGame();
  // ... usuario cierra el menú
  game.resumeGame();
  // ... en un checkpoint
  game.save("slot-1");
  // ... al salir del nivel
  game.stopGame();
}
initGameMoreSystems();
