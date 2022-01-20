import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminCategoryFacade } from '@orbita/service-desk-ui/domain-logic';
import { Subscription } from 'rxjs';
import { filter, take, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'service-desk-ui-admin-home-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.scss'],
})
export class AdminCategoryFormComponent implements OnInit, OnDestroy {
  formLoading$ = this.adminCategoryFacade.formLoading$;
  form: FormGroup;
  submitted = false;
  subscriptions = new Subscription();

  get nameForm(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get iconNameForm(): FormControl {
    return this.form.get('icon_name') as FormControl;
  }

  constructor(
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
   * Событие отправки формы.
   */
  submitForm(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.adminCategoryFacade.saveForm();
    }
  }

  /**
   * Закрывает форму
   */
  closeForm(): void {
    this.adminCategoryFacade.closeForm();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      short_description: [],
      icon_name: [null, Validators.required],
    });

    // Заполняет данные формы из хранилища
    this.adminCategoryFacade.formData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((formData) => this.form.patchValue(formData, { emitEvent: false }));

    // Обновляет хранилище по любому изменению формы
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          map((formData) => formData),
          distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b))
        )
        .subscribe((formData) => this.adminCategoryFacade.changeForm(formData))
    );
  }
}
