import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  EmployeeFacade,
  EmployeeFacadeStub,
  SdRequestFacade,
  SdRequestFacadeStub,
} from '@orbita/orbita-ui/domain-logic';

import { EmployeeBlockComponent } from './employee-block.component';

describe('EmployeeBlockComponent', () => {
  let component: EmployeeBlockComponent;
  let fixture: ComponentFixture<EmployeeBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBlockComponent],
      providers: [
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBlockComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tableChanged', () => {
    it('should call setTableMetadata method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'loadFiltered');
      component.tableChanged({});

      expect(spy).toHaveBeenCalledWith({});
    });
  });
});
