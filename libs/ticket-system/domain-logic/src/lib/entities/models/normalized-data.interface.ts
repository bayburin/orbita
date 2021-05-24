import { SdRequest } from './sd-request.interface';
import { Message } from './message.interface';

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
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSdRequests {
  entities: {
    sd_requests: NormalizedSdRequest,
    comments: NormalizedMessage
  }
}
