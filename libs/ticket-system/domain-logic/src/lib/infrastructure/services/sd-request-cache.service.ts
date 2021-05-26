import { normalize } from 'normalizr';

import { SdRequestServerData } from './../../entities/server-data/sd-request-server-data.interface';
import { NormalizedSdRequests } from './../../entities/models/normalized-data.interface';
import { sd_requests_schema } from './../schemas/normalizr.schema';

/**
 * Сервис для нормализации данных по заявке
 */
export class SdRequestCacheService {
  static normalizeSdRequests(sd_requests: SdRequestServerData): NormalizedSdRequests {
    return normalize(sd_requests, sd_requests_schema);
  }
}
