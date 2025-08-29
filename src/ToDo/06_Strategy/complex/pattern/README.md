# Patrón Strategy - Implementación de IA para Enemigos

## 🎯 Objetivo

Refactorizar un sistema de IA de enemigos que utilizaba un switch statement monolítico para aplicar el **patrón Strategy**, mejorando la mantenibilidad, extensibilidad y cumpliendo el principio abierto-cerrado.

## 📁 Estructura del Proyecto

### Carpeta `current/` - Versión No Eficiente

La implementación original presenta los siguientes problemas:

- **Violación del Principio de Responsabilidad Única**: La clase `Enemy` maneja tanto el movimiento como todos los algoritmos de IA
- **Switch Statement Monolítico**: Toda la lógica de comportamiento está concentrada en un switch gigante
- **Difícil Extensibilidad**: Agregar nuevos comportamientos requiere modificar la clase `Enemy`
- **Alto Acoplamiento**: Los datos específicos de cada comportamiento están mezclados en la clase principal

### Carpeta `pattern/` - Implementación con Strategy Pattern

#### 🏗️ Arquitectura

```
pattern/
├── strategies/
│   ├── ai-strategy.ts          # Interfaz Strategy
│   └── extended-strategies.ts  # Estrategias adicionales
├── entities/
│   ├── enemy.ts               # Context + Estrategias básicas
│   └── player.ts              # Entidad jugador
├── engine/
│   ├── gameloop.ts            # Loop del juego
│   └── world.ts               # Mundo del juego
├── shared/
│   └── types.ts               # Tipos y utilidades
├── main.ts                    # Demo básica
└── demo-complete.ts           # Demo completa con todas las estrategias
```

#### 🔧 Componentes del Patrón

**1. Strategy Interface (`AIStrategy`)**

```typescript
interface AIStrategy {
  computeNextPosition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): Point;
  onActivate(enemy: EnemyLike): void;
  shouldTransition(
    enemy: EnemyLike,
    dt: number,
    world: World,
    player: Player
  ): AIStrategy | null;
}
```

**2. Context (`Enemy`)**

- Mantiene una referencia a la estrategia actual
- Delega el cálculo de comportamiento a la estrategia
- Maneja las transiciones entre estrategias

**3. Concrete Strategies**

- `IdleStrategy`: El enemigo permanece quieto
- `PatrolStrategy`: Patrulla entre waypoints predefinidos
- `ChaseStrategy`: Persigue al jugador cuando está cerca
- `GuardStrategy`: Protege un área específica (extensión)
- `FleeStrategy`: Huye del jugador (extensión)
- `SearchStrategy`: Busca al jugador en su última posición conocida (extensión)

## 🚀 Características Principales

### ✅ Beneficios Logrados

1. **Separación de Responsabilidades**

   - Cada estrategia encapsula un comportamiento específico
   - La clase `Enemy` solo coordina, no implementa comportamientos

2. **Extensibilidad Sin Modificación**

   - Nuevas estrategias se agregan sin tocar código existente
   - Cumple el principio abierto-cerrado

3. **Flexibilidad en Runtime**

   - Cambio dinámico de estrategias durante la ejecución
   - Transiciones automáticas basadas en condiciones

4. **Código Más Limpio**

   - Eliminación de switch statements largos
   - Reducción significativa de complejidad ciclomática

5. **Facilidad de Testing**
   - Cada estrategia se puede testear independientemente
   - Mocking más sencillo para pruebas unitarias

### 🔄 Sistema de Transiciones

Las estrategias pueden cambiar automáticamente basándose en:

- **Proximidad del jugador**: Cambio a `ChaseStrategy` cuando está cerca
- **Tiempo**: Alternancia entre `IdleStrategy` y `PatrolStrategy`
- **Distancia**: Retorno a `PatrolStrategy` cuando el jugador se aleja
- **Condiciones específicas**: Cada estrategia define sus propias reglas de transición

## 📊 Comparación: Antes vs Después

| Aspecto                          | Versión Original (current/) | Versión Strategy (pattern/) |
| -------------------------------- | --------------------------- | --------------------------- |
| **Líneas de código en Enemy**    | ~150 líneas                 | ~50 líneas                  |
| **Complejidad ciclomática**      | Alta (múltiples switch)     | Baja (delegación)           |
| **Agregar nuevo comportamiento** | Modificar Enemy + switch    | Nueva clase Strategy        |
| **Testing**                      | Difícil (acoplamiento)      | Fácil (aislamiento)         |
| **Mantenibilidad**               | Baja                        | Alta                        |
| **Principio Abierto-Cerrado**    | ❌ Violado                  | ✅ Cumplido                 |

## 🎮 Cómo Ejecutar

```bash
# Demo básica con 3 estrategias principales
npx ts-node src/ToDo/06_Strategy/complex/pattern/main.ts

# Demo completa con todas las estrategias + transiciones dinámicas
npx ts-node src/ToDo/06_Strategy/complex/pattern/demo-complete.ts
```

## 🧪 Casos de Uso Demostrados

### Demo Básica (`main.ts`)

- Un enemigo que alterna entre `PatrolStrategy`, `IdleStrategy` y `ChaseStrategy`
- Transiciones automáticas basadas en proximidad del jugador y tiempo

### Demo Completa (`demo-complete.ts`)

- Múltiples enemigos con diferentes estrategias iniciales
- Cambios dinámicos programados para mostrar flexibilidad
- Visualización del nombre de la estrategia actual

## 🔮 Extensiones Futuras

La arquitectura permite agregar fácilmente:

1. **Nuevas Estrategias**

   - `GroupStrategy`: Coordinación entre múltiples enemigos
   - `AmbushStrategy`: Emboscadas en puntos específicos
   - `LeaderStrategy`: Comportamiento de líder de grupo

2. **Context Objects**

   - Compartir estado entre estrategias
   - Memoria de eventos pasados

3. **Factory Pattern**

   - Creación dinámica de estrategias basada en configuración
   - Parámetros de dificultad

4. **Observer Pattern**
   - Notificaciones de cambio de estrategia
   - Sistema de eventos para coordinación

## 📝 Lecciones Aprendidas

1. **El patrón Strategy es ideal cuando**:

   - Tienes múltiples algoritmos para la misma tarea
   - Los algoritmos cambian frecuentemente
   - Quieres evitar condicionales complejas

2. **Consideraciones de diseño**:

   - Usar interfaces mínimas para evitar dependencias circulares
   - Permitir que las estrategias manejen sus propias transiciones
   - Mantener el contexto lo más simple posible

3. **Trade-offs**:
   - ✅ Flexibilidad y mantenibilidad
   - ⚠️ Ligero incremento en número de clases
   - ⚠️ Complejidad conceptual inicial mayor

Este ejemplo demuestra cómo el patrón Strategy puede transformar código rígido y difícil de mantener en una arquitectura flexible y extensible, perfecta para sistemas de IA en videojuegos donde los comportamientos evolucionan constantemente.
