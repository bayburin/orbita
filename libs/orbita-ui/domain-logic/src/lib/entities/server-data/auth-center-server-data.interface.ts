import { Host } from './../models/host.interface';

/**
 * Описывает ответ с сервера по запросу списка хостов работника
 */
export interface HostsServerData {
  /**
   * Массив найденных хостов
   */
  hosts: Host[];
}
