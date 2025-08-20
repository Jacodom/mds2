import { ReportHelper } from "./reporter-helper";
import { ReportsFactoryRegistry } from "./reports-factory";
import { CSVReport, PdfReport, Report, ExcelReport } from "./reports-model";
import { ReportConfig, ReportFormat } from "./types";

const config: ReportConfig = {
  defaultFormat: "pdf",
  language: "es",
  showHeader: true,
  separator: ";",
  excelVersion: "xlsx",
  protected: true,
  includeTableOfContents: false,
  syntaxHighlighting: true,
};

const businessProcess = (format: string) => {
  // paso 1: obtener los datos de la db
  // const data = databaseHelper.getData()
  // pase 2: llamar a una api para convertir pesos a dolares
  // paso 3: enviar un mail a algun chanchin

  // paso 4: generar el reporte
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

  // paso 5: enviar el reporte por mail
  // paso 6: guardar el reporte en un ftp
};

const businessProcessDecoupled = (format: ReportFormat) => {
  // one liner master class
  console.log(new ReportHelper().getExportedFile(format, config));
};

// businessProcess("pdf");
// businessProcess("csv");
// businessProcess("excel");
// businessProcess("markdown");

businessProcessDecoupled(ReportFormat.PDF);
businessProcessDecoupled(ReportFormat.CSV);
businessProcessDecoupled(ReportFormat.EXCEL);
businessProcessDecoupled(ReportFormat.MD);
