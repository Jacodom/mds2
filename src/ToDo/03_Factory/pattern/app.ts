import {
  CSVReport,
  PdfReport,
  Report,
  ExcelReport,
  creatorRegistry,
} from "./reports-model";
import { Config, ReportFormat } from "./types";

const config: Config = {
  defaultFormat: "pdf",
  language: "es",
  showHeader: true,
  separator: ";",
  excelVersion: "xlsx",
  protected: true,
};

const businessProcess = (format: ReportFormat) => {
  let report: Report;

  try {
    switch (format) {
      case ReportFormat.PDF:
        report = new PdfReport(config.language, config.showHeader);
        break;

      case ReportFormat.CSV:
        report = new CSVReport(config.separator);
        break;

      case ReportFormat.EXCEL:
        report = new ExcelReport(config.excelVersion, config.protected);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
        break;
    }
  } catch (err) {
    console.error(`${err}`);
    return;
  }

  console.log(report.generate());
};

const businessProcessDecoupled = (format: ReportFormat) => {
  const reportFactory = creatorRegistry.get(format);

  if (!reportFactory) {
    console.log("Format not implemented yet");
    return;
  }

  const result = reportFactory().create(config).export();
  console.log(result);
};

// businessProcess(ReportFormat.PDF);
// businessProcess(ReportFormat.CSV);
// businessProcess(ReportFormat.EXCEL);
// businessProcess("markdown");

businessProcessDecoupled(ReportFormat.PDF);
businessProcessDecoupled(ReportFormat.CSV);
businessProcessDecoupled(ReportFormat.EXCEL);
