import { Component, OnInit } from '@angular/core';
import { EmployeeFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.scss'],
})
export class EmployeeBlockComponent implements OnInit {
  employee$ = this.employeeFacade.employee$;

  constructor(private employeeFacade: EmployeeFacade) {}

  ngOnInit(): void {
    this.employeeFacade.overviewSingleEmployee();
  }
}
