import { normalize } from 'normalizr';

import { Service } from './../../entities/model/service.interface';
import { servicesSchema, serviceSchema } from './../schemas/normalizr.schema';
import { NormalizedServices } from './../../entities/normalized-data.interface';

/**
 * Сервис для нормализации данных по категориям
 */
export class ServiceCacheService {
  static normalizeServices(services: Service | Service[]): NormalizedServices {
    return Array.isArray(services) ? normalize(services, servicesSchema) : normalize(services, serviceSchema);
  }
}
