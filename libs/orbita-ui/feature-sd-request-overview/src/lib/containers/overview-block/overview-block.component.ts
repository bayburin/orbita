import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  SdRequestFacade,
  HistoryViewModel,
  EmployeeFacade,
  SvtFacade,
  AuthCenterFacade,
  ParameterFacade,
  Parameter,
  WorkViewModel,
  WorkerViewModel,
  prioritiesViewModelArray,
  UserFacade,
  User,
  UserGroup,
  AttachmentViewForm,
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

  // ========== Дополнительно ==========

  storeFormSub: Subscription;
  valueChangesSub: Subscription;
  editModeSub: Subscription;

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
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
    this.buildForm();
    this.editModeSub = this.editMode$.subscribe((editMode) => (this.editMode = editMode));
  }

  ngOnDestroy(): void {
    this.sdRequestFacade.clearSelected();
    this.storeFormSub.unsubscribe();
    this.valueChangesSub.unsubscribe();
    this.editModeSub.unsubscribe();
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
    if (this.form.valid) {
      this.sdRequestFacade.updateForm();
    }
  }

  /**
   * Редиркетит на страницу заявок
   */
  navigateToSdRequests(): void {
    this.router.navigate(['/tickets']);
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
    this.storeFormSub = this.sdRequestFacade.formEntity$
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
      });
    // Обновляет хранилище по любому изменению формы
    this.valueChangesSub = this.form.valueChanges
      .pipe(distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe((formData) => this.sdRequestFacade.changeForm(formData));
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
}
