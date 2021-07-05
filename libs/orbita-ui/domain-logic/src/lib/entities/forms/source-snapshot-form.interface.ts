/**
 * Форма данных на момент фиксации
 */
export interface SourceSnapshotForm {
  /**
   * IdTn пользователя
   */
  readonly id_tn: number;

  /**
   * Табельный номер
   */
  readonly tn: number;

  /**
   * ФИО
   */
  readonly fio: string;

  /**
   * Отдел
   */
  readonly dept: number;

  /**
   * Дополнительные атрибуты
   */
  readonly user_attrs: any;

  /**
   * Инвентарный номер ВТ
   */
  readonly invent_num: string;

  /**
   * Уникальный идентификатор ВТ (Раньше использовался как штрих-код)
   */
  readonly svt_item_id: number;

  /**
   * Штрих-код ВТ
   */
  readonly barcode: number;
}
