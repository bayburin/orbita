/**
 * Объект readcrumb, который задается в маршрутах
 */
export interface BreadcrumbRoute {
  /**
   * Вид объекта
   */
  type: BreadcrumbValueTypes;
  /**
   * Значение для типа text
   */
  value?: string;
}

/**
 * Виды объектов breadcrumb
 */
export enum BreadcrumbValueTypes {
  // breadcrumb содержит текст
  TEXT = 'text',
  // breadcrumb содержит id категории
  CATEGORY_ID = 'category_id',
  // breadcrumb содержит id услуги
  SERVICE_ID = 'service_id',
}
