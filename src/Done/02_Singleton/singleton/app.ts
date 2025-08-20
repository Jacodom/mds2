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
  const greetingsLogger = Logger.getInstance();
  const randomLogger = Logger.getInstance();

  greetingsLogger.log("Hola! bienvenido al sistema");

  randomLogger.log(randomUUID());

  greetingsLogger.printLogsHistory();
  randomLogger.printLogsHistory();
};

main();
