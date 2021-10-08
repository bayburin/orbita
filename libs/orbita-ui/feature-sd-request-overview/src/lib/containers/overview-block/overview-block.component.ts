import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { filter, distinctUntilChanged, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  SdRequestFacade,
  HistoryViewModel,
  EmployeeFacade,
  SvtFacade,
  AuthCenterFacade,
  ParameterFacade,
  Parameter,
  prioritiesViewModelArray,
  UserFacade,
  User,
  UserGroup,
  AttachmentViewForm,
  MessageFacade,
} from '@orbita/orbita-ui/domain-logic';
import { Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'lib-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss'],
})
export class OverviewBlockComponent implements OnInit, OnDestroy {
  // ========== Раздел вывода данных ==========

  sdRequest$ = this.sdRequestFacade.selectedEntity$;
  skeleton$ = this.sdRequestFacade.selectedSkeleton$;
  editMode$ = this.sdRequestFacade.selectedEditMode$;
  error$ = this.sdRequestFacade.selectedError$;
  loadingEmployee$ = this.employeeFacade.loadingEmployee$;
  loadedEmployee$ = this.employeeFacade.loadedEmployee$;
  employee$ = this.employeeFacade.employee$;
  loadingSvtItem$ = this.svtFacade.loadingItem$;
  loadedSvtItem$ = this.svtFacade.loadedItem$;
  svtItem$ = this.svtFacade.selectedItem$;
  loadingHost$ = this.acFacade.loadingHost$;
  loadedHost$ = this.acFacade.loadedHost$;
  host$ = this.acFacade.selectedHost$;
  loadingParameters$ = this.parameterFacade.loading$;
  loadedParameters$ = this.parameterFacade.loaded$;
  parameters$ = this.parameterFacade.all$;
  priorities = prioritiesViewModelArray;
  userGroups$ = this.userFacade.userGroups$;
  editMode: boolean;

  // ========== Раздел формы ==========

  form: FormGroup;
  loadingForm$ = this.sdRequestFacade.formLoading$;
  subscriptions = new Subscription();
  formNeedToGetNewData$ = this.sdRequestFacade.formNeedToGetNewData$;
  messages: Message[] = [];

  // ========== Другое ==========

  id: number;

  get newAttachmentsForm(): FormArray {
    return this.form.get('newAttachments') as FormArray;
  }

  get attachmentsForm(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private employeeFacade: EmployeeFacade,
    private svtFacade: SvtFacade,
    private acFacade: AuthCenterFacade,
    private parameterFacade: ParameterFacade,
    private fb: FormBuilder,
    private router: Router,
    private userFacade: UserFacade,
    private messageFacade: MessageFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
    this.buildForm();
    this.processingSubscribes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.sdRequestFacade.clearSelected();
  }

  trackByHistory(index: number, history: HistoryViewModel): number {
    return history.id;
  }

  trackByParameter(index: number, parameter: Parameter): number {
    return parameter.id;
  }

  trackByUserGroup(index: number, group: UserGroup): number {
    return group.id;
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  /**
   * Создает комментарий
   *
   * @param message - текст сообщения
   */
  createComment(message: string): void {
    this.messageFacade.createComment(this.id, message);
  }

  /**
   * Активирует/отключает режим редактирования
   */
  toggleEditMode(): void {
    this.sdRequestFacade.toggleEditMode();
  }

  /**
   * Сохраняет форму
   */
  saveForm(): void {
    if (this.form.valid) {
      this.sdRequestFacade.updateForm();
    }
  }

  /**
   * Актуализирует данные формы
   */
  reinitForm(): void {
    this.sdRequestFacade.reinitUpdateForm();
  }

  /**
   * Редиркетит на страницу заявок
   */
  navigateToSdRequests(): void {
    this.router.navigate(['/tickets']);
  }

  /**
   * Закрывает заявку
   *
   * @param id - номер заявки
   */
  closeSdRequest(id: number) {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите закрыть заявку?',
      accept: () => this.sdRequestFacade.closeSdRequest(id),
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      priority: [],
      finished_at_plan: [],
      workers: [[]],
      workflow: [null],
      attachments: this.fb.array([]),
      newAttachments: this.fb.array([]),
    });

    // Заполняет данные формы из хранилища
    this.subscriptions.add(
      this.sdRequestFacade.formEntity$
        .pipe(
          filter((data) => Boolean(data)),
          distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
        )
        .subscribe((formData) => {
          this.clearForm();
          this.form.patchValue(formData, { emitEvent: false });
          formData.attachments.forEach((attachment: AttachmentViewForm) =>
            this.attachmentsForm.push(this.buildAttachment(attachment), { emitEvent: false })
          );
        })
    );

    // Обновляет хранилище по любому изменению формы
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe((formData) => this.sdRequestFacade.changeForm(formData))
    );
  }

  /**
   * Создает объект формы для работы с файлами на основании существующих файлов
   *
   * @param attachment - файл
   */
  private buildAttachment(attachment: AttachmentViewForm): FormGroup {
    return this.fb.group({
      id: [attachment.id],
      claim_id: [attachment.claim_id],
      filename: [attachment.filename],
      _destroy: [attachment._destroy],
    });
  }

  /**
   * Очищает форму
   */
  private clearForm(): void {
    this.form.reset({}, { emitEvent: false });
    while (this.attachmentsForm.length !== 0) {
      this.attachmentsForm.removeAt(0, { emitEvent: false });
    }
    while (this.newAttachmentsForm.length !== 0) {
      this.newAttachmentsForm.removeAt(0, { emitEvent: false });
    }
  }

  /**
   * Обработка подписок
   */
  private processingSubscribes() {
    this.subscriptions.add(
      combineLatest([this.editMode$, this.formNeedToGetNewData$]).subscribe(([editMode, formNeedToGetNewData]) => {
        this.editMode = editMode;

        if (editMode && formNeedToGetNewData) {
          this.messages = [
            {
              severity: 'warn',
              summary: 'Внимание',
              detail: 'Заявка была изменена кем-то другим. Примите изменения до того, как сделаете свои.',
            },
          ];
        } else {
          this.messages = [];
        }
      })
    );
    this.subscriptions.add(
      this.sdRequest$
        .pipe(
          filter((data) => Boolean(data)),
          first()
        )
        .subscribe((sdRequest) => {
          this.id = sdRequest.id;
          this.messageFacade.connectToCommentsChannel(sdRequest.id);
        })
    );
  }
}
