class SaveSystem {
  save(slot: string, data: unknown) {
    console.log(`💾 Guardado en slot ${slot}`);
  }
  load(slot: string): unknown {
    console.log(`📂 Cargado slot ${slot}`);
    return {};
  }
}
