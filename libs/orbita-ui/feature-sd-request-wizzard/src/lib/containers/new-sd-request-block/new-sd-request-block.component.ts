import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
import { EmployeeFacade, employeeFiltersViewModelArray, ServiceDeskFacade } from '@orbita/orbita-ui/domain-logic';

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
  employeeSubs: Subscription;
  employeeManuallyFlagSubs: Subscription;
  @ViewChild('employeeAutoComplete') employeeAutoComplete: AutoComplete;

  // ========== Раздел формы услуги ==========

  tickets$ = this.serviceDeskFacade.allFreeApplicationsViewModel$;
  ticket = new FormControl();

  get employeeManuallyFlag(): FormControl {
    return this.form?.get('employeeManuallyFlag') as FormControl;
  }

  constructor(
    private employeeFacade: EmployeeFacade,
    private serviceDeskFacade: ServiceDeskFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
      priority: [],
      finished_at_plan: [],
      workers: [[]],
      attachments: this.fb.array([]),
      newAttachments: this.fb.array([]),
    });
    this.employeeSubs = this.employeeFilterKey.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.search({ query: this.employee.value }));
    this.employeeManuallyFlagSubs = this.employeeManuallyFlag.valueChanges.subscribe((flag) => {
      if (flag) {
        this.employeeFilterKey.disable();
        this.employee.disable();
      } else {
        this.employeeFilterKey.enable();
        this.employee.enable();
      }
    });

    // TODO: Удалить
    this.form.valueChanges.subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.employeeSubs.unsubscribe();
    this.employeeManuallyFlagSubs.unsubscribe();
  }

  /**
   * Выполняет поиск работников
   *
   * @param event - событие поиска
   */
  search(event: any): void {
    this.employeeFacade.search(this.employeeFilterKey.value.filter, event.query);
  }

  /**
   * Добавляет выбранного пользователя в форму заявки
   */
  selectEmployee(): void {
    this.form.patchValue({ employee: this.employee.value });
  }

  /**
   * Очищает работника из формы заявки
   */
  clearEmployee(): void {
    this.form.patchValue({ employee: null });
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
}
