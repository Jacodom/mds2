export class Logger {
  private logs: string[] = [];

  public log(message: string): void {
    const messageWithTimestamp = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(messageWithTimestamp);
  }

  public printLogsHistory(): void {
    console.log("Historial de Logs");
    this.logs.forEach((log) => console.log(log));
  }
}

// const testLogger = () => {
//   const logger = new Logger();

//   logger.log("Hola...");
//   logger.log("como estas?");

//   logger.printLogsHistory();
// };

// testLogger();
