import { GameLoop } from "./engine/gameloop";
import { World } from "./engine/world";
import { Player } from "./entities/player";
import { Enemy } from "./entities/enemy";

// ==== escena básica ====
const world = new World(140, 100);
const player = new Player();
const enemies = [new Enemy({ x: 100, y: 50 })];

// Para la demo: el jugador se mueve en diagonal constante
player.setInputDirection({ x: 1, y: 0.5 });

const loop = new GameLoop((dt) => {
  player.update(dt, world);
  enemies.forEach((e) => e.updateAI(dt, world, player));

  // Render / logging (placeholder)
  debugLog(player, enemies);
});

loop.start();

// ===== Helpers de “render” (consola) =====
function debugLog(p: Player, es: Enemy[]) {
  const posP = `P (${p.position.x.toFixed(1)}, ${p.position.y.toFixed(1)})`;
  const posE = es
    .map(
      (e, i) => `E${i} (${e.position.x.toFixed(1)}, ${e.position.y.toFixed(1)})`
    )
    .join("  ");

  console.log(`${posP} | ${posE}`);
}
