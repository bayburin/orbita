import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  SdRequestFacade,
  SdRequestFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
  SvtFacade,
  SvtFacadeStub,
} from '@orbita/orbita-ui/domain-logic';
import { DatetimePipe } from '@orbita/orbita-ui/ui';

import { OverviewBlockComponent } from './overview-block.component';

describe('OverviewBlockComponent', () => {
  let component: OverviewBlockComponent;
  let fixture: ComponentFixture<OverviewBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewBlockComponent, DatetimePipe],
      providers: [
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: SvtFacade, useClass: SvtFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewBlockComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
