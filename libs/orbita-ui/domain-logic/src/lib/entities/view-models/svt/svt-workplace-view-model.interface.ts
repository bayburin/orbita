import { SvtWorkplaceCount } from './../../models/svt/svt-workplace-count.interface';
import { SvtWorkplaceType } from './../../models/svt/svt-workplace-type.interface';

/**
 * РМ
 */
export interface SvtWorkplaceViewModel {
  /**
   * Идентфикатор РМ
   */
  readonly workplace_id: number;

  /**
   * Идентификатор типа РМ
   */
  readonly workplace_type_id: number;

  /**
   * Идентификатор отдела РМ
   */
  readonly workplace_count_id: number;

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
