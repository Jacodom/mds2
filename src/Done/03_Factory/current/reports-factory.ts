import { Config, ReportFormat } from "./types";
import {
  PdfReport,
  CSVReport,
  ExcelReport,
  MarkdownReport,
} from "./reports-model";

export interface Exportable {
  export(): string;
}

abstract class ReportCreator {
  abstract create(config: Config): Exportable;

  pepe(config: Config): void {
    const report = this.create(config);
    console.log(report.export());
  }
}

class PdfReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new PdfReport(config.language, config.showHeader);
  }
}

class CSVReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new CSVReport(config.separator);
  }
}

class ExcelReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new ExcelReport(config.excelVersion, config.protected);
  }
}

class MarkdownReportCreator extends ReportCreator {
  create(config: Config): Exportable {
    return new MarkdownReport();
  }
}

export const creatorRegistry: Map<ReportFormat, () => ReportCreator> =
  new Map();

creatorRegistry.set(ReportFormat.PDF, () => new PdfReportCreator());
creatorRegistry.set(ReportFormat.CSV, () => new CSVReportCreator());
creatorRegistry.set(ReportFormat.EXCEL, () => new ExcelReportCreator());
creatorRegistry.set(ReportFormat.MD, () => new MarkdownReportCreator());
