/**
 * Вычисляет номер страницы
 *
 * @param firstRowIndex - номер записи среди всех
 * @param rows - число строк на странице
 */
export function calculatePage(firstRowIndex: number, rows: number): number {
  return firstRowIndex / rows + 1;
}
