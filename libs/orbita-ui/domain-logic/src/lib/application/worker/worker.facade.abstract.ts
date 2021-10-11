import { Worker } from '../../entities/models/worker.interface';

export abstract class WorkerFacadeAbstract {
  /**
   * Сохранить новый массив исполнителей в хранилище
   *
   * @param workers - список исполнителей
   */
  abstract replaceAllWorkers(workers: Worker[]): void;

  /**
   * Добавить новых или обновить существующих исполнителей
   *
   * @param workers - список исполнителей
   */
  abstract setWorkers(workers: Worker[]): void;
}
