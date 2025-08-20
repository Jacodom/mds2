import { SensorCelsius } from "./sensor-celsius";
import { FahrenheitAdapter } from "./sensor-fahrenheit-adapter";
import { KelvinAdapter } from "./sensor-kelvin-adapter";
import { ISensorFahrenheit, ISensorKelvin } from "./temperatures-adapters";

// Cliente solo conoce la(s) interfaz(es) Target
function mostrarTemperaturasBien(f: ISensorFahrenheit, k: ISensorKelvin) {
  console.log("=== BIEN (Adapter) ===");
  console.log(`Fahrenheit: ${f.readFahrenheit()}°F`);
  console.log(`Kelvin:     ${k.readKelvin()}K`);
}

const celsius = new SensorCelsius("Principal");
const fAdapter = new FahrenheitAdapter(celsius);
const kAdapter = new KelvinAdapter(celsius);
mostrarTemperaturasBien(fAdapter, kAdapter);
