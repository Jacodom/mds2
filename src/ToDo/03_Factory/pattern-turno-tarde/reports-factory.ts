import { ReportConfig, ReportFormat } from "./types";
import {
  PdfReport,
  CSVReport,
  ExcelReport,
  MarkdownReport,
} from "./reports-model";

export interface Exportable {
  export(): string;
}

abstract class ReportFactory {
  protected abstract create(config: ReportConfig): Exportable;

  pepe(config: ReportConfig): string {
    const report = this.create(config);

    return report.export();
  }
}

class PdfReportFactory extends ReportFactory {
  create(config: ReportConfig): Exportable {
    return new PdfReport(config.language, config.showHeader);
  }
}

class CsvReportFactory extends ReportFactory {
  create(config: ReportConfig): Exportable {
    return new CSVReport(config.separator);
  }
}

class ExcelReportFactory extends ReportFactory {
  create(config: ReportConfig): Exportable {
    return new ExcelReport(config.excelVersion, config.protected);
  }
}

class MarkdownReportFactory extends ReportFactory {
  create(config: ReportConfig): Exportable {
    return new MarkdownReport(
      config.includeTableOfContents,
      config.syntaxHighlighting
    );
  }
}

export const ReportsFactoryRegistry: Map<ReportFormat, () => ReportFactory> =
  new Map();

ReportsFactoryRegistry.set(ReportFormat.PDF, () => new PdfReportFactory());
ReportsFactoryRegistry.set(ReportFormat.CSV, () => new CsvReportFactory());
ReportsFactoryRegistry.set(ReportFormat.EXCEL, () => new ExcelReportFactory());
ReportsFactoryRegistry.set(ReportFormat.MD, () => new MarkdownReportFactory());
