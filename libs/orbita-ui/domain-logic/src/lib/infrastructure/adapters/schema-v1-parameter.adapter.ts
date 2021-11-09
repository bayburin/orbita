import { SchemaV1 } from '../../entities/parameter_schema/schema-v1.interface';
import { ParameterSchemaViewModel } from './../../entities/view-models/parameter-schema-view-model.interface';

/**
 * Преобразовывает параметры заявки в вид, необходимый для представления
 */
export class SchemaV1ParameterAdapter {
  constructor(private result: ParameterSchemaViewModel) {}

  /**
   * Вызывает преобразование параметров в вид, необходимый для представления
   *
   * @parameter schema - параметры из хранилища
   */
  adaptee(schema: SchemaV1): ParameterSchemaViewModel {
    // Общие параметры
    this.result.common = schema.common.map((el) => ({
      key_desc: el.key_desc,
      value_desc: el.value_desc,
      order: el.order,
    }));
    // Описание столбцов таблицы
    this.result.table.columns = schema.table.columns.slice().sort((a, b) => (a.order > b.order ? 1 : -1));
    // Данные таблицы в виде { [key]: string }
    this.result.table.data = schema.table.data.map((str) => {
      return Object.entries(str).reduce((acc, [key, val]) => {
        acc[key] = val.desc;

        return acc;
      }, {} as { [key: string]: string });
    });

    return this.result;
  }
}
