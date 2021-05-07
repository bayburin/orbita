import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SdRequestFacade, SdRequestFacadeStub } from '@orbita/ticket-system/domain-logic';

import { SdRequestsBlockComponent } from './sd-requests-block.component';

describe('SdRequestsBlockComponent', () => {
  let component: SdRequestsBlockComponent;
  let fixture: ComponentFixture<SdRequestsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestsBlockComponent],
      providers: [{ provide: SdRequestFacade, useClass: SdRequestFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
