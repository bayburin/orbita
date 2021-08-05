import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap, filter, map, first } from 'rxjs/operators';
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
} from '@orbita/orbita-ui/domain-logic';
import { DialogService } from 'primeng/dynamicdialog';
import { NewSdRequestPreviewComponent } from '@orbita/orbita-ui/ui';

@Component({
  selector: 'orbita-ui-sd-request-wizzard-new-sd-request-block',
  templateUrl: './new-sd-request-block.component.html',
  styleUrls: ['./new-sd-request-block.component.scss'],
})
export class NewSdRequestBlockComponent implements OnInit, OnDestroy {
  form: FormGroup;
  valueChangesSub: Subscription;

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
  employeeFilterKeySubs: Subscription;
  employeeManuallyFlagSubs: Subscription;
  @ViewChild('employeeAutoComplete') employeeAutoComplete: AutoComplete;

  // ========== Раздел формы услуги ==========

  tickets$ = this.serviceDeskFacade.allFreeApplicationsViewModel$;
  tickets: SdTicketViewModel[];
  ticket = new FormControl();
  noTicketFlag: Subscription;
  ticketsSubs: Subscription;

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
  svtItemFilterKeySubs: Subscription;
  svtItemManuallySubs: Subscription;

  get employeeManuallyFlag(): FormControl {
    return this.form?.get('employeeManuallyFlag') as FormControl;
  }

  get attachmentsForm(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private employeeFacade: EmployeeFacade,
    private serviceDeskFacade: ServiceDeskFacade,
    private svtFacade: SvtFacade,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.ticketsSubs = this.tickets$.subscribe((tickets) => (this.tickets = tickets));

    // TODO: Удалить
    this.form.valueChanges.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.employeeFilterKeySubs.unsubscribe();
    this.employeeManuallyFlagSubs.unsubscribe();
    this.noTicketFlag.unsubscribe();
    this.svtItemFilterKeySubs.unsubscribe();
    this.svtItemManuallySubs.unsubscribe();
    this.ticketsSubs.unsubscribe();
    this.valueChangesSub.unsubscribe();
  }

  /**
   * Выполняет поиск работников
   *
   * @param event - событие поиска
   */
  searchEmployee(event: any): void {
    this.employeeFacade.search(this.employeeFilterKey.value.filter, event.query);
  }

  /**
   * Добавляет выбранного пользователя в форму заявки
   *
   * @param employee - выбранный работник
   */
  selectEmployee(employee: EmployeeShort): void {
    this.form.patchValue({ employee: employee });

    // Запустить поиск работников по ФИО, если не выбран чекбокс "Поиск выч. техники вручную"
    if (!this.svtItemManually.value) {
      this.svtFacade.loadItemsForForm({ fio: employee.fullName });
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

    this.svtFacade.loadItemsForForm({ [type.value]: event.query });
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
    return `${item.type.short_description} ${item.short_item_model} Инвентарный: ${item.invent_num} | Штрих-код: ${item.barcode_item.id}`;
  }

  previewForm(): void {
    this.dialogService.open(NewSdRequestPreviewComponent, {
      data: {
        form: this.form.getRawValue(),
      },
      header: 'Предпросмотр заявки',
      width: '40%',
    });
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
      employee: [],
      employeeManuallyFlag: [false],
      ticket: [],
      noTicketFlag: [false],
      description: [],
      svtItem: [],
      attachments: this.fb.array([]),
    });
    // Обновляет хранилище по любому изменению формы
    this.valueChangesSub = this.form.valueChanges
      .pipe(distinctUntilChanged((a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe((formData) => this.sdRequestFacade.changeNewForm(formData));
    // Поиск работника по параметру
    this.employeeFilterKeySubs = this.employeeFilterKey.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.searchEmployee({ query: this.employee.value }));
    // Отключение/включение поля "Работник"
    this.employeeManuallyFlagSubs = this.employeeManuallyFlag.valueChanges.subscribe((flag) => {
      if (flag) {
        this.employeeFilterKey.disable();
        this.employee.disable();
      } else {
        this.employeeFilterKey.enable();
        this.employee.enable();
      }
    });
    // Отключение/включение поля "Услуга"
    this.noTicketFlag = this.form
      .get('noTicketFlag')
      .valueChanges.subscribe((flag) => (flag ? this.ticket.disable() : this.ticket.enable()));
    // Поиск ВТ по параметру
    this.svtItemFilterKeySubs = this.svtItemFilterKey.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter((str) => str.length)
      )
      .subscribe(() => this.searchSvtItem({ query: this.customSvtItem.value }));
    // Отключение/включение поля "Выч. техника"
    this.svtItemManuallySubs = this.svtItemManually.valueChanges.subscribe((flag) => {
      if (flag) {
        this.employeeSvtItem.disable();
        this.svtFacade.removeAllItems();
        this.employeeSvtItem.reset();
      } else {
        this.employeeSvtItem.enable();
        this.customSvtItem.reset();

        if (this.form.get('employee').value) {
          this.svtFacade.loadItemsForForm({ fio: this.form.get('employee').value.fullName });
        }
      }
    });
  }
}
