import { ModelBuilder } from './model.builder';
import { SdRequestServerData } from '../../entities/server-data/sd-request-server-data.interface';
import { SdRequest } from './../../entities/models/sd-request.interface';

export class SdRequestServerDataBuilder extends ModelBuilder<SdRequestServerData> {
  constructor() {
    super();

    this.model = {
      sd_requests: [],
      meta: {
        current_page: null,
        total_count: null
      }
    };
  }

  sd_requests(sdRequests: SdRequest[]): SdRequestServerDataBuilder {
    this.model.sd_requests = sdRequests;

    return this;
  }

  current_page(currentPage: number): SdRequestServerDataBuilder {
    this.model.meta.current_page = currentPage;

    return this;
  }

  total_count(totalCount: number): SdRequestServerDataBuilder {
    this.model.meta.total_count = totalCount;

    return this;
  }
}
