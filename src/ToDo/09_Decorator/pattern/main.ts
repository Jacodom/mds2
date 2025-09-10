import {
  BasicWarrior,
  Character,
  FireDecorator,
  IceDecorator,
} from "./characters";

// Uso dinámico
let warrior: Character = new BasicWarrior();
console.log(warrior.attack());
// "Ataca con espada"

warrior = new FireDecorator(warrior);
console.log(warrior.attack());
// "Ataca con espada + fuego 🔥"

warrior = new IceDecorator(warrior);
console.log(warrior.attack());
// "Ataca con espada + fuego 🔥 + hielo ❄️"
