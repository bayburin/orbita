import { SchemaV1 } from '../../entities/parameter_schema/schema-v1.interface';
import { ParameterSchemaViewModel } from './../../entities/view-models/parameter-schema-view-model.interface';

/**
 * Преобразовывает параметры заявки в вид, необходимый для представления
 */
export class SchemaV1ParameterAdapter {
  private result: ParameterSchemaViewModel = {
    common: [],
    table: {
      columns: [],
      data: [],
    },
  };

  constructor(private schema: SchemaV1) {}

  /**
   * Вызывает преобразование
   */
  adaptee(): ParameterSchemaViewModel {
    // Общие параметры
    this.result.common = this.schema.common.map((el) => ({
      key_desc: el.key_desc,
      value_desc: el.value_desc,
      order: el.order,
    }));
    // Описание столбцов таблицы
    this.result.table.columns = this.schema.table.columns.slice().sort((a, b) => (a.order > b.order ? 1 : -1));
    // Данные таблицы в виде { [key]: string }
    this.result.table.data = this.schema.table.data.map((str) => {
      return Object.entries(str).reduce((acc, [key, val]) => {
        acc[key] = val.desc;

        return acc;
      }, {} as { [key: string]: string });
    });

    return this.result;
  }
}
