import { GameLoop } from "./engine/gameloop";
import { World } from "./engine/world";
import { Player } from "./entities/player";
import { Enemy } from "./entities/enemy";

// ==== Escena básica con patrón Strategy ====
const world = new World(140, 100);
const player = new Player();
const enemies = [new Enemy({ x: 100, y: 50 })];

// Para la demo: el jugador se mueve en diagonal constante
player.setInputDirection({ x: 1, y: 0.5 });

console.log("=== Demo del Patrón Strategy en IA de Enemigos ===");
console.log("El enemigo cambiará automáticamente entre estrategias:");
console.log("- PATROL: Patrulla entre waypoints predefinidos");
console.log("- CHASE: Persigue al jugador cuando está cerca");
console.log("- IDLE: Permanece quieto por un tiempo");
console.log(
  "\nObserva cómo el comportamiento del enemigo cambia dinámicamente:"
);
console.log("=".repeat(60));

const loop = new GameLoop((dt) => {
  player.update(dt, world);
  enemies.forEach((e) => e.updateAI(dt, world, player));

  // Render / logging (placeholder)
  debugLog(player, enemies);
});

loop.start();

// ===== Helpers de "render" (consola) =====
function debugLog(p: Player, es: Enemy[]) {
  const posP = `P (${p.position.x.toFixed(1)}, ${p.position.y.toFixed(1)})`;
  const posE = es
    .map(
      (e, i) => `E${i} (${e.position.x.toFixed(1)}, ${e.position.y.toFixed(1)})`
    )
    .join("  ");

  console.log(`${posP} | ${posE}`);
}

/* 
=== BENEFICIOS DEL PATRÓN STRATEGY ===

1. **Separación de responsabilidades**: Cada estrategia encapsula un comportamiento específico
2. **Extensibilidad**: Fácil agregar nuevas estrategias sin modificar Enemy
3. **Flexibilidad**: Se puede cambiar estrategias en tiempo de ejecución
4. **Principio Abierto-Cerrado**: Abierto para extensión, cerrado para modificación
5. **Eliminación de switch statements**: No más largos switch/if-else para comportamientos

=== COMPARACIÓN CON LA VERSIÓN ANTERIOR ===

ANTES (current/):
- Todo el comportamiento estaba en Enemy con switch statements
- Difícil agregar nuevos comportamientos
- Violación del principio de responsabilidad única
- Código acoplado y difícil de mantener

DESPUÉS (pattern/):
- Cada comportamiento está en su propia clase Strategy
- Fácil agregar nuevas estrategias implementando AIStrategy
- Enemy solo se encarga de coordinar, no de los detalles de comportamiento
- Código modular y testeable

=== POSIBLES EXTENSIONES ===

Nuevas estrategias que se podrían agregar fácilmente:
- GuardStrategy: Protege un área específica
- FleeStrategy: Huye del jugador cuando tiene poca vida
- GroupStrategy: Coordina con otros enemigos
- SearchStrategy: Busca al jugador en su última posición conocida
*/
