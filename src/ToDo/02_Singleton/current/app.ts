import { randomUUID } from "crypto";
import { Logger } from "./logger";

const testLoggers = () => {
  const greetingsLogger = Logger.getInstance();

  greetingsLogger.log("Holis, como andas?");

  const randomLogger = Logger.getInstance();
  randomLogger.log(randomUUID());

  console.log("Historico de Greetings");
  greetingsLogger.printHistoricLogs();
  //   Historic.printHistoricLogs();

  console.log("Historico de RandomLogger");
  randomLogger.printHistoricLogs();
  //   Historic.printHistoricLogs();
};

testLoggers();
