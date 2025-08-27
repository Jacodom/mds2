export class AudioSystem {
  init() {
    console.log("🎵 Audio listo");
  }
  playBGM(track: string) {
    console.log(`▶️ BGM: ${track}`);
  }
  pauseAll() {
    console.log("⏸️ Audio pausado");
  }
  resumeAll() {
    console.log("🔊 Audio reanudado");
  }
  stopAll() {
    console.log("⏹️ Audio detenido");
  }
}
