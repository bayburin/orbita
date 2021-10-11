import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewSdRequestViewForm, User, SdRequestFacade } from '@orbita/orbita-ui/domain-logic';

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
  /**
   * Флаг валидации формы
   */
  valid = this.config.data?.valid;
  /**
   * ИНдикатор загрузки
   */
  loading$ = this.sdRequestFacade.newFormLoading$;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  /**
   * Создает заявку
   */
  saveForm() {
    this.sdRequestFacade.createForm();
  }

  /**
   * Закрывает предпросмотр
   */
  returnToForm() {
    this.ref.close();
  }
}
