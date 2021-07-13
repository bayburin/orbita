import { WorkerFactory } from './worker.factory';
import { WorkViewModel } from './../../entities/view-models/work-view-model.interface';
import { WorkerForm } from './../../entities/forms/worker-form.interface';
import { WorkForm } from './../../entities/forms/work-form.interface';
import { MessageForm } from './../../entities/forms/message-form.interface';

/**
 * Фабрика по созданию работ по заявке
 */
export class WorkFactory {
  /**
   * Создает существующую работу на основании текущей заявки и текущих работ
   *
   * @param model - текущая работа, как источник данных
   */
  static createExistingWorkForm(model: WorkViewModel): WorkForm {
    return {
      id: model.id,
      claim_id: model.claim_id,
      group_id: model.group.id,
      workers: model.workers.map((worker) => WorkerFactory.createExistingForm(worker)),
      // TODO: Заменить на model.workflows
      workflows: [],
    };
  }

  /**
   * Создает новую работу
   *
   * @param groupId - идентификатор группы
   * @param workers  - список исполнителей
   * @param workflows - список сообщений о ходе работы
   */
  static createNewWorkForm(groupId: number, workers: WorkerForm[] = [], workflows: MessageForm[] = []): WorkForm {
    return {
      group_id: groupId,
      workers: workers,
      workflows: workflows,
    };
  }
}
