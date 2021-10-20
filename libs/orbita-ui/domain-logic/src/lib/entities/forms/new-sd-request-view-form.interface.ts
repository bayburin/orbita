import { SvtItem } from './../models/svt/svt-item.interface';
import { SdTicketViewModel } from './../view-models/sd-ticket-view-model.interface';
import { EmployeeShort } from './../models/employee/employee-short.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';
import { Statuses } from './../models/ticket.interface';

/**
 * Форма новой заявки, которую заполняет пользователь
 */
export interface NewSdRequestViewForm {
  /**
   * Данные на момент создания заявки/кейса
   */
  source_snapshot: SourceSnapshotForm;

  /**
   * Работник который подает заявку
   */
  employee: EmployeeShort;

  /**
   * Флаг, показывающий, внесены ли данные вручную
   */
  employeeManuallyFlag: boolean;

  /**
   * Вид услуги
   */
  ticket: SdTicketViewModel;

  /**
   * Флаг, показывающий, что услуга не найдена
   */
  noTicketFlag: boolean;

  /**
   * Описание заявки
   */
  description: string;

  /**
   * Статус
   */
  status: Statuses;

  /**
   * Выбранная техника
   */
  svtItem: SvtItem;

  /**
   * Список загружаемых файлов
   */
  attachments: File[];
}
