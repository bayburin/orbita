import { Worker } from '../../entities/models/worker.interface';

export abstract class WorkerFacadeAbstract {
  /**
   * Сохранить новый массив сообщений в хранилище
   */
  abstract setWorkers(workers: Worker[]): void;
}
