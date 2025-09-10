import { Player, IdleState, RunningState } from "./state";

const player = new Player(new IdleState());
const player2 = new Player(new RunningState());

player.handleInput("press_arrow"); // El personaje empieza a correr 🚀
player.setState(new RunningState());
player.handleInput("release_arrow"); // El personaje se detiene 🛑

player2.handleInput("press_arrow"); // El personaje sigue corriendo
player2.handleInput("release_arrow"); // El personaje se detiene 🛑
