// Interfaz común
export interface Character {
  attack(): string;
}

// Implementación concreta
export class BasicWarrior implements Character {
  attack(): string {
    return "Ataca con espada";
  }
}

// Decorador base
abstract class CharacterDecorator implements Character {
  protected character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  attack(): string {
    return this.character.attack();
  }
}

// Decoradores concretos
export class FireDecorator extends CharacterDecorator {
  attack(): string {
    return super.attack() + " + fuego 🔥";
  }
}

export class IceDecorator extends CharacterDecorator {
  attack(): string {
    return super.attack() + " + hielo ❄️";
  }
}
