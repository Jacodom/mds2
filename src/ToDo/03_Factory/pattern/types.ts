export interface Config {
  defaultFormat: string;
  language: string;
  showHeader: boolean;
  separator: string;
  excelVersion: string;
  protected: boolean;
}

export enum ReportFormat {
  PDF = "pdf",
  CSV = "csv",
  EXCEL = "excel",
}
