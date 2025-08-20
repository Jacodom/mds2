import { LegacyCsvExporter, Row } from "./legacy-code";

function renderReporteMarkdownMal(data: Row[]) {
  // El cliente usa la lib legada y hace de traductor: 😬
  const csv = new LegacyCsvExporter().export(data);
  const [headerLine, ...rows] = csv.split("\n");
  const headers = headerLine.split(",");
  const table = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "--").join(" | ")} |`,
    ...rows.map((line) => `| ${line.split(",").join(" | ")} |`),
  ].join("\n");

  console.log("=== Reporte csv legacy ===");
  console.log(csv);

  console.log("=== Reporte Markdown (MAL) ===");
  console.log(table);
}

renderReporteMarkdownMal([
  { id: 1, alumno: "Ana", nota: 9 },
  { id: 2, alumno: "Luis", nota: 7 },
]);
