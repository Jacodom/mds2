import { Enemy } from "./enemy";

const enemigoLineal = new Enemy("lineal");
const enemigoAleatorio = new Enemy("aleatorio");

let tick = 0;

const loop = setInterval(() => {
  tick++;

  // actualizar enemigos
  enemigoLineal.update();
  enemigoAleatorio.update();

  // ❌ “cambio de comportamiento” sin patrón (mala práctica):
  // mutar la propiedad directamente
  if (tick === 5) {
    enemigoAleatorio.setMode("lineal");
    console.log(
      ">>> Cambio manual: enemigoAleatorio pasa de 'aleatorio' a 'lineal' (sin Strategy)"
    );
  }

  // “render”/log simple
  console.log(
    `tick=${tick} | lineal=(${enemigoLineal.x}, ${enemigoLineal.y}) | aleatorio=(${enemigoAleatorio.x}, ${enemigoAleatorio.y})`
  );

  // terminar demo
  if (tick === 10) clearInterval(loop);
}, 250);
