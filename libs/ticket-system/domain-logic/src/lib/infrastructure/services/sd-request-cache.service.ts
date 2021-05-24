import { normalize } from 'normalizr';

import { SdRequestQueue } from './../../entities/sd-request-queue.interface';
import { NormalizedSdRequests } from './../../entities/models/normalized-data.interface';
import { sd_requests_schema } from './../schemas/normalizr.schema';

/**
 * Сервис для нормализации и денормализации данных по заявке
 */
export class SdRequestCacheService {
  static normalizeSdRequests(sd_requests: SdRequestQueue): NormalizedSdRequests {
    return normalize(sd_requests, sd_requests_schema);
  }
}
