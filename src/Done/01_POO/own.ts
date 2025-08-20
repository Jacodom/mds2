/**
 * Se requiere imprimir un reporte en diferentes formatos (PDF, Excel).
 * Cada formato debe implementar un método para generar el contenido del reporte.
 * Además, cada formato debe poder exportar el reporte como una cadena de texto.
 */

// export
interface Exportable {
  export(): string;
}

// BaseReport
// title, date, etc
abstract class BaseReport {
  protected title: string;
  protected date: Date;

  constructor(title: string, date: Date) {
    this.title = title || "";
    this.date = date || new Date();
  }

  printHeader(): string {
    return `Report: ${this.title} | Date: ${this.date.toLocaleDateString()}`;
  }

  abstract generate(): string;
}

// PdfReport
class PdfReport extends BaseReport implements Exportable {
  generate(): string {
    return `📄 PDF content: ${this.printHeader()}`;
  }

  export(): string {
    return `Exporting PDF...${this.generate()}`;
  }
}

// ExcelReport
class SheetReport extends BaseReport implements Exportable {
  generate(): string {
    return `📊 Sheet content: ${this.printHeader()}`;
  }

  export(): string {
    return `Exporting Sheet file...${this.generate()}`;
  }
}

// app.ts
const reportsList: Exportable[] = [
  new PdfReport("Reporte de ventas", new Date("2025-07-01")),
  new SheetReport("Reporte Financiero", new Date("2025-07-15")),
];

for (const report of reportsList) {
  console.log(report.export());
  console.log("---------");
}
