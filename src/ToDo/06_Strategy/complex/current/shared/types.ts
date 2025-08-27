// Punto / vector 2D
export type Point = { x: number; y: number };

// ---- Operaciones vectoriales ----

// Suma vectorial: a + b
export function addVectors(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

// Resta vectorial: a - b (vector desde b hacia a)
export function subtractVectors(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}

// Escala un vector por un escalar (factor)
export function scaleVector(v: Point, factor: number): Point {
  return { x: v.x * factor, y: v.y * factor };
}

// Módulo / longitud de un vector
export function vectorLength(v: Point): number {
  return Math.hypot(v.x, v.y);
}

// Devuelve un vector unitario con la misma dirección
export function normalizeVector(v: Point): Point {
  const len = vectorLength(v);
  return len === 0 ? { x: 0, y: 0 } : scaleVector(v, 1 / len);
}

// Restringe un punto al rectángulo [min, max]
export function clampPoint(p: Point, min: Point, max: Point): Point {
  return {
    x: Math.max(min.x, Math.min(max.x, p.x)),
    y: Math.max(min.y, Math.min(max.y, p.y)),
  };
}
