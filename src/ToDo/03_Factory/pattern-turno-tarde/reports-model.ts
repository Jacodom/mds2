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

  private getReportContent(): string {
    return `${this.getData()}\n Special content\nLanguage: ${
      this.lang
    } | Show Header: ${this.showHeader}`;
  }

  generate(): string {
    return `Content\n${this.getReportContent()}`;
  }

  export(): string {
    return `Exporting 📄 PDF...\n${this.generate()}`;
  }
}

export class CSVReport extends Report implements Exportable {
  private separator: string;

  constructor(separatorChar: string) {
    super();
    this.separator = separatorChar;
  }

  private getReportContent(): string {
    return `${this.getData()}\n Special content\nSeparator Selected: "${
      this.separator
    }"`;
  }

  generate(): string {
    return `Content\n${this.getReportContent()}`;
  }

  export(): string {
    return `Exporting 📈 CSV ...\n${this.generate()}`;
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
    return `Content\n${this.generateReportData()}`;
  }

  export(): string {
    return `Exporting 📊 Excel ...\n${this.generate()}`;
  }
}

export class MarkdownReport extends Report implements Exportable {
  private includeTableOfContents: boolean;
  private syntaxHighlighting: boolean;

  constructor(includeTableOfContents: boolean, syntaxHighlighting: boolean) {
    super();
    this.includeTableOfContents = includeTableOfContents;
    this.syntaxHighlighting = syntaxHighlighting;
  }

  private getReportContent(): string {
    return `${this.getData()}\n Special content\nTable of Contents: ${
      this.includeTableOfContents ? "Yes" : "No"
    } | Syntax Highlighting: ${this.syntaxHighlighting ? "Yes" : "No"}`;
  }

  generate(): string {
    return `Content\n${this.getReportContent()}`;
  }

  export(): string {
    return `Exporting 📝 Markdown ...\n${this.generate()}`;
  }
}
