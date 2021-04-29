import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SdRequestFacade, SdRequestFacadeStub } from '@orbita/ticket-system/domain-logic';

import { SdRequestsTableComponent } from './sd-requests-table.component';

describe('SdRequestsTableComponent', () => {
  let component: SdRequestsTableComponent;
  let fixture: ComponentFixture<SdRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdRequestsTableComponent],
      providers: [{ provide: SdRequestFacade, useClass: SdRequestFacadeStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
