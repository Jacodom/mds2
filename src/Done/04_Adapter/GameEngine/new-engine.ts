// Supongamos que ESTO viene de un framework externo (NO modificar)
export type Asset = { id: string; url: string; kind: "image" | "sound" };

export class NewFancyEngine {
  private worldW = 0;
  private worldH = 0;
  private assets = new Map<string, Asset>();

  // API distinta
  startWorld(opts: { worldWidth: number; worldHeight: number }): void {
    this.worldW = opts.worldWidth;
    this.worldH = opts.worldHeight;
    console.log(`[NewFancyEngine] startWorld ${this.worldW}x${this.worldH}`);
  }

  addAsset(asset: Asset): void {
    this.assets.set(asset.id, asset);
    console.log(`[NewFancyEngine] addAsset ${asset.id} (${asset.url})`);
  }

  wipe(): void {
    console.log(`[NewFancyEngine] wipe (${this.worldW}x${this.worldH})`);
  }

  // Dibuja con una API distinta: recibe un objeto “render request”
  render(request: {
    spriteId: string;
    position: { x: number; y: number };
  }): void {
    const a = this.assets.get(request.spriteId);
    console.log(
      `[NewFancyEngine] render ${request.spriteId} (${
        a?.url ?? "UNKNOWN"
      }) at (${request.position.x},${request.position.y})`
    );
  }

  step(deltaMs: number = 16): void {
    console.log(`[NewFancyEngine] step dt=${deltaMs}ms`);
  }
}
