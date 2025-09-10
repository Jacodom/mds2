// state.ts
export interface State {
  handleInput(input: string): void;
}

// estados concretos
export class IdleState implements State {
  handleInput(input: string): void {
    if (input === "press_arrow") {
      console.log("El personaje empieza a correr 🚀");
    } else {
      console.log("El personaje sigue quieto 😴");
    }
  }
}

export class RunningState implements State {
  handleInput(input: string): void {
    if (input === "release_arrow") {
      console.log("El personaje se detiene 🛑");
    } else {
      console.log("El personaje sigue corriendo 🏃");
    }
  }
}

// contexto
export class Player {
  private state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  setState(state: State) {
    this.state = state;
  }

  handleInput(input: string) {
    this.state.handleInput(input);
  }
}
