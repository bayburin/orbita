/**
 * Параметры заявки в виде для отображения
 */
export interface ParameterSchemaViewModel {
  /**
   * Общие параметры
   */
  common: CommonParameter[];

  /**
   * Табличные атрибуты
   */
  table: TableParameter;
}

/**
 * Общие параметры
 */
export interface CommonParameter {
  /**
   * Описание ключа
   */
  key_desc: string;

  /**
   * Наименование зачения
   */
  value_desc: string;

  /**
   * Порядок следования параметров
   */
  order: number;
}

/**
 * Табличные атрибуты
 */
export interface TableParameter {
  /**
   * Описание столбцов
   */
  columns: TableColumnParameter[];

  /**
   * Данные столбцов
   */
  data: TableDataParameter[];
}

export interface TableColumnParameter {
  /**
   * Ключ
   */
  key: string;

  /**
   * Описание ключа
   */
  desc: string;

  /**
   * Порядок следования столбцов
   */
  order: string;
}

export interface TableDataParameter {
  /**
   * Данные столбца, указанные по ключу
   */
  [key: string]: string;
}
