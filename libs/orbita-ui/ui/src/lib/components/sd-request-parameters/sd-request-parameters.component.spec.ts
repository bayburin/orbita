import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParameterViewModel } from '@orbita/orbita-ui/domain-logic';

import { SdRequestParametersComponent } from './sd-request-parameters.component';

describe('SdRequestParametersComponent', () => {
  let component: SdRequestParametersComponent;
  let fixture: ComponentFixture<SdRequestParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestParametersComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestParametersComponent);
    component = fixture.componentInstance;
    component.parameters = {
      payload: {
        common: [],
        table: {
          columns: [],
          data: [],
        },
      },
    } as ParameterViewModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
