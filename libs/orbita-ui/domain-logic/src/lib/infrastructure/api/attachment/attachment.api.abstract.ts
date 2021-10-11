import { Observable } from 'rxjs';

import { Attachment } from '../../../entities/models/attachment.interface';

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
   * @param attachment - файл, который необходимо загрузить
   */
  abstract download(attachment: Attachment): Observable<Blob>;
}
