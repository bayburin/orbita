import { SchemaV1ParameterAdapter } from './../../infrastructure/adapters/schema-v1-parameter.adapter';
import { SchemaV1 } from '../parameter_schema/schema-v1.interface';

/**
 * Интерфейс параметров заявки
 */
export interface Parameter {
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
  readonly payload: schemaTypes;
}

export type schemaTypes = SchemaV1;

export type schemaAdapterTypes = SchemaV1ParameterAdapter;
