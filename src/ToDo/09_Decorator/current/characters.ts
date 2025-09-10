// Clase base
export class Warrior {
  attack(): string {
    return "Ataca con espada";
  }
}

// Extensiones rígidas con herencia
export class FireWarrior extends Warrior {
  attack(): string {
    return super.attack() + " + fuego 🔥";
  }
}

export class IceWarrior extends Warrior {
  attack(): string {
    return super.attack() + " + hielo ❄️";
  }
}

// ¿Y si quiero fuego + hielo?
export class FireIceWarrior extends Warrior {
  attack(): string {
    return super.attack() + " + fuego 🔥 + hielo ❄️";
  }
}
