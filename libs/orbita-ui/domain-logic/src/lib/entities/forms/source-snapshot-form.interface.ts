/**
 * Форма данных на момент фиксации
 */
export interface SourceSnapshotForm {
  /**
   * IdTn пользователя
   */
  id_tn?: number;

  /**
   * Табельный номер
   */
  tn?: number;

  /**
   * ФИО
   */
  fio?: string;

  /**
   * Отдел
   */
  dept?: number;

  /**
   * Дополнительные атрибуты
   */
  user_attrs?: any;

  /**
   * Инвентарный номер ВТ
   */
  invent_num?: string;

  /**
   * Уникальный идентификатор ВТ (Раньше использовался как штрих-код)
   */
  svt_item_id?: number;

  /**
   * Штрих-код ВТ
   */
  barcode?: number;
}
