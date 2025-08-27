import { Enemy } from "./enemy";
import { ChasePlayer, KeepDistanceAndShoot } from "./strategies";

// "Jugador" sencillo (x, y); lo movemos un poquito por tick para ver la persecución
const player = { x: 0, y: 0 };
const playerPos = () => ({ x: player.x, y: player.y });

// Enemigo arranca persiguiendo
const enemy = new Enemy(10, 5, new ChasePlayer(), playerPos);

let ticks = 0;
const loop = setInterval(() => {
  ticks++;

  // Simulamos movimiento del jugador (derecha y un poco hacia abajo)
  if (ticks % 2 === 0) player.x += 1;
  if (ticks % 3 === 0) player.y += 1;

  // Actualizamos enemigo
  enemy.update();

  // A los 10 segundos (40 ticks si cada 250ms) cambia a "mantener distancia"
  if (ticks === 40) {
    console.log("→ Cambio de estrategia: KeepDistanceAndShoot(minRange=6)");
    enemy.setStrategy(new KeepDistanceAndShoot(6));
  }

  const e = enemy.snapshot();
  console.log(
    `tick=${ticks} | enemy=(${e.x}, ${e.y}) | player=(${player.x}, ${player.y})`
  );

  // Terminamos la demo a los 60 ticks (~15s)
  if (ticks === 60) clearInterval(loop);
}, 250);
