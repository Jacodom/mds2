import { SensorCelsius } from "./sensor-celsius";
import { ISensorKelvin } from "./temperatures-adapters";

export class KelvinAdapter implements ISensorKelvin {
  private celsiusSensor: SensorCelsius;

  constructor(celsiusSensor: SensorCelsius) {
    this.celsiusSensor = celsiusSensor;
  }

  readKelvin(): number {
    const tempInCelsius = this.celsiusSensor.getCelsius();

    return tempInCelsius + 273.15;
  }
}
