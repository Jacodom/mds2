import { ClassicEngine } from "./engine";
import { GameLoop } from "./game-loop";
import { NewFancyEngine } from "./new-engine";

// ✔️ Cliente funcionando con el engine “viejo”
const oldEngine = new ClassicEngine();
const loopWithOld = new GameLoop(oldEngine);
loopWithOld.bootstrap();
loopWithOld.tick();

// ❌ Lo que NO compila/encaja: el loop espera Engine y NewFancyEngine no lo implementa
const newEngine = new NewFancyEngine();
// const loopWithNew = new GameLoop(newEngine); // <-- Esto NO se puede (tipos incompatibles)

// TODO:
// - Crear un Adapter que implemente `Engine`
