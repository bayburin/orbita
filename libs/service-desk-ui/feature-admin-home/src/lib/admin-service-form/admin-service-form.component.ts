import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, take, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  AdminCategoryFacade,
  AdminServiceFacade,
  EmployeeFacade,
  EmployeeShort,
} from '@orbita/service-desk-ui/domain-logic';

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
  employees$ = this.employeeFacade.searched$.pipe(
    tap((employees) => {
      if (this.employeeAutoComplete) {
        // Почему-то при ручном вызове поиска выдается строка "данные не найдены".
        // Чтобы исправить это далее атрибут noResults устанавливается вручную.
        this.employeeAutoComplete.noResults = employees.length ? false : true;
      }
    })
  );
  employeesLoading$ = this.employeeFacade.loading$;
  employee = new FormControl();
  @ViewChild('employeeAutoComplete') employeeAutoComplete: AutoComplete;

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
    private employeeFacade: EmployeeFacade,
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

  /**
   * Выполняет поиск работников
   *
   * @param event - событие поиска
   */
  searchEmployee(event: any): void {
    if (event.query && typeof event.query === 'string') {
      const key = /^\d+$/.test(event.query) ? 'personnelNo' : 'fullName';

      this.employeeFacade.search(key, event.query.trim());
    }
  }

  /**
   * Добавляет выбранного пользователя в форму заявки
   *
   * @param employee - выбранный работник
   */
  selectEmployee(employee: EmployeeShort): void {
    this.responsibleUsersForm.push(this.createResponsibleUser(employee.personnelNo));
  }

  /**
   * Удаляет выбранного пользователя из формы заявки
   *
   * @param employee - выбранный работник
   */
  unselectEmployee(employee: EmployeeShort): void {
    const findedControl = this.responsibleUsersForm.controls.find(
      (control) => control.value.tn === employee.personnelNo
    );

    if (findedControl.value.id) {
      (findedControl.get('_destroy') as FormControl).setValue(true);
    } else {
      const index = this.responsibleUsersForm.controls.findIndex((control) => control == findedControl);

      if (index !== -1) {
        this.responsibleUsersForm.removeAt(index);
      }
    }
  }

  private createResponsibleUser(tn?: number, id?: number): FormGroup {
    return this.fb.group({
      id: [id || null],
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
