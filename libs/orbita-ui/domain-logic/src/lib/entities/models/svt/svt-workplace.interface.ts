/**
 * Интерфейс РМ
 */
export interface SvtWorkplace {
  /**
   * Идентфикатор РМ
   */
  readonly workplace_id: number;

  /**
   * Идентификатор Ответственного
   */
  readonly id_tn: number;

  /**
   * ФИО ответственного
   */
  readonly user_fio: string;
}
