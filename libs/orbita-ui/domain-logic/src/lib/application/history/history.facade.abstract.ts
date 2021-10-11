import { History } from '../../entities/models/history.interface';

export abstract class HistoryFacadeAbstract {
  /**
   * Сохранить новый массив событий в хранилище
   *
   * @param histories - список событий
   */
  abstract replaceAllHistories(histories: History[]): void;

  /**
   * Добавить новые или обновить существующие события
   *
   * @param histories - список событий
   */
  abstract setHistories(histories: History[]): void;
}
