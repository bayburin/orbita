import { SdRequest } from './sd-request.interface';
import { Message } from './message.interface';
import { Work } from './work.interface';
import { History } from './history.interface';
import { Worker } from './worker.interface';
import { SdTicket } from './sd/sd-ticket.interface';
import { SdService } from './sd/sd-service.interface';
import { Attachment } from './attachment.interface';

/**
 * Интерфейс нормализованного объекта заявки
 */
export interface SdRequestEntity {
  [key: number]: SdRequest;
}

/**
 * Интерфейс нормализованного объекта сообщения
 */
export interface MessageEntity {
  [key: number]: Message;
}

/**
 * Интерфейс нормализованного объекта работы
 */
export interface WorkEntity {
  [key: number]: Work;
}

/**
 * Интерфейс нормализованного объекта истории
 */
export interface HistoryEntity {
  [key: number]: History;
}

/**
 * Интерфейс нормализованного объекта работника
 */
export interface WorkerEntity {
  [key: number]: Worker;
}

/**
 * Интерфейс нормализованного объекта прикрепленного файла
 */
export interface AttachmentEntity {
  [key: number]: Attachment;
}

/**
 * Интерфейс объектов, на которые раскладывается (нормализуется) заявка
 */
export interface NormalizedSdRequestEntities {
  sd_requests: SdRequestEntity;
  comments: MessageEntity;
  works: WorkEntity;
  histories: HistoryEntity;
  workers: WorkerEntity;
  workflows: MessageEntity;
  attachments: AttachmentEntity;
}

/**
 * Интерфейс нормализованных данных списка заявок, возвращаемый функцией normalize
 */
export interface NormalizedSdRequests {
  entities: NormalizedSdRequestEntities;
  result: number[];
}

/**
 * Интерфейс нормализованных данных заявки, возвращаемый функцией normalize
 */
export interface NormalizedSdRequest {
  entities: NormalizedSdRequestEntities;
  result: number;
}

/**
 * Интерфейс нормализованного вида заявки
 */
export interface SdTicketEntity {
  [key: number]: SdTicket;
}

/**
 * Интерфейс нормализованного вида заявки
 */
export interface SdServiceEntity {
  [key: number]: SdService;
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSdTickets {
  entities: {
    tickets: SdTicketEntity;
    services: SdServiceEntity;
  };
}
