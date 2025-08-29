// SIN PATRÓN OBSERVER

class Suscriptor {
  constructor(public nombre: string) {}

  notificar(video: string) {
    console.log(`${this.nombre} fue notificado del nuevo video: ${video}`);
  }
}

class CanalYouTube {
  private suscriptores: Suscriptor[] = [];

  constructor(public nombre: string) {}

  agregarSuscriptor(s: Suscriptor) {
    this.suscriptores.push(s);
  }

  subirVideo(titulo: string) {
    console.log(`📹 Canal ${this.nombre} subió: ${titulo}`);
    // El canal recorre y notifica directamente (acoplamiento fuerte)
    for (const s of this.suscriptores) {
      s.notificar(titulo);
    }
  }
}

// --- Uso
const canal = new CanalYouTube("Codeando TS");
const juan = new Suscriptor("Juan");
const ana = new Suscriptor("Ana");

canal.agregarSuscriptor(juan);
canal.agregarSuscriptor(ana);

canal.subirVideo("Observer en 7 minutos (sin patrón)");
