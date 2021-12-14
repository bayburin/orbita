import { schema, normalize } from 'normalizr';

import { Service } from './../../entities/model/service.interface';
import { NormalizedServices } from './../../entities/normalized-data.interface';

export const responsibleUserSchema = new schema.Entity('responsible_users');

export const answerAttachmentSchema = new schema.Entity('answer_attachments');

export const answerSchema = new schema.Entity('answers');

export const questionSchema = new schema.Entity('questions', {
  answers: [answerSchema],
  responsible_users: [responsibleUserSchema],
});

export const categorySchema = new schema.Entity('categories');

export const serviceSchema = new schema.Entity('services', {
  category: categorySchema,
  questions: [questionSchema],
});

export const servicesSchema = new schema.Array(serviceSchema);

/**
 * Сервис для нормализации данных по категориям
 */
export class ServiceCacheService {
  static normalizeServices(services: Service | Service[]): NormalizedServices {
    return Array.isArray(services) ? normalize(services, servicesSchema) : normalize(services, serviceSchema);
  }
}
