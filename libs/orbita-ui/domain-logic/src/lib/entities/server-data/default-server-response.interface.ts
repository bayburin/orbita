/**
 * Ответ сервера "по умолчанию" на успешное выполнение некой операции
 */
export interface DefaultServerResponse {
  /**
   * Возвращаемое сервером сообщение
   */
  readonly message: string;
}
