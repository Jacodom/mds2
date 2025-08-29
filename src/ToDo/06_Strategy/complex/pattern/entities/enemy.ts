import {
  addVectors,
  normalizeVector,
  scaleVector,
  subtractVectors,
  vectorLength,
  type Point,
  clampPoint,
} from "../shared/types";
import type { World } from "../engine/world";
import type { Player } from "./player";
import type { AIStrategy, EnemyLike } from "../strategies/ai-strategy";

/**
 * Estrategia Idle: El enemigo permanece quieto
 */
export class IdleStrategy implements AIStrategy {
  private timeAccumulated: number = 0;
  private readonly idleDuration = 6; // segundos

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    // En idle, el enemigo no se mueve
    return enemy.position;
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    console.log("Enemy switched to IDLE mode");
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    this.timeAccumulated += dt;

    // Verificar si el jugador está cerca para cambiar a chase
    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, enemy.position)
    );

    if (distanceToPlayer < 40) {
      return new ChaseStrategy();
    }

    // Cambiar a patrol después del tiempo de idle
    if (this.timeAccumulated > this.idleDuration) {
      return new PatrolStrategy();
    }

    return null;
  }
}

/**
 * Estrategia Patrol: El enemigo patrulla entre waypoints
 */
export class PatrolStrategy implements AIStrategy {
  private timeAccumulated: number = 0;
  private readonly patrolDuration = 6; // segundos
  private readonly waypoints: Point[] = [
    { x: 20, y: 20 },
    { x: 120, y: 20 },
    { x: 120, y: 90 },
    { x: 20, y: 90 },
  ];
  private currentWaypointIndex = 0;

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    const target = this.waypoints[this.currentWaypointIndex];
    const toTarget = subtractVectors(target, enemy.position);
    const direction = normalizeVector(toTarget);
    const step = scaleVector(direction, enemy.speed * dt);
    const candidate = addVectors(enemy.position, step);

    // ¿Llegamos al waypoint?
    if (vectorLength(toTarget) < 1.5) {
      this.currentWaypointIndex =
        (this.currentWaypointIndex + 1) % this.waypoints.length;
    }

    return candidate;
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    this.currentWaypointIndex = this.findClosestWaypointIndex(enemy.position);
    console.log("Enemy switched to PATROL mode");
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    this.timeAccumulated += dt;

    // Verificar si el jugador está cerca para cambiar a chase
    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, enemy.position)
    );

    if (distanceToPlayer < 40) {
      return new ChaseStrategy();
    }

    // Cambiar a idle después del tiempo de patrullaje
    if (this.timeAccumulated > this.patrolDuration) {
      return new IdleStrategy();
    }

    return null;
  }

  private findClosestWaypointIndex(position: Point): number {
    let idx = 0;
    let best = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.waypoints.length; i++) {
      const d = vectorLength(subtractVectors(this.waypoints[i], position));
      if (d < best) {
        best = d;
        idx = i;
      }
    }
    return idx;
  }
}

/**
 * Estrategia Chase: El enemigo persigue al jugador
 */
export class ChaseStrategy implements AIStrategy {
  private timeAccumulated: number = 0;
  private readonly chaseTimeout = 3; // segundos sin contacto visual

  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point {
    const toPlayer = subtractVectors(player.position, enemy.position);
    const direction = normalizeVector(toPlayer);
    // Un poco más rápido en "chase"
    return addVectors(
      enemy.position,
      scaleVector(direction, enemy.speed * 1.25 * dt)
    );
  }

  onActivate(enemy: EnemyLike): void {
    this.timeAccumulated = 0;
    console.log("Enemy switched to CHASE mode");
  }

  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null {
    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, enemy.position)
    );
    const isNear = distanceToPlayer < 40;

    if (!isNear) {
      this.timeAccumulated += dt;
      // Si está lejos por un rato, vuelve a patrullar
      if (this.timeAccumulated > this.chaseTimeout) {
        return new PatrolStrategy();
      }
    } else {
      // Resetear el timer si vuelve a estar cerca
      this.timeAccumulated = 0;
    }

    return null;
  }
}

/**
 * Clase Enemy refactorizada usando el patrón Strategy
 * Implementa EnemyLike para cumplir con la interfaz de las estrategias
 */
export class Enemy implements EnemyLike {
  position: Point = { x: 80, y: 60 };
  speed: number = 30;

  // Strategy Pattern: delegamos el comportamiento a una estrategia
  private aiStrategy: AIStrategy;

  constructor(initialPos?: Point) {
    if (initialPos) {
      this.position = { ...initialPos };
    }

    // Inicializar con la estrategia de patrullaje
    this.aiStrategy = new PatrolStrategy();
    this.aiStrategy.onActivate(this);
  }

  /**
   * Actualiza la IA del enemigo usando la estrategia actual
   */
  updateAI(dt: number, world: World, player: Player) {
    // 1) Verificar si hay transición de estrategia
    const newStrategy = this.aiStrategy.shouldTransition(
      this,
      dt,
      world,
      player
    );
    if (newStrategy) {
      this.setStrategy(newStrategy);
    }

    // 2) Calcular siguiente posición usando la estrategia actual
    const nextPos = this.aiStrategy.computeNextPosition(
      this,
      dt,
      world,
      player
    );

    // 3) Aplicar límites del mundo
    this.position = clampPoint(nextPos, world.min, world.max);
  }

  /**
   * Cambia la estrategia de IA del enemigo
   */
  setStrategy(strategy: AIStrategy): void {
    this.aiStrategy = strategy;
    this.aiStrategy.onActivate(this);
  }

  /**
   * Obtiene la estrategia actual (útil para debugging)
   */
  getCurrentStrategy(): AIStrategy {
    return this.aiStrategy;
  }
}
