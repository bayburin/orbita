import { SvtWorkplaceCount } from './svt/svt-workplace-count.interface';
import { SvtWorkplaceType } from './svt/svt-workplace-type.interface';
import { SvtWorkplace } from './svt/svt-workplace.interface';
import { SvtType } from './svt/svt-type.interface';
import { SvtItem } from './svt/svt-item.interface';
import { SdRequest } from './sd-request.interface';
import { Message } from './message.interface';
import { Work } from './work.interface';
import { History } from './history.interface';
import { Worker } from './worker.interface';
import { SdTicket } from './sd/sd-ticket.interface';
import { SdService } from './sd/sd-service.interface';
import { Attachment } from './attachment.interface';

// ================================== Заявки ==================================

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

// ================================== Услуги ==================================

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
 * Интерфейс объектов, на которые раскладывается (нормализуется) услуга
 */
export interface NormalizedSdTicketsEntities {
  tickets: SdTicketEntity;
  services: SdServiceEntity;
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSdTickets {
  entities: NormalizedSdTicketsEntities;
  result: number[];
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSdTicket {
  entities: NormalizedSdTicketsEntities;
  result: number;
}

// ================================== ВТ ==================================

/**
 * Интерфейс нормализованного вида ВТ
 */
export interface SvtItemEntity {
  [key: number]: SvtItem;
}

/**
 * Интерфейс нормализованного вида типа ВТ
 */
export interface SvtTypeEntity {
  [key: number]: SvtType;
}

/**
 * Интерфейс нормализованного вида РМ
 */
export interface SvtWorkplaceEntity {
  [key: number]: SvtWorkplace;
}

/**
 * Интерфейс нормализованного вида типа РМ
 */
export interface SvtWorkplaceTypeEntity {
  [key: number]: SvtWorkplaceType;
}

/**
 * Интерфейс нормализованного отдела РМ
 */
export interface SvtWorkplaceCountEntity {
  [key: number]: SvtWorkplaceCount;
}

/**
 * Интерфейс объектов, на которые раскладывается (нормализуется) ВТ
 */
export interface NormalizedSvtItemsEntities {
  items: SvtItemEntity;
  types: SvtTypeEntity;
  workplaces: SvtWorkplaceEntity;
  workplace_types: SvtWorkplaceTypeEntity;
  workplace_counts: SvtWorkplaceCountEntity;
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSvtItems {
  entities: NormalizedSvtItemsEntities;
  result: number[];
}

/**
 * Интерфейс нормализованных данных, возвращаемый функцией normalize
 */
export interface NormalizedSvtItem {
  entities: NormalizedSvtItemsEntities;
  result: number;
}

// ================================== *** ==================================
