import { Row } from "./legacy-code";

export interface IReportAdapter {
  render(data: Row[]): string;
}
