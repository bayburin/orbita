import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';
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
  saveForm() {
    this.sdRequestFacade.updateForm();
  }

  /**
   * Редиркетит на страницу заявок
   */
  navigateToSdRequests() {
    this.router.navigate(['/tickets']);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      priority: [],
      finished_at_plan: [],
      works: [[]],
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
