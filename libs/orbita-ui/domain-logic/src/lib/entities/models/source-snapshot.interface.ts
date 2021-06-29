/**
 * Данные на момент фиксации
 */
export interface SourceSnapshot {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Идентификатор тикета
   */
  readonly claim_id: number;

  /**
   * Idtn пользователя
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
   * Доменное имя
   */
  readonly domain_user: string;

  /**
   * DNS хоста
   */
  readonly dns: string;

  /**
   * IP адрес источника
   */
  readonly source_ip: string;

  /**
   * IP адрес назначения
   */
  readonly destination_ip: string;

  /**
   * MAC адрес
   */
  readonly mac: string;

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

  /**
   * Расположение ВТ
   */
  readonly host_location: string;

  /**
   * Версия операционной системы
   */
  readonly os: string;

  /**
   * Netbios имя
   */
  readonly netbios: string;
}
