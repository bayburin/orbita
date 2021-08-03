import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
import {
  EmployeeFacade,
  employeeFiltersViewModelArray,
  ServiceDeskFacade,
  SvtFacade,
  SvtItem,
  EmployeeShort,
} from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'orbita-ui-sd-request-wizzard-new-sd-request-block',
  templateUrl: './new-sd-request-block.component.html',
  styleUrls: ['./new-sd-request-block.component.scss'],
})
export class NewSdRequestBlockComponent implements OnInit, OnDestroy {
  form: FormGroup;

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
  ticket = new FormControl();
  noTicketFlag: Subscription;

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

  get newAttachmentsForm(): FormArray {
    return this.form.get('newAttachments') as FormArray;
  }

  constructor(
    private employeeFacade: EmployeeFacade,
    private serviceDeskFacade: ServiceDeskFacade,
    private svtFacade: SvtFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();

    // TODO: Удалить
    this.form.valueChanges.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.employeeFilterKeySubs.unsubscribe();
    this.employeeManuallyFlagSubs.unsubscribe();
    this.noTicketFlag.unsubscribe();
    this.svtItemFilterKeySubs.unsubscribe();
    this.svtItemManuallySubs.unsubscribe();
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
   */
  selectEmployee(employee: EmployeeShort): void {
    this.form.patchValue({ employee: employee });
    this.svtFacade.loadItemsForForm({ fio: employee.fullName });
  }

  /**
   * Очищает работника из формы заявки
   */
  clearEmployee(): void {
    this.form.patchValue({ employee: null });
  }

  /**
   * Фильтрует существующий массив видов заявок
   */
  searchTicket(): void {
    // TODO: Отфильтровать виды заявок
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
  }

  /**
   * Выполняет поиск ВТ, либо фильтрует существующий массив ВТ
   */
  searchSvtItem(event: any): void {
    const type = this.svtItemFilterKey.value;

    this.svtFacade.loadItemsForForm({ [type.value]: event.query });
  }

  /**
   * Добавляет выбранную ВТ в форму заявки
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
      priority: [],
      finished_at_plan: [],
      workers: [[]],
      newAttachments: this.fb.array([]),
    });
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
