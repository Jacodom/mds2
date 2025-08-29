// CON PATRÓN OBSERVER

import { Subscriptor, SubscriptorWeb2, SubscriptorMail2 } from "./subscriptor";

class CanalYouTubeDavo {
  private suscriptores: Subscriptor[] = [];

  constructor(public nombre: string) {}

  agregarSuscriptor(s: Subscriptor) {
    this.suscriptores.push(s);
  }

  subirVideo(titulo: string) {
    console.log(`📹 Canal ${this.nombre} subió: ${titulo}`);
    // El canal recorre y notifica directamente (acoplamiento fuerte)
    for (const s of this.suscriptores) {
      s.notificarSub(titulo);
    }
  }
}

// --- Uso
const canal = new CanalYouTubeDavo("Davo Xeneixe");
const juan = new SubscriptorWeb2("Juan");
const ana = new SubscriptorMail2("Ana");

canal.agregarSuscriptor(juan);
canal.agregarSuscriptor(ana);

canal.subirVideo("Observer en 7 minutos (sin patrón)");
