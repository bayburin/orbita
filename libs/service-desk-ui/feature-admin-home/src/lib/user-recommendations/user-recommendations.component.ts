import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { filter, take, distinctUntilChanged, map, takeWhile } from 'rxjs/operators';
import {
  getUserRecommendationLinkTypes,
  UserRecommendation,
  UserRecommendationFacade,
  UserRecommendationLinkTypesVM,
} from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'service-desk-ui-admin-home-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  userRecommendations$ = this.userRecommendationFacade.all$;
  loading$ = this.userRecommendationFacade.loading$;
  loaded$ = this.userRecommendationFacade.loaded$;
  loadingIds$ = this.userRecommendationFacade.loadingIds$;
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

  constructor(
    private userRecommendationFacade: UserRecommendationFacade,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Загружает данные таблицы
   */
  loadData(): void {
    this.userRecommendationFacade.loadAll();
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    this.submitted = false;
    this.userRecommendationFacade.initForm();
    this.initForm();
  }

  /**
   * Инициализирует форму редактирования записи
   */
  editForm(userRecommendation: UserRecommendation): void {
    this.userRecommendationFacade.edit(userRecommendation.id);
    this.initForm();
  }

  /**
   * Удаляет запись
   */
  remove(userRecommendation: UserRecommendation): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить запись №${userRecommendation.id} "${userRecommendation.title}"?`,
      header: 'Подтверждение удаления',
      accept: () => this.userRecommendationFacade.destroy(userRecommendation.id),
    });
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

  /**
   * Возвращает форму параметров по указанному индексу из массива
   *
   * @param i - индекс из массива параметров
   */
  getQueryParamsNameForm(i: number): FormControl {
    return this.queryParamsForm.controls[i].get('name') as FormControl;
  }

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param external - тип ссылки
   */
  linkType(external: boolean): UserRecommendationLinkTypesVM {
    return getUserRecommendationLinkTypes(external);
  }

  /**
   * Перехватывает событие переноса строки
   *
   * @param event - объект события
   */
  reorderRow(event: { dragIndex: number; dropIndex: number }): void {
    this.userRecommendationFacade.reorder(event.dragIndex, event.dropIndex);
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
    this.userRecommendationFacade.formData$
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
    combineLatest([this.form.valueChanges, this.formDisplay$])
      .pipe(
        takeWhile(([_formData, display]) => display),
        map(([formData, _display]) => formData),
        distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((formData) => this.userRecommendationFacade.changeForm(formData));
  }
}
