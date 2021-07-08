import { SdRequestForm } from '../../entities/forms/sd-request-form.interface';
import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { WorkViewModel } from './../../entities/view-models/work-view-model.interface';
import { WorkForm } from './../../entities/forms/work-form.interface';
import { WorkerViewModel } from './../../entities/view-models/worker-view-model.interface';
import { WorkerForm } from './../../entities/forms/worker-form.interface';

export class SdRequestFormBuilder {
  static build(original: SdRequestViewModel = {} as SdRequestViewModel): SdRequestForm {
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
      works: WorkFormBuilder.build(original.works || []),
    };
  }
}

export class WorkFormBuilder {
  static build(original: WorkViewModel[]): WorkForm[] {
    return original.map((work) => ({
      id: work.id,
      claim_id: work.claim_id,
      group_id: work.group.id,
      workers: WorkerFormBuilder.build(work.workers || []),
    }));
  }
}

export class WorkerFormBuilder {
  static build(original: WorkerViewModel[]): WorkerForm[] {
    return original.map((worker) => ({
      id: worker.id,
      work_id: worker.work_id,
      user_id: worker.user_id,
      _destroy: false,
    }));
  }
}
