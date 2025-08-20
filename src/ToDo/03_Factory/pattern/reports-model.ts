import { Config, ReportFormat } from "./types";

interface Exportable {
  export(): string;
}

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
    return `${this.getData()}\n Special content\nLanguage: ${
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
    return `${this.getData()}\n Special content\nSeparator Selected: "${
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
    return `${this.getData()}\n Special content\nExcel Version: "${
      this.excelVersion
    }" | Protected: ${this.isProtected ? "Yes" : "No"}`;
  }

  generate(): string {
    return `📊 Excel Content\n${this.generateReportData()}`;
  }

  export(): string {
    return `📊 Exporting Excel\n${this.generate()}`;
  }
}

abstract class ReportCreator {
  abstract create(config: Config): Exportable;

  export(config: Config): void {
    const report = this.create(config);
    console.log(report.export());
  }
}

class PdfReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new PdfReport(config.language, config.showHeader);
  }
}

class CsvReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new CSVReport(config.separator);
  }
}

class ExcelReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new ExcelReport(config.excelVersion, config.protected);
  }
}

export const creatorRegistry: Map<ReportFormat, () => ReportCreator> =
  new Map();

creatorRegistry.set(ReportFormat.PDF, () => new PdfReportCreator());
creatorRegistry.set(ReportFormat.CSV, () => new CsvReportCreator());
creatorRegistry.set(ReportFormat.EXCEL, () => new ExcelReportCreator());
