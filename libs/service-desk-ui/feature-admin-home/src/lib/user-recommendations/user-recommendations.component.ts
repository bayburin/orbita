import { filter, take, distinctUntilChanged, skipUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'service-desk-ui-admin-home-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  userRecommendations$ = this.userRecommendationFacade.all$;
  loading$ = this.userRecommendationFacade.loading$;
  loaded$ = this.userRecommendationFacade.loaded$;
  formDisplay$ = this.userRecommendationFacade.formDisplay$;
  formLoading$ = this.userRecommendationFacade.formLoading$;
  form: FormGroup;
  submitted = false;

  get titleForm(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get linkForm(): FormControl {
    return this.form.get('link') as FormControl;
  }

  get queryParamsForm(): FormArray {
    return this.form.get('query_params') as FormArray;
  }

  constructor(private userRecommendationFacade: UserRecommendationFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userRecommendationFacade.loadAll();
    this.form = this.fb.group({
      id: [],
      title: [null, Validators.required],
      external: [false, Validators.required],
      link: [null, Validators.required],
      order: [],
      query_params: this.fb.array([]),
    });
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    this.submitted = false;
    this.userRecommendationFacade.initForm();
    this.form.reset();
    this.form.setControl('query_params', this.fb.array([]));

    // Заполняет данные формы из хранилища
    this.userRecommendationFacade.formData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((formData) => this.form.patchValue(formData, { emitEvent: false }));

    // Обновляет хранилище по любому изменению формы
    this.form.valueChanges
      .pipe(
        skipUntil(this.formDisplay$),
        distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((formData) => this.userRecommendationFacade.changeForm(formData));
  }

  /**
   * Событие отправки формы.
   */
  submitForm(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.userRecommendationFacade.saveForm();
    }
  }

  /**
   * Закрывает форму
   */
  closeForm(): void {
    this.userRecommendationFacade.closeForm();
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

  getQueryParamsNameForm(i: number): FormControl {
    return this.queryParamsForm.controls[i].get('name') as FormControl;
  }

  private createQueryParams(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      value: [''],
    });
  }
}
