/**
 * РМ
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
   * Идентификатор отдела РМ
   */
  readonly workplace_count_id: number;

  /**
   * Идентификатор Ответственного
   */
  readonly id_tn: number;

  /**
   * ФИО ответственного
   */
  readonly user_fio: string;
}
