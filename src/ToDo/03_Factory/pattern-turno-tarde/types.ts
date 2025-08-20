export interface ReportConfig {
  defaultFormat: string;
  language: string;
  showHeader: boolean;
  separator: string;
  excelVersion: string;
  protected: boolean;
  includeTableOfContents: boolean;
  syntaxHighlighting: boolean;
}

export enum ReportFormat {
  PDF = "pdf",
  CSV = "csv",
  EXCEL = "excel",
  MD = "markdown",
}
