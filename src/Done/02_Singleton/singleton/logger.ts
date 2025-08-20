export class Logger {
  private logs: string[] = [];

  private static instance: Logger;

  private constructor() {}

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const messageWithTimestamp = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(messageWithTimestamp);
  }

  public printLogsHistory(): void {
    console.log("Historial de Logs");
    this.logs.forEach((log) => console.log(log));
  }
}
