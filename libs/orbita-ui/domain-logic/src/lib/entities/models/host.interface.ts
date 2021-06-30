/**
 * Интерфейс данных о сетевом устройстве
 */
export interface Host {
  /**
   * Инвентарный номер
   */
  readonly id: number;

  /**
   * Mac-адрес
   */
  readonly mac: string;

  /**
   * Ip-адрес
   */
  readonly ip: string;

  /**
   * Табельный номер текущего владельца
   */
  readonly tn: string;

  /**
   * Расположение
   */
  readonly room: string;

  /**
   * ФИО текущего владельца
   */
  readonly user: string;

  /**
   * Отдел текущего владельца
   */
  readonly division: string;

  /**
   * Операционная система
   */
  readonly os: string;

  /**
   * Наличие программы Аудит
   */
  readonly cms: CmsStatuses;

  /**
   * Наличие антивируса
   */
  readonly csa: CsaStatuses;
}

export enum CmsStatuses {
  NOT_INST = 0,
  INST = 1,
  TEMP_NOT_INST = 123,
  NOT_INST_BY_WORK_MEMO = 5,
  NOT_INST_BY_INCOMPAT = 98,
  NOT_INST_BY_LOW_PERF = 512,
  TOP_MANAGER = 777,
  NOT_INST_BY_AGR = 714,
  AUDIT_TRIED = 1000,
  AUDIT_WAITING_REBOOT = 1001,
  AUDIT_ERROR = 1002,
  NET_HARDWARE = 8,
}

export enum CsaStatuses {
  NOT_INST = 0,
  INST = 1,
  TEMP_NOT_INST = 123,
  NOT_INST_BY_WORK_MEMO = 5,
  NOT_INST_BY_INCOMPAT = 98,
  NOT_INST_BY_LOW_PERF = 512,
  TOP_MANAGER = 777,
  NOT_INST_BY_AGR = 714,
  NET_HARDWARE = 8,
  KASPERSKY = 11,
  WORK_MEMO_NOT_CHECKED = 55,
}
