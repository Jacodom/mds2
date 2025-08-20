import { randomUUID } from "crypto";
import { Logger } from "./logger";

// const testLogger = () => {
//   const logger = new Logger();

//   logger.log("Hola...");
//   logger.log("como estas?");

//   logger.printLogsHistory();
// };

// testLogger();

const main = () => {
  const greetingsLogger = new Logger();
  const randomLogger = new Logger();

  greetingsLogger.log("Hola! bienvenido al sistema");

  randomLogger.log(randomUUID());

  greetingsLogger.printLogsHistory();
  randomLogger.printLogsHistory();
};

main();
