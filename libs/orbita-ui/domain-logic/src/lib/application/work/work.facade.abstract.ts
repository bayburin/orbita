import { Work } from '../../entities/models/work.interface';

export abstract class WorkFacadeAbstract {
  /**
   * Сохранить новый массив работ в хранилище
   *
   * @param works - список работ
   */
  abstract replaceAllWorks(works: Work[]): void;

  /**
   * Добавить новые или обновить существующие работы
   */
  abstract setWorks(works: Work[]): void;
}
