import { ParameterSchemaViewModel } from './parameter-schema-view-model.interface';

/**
 * Параметры заявки в форме представления
 */
export interface ParameterViewModel {
  /**
   * Идентификатор параметра
   */
  readonly id: number;

  /**
   * Версия схемы
   */
  readonly schema_version: string;

  /**
   * Структура параметров
   */
  readonly payload: ParameterSchemaViewModel;
}
