export interface Subscriptor {
  nombre: string;
  notificarSub(video: string): void;
}

export class SubscriptorWeb2 implements Subscriptor {
  constructor(public nombre: string) {}

  notificarSub(video: string) {
    console.log(`📧 ${this.nombre} fue notificado del nuevo video: ${video}`);
  }
}

export class SubscriptorMail2 implements Subscriptor {
  constructor(public nombre: string) {}

  notificarSub(video: string) {
    console.log(`📬 ${this.nombre} fue notificado del nuevo video: ${video}`);
  }
}
