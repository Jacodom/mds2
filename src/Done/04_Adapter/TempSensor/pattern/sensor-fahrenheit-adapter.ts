import { SensorCelsius } from "./sensor-celsius";
import { ISensorFahrenheit } from "./temperatures-adapters";

export class FahrenheitAdapter implements ISensorFahrenheit {
  private celsiusSensor: SensorCelsius;

  constructor(celsiusSensor: SensorCelsius) {
    this.celsiusSensor = celsiusSensor;
  }

  readFahrenheit(): number {
    const tempInCelsius = this.celsiusSensor.getCelsius();
    return (tempInCelsius * 9) / 5 + 32;
  }
}
