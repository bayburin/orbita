/**
 * Абстрактный билдер моделей
 */
export abstract class ModelBuilder<T> {
  /**
   * Создаваемая модель
   */
  model: T = {} as T;

  /**
   * Создает объект и возвращает его.
   */
  build(): T {
    return this.model;
  }
}
