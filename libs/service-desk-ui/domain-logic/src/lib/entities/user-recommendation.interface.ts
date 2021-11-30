/**
 * Рекомендации пользователям
 */
export interface UserRecommendation {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Наименование, которое видит пользователь
   */
  readonly title: string;

  /**
   * Флаг, показывающий, является ли ссылка внешней
   */
  readonly external: boolean;

  /**
   * Ссылка
   */
  readonly link: string;

  /**
   * Параметры ссылки
   */
  readonly query_params: any;

  /**
   * Порядок следования
   */
  readonly order: number;
}
