import { normalize } from 'normalizr';

import { SdRequest } from './../../entities/models/sd-request.interface';
import { NormalizedSdRequests, NormalizedSdRequest } from './../../entities/models/normalized-data.interface';
import { sdRequestsSchema, sdRequestSchema } from './../schemas/normalizr.schema';

/**
 * Сервис для нормализации данных по заявке
 */
export class SdRequestCacheService {
  static normalizeSdRequests(sd_requests: SdRequest[]): NormalizedSdRequests {
    return normalize(sd_requests, sdRequestsSchema);
  }

  static normalizeSdRequest(sd_request: SdRequest): NormalizedSdRequest {
    return normalize(sd_request, sdRequestSchema);
  }
}
