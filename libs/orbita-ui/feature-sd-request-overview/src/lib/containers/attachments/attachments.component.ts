import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Attachment, AttachmentFacade, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  loadingAttachments: number[];
  errorAttachments: number[];
  subscriptions = new Subscription();
  @Input() sdRequest: SdRequestViewModel;
  @Input() editMode: boolean;
  @Input() newAttachmentsForm: FormArray;
  @Input() attachmentsForm: FormArray;

  constructor(private attachmentFacade: AttachmentFacade) {}

  ngOnInit(): void {
    this.subscriptions.add(this.attachmentFacade.loadingIds$.subscribe((ids) => (this.loadingAttachments = ids)));
    this.subscriptions.add(this.attachmentFacade.errorIds$.subscribe((ids) => (this.errorAttachments = ids)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackByAttachment(index: number, attachment: Attachment): number {
    return attachment.id;
  }

  /**
   * Преобразовать полученный объект AbstractControl в FormGroup
   *
   * @param point - объект AbstractControl
   */
  toFormGroup(point: AbstractControl): FormGroup {
    return point as FormGroup;
  }

  /**
   * Скачивает файл
   */
  downloadAttachment(attachment: Attachment): void {
    this.attachmentFacade.download(attachment);
  }

  /**
   * Пометить файл для удаления
   *
   * @param attachment - файл
   */
  markForDestruction(attachment: FormGroup): void {
    attachment.get('_destroy').setValue(true);
  }

  /**
   * Отменить пометку файла на удаление
   *
   * @param attachment - файл
   */
  demarkForDestruction(attachment: FormGroup): void {
    attachment.get('_destroy').setValue(false);
  }
}
