import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap, map, first } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
import {
  EmployeeFacade,
  employeeFiltersViewModelArray,
  ServiceDeskFacade,
  SvtFacade,
  SvtItem,
  EmployeeShort,
  SdTicketViewModel,
  SdRequestFacade,
  Statuses,
} from '@orbita/orbita-ui/domain-logic';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';

import { NewSdRequestPreviewComponent } from '../new-sd-request-preview/new-sd-request-preview.component';

@Component({
  selector: 'orbita-ui-sd-request-wizzard-new-sd-request-block',
  templateUrl: './new-sd-request-block.component.html',
  styleUrls: ['./new-sd-request-block.component.scss'],
})
export class NewSdRequestBlockComponent implements OnInit, OnDestroy {
  form: FormGroup;
  previewRef: DynamicDialogRef;
  subscriptions = new Subscription();

  // ========== Раздел формы работника ==========

  employees$ = this.employeeFacade.allShort$.pipe(
    tap((employees) => {
      if (this.employeeAutoComplete) {
        // Почему-то при ручном вызове поиска выдается строка "данные не найдены".
        // Чтобы исправить это далее атрибут noResults устанавливается вручную.
        this.employeeAutoComplete.noResults = employees.length ? false : true;
      }
    })
  );
  employeeFilters = employeeFiltersViewModelArray;
  employeeFilterKey = new FormControl(this.employeeFilters[0]);
  employee = new FormControl();
  @ViewChild('employeeAutoComplete') employeeAutoComplete: AutoComplete;

  // ========== Раздел формы услуги ==========

  tickets$ = this.serviceDeskFacade.allFreeApplicationsViewModel$;
  tickets: SdTicketViewModel[];
  ticket = new FormControl();

  // ========== Раздел формы ВТ ==========

  svtItems$ = this.svtFacade.allForFormItems$;
  svtItemFilters = [
    { title: 'Инв. номер', value: 'invent_num' },
    { title: 'Штрих-код', value: 'barcode' },
    { title: 'Отдел', value: 'dept' },
  ];
  svtItemFilterKey = new FormControl(this.svtItemFilters[0]);
  employeeSvtItem = new FormControl();
  customSvtItem = new FormControl();
  svtItemManually = new FormControl();

  // ========== Созданная заявка ==========

  sdRequest$ = this.sdRequestFacade.newFormCreated$;
  displayModal$ = this.sdRequestFacade.newFormShowModalAfterCreate$;

  get employeeManuallyFlag(): FormControl {
    return this.form?.get('employeeManuallyFlag') as FormControl;
  }

  get attachmentsForm(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  get sourceSnapshot(): FormGroup {
    return this.form.get('source_snapshot') as FormGroup;
  }

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private employeeFacade: EmployeeFacade,
    private serviceDeskFacade: ServiceDeskFacade,
    private svtFacade: SvtFacade,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.initNewForm();
    this.buildForm();
    this.subscriptions.add(this.tickets$.subscribe((tickets) => (this.tickets = tickets)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.sdRequestFacade.clearCreatedForm();
    this.employeeFacade.clearEmployeeShortEntities();
    this.svtFacade.removeAllItems();
  }

  /**
   * Выполняет поиск работников
   *
   * @param event - событие поиска
   */
  searchEmployee(event: any): void {
    if (event.query && typeof event.query === 'string') {
      this.employeeFacade.searchBySingleProp(this.employeeFilterKey.value.filter, event.query.trim());
    }
  }

  /**
   * Добавляет выбранного пользователя в форму заявки
   *
   * @param employee - выбранный работник
   */
  selectEmployee(employee: EmployeeShort): void {
    this.form.patchValue({ employee: employee });
    this.sourceSnapshot.get('user_attrs').patchValue({ phone: employee.phoneText, email: employee.emailText });

    // Запустить поиск работников по id_tn, если не выбран чекбокс "Поиск выч. техники вручную"
    if (!this.svtItemManually.value) {
      this.svtFacade.loadItemsForForm({ id_tn: employee.id });
    }
  }

  /**
   * Очищает работника из формы заявки
   */
  clearEmployee(): void {
    this.form.patchValue({ employee: null });
  }

  /**
   * Фильтрует существующий массив видов заявок
   *
   * @param event - событие поиска вида услуги
   */
  searchTicket(event: any): void {
    this.tickets$
      .pipe(
        first(),
        map((tickets) => tickets.filter((ticket) => ticket.name.toLowerCase().includes(event.query.toLowerCase())))
      )
      .subscribe((tickets) => (this.tickets = tickets));
  }

  /**
   * Добавляет выбранную услугу в форму заявки
   */
  selectTicket(): void {
    this.form.patchValue({ ticket: this.ticket.value });
  }

  /**
   * Очищает услугу из формы заявки
   */
  clearTicket(): void {
    this.form.patchValue({ ticket: null });
    this.tickets$.pipe(first()).subscribe((tickets) => (this.tickets = tickets));
  }

  /**
   * Выполняет поиск ВТ, либо фильтрует существующий массив ВТ
   *
   * @param event - событие поиска ВТ
   */
  searchSvtItem(event: any): void {
    const type = this.svtItemFilterKey.value;

    if (event.query) {
      this.svtFacade.loadItemsForForm({ [type.value]: event.query.trim() });
    }
  }

  /**
   * Добавляет выбранную ВТ в форму заявки
   *
   * @param svtItem - выбранная ВТ
   */
  selectSvtItem(svtItem: SvtItem): void {
    this.form.patchValue({ svtItem: svtItem });
  }

  /**
   * Очищает ВТ из формы заявки
   */
  clearSvtItem(): void {
    this.form.patchValue({ svtItem: null });
  }

  /**
   * Возвращает строку, содержащую данные о выбранной ВТ
   */
  selectedSvtItemView(item: SvtItem): string {
    return `${item.type.short_description} ${item.short_item_model} | Инвентарный: ${item.invent_num} | Штрих-код: ${item.barcode_item.id}`;
  }

  /**
   * Открывает компонент для предпросмотра заявки
   */
  previewForm(): void {
    this.previewRef = this.dialogService.open(NewSdRequestPreviewComponent, {
      data: {
        form: this.form.getRawValue(),
        valid: this.form.valid,
      },
      header: 'Предпросмотр заявки',
      width: '50%',
    });
  }

  /**
   * Закрывает модальные окна и переходит к созданной заявке
   *
   * @param id - идентификатор заявки
   */
  backToCurrentSdRequest(id: number): void {
    this.router.navigate(['/tickets', 'sd-requests', id]);
    this.sdRequestFacade.closeModalAfterCreateSdRequest();
    this.previewRef.close();
  }

  /**
   * Закрывает модальные окна и пререходит к списку заявок
   */
  backToSdRequestList(): void {
    this.router.navigate(['/tickets']);
    this.sdRequestFacade.closeModalAfterCreateSdRequest();
    this.previewRef.close();
  }

  /**
   * Очистить форму для создания новой заявки
   */
  resetForm(): void {
    // Закрывает все окна
    this.sdRequestFacade.closeModalAfterCreateSdRequest();
    this.previewRef.close();

    // Обновляет поля, связанные с работником
    this.employee.reset();
    this.employeeFilterKey.setValue(this.employeeFilters[0]);

    // Обновляет поля, связанные с услугой
    this.ticket.reset();
    this.searchTicket({ query: '' });

    // Обновляет поля, связанные с ВТ
    this.employeeSvtItem.reset();
    this.customSvtItem.reset();
    this.svtItemManually.reset();
    this.svtItemFilterKey.setValue(this.svtItemFilters[0]);

    // Очищает саму форму
    this.form.reset();
    this.form.setControl('attachments', this.fb.array([]));
    this.sdRequestFacade.clearCreatedForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      source_snapshot: this.fb.group({
        tn: [],
        fio: [],
        dept: [],
        user_attrs: this.fb.group({
          email: [],
          phone: [],
        }),
      }),
      employee: [null, Validators.required],
      employeeManuallyFlag: [false],
      ticket: [null, Validators.required],
      noTicketFlag: [false],
      needResponsibleUsers: [false],
      description: [null, Validators.required],
      status: [Statuses.AT_WORK],
      svtItem: [],
      attachments: this.fb.array([]),
    });

    // Обновляет хранилище по любому изменению формы
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe((formData) => this.sdRequestFacade.changeNewForm(formData))
    );

    // Поиск работника по параметру
    this.subscriptions.add(
      this.employeeFilterKey.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.employee.setValue(null))
    );

    // Отключение/включение поля "Работник"
    this.subscriptions.add(
      this.employeeManuallyFlag.valueChanges.subscribe((flag) => {
        if (flag) {
          this.employeeFilterKey.disable();
          this.employee.disable();
          this.sourceSnapshot.get('tn').setValidators([Validators.required, Validators.pattern('^[^0][0-9]*$')]);
          this.sourceSnapshot.get('fio').setValidators([Validators.required]);
          this.form.get('employee').clearValidators();
        } else {
          this.employeeFilterKey.enable();
          this.employee.enable();
          this.sourceSnapshot.get('tn').clearValidators();
          this.sourceSnapshot.get('fio').clearValidators();
          this.form.get('employee').setValidators([Validators.required]);
        }

        this.form.get('employee').updateValueAndValidity();
        this.sourceSnapshot.get('tn').updateValueAndValidity();
        this.sourceSnapshot.get('fio').updateValueAndValidity();
      })
    );

    // Отключение/включение поля "Услуга"
    this.subscriptions.add(
      this.form.get('noTicketFlag').valueChanges.subscribe((flag) => {
        if (flag) {
          this.ticket.disable();
          this.form.get('needResponsibleUsers').disable();
          this.form.get('ticket').clearValidators();
        } else {
          this.ticket.enable();
          this.form.get('needResponsibleUsers').enable();
          this.form.get('ticket').setValidators([Validators.required]);
        }

        this.form.get('ticket').updateValueAndValidity();
      })
    );

    // Поиск ВТ по параметру
    this.subscriptions.add(
      this.svtItemFilterKey.valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.customSvtItem.setValue(null))
    );

    // Отключение/включение поля "Выч. техника"
    this.subscriptions.add(
      this.svtItemManually.valueChanges.subscribe((flag) => {
        if (flag) {
          this.employeeSvtItem.disable();
          this.svtFacade.removeAllItems();
          this.employeeSvtItem.reset();
        } else {
          this.employeeSvtItem.enable();
          this.customSvtItem.reset();

          const employeeVal = this.form.get('employee').value;

          if (employeeVal) {
            this.svtFacade.loadItemsForForm({ id_tn: employeeVal.id });
          }
        }
      })
    );

    const barcode = this.route.snapshot.queryParams.barcode;

    if (barcode) {
      this.svtItemManually.setValue(true);
      this.svtItemFilterKey.setValue(this.svtItemFilters.find((el) => el.value === 'barcode'));
    }
  }
}
