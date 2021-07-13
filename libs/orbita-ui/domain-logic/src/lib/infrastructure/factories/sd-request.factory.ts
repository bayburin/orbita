import { SdRequestForm } from './../../entities/forms/sd-request-form.interface';
import { WorkViewModel } from './../../entities/view-models/work-view-model.interface';
import { oFlatMap } from './../../../../../utils/src/lib/o-flat-map.function';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { CurrentUser } from './../../entities/models/auth/current-user.interface';
import { User } from '../../entities/models/user.interface';
import { WorkFactory } from './../factories/work.factory';
import { WorkerFactory } from './../factories/worker.factory';
import { MessageFactory } from './../factories/message.factory';

/**
 * Фабрика по созданию заявок
 */
export class SdRequestFactory {
  /**
   * Создает заявку в виде формы, которую заполняет пользователь
   *
   * @param sdRequest - текущая заявка, на основании которой создать форму
   */
  static createViewForm(sdRequest: SdRequestViewModel = {} as SdRequestViewModel): SdRequestViewForm {
    return {
      description: sdRequest.description,
      priority: sdRequest.priority,
      finished_at_plan: sdRequest.runtime?.finished_at_plan,
      workers: sdRequest.works
        ? oFlatMap((work: WorkViewModel) => work.workers.map((worker) => worker.user_id), sdRequest.works)
        : [],
      workflow: null,
    };
  }

  /**
   * Создает заявку в виде формы, адаптированной под сервер, на основании заполненной формы и существующей заявки
   *
   * @param formData - клиентская форма, заполненная пользователем
   * @param sdRequest - текущая заявка
   * @param currentUser - текущий пользователь
   * @param users - список пользователей системы
   */
  static createServerForm(
    formData: SdRequestViewForm,
    sdRequest: SdRequestViewModel,
    currentUser: CurrentUser,
    users: User[]
  ): SdRequestForm {
    const works = sdRequest.works.map((work) => WorkFactory.createExistingWorkForm(work));

    // Добавляет новых исполнителей
    formData.workers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      // Ищет работу для текущего пользователя цикла
      let currentWork = works.find((work) => work.group_id === user.group_id);

      // Создает работу указанной группы, если она не существует
      if (!currentWork) {
        currentWork = WorkFactory.createNewWorkForm(user.group_id);
        works.push(currentWork);
      }

      // Ищет исполнителя
      const currentWorker = currentWork.workers.find((worker) => worker.user_id === userId);

      // Добавляет исполнителя, если он отсутствует
      if (!currentWorker) {
        currentWork.workers.push(WorkerFactory.createNewWorkerForm(userId));
      }
    });

    // Обработка удаленных исполнителей
    works.forEach((workForm) => {
      workForm.workers.forEach((workerForm) => {
        if (!formData.workers.some((userId) => userId === workerForm.user_id)) {
          // Если исполнитель сохранен в базе, пометить на удаление
          if (workerForm.id) {
            workerForm._destroy = true;
          }
          // Если исполнитель еще не сохранен, отифильтровать его
          else {
            workForm.workers = workForm.workers.filter((worker) => worker.user_id !== workerForm.user_id);
          }
        }
      });
    });

    // Проверяет наличие текущего пользователя среди исполнителей
    let workCurrentUser = works.find((work) => work.group_id === currentUser.group_id);

    if (workCurrentUser) {
      if (!workCurrentUser.workers.some((worker) => worker.user_id == currentUser.id)) {
        workCurrentUser.workers.push(WorkerFactory.createNewWorkerForm(currentUser.id));
      }
    } else {
      workCurrentUser = WorkFactory.createNewWorkForm(currentUser.group_id, [
        WorkerFactory.createNewWorkerForm(currentUser.id),
      ]);
      works.push(workCurrentUser);
    }

    // Добавлет ход работы, если соответствующее поле заполнено
    if (formData.workflow) {
      workCurrentUser.workflows.push(MessageFactory.createMessage(currentUser.id, 'workflow', formData.workflow));
    }

    return {
      id: formData.id || sdRequest.id,
      description: formData.description,
      priority: formData.priority,
      finished_at_plan: formData.finished_at_plan,
      service_id: formData.service_id || sdRequest.service_id,
      service_name: formData.service_name || sdRequest.service_name,
      ticket_identity: formData.ticket_identity || sdRequest.ticket_identity,
      ticket_name: formData.ticket_name || sdRequest.service_name,
      works,
    };
  }
}
