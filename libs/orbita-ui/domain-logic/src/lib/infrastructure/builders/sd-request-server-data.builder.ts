import { ModelBuilder } from './model.builder';
import { SdRequestsServerData } from '../../entities/server-data/sd-request-server-data.interface';
import { SdRequest } from './../../entities/models/sd-request.interface';

export class SdRequestsServerDataBuilder extends ModelBuilder<SdRequestsServerData> {
  constructor() {
    super();

    this.model = {
      sd_requests: [],
      meta: {
        current_page: null,
        total_count: null,
      },
    };
  }

  sd_requests(sdRequests: SdRequest[]): SdRequestsServerDataBuilder {
    this.model.sd_requests = sdRequests;

    return this;
  }

  current_page(currentPage: number): SdRequestsServerDataBuilder {
    this.model.meta.current_page = currentPage;

    return this;
  }

  total_count(totalCount: number): SdRequestsServerDataBuilder {
    this.model.meta.total_count = totalCount;

    return this;
  }
}
