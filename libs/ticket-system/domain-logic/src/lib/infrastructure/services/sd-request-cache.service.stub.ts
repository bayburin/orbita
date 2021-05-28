import { SdRequest } from '../../entities/models/sd-request.interface';
import { Message } from '../../entities/models/message.interface';
import { Work } from '../../entities/models/work.interface';
import { History } from '../../entities/models/history.interface';
import { Worker } from '../../entities/models/worker.interface';

export class SdRequestCacheServiceStub {
  static normalizeSdRequests(sdRequests: SdRequest[] = []) {
    return {
      entities: {
        sd_requests: sdRequests,
        comments: [] as Message[],
        works: [] as Work[],
        histories: [] as History[],
        workers: [] as Worker[]
      }
    }
  }
}
