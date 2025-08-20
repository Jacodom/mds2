// Interface: define el contrato de exportación
interface Exportable {
  export(): string; // método que toda clase exportable debe implementar
}

// Clase abstracta: contiene lógica común a todos los reportes
abstract class Report {
  constructor(protected title: string, protected date: Date) {}

  // Método concreto que se comparte
  printHeader(): void {
    console.log(
      `Report: ${this.title} | Date: ${this.date.toLocaleDateString()}`
    );
  }

  // Método abstracto que obliga a definir cómo se genera el contenido
  abstract generate(): string;
}

// Subclase PDF: implementa exportación y generación de contenido
class PDFReport extends Report implements Exportable {
  generate(): string {
    return `📄 PDF Content:\nTitle: ${
      this.title
    }\nDate: ${this.date.toISOString()}`;
  }

  export(): string {
    return `Exporting PDF...\n${this.generate()}`;
  }
}

// Subclase Excel: otra implementación concreta
class ExcelReport extends Report implements Exportable {
  generate(): string {
    return `📊 Excel Content:\n| ${this.title} | ${this.date.toDateString()} |`;
  }

  export(): string {
    return `Exporting Excel...\n${this.generate()}`;
  }
}

// Lógica de aplicación
const reports: Exportable[] = [
  new PDFReport("Informe de Ventas", new Date("2025-07-01")),
  new ExcelReport("Resumen Financiero", new Date("2025-07-15")),
];

// Ejecución
for (const report of reports) {
  console.log(report.export());
  console.log("------");
}
