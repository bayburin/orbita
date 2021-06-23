import { WorkerFacadeAbstract } from './worker.facade.abstract';
import { Worker } from '../../entities/models/worker.interface';

export class WorkerFacadeStub implements WorkerFacadeAbstract {
  replaceAllWorkers(workers: Worker[]) {
    /** */
  }

  setWorkers(workers: Worker[]) {
    /** */
  }
}
