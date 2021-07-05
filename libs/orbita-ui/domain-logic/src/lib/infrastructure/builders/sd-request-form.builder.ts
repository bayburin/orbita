import { SdRequestForm } from '../../entities/forms/sd-request-form.interface';
import { SdRequest } from './../../entities/models/sd-request.interface';

export class SdRequestFormBuilder {
  static build(original: SdRequest = {} as SdRequest): SdRequestForm {
    return {
      id: original.id,
      description: original.description,
      priority: original.priority,
      finished_at_plan: original.runtime?.finished_at_plan,
      service_id: original.service_id,
      service_name: original.service_name,
      ticket_identity: original.ticket_identity,
      ticket_name: original.ticket_name,
      rating: original.rating,
    };
  }
}
