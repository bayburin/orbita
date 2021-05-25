import { History } from '../../entities/models/history.interface';

export abstract class HistoryFacadeAbstract {
  /**
   * Сохранить новый массив событий в хранилище
   */
  abstract setHistories(histories: History[]): void;
}
