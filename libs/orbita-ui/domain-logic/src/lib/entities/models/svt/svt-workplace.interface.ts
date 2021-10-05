import { SvtWorkplaceCount } from './svt-workplace-count.interface';
import { SvtWorkplaceType } from './svt-workplace-type.interface';

/**
 * Интерфейс РМ
 */
export interface SvtWorkplace {
  /**
   * Идентфикатор РМ
   */
  readonly workplace_id: number;

  /**
   * Идентификатор типа РМ
   */
  readonly workplace_type_id: number;

  /**
   * Тип РМ
   */
  readonly workplace_type: SvtWorkplaceType;

  /**
   * Идентификатор Ответственного
   */
  readonly id_tn: number;

  /**
   * ФИО ответственного
   */
  readonly user_fio: string;

  /**
   * Номер отдела
   */
  readonly workplace_count: SvtWorkplaceCount;
}
