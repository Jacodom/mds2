export abstract class Report {
  abstract generate(): string;

  getData(): string {
    return `Data content for the file`;
  }
}

export class PdfReport extends Report {
  private lang: string;
  private showHeader: boolean;

  constructor(language: string, showHeader: boolean) {
    super();
    this.lang = language;
    this.showHeader = showHeader;
  }

  getReportContent(): string {
    return `${this.getData()}\n Special content\nLanguage: ${
      this.lang
    } | Show Header: ${this.showHeader}`;
  }

  generate(): string {
    return `📄 PDF Content\n${this.getReportContent()}`;
  }
}

export class CSVReport extends Report {
  private separator: string;

  constructor(separatorChar: string) {
    super();
    this.separator = separatorChar;
  }

  getReportContent(): string {
    return `${this.getData()}\n Special content\nSeparator Selected: "${
      this.separator
    }"`;
  }

  generate(): string {
    return `📈 CSV Content\n${this.getReportContent()}`;
  }
}

export class ExcelReport extends Report {
  private excelVersion: string;
  private isProtected: boolean;

  constructor(excelVersion: string, isProtected: boolean) {
    super();
    this.excelVersion = excelVersion;
    this.isProtected = isProtected;
  }

  generateReportData(): string {
    return `${this.getData()}\n Special content\nExcel Version: "${
      this.excelVersion
    }" | Protected: ${this.isProtected ? "Yes" : "No"}`;
  }

  generate(): string {
    return `📊 Excel Content\n${this.generateReportData()}`;
  }
}
