import { FireIceWarrior, FireWarrior, IceWarrior, Warrior } from "./characters";

// Cliente usando clases concretas
const basic = new Warrior();
console.log(basic.attack());
// "Ataca con espada"

const fire = new FireWarrior();
console.log(fire.attack());
// "Ataca con espada + fuego 🔥"

const ice = new IceWarrior();
console.log(ice.attack());
// "Ataca con espada + hielo ❄️"

const fireIce = new FireIceWarrior();
console.log(fireIce.attack());
// "Ataca con espada + fuego 🔥 + hielo ❄️"
