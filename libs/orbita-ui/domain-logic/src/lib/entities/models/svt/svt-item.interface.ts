import { SvtWorkplace } from './svt-workplace.interface';
import { SvtType } from './svt-type.interface';

/**
 * Интерфейс ВТ
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

/**
 * Интерфейс штрих-кода ВТ
 */
export interface SvtBarcode {
  /**
   * Штрих-код
   */
  readonly id: number;
}

/**
 * Статусы ВТ
 */
export enum SvtItemStatuses {
  WAITING_TAKE = 'waiting_take',
  WAITING_BRING = 'waiting_bring',
  IN_STOCK = 'in_stock',
  IN_WORKPLACE = 'in_workplace',
  WAITING_WRITE_OFF = 'waiting_write_off',
  WRITTEN_OFF = 'written_off',
}
