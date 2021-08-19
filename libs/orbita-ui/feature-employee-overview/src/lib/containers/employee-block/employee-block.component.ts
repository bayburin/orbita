import { Component, OnInit } from '@angular/core';
import { EmployeeFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.scss'],
})
export class EmployeeBlockComponent implements OnInit {
  // ========== Данные о работнике ==========

  employee$ = this.employeeFacade.employee$;
  employeeLoading$ = this.employeeFacade.loadingEmployee$;
  employeeLoaded$ = this.employeeFacade.loadedEmployee$;

  constructor(private employeeFacade: EmployeeFacade) {}

  ngOnInit(): void {
    this.employeeFacade.overviewSingleEmployee();
  }
}
