import type { Point } from "../shared/types";
import type { World } from "../engine/world";
import type { Player } from "../entities/player";

/**
 * Interfaz mínima para el enemigo (para evitar referencia circular)
 */
export type EnemyLike = {
  position: Point;
  speed: number;
};

/**
 * Strategy Pattern: Interfaz para las estrategias de comportamiento del enemigo
 */
export interface AIStrategy {
  /**
   * Calcula la siguiente posición del enemigo basada en su comportamiento
   * @param enemy - El enemigo que ejecuta esta estrategia
   * @param dt - Delta time
   * @param world - El mundo del juego
   * @param player - El jugador
   * @returns La nueva posición calculada
   */
  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point;

  /**
   * Método llamado cuando se activa esta estrategia
   * Permite inicializar estado específico de la estrategia
   * @param enemy - El enemigo que va a usar esta estrategia
   */
  onActivate(enemy: EnemyLike): void;

  /**
   * Verifica si se debe cambiar de estrategia
   * @param enemy - El enemigo actual
   * @param dt - Delta time
   * @param world - El mundo del juego
   * @param player - El jugador
   * @returns La nueva estrategia a usar, o null si se mantiene la actual
   */
  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null;
}
