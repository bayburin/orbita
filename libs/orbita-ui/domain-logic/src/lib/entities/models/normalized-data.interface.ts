import { SdRequest } from './sd-request.interface';
import { Message } from './message.interface';
import { Work } from './work.interface';
import { History } from './history.interface';
import { Worker } from './worker.interface';

/**
 * Интерфейс нормализованного объекта заявки
 */
export interface NormalizedSdRequest {
  [key: number]: SdRequest;
}

/**
 * Интерфейс нормализованного объекта сообщения
 */
export interface NormalizedMessage {
  [key: number]: Message;
}

/**
 * Интерфейс нормализованного объекта работы
 */
export interface NormalizedWork {
  [key: number]: Work;
}

/**
 * Интерфейс нормализованного объекта истории
 */
export interface NormalizedHistory {
  [key: number]: History;
}

/**
 * Интерфейс нормализованного объекта работника
 */
export interface NormalizedWorker {
  [key: number]: Worker;
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSdRequests {
  entities: {
    sd_requests: NormalizedSdRequest;
    comments: NormalizedMessage;
    works: NormalizedWork;
    histories: NormalizedHistory;
    workers: NormalizedWorker;
  };
}
