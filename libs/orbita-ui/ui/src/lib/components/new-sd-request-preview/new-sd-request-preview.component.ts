import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewSdRequestViewForm, User } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-new-sd-request-preview',
  templateUrl: './new-sd-request-preview.component.html',
  styleUrls: ['./new-sd-request-preview.component.scss'],
})
export class NewSdRequestPreviewComponent {
  /**
   * Заполненная форма заявки
   */
  sdRequest: NewSdRequestViewForm = this.config.data?.form;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {}

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  /**
   * Закрыть предпросмотр
   */
  returnToForm() {
    this.ref.close();
  }
}
