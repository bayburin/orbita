import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminUserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';
import { Subscription } from 'rxjs';
import { filter, take, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'service-desk-ui-admin-home-admin-user-recommendation-form',
  templateUrl: './admin-user-recommendation-form.component.html',
  styleUrls: ['./admin-user-recommendation-form.component.scss'],
})
export class AdminUserRecommendationFormComponent implements OnInit, OnDestroy {
  formLoading$ = this.adminUserRecommendationFacade.formLoading$;
  form: FormGroup;
  submitted = false;
  subscriptions = new Subscription();

  get titleForm(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get linkForm(): FormControl {
    return this.form.get('link') as FormControl;
  }

  get queryParamsForm(): FormArray {
    return this.form.get('query_params') as FormArray;
  }

  constructor(
    private adminUserRecommendationFacade: AdminUserRecommendationFacade,
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
  addParam(): void {
    this.queryParamsForm.push(this.createQueryParams());
  }

  /**
   * Удалить параметры из формы
   *
   * @param index - индекс параметра в форме
   */
  removeParam(index: number): void {
    this.queryParamsForm.removeAt(index);
  }

  /**
   * Возвращает форму параметров по указанному индексу из массива
   *
   * @param i - индекс из массива параметров
   */
  getQueryParamsNameForm(i: number): FormControl {
    return this.queryParamsForm.controls[i].get('name') as FormControl;
  }

  /**
   * Событие отправки формы.
   */
  submitForm(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.adminUserRecommendationFacade.saveForm();
    }
  }

  /**
   * Закрывает форму
   */
  closeForm(): void {
    this.adminUserRecommendationFacade.closeForm();
  }

  private createQueryParams(name?: string, value?: string | number): FormGroup {
    return this.fb.group({
      name: [name || null, Validators.required],
      value: [value || ''],
    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [],
      title: [null, Validators.required],
      external: [false, Validators.required],
      link: [null, Validators.required],
      order: [],
      query_params: this.fb.array([]),
    });

    // Заполняет данные формы из хранилища
    this.adminUserRecommendationFacade.formData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((formData) => {
        this.form.patchValue(formData, { emitEvent: false });
        formData.query_params.forEach((param: { name: string; value: string | number }) =>
          this.queryParamsForm.push(this.createQueryParams(param.name, param.value), { emitEvent: false })
        );
      });

    // Обновляет хранилище по любому изменению формы
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          map((formData) => formData),
          distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
        )
        .subscribe((formData) => this.adminUserRecommendationFacade.changeForm(formData))
    );
  }
}
