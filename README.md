# TypeScript Programming Class Project

Proyecto educativo de TypeScript diseñado para enseñar conceptos de programación orientada a objetos y patrones de diseño.

## 🚀 Características

- **Compilación automática de TypeScript** con modo watch
- **Recarga en vivo** durante el desarrollo
- **Ejemplos educativos** que cubren varios patrones de diseño
- **Estructura de proyecto clara** optimizada para el aprendizaje
- **Múltiples archivos de ejemplo** organizados por concepto

## 📁 Estructura del Proyecto

```
mds_2/
├── src/                           # Archivos fuente TypeScript
│   ├── Done/                      # Ejemplos completados (referencia)
│   │   ├── 01_POO/               # Programación Orientada a Objetos
│   │   ├── 02_Singleton/         # Patrón Singleton
│   │   ├── 03_Factory/           # Patrón Factory
│   │   └── 04_Adapter/           # Patrón Adapter
│   └── ToDo/                      # Ejercicios para completar
│       ├── 01_POO/               # Ejercicios de POO
│       ├── 02_Singleton/         # Ejercicios de Singleton
│       ├── 03_Factory/           # Ejercicios de Factory
│       └── 04_Adapter/           # Ejercicios de Adapter
├── dist/                          # Archivos JavaScript compilados
├── tsconfig.json                  # Configuración de TypeScript
├── package.json                   # Configuración del proyecto
└── README.md                     # Este archivo
```

## 🛠️ Configuración Inicial (Para Estudiantes)

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd mds_2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Verificar la instalación

```bash
# Compilar el proyecto
npm run build

# Ejecutar un ejemplo
npm run run:poo
```

## 🎯 Comandos Disponibles

### Ejecutar Ejemplos Individuales

```bash
# Ejecutar el ejemplo de POO (una vez)
npm run run:poo

# Ejecutar con auto-recarga (recomendado para desarrollo)
npm run watch:poo
```

### Ejecutar Cualquier Archivo

```bash
# Ejecutar un archivo específico (una vez)
npx ts-node src/ruta/al/archivo.ts

# Ejecutar con auto-recarga
npx nodemon --exec ts-node src/ruta/al/archivo.ts
```

### Ejemplos de Rutas de Archivos

```bash
# Ejemplos completados (para referencia)
npx ts-node src/Done/01_POO/review.ts
npx ts-node src/Done/02_Singleton/pattern/app.ts
npx ts-node src/Done/03_Factory/pattern/app.ts
npx ts-node src/Done/04_Adapter/Reports/pattern/client-code.ts

# Ejercicios para completar
npx ts-node src/ToDo/01_POO/review.ts
npx ts-node src/ToDo/02_Singleton/pattern/app.ts
npx ts-node src/ToDo/03_Factory/pattern/app.ts
```

### Compilación Manual

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar JavaScript compilado
npm run start

# Compilar automáticamente en modo watch
npm run watch

# Limpiar archivos compilados
npm run clean
```

## 🎓 Guía de Trabajo para Estudiantes

### 1. **Clonar y configurar (solo una vez):**

```bash
git clone <URL-del-repositorio>
cd mds_2
npm install
```

### 2. **Explorar ejemplos completados (para aprender):**

Los ejemplos en `src/Done/` están completos y funcionando. Úsalos como referencia:

```bash
# Ver ejemplo de POO
npx ts-node src/Done/01_POO/review.ts

# Ver ejemplo de Singleton
npx ts-node src/Done/02_Singleton/pattern/app.ts

# Ver ejemplo de Factory
npx ts-node src/Done/03_Factory/pattern/app.ts
```

### 3. **Trabajar en los ejercicios (carpeta ToDo):**

```bash
# Trabajar en POO con auto-recarga
npx nodemon --exec ts-node src/ToDo/01_POO/review.ts

# Trabajar en otros ejercicios
npx nodemon --exec ts-node src/ToDo/02_Singleton/pattern/app.ts
npx nodemon --exec ts-node src/ToDo/03_Factory/pattern/app.ts
```

### 4. **Comparar tu trabajo con la solución:**

- Edita archivos en `src/ToDo/`
- Compara con los ejemplos en `src/Done/`
- Ejecuta ambas versiones para ver las diferencias

## 🎮 Tareas de VS Code (Opcional)

Si usas VS Code, puedes usar las tareas predefinidas (Presiona Ctrl+Shift+P y escribe "Tasks: Run Task"):

- "Watch: POO Review" - Ejecuta con auto-recarga el ejemplo de POO
- "Run: POO Review" - Ejecuta una vez el ejemplo de POO
- "Watch: Custom File" - Ejecuta cualquier archivo (te pide la ruta)
- "TypeScript: Watch and Run" - Modo watch general

## 📚 Contenido de los Ejemplos

### 01_POO (Programación Orientada a Objetos)

- Conceptos básicos de clases e interfaces
- Encapsulación, herencia y polimorfismo
- Modificadores de acceso (public, private, protected)

### 02_Singleton (Patrón Singleton)

- Implementación del patrón Singleton
- Control de instancias únicas
- Uso en sistemas de logging

### 03_Factory (Patrón Factory)

- Creación de objetos mediante factories
- Abstracción de la creación de instancias
- Ejemplo con diferentes tipos de reportes

### 04_Adapter (Patrón Adapter)

- Adaptación entre interfaces incompatibles
- Ejemplos con motores de juegos y sensores de temperatura
- Integración de código legacy

## 🔧 Flujo de Trabajo para Estudiantes

### Método Recomendado:

1. **Clonar el repositorio** (solo una vez)
2. **Instalar dependencias** con `npm install`
3. **Explorar ejemplos** en `src/Done/` para entender los conceptos
4. **Trabajar en ejercicios** en `src/ToDo/` con auto-recarga
5. **Comparar** tu solución con la referencia
6. **Iterar y aprender**

### Para Instructores:

1. Los estudiantes pueden ver ejemplos funcionando inmediatamente
2. Fácil demostración de diferencias entre implementaciones
3. Auto-recarga permite ver errores de compilación al instante
4. Estructura clara facilita la navegación entre conceptos

## 💡 Consejos de Estudio

- **Empezar por la teoría**: Lee el código en `src/Done/` antes de programar
- **Programación iterativa**: Usa auto-recarga para ver cambios inmediatamente
- **Aprendizaje por comparación**: Ejecuta tanto tu código como la referencia
- **Experimentación**: Modifica los ejemplos para entender mejor los conceptos

## 🐛 Solución de Problemas

### Problemas Comunes:

1. **Errores de TypeScript**: Revisa la salida del terminal para mensajes de error detallados
2. **Archivos no actualizando**: Asegúrate de guardar los archivos y estar en el directorio correcto
3. **Dependencias faltantes**: Ejecuta `npm install` en el directorio raíz

### Comandos Útiles:

```bash
# Verificar versión de TypeScript
npx tsc --version

# Verificar tipos sin compilar
npx tsc --noEmit

# Limpiar y recompilar
npm run clean && npm run build

# Ver estructura del proyecto
tree src/ # (en macOS/Linux) o dir src /s (en Windows)
```

## 📖 Recursos de Aprendizaje

- [Manual de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Documentación de Node.js](https://nodejs.org/en/docs/)
- [Patrones de Diseño](https://refactoring.guru/design-patterns)

## 🔄 Referencia Rápida de Comandos

| Comando                                          | Descripción                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| `npm install`                                    | 🚀 **Primer paso** - Instalar dependencias              |
| `npm run run:poo`                                | Ejecutar ejemplo de POO una vez                         |
| `npm run watch:poo`                              | 🎯 **Recomendado** - Auto-recarga ejemplo POO           |
| `npx ts-node src/ruta/archivo.ts`                | Ejecutar cualquier archivo una vez                      |
| `npx nodemon --exec ts-node src/ruta/archivo.ts` | 🔄 **Para desarrollo** - Auto-recarga cualquier archivo |
| `npm run build`                                  | Compilar TypeScript                                     |
| `npm run clean`                                  | Limpiar archivos compilados                             |

## 📂 Estructura de Carpetas para Estudiantes

```
src/
├── Done/           # 📖 Ejemplos completos (SOLO LEER)
│   ├── 01_POO/     # Referencia de POO
│   ├── 02_Singleton/
│   ├── 03_Factory/
│   └── 04_Adapter/
└── ToDo/           # ✏️ Ejercicios para completar (EDITAR AQUÍ)
    ├── 01_POO/     # Tu trabajo de POO
    ├── 02_Singleton/
    ├── 03_Factory/
    └── 04_Adapter/
```

---

**¡Feliz programación! 🎉**

**💡 Tip:** Siempre ejecuta `npm install` después de clonar el repositorio.
