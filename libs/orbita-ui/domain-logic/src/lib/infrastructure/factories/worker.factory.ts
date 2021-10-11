import { WorkerViewModel } from './../../entities/view-models/worker-view-model.interface';
import { WorkerForm } from './../../entities/forms/worker-form.interface';

/**
 * Фабрика по созданию исполнителей
 */
export class WorkerFactory {
  /**
   * Создает существующего исполнителя на основании текущей заявки, текущих работ и текущего исполнителя
   *
   * @param model -  текущий исполнитель, как источник данных
   */
  static createExistingForm(model: WorkerViewModel): WorkerForm {
    return {
      id: model.id,
      work_id: model.work_id,
      user_id: model.user_id,
      _destroy: false,
    };
  }

  /**
   * Создает нового исполнителя
   *
   * @param userId - идентификатор исполнителя
   */
  static createNewWorkerForm(userId: number): WorkerForm {
    return { user_id: userId };
  }
}
