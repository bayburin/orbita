import { Service } from '../models/service.interface';
import { SvtItem } from '../models/svt/svt-item.interface';

/**
 * Форма заявки в свободной форме, которую заполняет пользователь
 */
export interface KaseViewForm {
  /**
   * Идентификатор пользователя
   */
  id_tn: number;

  /**
   * Табельный пользователя
   */
  user_tn: number;

  /**
   * ФИО
   */
  fio: string;

  /**
   * Отдел
   */
  dept: number;

  /**
   * email
   */
  email: string;

  /**
   * Телефон
   */
  phone: string;

  /**
   * Мобильный
   */
  mobile: string;

  /**
   * Услуга
   */
  service: Service;

  /**
   * Описание
   */
  desc: string;

  /**
   * Флаг, обозначающий "Услуга не найдена"
   */
  without_service: boolean;

  /**
   * Выбранная ВТ
   */
  item: SvtItem;

  /**
   * Флаг, обозначающий "Заявка без указания ВТ"
   */
  without_item: boolean;

  /**
   * Список файлов
   */
  files: File[];

  /**
   * Дополнительные поля
   */
  additional: {
    /**
     * Комментарий
     */
    comment: string;
  };
}
