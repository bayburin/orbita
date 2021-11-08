import { Parameter } from './../../entities/models/parameter.interface';
import { ParameterSchemaViewModel } from './../../entities/view-models/parameter-schema-view-model.interface';
import { SchemaV1ParameterAdapter } from './../adapters/schema-v1-parameter.adapter';

/**
 * Фабрика по созданию параметров заявки
 */
export class ParameterSchemaViewModelFactory {
  /**
   * Создает параметры заявки из серверного вида
   *
   * @param parameter - объект Parameter
   */
  static createSchema(parameter: Parameter): ParameterSchemaViewModel {
    const DEFAULT_SCHEMA: ParameterSchemaViewModel = {
      common: [],
      table: {
        columns: [],
        data: [],
      },
    };

    if (parameter?.schema_version == '1') {
      return new SchemaV1ParameterAdapter(DEFAULT_SCHEMA).adaptee(parameter.payload);
    }

    return DEFAULT_SCHEMA;
  }
}
