import { LocationSite, LocationBuilding, LocationRoom } from './../location.interface';
/**
 * Тип рабочего места
 */
export interface SvtWorkplaceType {
  /**
   * Идентификатор типа РМ
   */
  readonly workplace_type_id: number;

  /**
   * Имя типа РМ
   */
  readonly name: string;

  /**
   * Краткое описание типа РМ
   */
  readonly short_description: string;

  /**
   * Подробное описание типа РМ
   */
  readonly long_description: string;

  /**
   * Площадка
   */
  readonly iss_reference_site: LocationSite;

  /**
   * Корпус
   */
  readonly iss_reference_building: LocationBuilding;

  /**
   * Комната
   */
  readonly iss_reference_room: LocationRoom;
}
