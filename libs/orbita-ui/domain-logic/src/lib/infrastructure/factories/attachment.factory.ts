import { Attachment } from '../../entities/models/attachment.interface';
import { AttachmentForm } from './../../entities/forms/attachment-form.interface';
import { AttachmentViewForm } from '../../entities/forms/attachment-view-form.interface';

/**
 * Фабрика по созданию объектов, представляющих прикрепленные файлы
 */
export class AttachmentFactory {
  static createViewForm(attachment: Attachment): AttachmentViewForm {
    return {
      id: attachment.id,
      claim_id: attachment.claim_id,
      filename: attachment.filename,
      _destroy: false,
    };
  }

  static createForm(viewForm: AttachmentViewForm): AttachmentForm {
    return {
      id: viewForm.id,
      claim_id: viewForm.claim_id,
      _destroy: viewForm._destroy,
    };
  }
}
