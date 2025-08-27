export class GraphicsEngine {
  init(width: number, height: number) {
    console.log(`🖼️ Gráficos ${width}x${height} inicializados`);
  }
  renderFrame() {
    /* dibuja un frame */
  }
  shutdown() {
    console.log("🧹 Gráficos apagados");
  }
}
