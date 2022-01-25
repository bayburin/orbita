import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
  ResponsibleUserForm,
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
      // Почему-то при ручном вызове поиска выдается строка "данные не найдены".
      // Чтобы исправить это далее атрибут noResults устанавливается вручную.
      if (this.employeeAutoCompletes?.length) {
        this.employeeAutoCompletes.forEach((el) => (el.noResults = employees.length ? false : true));
      }
    })
  );
  employeesLoading$ = this.employeeFacade.loading$;
  employee = new FormControl();
  selectedService$ = this.adminServiceFacade.selected$;
  @ViewChildren('employeeAutoComplete') employeeAutoCompletes: QueryList<AutoComplete>;

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
   * Добавить параметры в форму
   */
  addUser(): void {
    this.responsibleUsersForm.push(this.createResponsibleUser());
  }

  /**
   * Удаляет ответственного из формы
   *
   * @param i - индекс параметра в форме
   */
  removeUser(i: number): void {
    const findedControl = this.responsibleUsersForm.controls[i];

    if (findedControl.value.id) {
      (findedControl.get('_destroy') as FormControl).setValue(true);
    } else {
      this.responsibleUsersForm.removeAt(i);
    }
  }

  /**
   * Возвращает форму с табельным по указанному индексу из массива
   *
   * @param i - индекс из массива ответственных
   */
  getResponsibleUserTnForm(i: number): FormControl {
    return this.responsibleUsersForm.controls[i].get('tn') as FormControl;
  }

  /**
   * Возвращает форму с флагом удаления по указанному индексу из массива
   *
   * @param i - индекс из массива ответственных
   */
  getResponsibleUserDestroyForm(i: number): FormControl {
    return this.responsibleUsersForm.controls[i].get('_destroy') as FormControl;
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
   * Записывает в форму табельный номер выбранного ответственного
   *
   * @param employee - выбранный работник
   * @param i - индекс в массиве исполнителей
   */
  selectEmployee(employee: EmployeeShort, i: number): void {
    this.responsibleUsersForm.controls[i].patchValue({ tn: employee.personnelNo });
  }

  /**
   * Открывает окно autocomplete по указанному индексу
   *
   * @param i - индекс элемента в форме
   */
  showEmployeeAutoComplete(i: number) {
    this.employeeAutoCompletes.get(i).show();
  }

  /**
   * Очищает данные о выбранном работнике
   *
   * @param i - индекс элемента в форме
   */
  clearEmployee(i: number) {
    this.responsibleUsersForm.controls[i].patchValue({ tn: null });
  }

  private createResponsibleUser(tn?: number, id?: number): FormGroup {
    return this.fb.group({
      id: [id || null],
      tn: [tn || null, Validators.required],
      details: [],
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
        formData.responsible_users.forEach((param: ResponsibleUserForm) =>
          this.responsibleUsersForm.push(this.createResponsibleUser(param.tn, param.id), {
            emitEvent: false,
          })
        );
      });

    // При редактировании в поле выбора ответственных выводит данные о выбранных ответственных
    this.subscriptions.add(
      this.selectedService$.pipe(filter((data) => Boolean(data))).subscribe((selectedService) => {
        const employees = selectedService.responsible_users.map((user) => user.details).filter((user) => Boolean(user));

        this.responsibleUsersForm.controls.forEach((control) => {
          const currentTn = control.get('tn').value;
          const employee = employees.find((employee) => employee.personnelNo === currentTn);

          control.patchValue({ details: employee }, { emitEvent: false });
        });
      })
    );

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
