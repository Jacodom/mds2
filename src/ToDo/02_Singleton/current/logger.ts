export class Logger {
  private logList: string[] = [];

  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const timeStampedMessage = `[${new Date().toISOString()}]: ${message}`;

    console.log(timeStampedMessage);

    this.logList.push(timeStampedMessage);
  }

  printHistoricLogs() {
    this.logList.forEach((log) => console.log(log));
  }
}

// export class Historic {
//   private static historicList: string[] = [];

//   public static saveHistoricLog(log: string) {
//     this.historicList.push(log);
//   }

//   public static printHistoricLogs() {
//     this.historicList.forEach((log) => console.log(log));
//   }
// }

/**
 * Posibles soluciones
 *
 * 1) Una lista general de todos los logs y que cuando
 * se guarde en uno también se guarde en esta lista general
 *
 *
 *
 */
