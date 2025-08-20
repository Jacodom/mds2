import { ReportsFactoryRegistry } from "./reports-factory";
import { ReportConfig, ReportFormat } from "./types";

export class ReportHelper {
  getExportedFile(format: ReportFormat, data: ReportConfig): string {
    const reportFactory = ReportsFactoryRegistry.get(format);

    if (!reportFactory) {
      console.log("Format not implemented yet");
      return "NO_CONTENT";
    }

    return reportFactory().pepe(data);
  }
}
