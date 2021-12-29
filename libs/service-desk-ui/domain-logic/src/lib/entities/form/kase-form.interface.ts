/**
 * Форма заявки, которую обрабатывает сервер
 */
export interface KaseForm {
  /**
   * Идентификатор пользователя
   */
  id_tn: number;

  /**
   * Табельный пользователя
   */
  user_tn: number;

  /**
   * ФИО
   */
  fio: string;

  /**
   * Отдел
   */
  dept: number;

  /**
   * email
   */
  email: string;

  /**
   * Телефон
   */
  phone: string;

  /**
   * Мобильный
   */
  mobile: string;

  /**
   * ID услуги
   */
  service_id: number;

  /**
   * Описание
   */
  desc: string;

  /**
   * Флаг, обозначающий "Услуга не найдена"
   */
  without_service: boolean;

  /**
   * Флаг, обозначающий "Заявка без указания ВТ"
   */
  without_item: boolean;

  /**
   * ID ВТ
   */
  item_id: number;

  /**
   * Штрих-код
   */
  barcode: number;

  /**
   * Инвентарный номер
   */
  invent_num: string;

  /**
   * Список файлов
   */
  files: File[];

  /**
   * Оценка качества обслуживания
   */
  rating?: number;

  /**
   * Дополнительные поля
   */
  additional: {
    /**
     * Комментарий
     */
    comment: string;
  };
}
