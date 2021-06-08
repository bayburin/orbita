/**
 * Внешнее приложение создавшее или обрабатывающее заявку
 */
export interface Application {
  /**
   * Идентификатор приложения
   */
  readonly id: number;

  /**
   * Имя приложения
   */
  readonly name: string;
}
