import { Config, ReportFormat } from "./types";
import { PdfReport, CSVReport, ExcelReport } from "./reports-model";

export interface Exportable {
  export(): string;
}

abstract class ReportCreator {
  protected abstract create(config: Config): Exportable;

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
