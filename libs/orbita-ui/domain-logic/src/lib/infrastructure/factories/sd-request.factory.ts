import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { CurrentUser } from './../../entities/models/auth/current-user.interface';
import { User } from '../../entities/models/user.interface';
import { WorkFactory } from './../factories/work.factory';
import { WorkerFactory } from './../factories/worker.factory';
import { MessageFactory } from './../factories/message.factory';

export class SdRequestFactory {
  static createServerForm(
    currentUser: CurrentUser,
    sdRequest: SdRequestViewModel,
    users: User[],
    formData: SdRequestViewForm
  ) {
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
