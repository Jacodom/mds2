// Contrato que el GameLoop espera y que NO podemos cambiar
export interface Engine {
  init(width: number, height: number): void;
  loadSprite(id: string, path: string): void;
  clear(): void;
  drawSprite(id: string, x: number, y: number): void;
  update(): void;
}

// Implementación “vieja” compatible con el contrato
export class ClassicEngine implements Engine {
  private sprites = new Map<string, string>();
  private width = 0;
  private height = 0;

  init(width: number, height: number): void {
    this.width = width;
    this.height = height;
    console.log(`[OldEngine] init ${width}x${height}`);
  }

  loadSprite(id: string, path: string): void {
    this.sprites.set(id, path);
    console.log(`[OldEngine] loadSprite id=${id} path=${path}`);
  }

  clear(): void {
    console.log(`[OldEngine] clear (${this.width}x${this.height})`);
  }

  drawSprite(id: string, x: number, y: number): void {
    const path = this.sprites.get(id) ?? "UNKNOWN";
    console.log(`[OldEngine] drawSprite id=${id} (${path}) at (${x},${y})`);
  }

  update(): void {
    console.log(`[OldEngine] update tick`);
  }
}
