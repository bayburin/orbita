import { schema, normalize, denormalize } from 'normalizr';

import { ServiceVM } from './../../entities/view-models/service-vm.interface';
import { Service } from './../../entities/model/service.interface';
import { NormalizedServices, NormalizedServicesEntities } from './../../entities/normalized-data.interface';

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
  responsible_users: [responsibleUserSchema],
});

export const servicesSchema = new schema.Array(serviceSchema);

/**
 * Сервис для нормализации данных по категориям
 */
export class ServiceCacheService {
  static normalizeServices(services: Service | Service[]): NormalizedServices {
    return Array.isArray(services) ? normalize(services, servicesSchema) : normalize(services, serviceSchema);
  }

  static denormalizeService(service: Service, entities: NormalizedServicesEntities): ServiceVM {
    return denormalize(service, serviceSchema, entities);
  }

  static denormalizeServices(serviceIds: number[], entities: NormalizedServicesEntities): ServiceVM[] {
    return denormalize(serviceIds, servicesSchema, entities);
  }
}
