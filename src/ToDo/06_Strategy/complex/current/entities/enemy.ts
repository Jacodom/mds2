import {
  addVectors,
  clampPoint,
  normalizeVector,
  subtractVectors,
  vectorLength,
  scaleVector,
  type Point,
} from "../shared/types";
import { World } from "../engine/world";
import { Player } from "./player";

// ⚠️ SIN STRATEGY: toda la IA dentro de Enemy con un switch
type BehaviorMode = "idle" | "patrol" | "chase";

export class Enemy {
  position: Point = { x: 80, y: 60 };
  speed: number = 30;

  // Estado de la IA
  private behaviorMode: BehaviorMode = "patrol";
  private timeAccum: number = 0;

  // Datos específicos por modo (acoplamiento intencional para el “antes”)
  private patrolWaypoints: Point[] = [
    { x: 20, y: 20 },
    { x: 120, y: 20 },
    { x: 120, y: 90 },
    { x: 20, y: 90 },
  ];
  private currentWaypointIndex = 0;

  constructor(initialPos?: Point) {
    if (initialPos) this.position = { ...initialPos };
  }

  // API clara: “actualizar IA”
  updateAI(dt: number, world: World, player: Player) {
    // 1) Reglas de transición de modo (timer / proximidad)
    this.timeAccum += dt;
    this.maybeToggleIdlePatrolByTimer();
    this.maybeSwitchChaseByDistanceToPlayer(player);

    // 2) Decidir siguiente posición según modo
    let nextPos = this.position;
    switch (this.behaviorMode) {
      case "idle":
        nextPos = this.computeNextPositionIdle();
        break;
      case "patrol":
        nextPos = this.computeNextPositionPatrol(dt);
        break;
      case "chase":
        nextPos = this.computeNextPositionChasingPlayer(dt, player);
        break;
    }

    // 3) Aplicar límites del mundo
    this.position = clampPoint(nextPos, world.min, world.max);
  }

  // ===== Reglas de cambio de modo =====
  private maybeToggleIdlePatrolByTimer() {
    // Alterna entre idle y patrol cada ~6s (a modo de ejemplo)
    if (this.timeAccum > 6) {
      this.timeAccum = 0;
      if (this.behaviorMode === "idle") {
        this.setBehaviorMode("patrol");
      } else if (this.behaviorMode === "patrol") {
        this.setBehaviorMode("idle");
      }
    }
  }

  private maybeSwitchChaseByDistanceToPlayer(player: Player) {
    const distanceToPlayer = vectorLength(
      subtractVectors(player.position, this.position)
    );
    const isNear = distanceToPlayer < 40;

    if (isNear && this.behaviorMode !== "chase") {
      this.setBehaviorMode("chase");
    }

    // Si está lejos por un rato, vuelve a patrullar
    if (!isNear && this.behaviorMode === "chase" && this.timeAccum > 3) {
      this.timeAccum = 0;
      this.setBehaviorMode("patrol");
    }
  }

  private setBehaviorMode(mode: BehaviorMode) {
    this.behaviorMode = mode;

    // Resets por modo (muestra el acoplamiento actual)
    if (mode === "patrol") {
      this.currentWaypointIndex = this.findClosestWaypointIndex();
    }
  }

  // ===== Cálculo de movimiento por modo =====
  private computeNextPositionIdle(): Point {
    // Quieto (aquí podría haber otra lógica: mirar al jugador, etc.)
    return this.position;
  }

  private computeNextPositionPatrol(dt: number): Point {
    const target = this.patrolWaypoints[this.currentWaypointIndex];
    const toTarget = subtractVectors(target, this.position);
    const direction = normalizeVector(toTarget);
    const step = scaleVector(direction, this.speed * dt);
    const candidate = addVectors(this.position, step);

    // ¿Llegamos al waypoint?
    if (vectorLength(toTarget) < 1.5) {
      this.currentWaypointIndex =
        (this.currentWaypointIndex + 1) % this.patrolWaypoints.length;
    }

    return candidate;
  }

  private computeNextPositionChasingPlayer(dt: number, player: Player): Point {
    const toPlayer = subtractVectors(player.position, this.position);
    const direction = normalizeVector(toPlayer);
    // Un poco más rápido en “chase”
    return addVectors(
      this.position,
      scaleVector(direction, this.speed * 1.25 * dt)
    );
  }

  private findClosestWaypointIndex(): number {
    let idx = 0;
    let best = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.patrolWaypoints.length; i++) {
      const d = vectorLength(
        subtractVectors(this.patrolWaypoints[i], this.position)
      );
      if (d < best) {
        best = d;
        idx = i;
      }
    }
    return idx;
  }
}
