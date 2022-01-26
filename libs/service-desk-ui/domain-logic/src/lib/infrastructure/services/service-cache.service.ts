import { schema, normalize, denormalize } from 'normalizr';

import { ServiceVM } from './../../entities/view-models/service-vm.interface';
import { ServiceOverviewVM } from './../../entities/view-models/service-overview-vm.interface';
import { Service } from '../../entities/models/service.interface';
import { NormalizedServices, NormalizedServicesEntities } from './../../entities/normalized-data.interface';

export const employees = new schema.Entity('employees');

export const responsibleUserSchema = new schema.Entity(
  'responsible_users',
  { details: employees },
  { processStrategy: (value) => ({ ...value, details: value.tn }) }
);

export const attachmentSchema = new schema.Entity('attachments');

export const answerSchema = new schema.Entity('answers', {
  attachments: [attachmentSchema],
});

export const tagSchema = new schema.Entity('tags');

export const questionSchema = new schema.Entity('questions', {
  answers: [answerSchema],
  ticket: {
    responsible_users: [responsibleUserSchema],
    tags: [tagSchema],
  },
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
  static normalizeServices(
    services: ServiceOverviewVM | ServiceOverviewVM[] | ServiceVM | ServiceVM[]
  ): NormalizedServices {
    return Array.isArray(services) ? normalize(services, servicesSchema) : normalize(services, serviceSchema);
  }

  static denormalizeService(service: Service, entities: NormalizedServicesEntities): ServiceVM | ServiceOverviewVM[] {
    return denormalize(service, serviceSchema, entities);
  }

  static denormalizeServices(
    serviceIds: number[],
    entities: NormalizedServicesEntities
  ): ServiceVM[] | ServiceOverviewVM[] {
    return denormalize(serviceIds, servicesSchema, entities);
  }
}
