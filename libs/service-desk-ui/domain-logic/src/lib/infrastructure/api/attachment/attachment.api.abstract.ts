import { Observable } from 'rxjs';

/**
 * Содержит API файлов для обращения к серверу
 */
export abstract class AttachmentApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера файл
   *
   * @param id - id файла, который необходимо загрузить
   * @param answerId - id ответа, которому принадлежит файл
   */
  abstract download(id: number, answerId: number): Observable<Blob>;
}
