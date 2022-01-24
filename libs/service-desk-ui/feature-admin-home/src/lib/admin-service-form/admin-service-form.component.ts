import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminCategoryFacade, AdminServiceFacade } from '@orbita/service-desk-ui/domain-logic';
import { Subscription } from 'rxjs';
import { filter, take, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'service-desk-ui-admin-home-admin-service-form',
  templateUrl: './admin-service-form.component.html',
  styleUrls: ['./admin-service-form.component.scss'],
})
export class AdminServiceFormComponent implements OnInit, OnDestroy {
  categories$ = this.adminCategoryFacade.all$;
  formLoading$ = this.adminServiceFacade.formLoading$;
  form: FormGroup;
  submitted = false;
  subscriptions = new Subscription();

  get categoryIdForm(): FormControl {
    return this.form.get('category_id') as FormControl;
  }

  get nameForm(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get isHiddenForm(): FormControl {
    return this.form.get('is_hidden') as FormControl;
  }

  get hasCommonCaseForm(): FormControl {
    return this.form.get('has_common_case') as FormControl;
  }

  get responsibleUsersForm(): FormArray {
    return this.form.get('responsible_users') as FormArray;
  }

  constructor(
    private adminServiceFacade: AdminServiceFacade,
    private adminCategoryFacade: AdminCategoryFacade,
    private fb: FormBuilder,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Возвращает форму ответственных по указанному индексу из массива
   *
   * @param i - индекс из массива параметров
   */
  getResponsibleUserTnForm(i: number): FormControl {
    return this.responsibleUsersForm.controls[i].get('tn') as FormControl;
  }

  /**
   * Событие отправки формы.
   */
  submitForm(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.adminServiceFacade.saveForm();
    }
  }

  /**
   * Закрывает форму
   */
  closeForm(): void {
    this.adminServiceFacade.closeForm();
  }

  private createResponsibleUser(tn?: number, id?: number): FormGroup {
    return this.fb.group({
      responseable_type: ['Service'],
      responseable_id: [id || null],
      tn: [tn || null, Validators.required],
      _destroy: [false],
    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [],
      category_id: [null, Validators.required],
      name: [null, Validators.required],
      short_description: [],
      is_hidden: [false, Validators.required],
      has_common_case: [false, Validators.required],
      responsible_users: this.fb.array([]),
    });

    // Заполняет данные формы из хранилища
    this.adminServiceFacade.formData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((formData) => {
        this.form.patchValue(formData, { emitEvent: false });
        // formData.responsible_users.forEach((param: ResponsibleUserForm) =>
        //   this.responsibleUsersForm.push(this.createResponsibleUser(param.name, param.value), { emitEvent: false })
        // );
      });

    // Обновляет хранилище по любому изменению формы
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          map((formData) => formData),
          distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
        )
        .subscribe((formData) => this.adminServiceFacade.changeForm(formData))
    );
  }
}
