import { IReportAdapter } from "./adapters-interface";
import { LegacyCsvExporter, Row } from "./legacy-code";
import { MarkdownAdapter } from "./markdown-adapter";

// Cliente solo conoce el Target
function imprimirReporte(renderer: IReportAdapter, data: Row[]) {
  console.log("=== Reporte (BIEN con Adapter) ===");
  console.log(renderer.render(data));
}

const data: Row[] = [
  { id: 1, alumno: "Ana", nota: 9 },
  { id: 2, alumno: "Luis", nota: 7 },
];

const renderer: IReportAdapter = new MarkdownAdapter(new LegacyCsvExporter());
imprimirReporte(renderer, data);
