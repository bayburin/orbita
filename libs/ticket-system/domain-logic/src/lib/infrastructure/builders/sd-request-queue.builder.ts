import { ModelBuilder } from './model.builder';
import { SdRequestQueue } from '../../entities/sd-request-queue.interface';
import { SdRequest } from './../../entities/sd-request.interface';

export class SdRequestQueueBuilder extends ModelBuilder<SdRequestQueue> {
  constructor() {
    super();

    this.model = {
      sd_requests: [],
      meta: {
        current_page: null,
        total_pages: null,
        total_count: null
      }
    };
  }

  sd_requests(sdRequests: SdRequest[]): SdRequestQueueBuilder {
    this.model.sd_requests = sdRequests;

    return this;
  }

  current_page(currentPage: number): SdRequestQueueBuilder {
    this.model.meta.current_page = currentPage;

    return this;
  }

  total_pages(totalPages: number): SdRequestQueueBuilder {
    this.model.meta.total_pages = totalPages;

    return this;
  }

  total_count(totalCount: number): SdRequestQueueBuilder {
    this.model.meta.total_count = totalCount;

    return this;
  }
}
