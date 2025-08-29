import { GameLoop } from "./engine/gameloop";
import { World } from "./engine/world";
import { Player } from "./entities/player";
import {
  Enemy,
  IdleStrategy,
  PatrolStrategy,
  ChaseStrategy,
} from "./entities/enemy";
import {
  GuardStrategy,
  FleeStrategy,
  SearchStrategy,
} from "./strategies/extended-strategies";

// ==== Demo completa del patrón Strategy ====
const world = new World(200, 150);
const player = new Player();

// Crear múltiples enemigos con diferentes estrategias iniciales
const enemies = [
  new Enemy({ x: 50, y: 50 }), // Empezará con PatrolStrategy (por defecto)
  new Enemy({ x: 150, y: 50 }), // Este será configurado como guardia
  new Enemy({ x: 100, y: 100 }), // Este será configurado para huir
];

// Configurar estrategias específicas para demostrar la flexibilidad
enemies[1].setStrategy(new GuardStrategy({ x: 150, y: 50 }, 30)); // Guardia del área
enemies[2].setStrategy(new FleeStrategy()); // Estrategia de huida

// Para la demo: el jugador se mueve en diagonal
player.setInputDirection({ x: 0.8, y: 0.3 });

console.log("=== Demo Completa del Patrón Strategy ===");
console.log("Múltiples enemigos con diferentes estrategias:");
console.log("- Enemy 0: Patrulla normal");
console.log("- Enemy 1: Guardia de área");
console.log("- Enemy 2: Huye del jugador");
console.log("\nObserva cómo cada enemigo se comporta de manera diferente:");
console.log("=".repeat(70));

let frameCount = 0;
let lastStrategyChange = 0;

const loop = new GameLoop((dt) => {
  player.update(dt, world);
  enemies.forEach((e, i) => e.updateAI(dt, world, player));

  frameCount++;

  // Demostrar cambio dinámico de estrategias cada 15 segundos
  if (frameCount > 900 && frameCount - lastStrategyChange > 900) {
    // ~15s a 60fps
    lastStrategyChange = frameCount;
    demonstrateStrategyChanges();
  }

  // Render / logging menos frecuente para mejor legibilidad
  if (frameCount % 60 === 0) {
    // Una vez por segundo
    debugLog(player, enemies);
  }
});

function demonstrateStrategyChanges() {
  const demonstrations = [
    () => {
      console.log("\n🔄 Cambiando Enemy 0 a SearchStrategy...");
      enemies[0].setStrategy(new SearchStrategy(player.position));
    },
    () => {
      console.log("\n🔄 Cambiando Enemy 1 a ChaseStrategy...");
      enemies[1].setStrategy(new ChaseStrategy());
    },
    () => {
      console.log("\n🔄 Cambiando Enemy 2 a GuardStrategy...");
      enemies[2].setStrategy(new GuardStrategy({ x: 100, y: 100 }, 25));
    },
    () => {
      console.log("\n🔄 Restaurando estrategias por defecto...");
      enemies[0].setStrategy(new PatrolStrategy());
      enemies[1].setStrategy(new GuardStrategy({ x: 150, y: 50 }, 30));
      enemies[2].setStrategy(new FleeStrategy());
    },
  ];

  const demo =
    demonstrations[Math.floor(Math.random() * demonstrations.length)];
  demo();
}

loop.start();

// ===== Helper de render mejorado =====
function debugLog(p: Player, es: Enemy[]) {
  const posP = `Player (${p.position.x.toFixed(1)}, ${p.position.y.toFixed(
    1
  )})`;
  const enemyStatus = es
    .map((e, i) => {
      const strategy = getStrategyName(e.getCurrentStrategy());
      return `E${i}[${strategy}] (${e.position.x.toFixed(
        1
      )}, ${e.position.y.toFixed(1)})`;
    })
    .join(" | ");

  console.log(`${posP} | ${enemyStatus}`);
}

function getStrategyName(strategy: any): string {
  const className = strategy.constructor.name;
  return className.replace("Strategy", "").toUpperCase();
}

/* 
=== ANÁLISIS DEL PATRÓN STRATEGY IMPLEMENTADO ===

🎯 OBJETIVOS CUMPLIDOS:
1. ✅ Separación de algoritmos de comportamiento
2. ✅ Intercambio dinámico de estrategias en runtime
3. ✅ Extensibilidad sin modificar código existente
4. ✅ Eliminación de condicionales complejas

🏗️ ESTRUCTURA:
- AIStrategy: Interfaz común para todas las estrategias
- EnemyLike: Interfaz para evitar dependencias circulares
- Estrategias concretas: IdleStrategy, PatrolStrategy, ChaseStrategy
- Estrategias extendidas: GuardStrategy, FleeStrategy, SearchStrategy

🔄 FLEXIBILIDAD DEMOSTRADA:
- Cambio dinámico de estrategias durante ejecución
- Múltiples enemigos con comportamientos diferentes
- Fácil adición de nuevas estrategias sin afectar código existente

📈 BENEFICIOS OBSERVADOS:
- Código más modular y mantenible
- Fácil testing de estrategias individuales
- Cumplimiento del principio Abierto-Cerrado
- Reducción significativa de complejidad ciclomática

🚀 POSIBLES MEJORAS:
- Context object para compartir estado entre estrategias
- Factory pattern para crear estrategias
- State machine para transiciones más complejas
- Observer pattern para notificaciones de cambio de estrategia
*/
