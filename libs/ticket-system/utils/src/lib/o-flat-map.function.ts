/**
 * Своя реализация функции flatMap
 *
 * @param f - функция, применяемая к исходному массиву
 * @param arr - исходный массив
 */
export const oFlatMap = function(f: (a: any) => any[], arr: any[]) {
  return arr.map(f).reduce((acc, el) => acc.concat(el), []);
}
