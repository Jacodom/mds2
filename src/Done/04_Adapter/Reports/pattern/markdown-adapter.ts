import { IReportAdapter } from "./adapters-interface";
import { LegacyCsvExporter, Row } from "./legacy-code";

export class MarkdownAdapter implements IReportAdapter {
  private legacyReporter: LegacyCsvExporter;

  constructor(legacyReporter: LegacyCsvExporter) {
    this.legacyReporter = legacyReporter;
  }

  render(data: Row[]): string {
    const csv = this.legacyReporter.export(data);
    const [headerLine, ...rows] = csv.split("\n").filter(Boolean);
    if (!headerLine) return "";

    const headers = headerLine.split(",");
    const body = rows.map((r) => `| ${r.split(",").join(" | ")} |`).join("\n");
    const table =
      `| ${headers.join(" | ")} |\n` +
      `| ${headers.map(() => "---").join(" | ")} |\n` +
      body;

    return table;
  }
}
