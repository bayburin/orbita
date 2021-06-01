import { Work } from '../../entities/models/work.interface';

export abstract class WorkFacadeAbstract {
  /**
   * Сохранить новый массив работ в хранилище
   */
  abstract setWorks(works: Work[]): void;
}
