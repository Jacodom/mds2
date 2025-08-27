import { AudioSystem } from "./audio-system";
import { GraphicsEngine } from "./graphic-system";
import { InputManager } from "./input-manager-system";
import { PhysicsEngine } from "./physics-system";
import { GameState } from "./types";

export class GameInitializerFacade {
  private audio = new AudioSystem();
  private physics = new PhysicsEngine();
  private graphics = new GraphicsEngine();
  private input = new InputManager();
  private saves = new SaveSystem();
  private state: GameState = GameState.Idle;
  private renderTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private options = { width: 1280, height: 720, bgm: "theme.mp3" }
  ) {}

  /** Inicializa todo y deja el juego corriendo */
  startGame() {
    if (this.state === GameState.Running) return;

    this.graphics.init(this.options.width, this.options.height);
    this.audio.init();
    this.audio.playBGM(this.options.bgm);
    this.physics.init();
    this.physics.start();
    this.input.enable();

    // loop de render básico (30 FPS simulado)
    this.renderTimer = setInterval(
      () => this.graphics.renderFrame(),
      1000 / 30
    );

    this.state = GameState.Running;
    console.log("🚀 Juego iniciado");
  }

  /** Pausa simulación/entrada/audio sin “apagar” el motor gráfico */
  pauseGame() {
    if (this.state !== GameState.Running) return;
    this.physics.stop();
    this.input.disable();
    this.audio.pauseAll();
    this.state = GameState.Paused;
    console.log("⏸️ Juego pausado");
  }

  /** Reanuda lo pausado */
  resumeGame() {
    if (this.state !== GameState.Paused) return;
    this.physics.start();
    this.input.enable();
    this.audio.resumeAll();
    this.state = GameState.Running;
    console.log("▶️ Juego reanudado");
  }

  /** Guarda un snapshot de estado de alto nivel */
  save(slot = "autosave") {
    const snapshot = {
      ts: Date.now(),
      state: this.state /* + datos de juego */,
    };
    this.saves.save(slot, snapshot);
  }

  /** Detiene todo y libera recursos */
  stopGame() {
    if (this.renderTimer) {
      clearInterval(this.renderTimer);
      this.renderTimer = null;
    }
    this.audio.stopAll();
    this.physics.stop();
    this.input.disable();
    this.graphics.shutdown();
    this.state = GameState.Stopped;
    console.log("🛑 Juego finalizado");
  }

  /** API mínima para el cliente (ej.: para UI/menús) */
  get isRunning() {
    return this.state === GameState.Running;
  }
  get isPaused() {
    return this.state === GameState.Paused;
  }
}
