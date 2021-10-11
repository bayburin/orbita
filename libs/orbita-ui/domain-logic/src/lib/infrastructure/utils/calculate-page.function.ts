export function calculatePage(firstRowIndex: number, rows: number): number {
  return firstRowIndex / rows + 1;
}
