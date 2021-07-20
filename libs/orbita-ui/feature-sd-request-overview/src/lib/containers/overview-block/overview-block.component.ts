import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  SdRequestFacade,
  HistoryViewModel,
  Statuses,
  StatusesViewModel,
  getViewModelStatus,
  Priorities,
  PrioritiesViewModel,
  getViewModelPriority,
  EmployeeFacade,
  SvtFacade,
  AuthCenterFacade,
  CmsStatuses,
  CmsStatusesViewModel,
  getViewModelCmsStatuses,
  CsaStatuses,
  CsaStatusesViewModel,
  getViewModelCsaStatuses,
  ParameterFacade,
  Parameter,
  WorkViewModel,
  WorkerViewModel,
  prioritiesViewModelArray,
  UserFacade,
  User,
  UserGroup,
  Attachment,
  AttachmentFacade,
} from '@orbita/orbita-ui/domain-logic';

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
  orderedHistories$ = this.sdRequestFacade.orderedHistories$;
  orderedWorkflows$ = this.sdRequestFacade.orderedWorkflows$;
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
  loadingAttachments$ = this.attachmentFacade.loadingIds$;
  loadingAttachments: number[];
  errorAttachments$ = this.attachmentFacade.errorIds$;
  errorAttachments: number[];

  // ========== Раздел формы ==========

  form: FormGroup;
  loadingForm$ = this.sdRequestFacade.formLoading$;

  // ========== Дополнительно ==========

  storeFormSub: Subscription;
  valueChangesSub: Subscription;
  editModeSub: Subscription;
  loadingAttachmentsSub: Subscription;
  errorAttachmentsSub: Subscription;

  get attachmentsForm(): FormArray {
    return this.form.get('newAttachments') as FormArray;
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
    private attachmentFacade: AttachmentFacade
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
    this.buildForm();
    this.editModeSub = this.editMode$.subscribe((editMode) => (this.editMode = editMode));
    this.loadingAttachmentsSub = this.loadingAttachments$.subscribe((ids) => (this.loadingAttachments = ids));
    this.errorAttachmentsSub = this.errorAttachments$.subscribe((ids) => (this.errorAttachments = ids));
  }

  ngOnDestroy(): void {
    this.sdRequestFacade.clearSelected();
    this.storeFormSub.unsubscribe();
    this.valueChangesSub.unsubscribe();
    this.editModeSub.unsubscribe();
    this.loadingAttachmentsSub.unsubscribe();
    this.errorAttachmentsSub.unsubscribe();
  }

  trackByHistory(index: number, history: HistoryViewModel): number {
    return history.id;
  }

  trackByParameter(index: number, parameter: Parameter): number {
    return parameter.id;
  }

  trackByWork(index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByWorker(index: number, worker: WorkerViewModel): number {
    return worker.id;
  }

  trackByUserGroup(index: number, group: UserGroup): number {
    return group.id;
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  trackByAttachment(index: number, attachment: Attachment): number {
    return attachment.id;
  }

  /**
   * Возвращает объект StatusesViewModel, в котором содержатся данные о статусе для представления
   *
   * @param status - статус
   */
  status(status: Statuses): StatusesViewModel {
    return getViewModelStatus(status);
  }

  /**
   * Возвращает объект PrioritiesViewModel, в котором содержатся данные о приоритете для представления
   *
   * @param priority - приоритет
   */
  priority(priority: Priorities): PrioritiesViewModel {
    return getViewModelPriority(priority);
  }

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе программы Аудит
   *
   * @param status - статус
   */
  cmsStatus(status: CmsStatuses): CmsStatusesViewModel {
    return getViewModelCmsStatuses(status);
  }

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе антивируса
   *
   * @param status - статус
   */
  csaStatus(status: CsaStatuses): CsaStatusesViewModel {
    return getViewModelCsaStatuses(status);
  }

  sendMessage(message: string): void {
    console.log(message);
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
    this.sdRequestFacade.updateForm();
  }

  /**
   * Редиркетит на страницу заявок
   */
  navigateToSdRequests(): void {
    this.router.navigate(['/tickets']);
  }

  /**
   * Скачивает файл
   */
  downloadAttachment(attachment: Attachment): void {
    this.attachmentFacade.download(attachment);
  }

  /**
   * Проверяет, скачивается ли файл в данный момент
   *
   * @param attachment - файл
   */
  isAttachmentDownloading(attachment: Attachment): boolean {
    return this.loadingAttachments.indexOf(attachment.id) !== -1;
  }

  /**
   * Проверяет, появилась ли ошибка при скачивании файла
   *
   * @param attachment - файл
   */
  isAttachmentError(attachment: Attachment): boolean {
    return this.errorAttachments.indexOf(attachment.id) !== -1;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      description: [],
      priority: [],
      finished_at_plan: [],
      workers: [[]],
      workflow: [null],
      attachments: [],
      newAttachments: this.fb.array([]),
    });
    // Заполняет данные формы из хранилища
    this.storeFormSub = this.sdRequestFacade.formEntity$
      .pipe(
        filter((data) => Boolean(data)),
        distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((formData) => this.form.patchValue(formData, { emitEvent: false }));
    // Обновляет хранилище по любому изменению формы
    this.valueChangesSub = this.form.valueChanges
      .pipe(distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe((formData) => this.sdRequestFacade.changeForm(formData));
  }
}
