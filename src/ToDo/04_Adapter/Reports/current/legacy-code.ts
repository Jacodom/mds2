export type Row = Record<string, string | number>;

export class LegacyCsvExporter {
  // Codigo legacy que no queremos/podemos tocar
  export(data: Row[]): string {
    const headers = Object.keys(data[0] ?? {});
    const lines = [
      headers.join(","),
      ...data.map((r) => headers.map((h) => String(r[h] ?? "")).join(",")),
    ];
    return lines.join("\n");
  }
}
