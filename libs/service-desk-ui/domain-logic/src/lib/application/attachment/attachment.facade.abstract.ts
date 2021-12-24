import { Observable } from 'rxjs';
import { Attachment } from '../../entities/model/attachment.interface';

export abstract class AttachmentFacadeAbstract {
  /**
   * Список id тех файлов, которые сейчас загружаются
   */
  loadingIds$: Observable<number[]>;
  /**
   * Список id тех файлов, которые не удалось скачать
   */
  errorIds$: Observable<number[]>;

  /**
   * Скачать указанный файл
   */
  abstract download(attachment: Attachment): void;
}
