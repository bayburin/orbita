/**
 * Площадка
 */
export interface LocationSite {
  /**
   * Идентификатор площадки
   */
  readonly site_id: number;

  /**
   * Имя
   */
  readonly name: string;

  /**
   * Описание
   */
  readonly long_name: string;

  /**
   * Порядок сортировки
   */
  readonly sort_order: number;
}

/**
 * Корпус
 */
export interface LocationBuilding {
  /**
   * Идентификатор корпуса
   */
  readonly building_id: number;

  /**
   * Идентификатор площадки
   */
  readonly site_id: number;

  /**
   * Имя
   */
  readonly name: string;
}

/**
 * Комната
 */
export interface LocationRoom {
  /**
   * Идентификатор комнаты
   */
  readonly room_id: number;

  /**
   * Идентификатор корпуса
   */
  readonly building_id: number;

  /**
   * Номер
   */
  readonly name: string;
}
