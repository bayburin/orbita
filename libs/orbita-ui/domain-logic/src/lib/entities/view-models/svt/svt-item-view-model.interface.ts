import { SvtItemStatuses, SvtBarcode } from './../../models/svt/svt-item.interface';
import { SvtWorkplace } from './../../models/svt/svt-workplace.interface';
import { SvtType } from './../../models/svt/svt-type.interface';

/**
 * ВТ
 */
export interface SvtItemViewModel {
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
   * Идентификатор РМ
   */
  readonly workplace_id: number;

  /**
   * РМ
   */
  readonly workplace: SvtWorkplace;

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
   * Статус
   */
  readonly status: SvtItemStatuses;

  /**
   * Текстовое наименование модели
   */
  readonly short_item_model: string;

  /**
   * Тип ВТ
   */
  readonly type: SvtType;
}
