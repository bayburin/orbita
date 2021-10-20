import { oFlatMap } from '@orbita/orbita-ui/utils';
import { SdRequestForm } from './../../entities/forms/sd-request-form.interface';
import { WorkViewModel } from './../../entities/view-models/work-view-model.interface';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { CurrentUser } from './../../entities/models/auth/current-user.interface';
import { User } from '../../entities/models/user.interface';
import { WorkFactory } from './../factories/work.factory';
import { WorkerFactory } from './../factories/worker.factory';
import { MessageFactory } from './../factories/message.factory';
import { AttachmentFactory } from './attachment.factory';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';
import { SourceSnapshotForm } from './../../entities/forms/source-snapshot-form.interface';
import { WorkForm } from './../../entities/forms/work-form.interface';

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
      priority: sdRequest.priority,
      finished_at_plan: sdRequest.runtime?.finished_at_plan,
      workers: sdRequest.works
        ? oFlatMap((work: WorkViewModel) => work.workers.map((worker) => worker.user_id), sdRequest.works)
        : [],
      workflow: null,
      attachments: sdRequest.attachments?.map((attachment) => AttachmentFactory.createViewForm(attachment)) || [],
      newAttachments: [],
    };
  }

  /**
   * Создает новую заявку в виде формы, адаптированной под сервер, на основании заполненной формы
   *
   * @param viewForm - клиентская форма, заполненная пользователем
   * @param users - список пользователей системы
   */
  static createNewServerForm(viewForm: NewSdRequestViewForm): FormData {
    let snapshot: SourceSnapshotForm;

    // Обработка работника
    if (viewForm.employeeManuallyFlag) {
      snapshot = Object.assign({}, viewForm.source_snapshot);
    } else {
      snapshot = {
        id_tn: viewForm.employee.id,
        user_attrs: viewForm.source_snapshot.user_attrs,
      };
    }

    // Обработка ВТ
    const svtItem = viewForm.svtItem;

    if (svtItem) {
      snapshot.invent_num = svtItem.invent_num;
      snapshot.svt_item_id = svtItem.item_id;
      snapshot.barcode = svtItem.barcode_item.id;
    }

    // Обработка услуги и списка исполнителей (массив пользователей)
    let service_id = null;
    let service_name = null;
    let ticket_identity = null;
    let ticket_name = null;
    let sla = null;
    const works: WorkForm[] = [];

    if (!viewForm.noTicketFlag) {
      const ticket = viewForm.ticket;

      service_id = ticket.service_id;
      service_name = ticket.service.name;
      ticket_identity = ticket.identity;
      ticket_name = ticket.name;
      sla = ticket.sla;

      ticket.responsible_users.forEach((user) => {
        // Ищет работу для текущего пользователя цикла
        let currentWork = works.find((work) => work.group_id === user.group_id);

        // Создает работу указанной группы, если она не существует
        if (!currentWork) {
          currentWork = WorkFactory.createNewWorkForm(user.group_id);
          works.push(currentWork);
        }

        // Ищет исполнителя
        const currentWorker = currentWork.workers.find((worker) => worker.user_id === user.id);

        // Добавляет исполнителя, если он отсутствует
        if (!currentWorker) {
          currentWork.workers.push(WorkerFactory.createNewWorkerForm(user.id));
        }
      });
    }

    const formData = new FormData();
    const dataForServer: SdRequestForm = {
      source_snapshot: snapshot,
      description: viewForm.description,
      status: viewForm.status,
      service_id,
      service_name,
      ticket_identity,
      ticket_name,
      sla,
      works,
    };

    formData.set('sd_request', JSON.stringify(dataForServer));
    viewForm.attachments.forEach((attach) => formData.append('new_attachments[]', attach));

    return formData;
  }

  /**
   * Создает заявку в виде формы, адаптированной под сервер, на основании заполненной формы и существующей заявки
   *
   * @param viewForm - клиентская форма, заполненная пользователем
   * @param sdRequest - текущая заявка
   * @param currentUser - текущий пользователь
   * @param users - список пользователей системы
   */
  static createServerForm(
    viewForm: SdRequestViewForm,
    sdRequest: SdRequestViewModel,
    currentUser: CurrentUser,
    users: User[]
  ): FormData {
    const works = sdRequest.works.map((work) => WorkFactory.createExistingWorkForm(work));

    // Добавляет новых исполнителей
    viewForm.workers.forEach((userId) => {
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
        if (!viewForm.workers.some((userId) => userId === workerForm.user_id)) {
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
    if (viewForm.workflow) {
      workCurrentUser.workflows.push(MessageFactory.createMessage(currentUser.id, 'workflow', viewForm.workflow));
    }

    const formData = new FormData();
    const dataForServer: SdRequestForm = {
      priority: viewForm.priority,
      finished_at_plan: `${viewForm.finished_at_plan}`,
      works,
      attachments: viewForm.attachments?.map((attachment) => AttachmentFactory.createForm(attachment)) || [],
    };

    formData.set('sd_request', JSON.stringify(dataForServer));
    viewForm.newAttachments.forEach((attach) => formData.append('new_attachments[]', attach));

    return formData;
  }
}
