import { SvtItem } from './../models/svt/svt-item.interface';
import { SdTicket } from '../models/sd/sd-ticket.interface';
import { EmployeeShort } from './../models/employee/employee-short.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';

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
  ticket: SdTicket;

  /**
   * Флаг, показывающий, что услуга не найдена
   */
  noTicketFlag: boolean;

  /**
   * Описание заявки
   */
  description: string;

  /**
   * Выбранная техника
   */
  svtItem: SvtItem;

  /**
   * Список загружаемых файлов
   */
  attachments: File[];
}
