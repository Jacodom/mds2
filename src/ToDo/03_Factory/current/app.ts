import { CSVReport, PdfReport, Report, ExcelReport } from "./reports-model";

const config = {
  defaultFormat: "pdf",
  language: "es",
  showHeader: true,
  separator: ";",
  excelVersion: "xlsx",
  protected: true,
};

const businessProcess = (format: string) => {
  let report: Report;

  try {
    switch (format) {
      case "pdf":
        report = new PdfReport(config.language, config.showHeader);
        break;

      case "csv":
        report = new CSVReport(config.separator);
        break;

      case "excel":
        report = new ExcelReport(config.excelVersion, config.protected);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  } catch (err) {
    console.error(`${err}`);
    return;
  }

  console.log(report.generate());
};

businessProcess("pdf");
businessProcess("csv");
businessProcess("excel");
businessProcess("markdown");
