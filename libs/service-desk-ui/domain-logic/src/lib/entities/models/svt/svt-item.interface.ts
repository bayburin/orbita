import { SvtType } from './svt-type.interface';

/**
 * ВТ
 */
export interface SvtItem {
  /**
   * Идентификатор ВТ
   */
  readonly item_id: number;

  /**
   * Штрих-код
   */
  readonly barcode_item: SvtBarcode;

  /**
   * Идентификатор типа ВТ
   */
  readonly type_id: number;

  /**
   * Тип ВТ
   */
  readonly type: SvtType;

  /**
   * Идентификатор РМ
   */
  readonly workplace_id: number;

  /**
   * Идентификатор модели
   */
  readonly model_id: number;

  /**
   * Модель
   */
  readonly item_model: string;

  /**
   * Инвентарный номер
   */
  readonly invent_num: string;

  /**
   * Серийный номер
   */
  readonly serial_num: string;

  /**
   * Текстовое наименование модели
   */
  readonly short_item_model: string;
}

/**
 * Интерфейс штрих-кода ВТ
 */
export interface SvtBarcode {
  /**
   * Штрих-код
   */
  readonly id: number;
}
