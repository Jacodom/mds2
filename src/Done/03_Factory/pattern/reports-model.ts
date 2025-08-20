import { Exportable } from "./reports-factory";

export abstract class Report {
  abstract generate(): string;

  getData(): string {
    return `Data content for the file`;
  }
}

export class PdfReport extends Report implements Exportable {
  private lang: string;
  private showHeader: boolean;

  constructor(language: string, showHeader: boolean) {
    super();
    this.lang = language;
    this.showHeader = showHeader;
  }

  getReportContent(): string {
    return `${this.getData()}\nSpecial content\nLanguage: ${
      this.lang
    } | Show Header: ${this.showHeader}`;
  }

  generate(): string {
    return `Content: \n${this.getReportContent()}`;
  }

  export(): string {
    return `📄 Exporting PDF\n${this.generate()}`;
  }
}

export class CSVReport extends Report implements Exportable {
  private separator: string;

  constructor(separatorChar: string) {
    super();
    this.separator = separatorChar;
  }

  getReportContent(): string {
    return `${this.getData()}\nSpecial content\nSeparator Selected: "${
      this.separator
    }"`;
  }

  generate(): string {
    return `Content\n${this.getReportContent()}`;
  }

  export(): string {
    return `📈 Exporting CSV\n${this.generate()}`;
  }
}

export class ExcelReport extends Report implements Exportable {
  private excelVersion: string;
  private isProtected: boolean;

  constructor(excelVersion: string, isProtected: boolean) {
    super();
    this.excelVersion = excelVersion;
    this.isProtected = isProtected;
  }

  generateReportData(): string {
    return `${this.getData()}\nSpecial content\nExcel Version: "${
      this.excelVersion
    }" | Protected: ${this.isProtected ? "Yes" : "No"}`;
  }

  generate(): string {
    return `Content\n${this.generateReportData()}`;
  }

  export(): string {
    return `📊 Exporting Excel\n${this.generate()}`;
  }
}
