/**
 * Рекомендации пользователям
 */
export interface UserRecommendationViewForm {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Наименование, которое видит пользователь
   */
  title: string;

  /**
   * Флаг, показывающий, является ли ссылка внешней
   */
  external: boolean;

  /**
   * Ссылка
   */
  link: string;

  /**
   * Параметры ссылки
   */
  query_params: {
    /**
     * Имя параметра
     */
    name: string;

    /**
     * Значение параметра
     */
    value: string | number;
  }[];

  /**
   * Порядок следования
   */
  order: number;
}
