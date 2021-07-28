import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EmployeeFacade, SearchEmployeeKeys } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'orbita-ui-sd-request-wizzard-new-sd-request-block',
  templateUrl: './new-sd-request-block.component.html',
  styleUrls: ['./new-sd-request-block.component.scss'],
})
export class NewSdRequestBlockComponent implements OnInit {
  employees$ = this.employeeFacade.allShort$;
  employee = new FormControl();
  form: FormGroup;

  constructor(private employeeFacade: EmployeeFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      employee: [],
      description: [],
      priority: [],
      finished_at_plan: [],
      workers: [[]],
      attachments: this.fb.array([]),
      newAttachments: this.fb.array([]),
    });
  }

  /**
   * Выполняет поиск работников
   *
   * @param event - событие поиска
   */
  search(event: any) {
    this.employeeFacade.search(SearchEmployeeKeys.FIO, event.query);
  }

  /**
   * Добавляет выбранного пользователя в форму заявки
   */
  selectEmployee() {
    this.form.get('employee').setValue(this.employee.value);
  }

  /**
   * Очищает работника из формы заявки
   */
  clearEmployee() {
    this.form.get('employee').setValue(null);
  }
}
