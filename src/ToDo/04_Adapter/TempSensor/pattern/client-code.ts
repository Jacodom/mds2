import { SensorCelsius } from "./sensor-celsius";

function mostrarTemperaturasMal(sensor: SensorCelsius) {
  const c = sensor.getCelsius();
  // El cliente hace conversiones: 😬
  const f = (c * 9) / 5 + 32;
  const k = c + 273.15;

  console.log("=== MAL (cliente hace cosas que no son su responsabilidad) ===");
  console.log(`Celsius: ${c}°C`);
  console.log(`Fahrenheit: ${f}°F`);
  console.log(`Kelvin: ${k}K`);
}

mostrarTemperaturasMal(new SensorCelsius("Principal"));
