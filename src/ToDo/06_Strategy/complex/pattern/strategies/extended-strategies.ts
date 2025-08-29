import {
  addVectors,
  scaleVector,
  subtractVectors,
  vectorLength,
  normalizeVector,
  type Point,
} from "../shared/types";
import type { World } from "../engine/world";
import type { Player } from "../entities/player";
import type { AIStrategy, EnemyLike } from "./ai-strategy";

/**
 * Estrategia adicional: Guard - El enemigo protege un área específica
 * Esta estrategia demuestra la extensibilidad del patrón Strategy
 */
export class GuardStrategy implements AIStrategy {
  private guardPosition: Point;
  private guardRadius: number;
  private timeAccumulated: number = 0;
  private readonly alertDuration = 8; // segundos en estado de alerta

  constructor(guardPosition: Point, guardRadius: number = 25) {
    this.guardPosition = guardPosition;
    this.guardRadius = guardRadius;
  }

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    const distanceFromGuardPost = vectorLength(
      subtractVectors(this.guardPosition, enemy.position)
    );

    // Si está fuera del radio de guardia, volver al puesto
    if (distanceFromGuardPost > this.guardRadius) {
      const toGuardPost = subtractVectors(this.guardPosition, enemy.position);
      const direction = normalizeVector(toGuardPost);
      const step = scaleVector(direction, enemy.speed * dt);
      return addVectors(enemy.position, step);
    }

    // Si está dentro del radio, patrullar en círculo alrededor del puesto
    const angle = (Date.now() / 1000) * 0.5; // Rotación lenta
    const patrolOffset = {
      x: Math.cos(angle) * (this.guardRadius * 0.8),
      y: Math.sin(angle) * (this.guardRadius * 0.8),
    };
    const patrolTarget = addVectors(this.guardPosition, patrolOffset);

    const toTarget = subtractVectors(patrolTarget, enemy.position);
    const direction = normalizeVector(toTarget);
    const step = scaleVector(direction, enemy.speed * 0.5 * dt); // Más lento en patrulla

    return addVectors(enemy.position, step);
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    console.log(
      `Enemy switched to GUARD mode - protecting area around (${this.guardPosition.x}, ${this.guardPosition.y})`
    );
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    this.timeAccumulated += dt;

    // Verificar si el jugador está invadiendo el área protegida
    const distancePlayerToGuardPost = vectorLength(
      subtractVectors(player.position, this.guardPosition)
    );

    if (distancePlayerToGuardPost < this.guardRadius) {
      // Importar dinámicamente para evitar dependencias circulares
      const { ChaseStrategy } = require("../entities/enemy");
      return new ChaseStrategy();
    }

    // Después de un tiempo, cambiar a otra estrategia
    if (this.timeAccumulated > this.alertDuration) {
      const { PatrolStrategy } = require("../entities/enemy");
      return new PatrolStrategy();
    }

    return null;
  }
}

/**
 * Estrategia adicional: Flee - El enemigo huye del jugador cuando está débil
 */
export class FleeStrategy implements AIStrategy {
  private timeAccumulated: number = 0;
  private readonly fleeDuration = 5; // segundos huyendo

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    // Huir en dirección opuesta al jugador
    const toPlayer = subtractVectors(player.position, enemy.position);
    const fleeDirection = scaleVector(normalizeVector(toPlayer), -1); // Dirección opuesta

    // Velocidad aumentada por el pánico
    const step = scaleVector(fleeDirection, enemy.speed * 1.5 * dt);
    return addVectors(enemy.position, step);
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    console.log("Enemy switched to FLEE mode - running away from player!");
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    this.timeAccumulated += dt;

    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, enemy.position)
    );

    // Si está suficientemente lejos, cambiar a patrol
    if (distanceToPlayer > 60 || this.timeAccumulated > this.fleeDuration) {
      const { PatrolStrategy } = require("../entities/enemy");
      return new PatrolStrategy();
    }

    return null;
  }
}

/**
 * Estrategia adicional: Search - El enemigo busca al jugador en su última posición conocida
 */
export class SearchStrategy implements AIStrategy {
  private lastKnownPlayerPosition: Point;
  private timeAccumulated: number = 0;
  private readonly searchDuration = 10; // segundos buscando
  private searchRadius: number = 30;

  constructor(lastKnownPosition: Point) {
    this.lastKnownPlayerPosition = lastKnownPosition;
  }

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    // Moverse hacia la última posición conocida del jugador
    const toLastPosition = subtractVectors(
      this.lastKnownPlayerPosition,
      enemy.position
    );
    const distanceToTarget = vectorLength(toLastPosition);

    if (distanceToTarget > 2) {
      const direction = normalizeVector(toLastPosition);
      const step = scaleVector(direction, enemy.speed * 0.8 * dt);
      return addVectors(enemy.position, step);
    } else {
      // Si llegó al punto, hacer un patrón de búsqueda circular
      const angle = (this.timeAccumulated * 2) % (Math.PI * 2);
      const searchOffset = {
        x: Math.cos(angle) * this.searchRadius,
        y: Math.sin(angle) * this.searchRadius,
      };
      const searchTarget = addVectors(
        this.lastKnownPlayerPosition,
        searchOffset
      );

      const toTarget = subtractVectors(searchTarget, enemy.position);
      const direction = normalizeVector(toTarget);
      const step = scaleVector(direction, enemy.speed * 0.6 * dt);

      return addVectors(enemy.position, step);
    }
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    console.log(
      `Enemy switched to SEARCH mode - looking for player around (${this.lastKnownPlayerPosition.x.toFixed(
        1
      )}, ${this.lastKnownPlayerPosition.y.toFixed(1)})`
    );
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    this.timeAccumulated += dt;

    // Si encuentra al jugador, cambiar a chase
    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, enemy.position)
    );

    if (distanceToPlayer < 35) {
      const { ChaseStrategy } = require("../entities/enemy");
      return new ChaseStrategy();
    }

    // Si pasa mucho tiempo sin encontrarlo, volver a patrol
    if (this.timeAccumulated > this.searchDuration) {
      const { PatrolStrategy } = require("../entities/enemy");
      return new PatrolStrategy();
    }

    return null;
  }
}
