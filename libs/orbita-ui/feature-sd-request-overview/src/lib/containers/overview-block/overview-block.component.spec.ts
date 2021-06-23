import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SdRequestFacade, SdRequestFacadeStub } from '@orbita/orbita-ui/domain-logic';

import { OverviewBlockComponent } from './overview-block.component';

describe('OverviewBlockComponent', () => {
  let component: OverviewBlockComponent;
  let fixture: ComponentFixture<OverviewBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewBlockComponent],
      providers: [{ provide: SdRequestFacade, useClass: SdRequestFacadeStub }],
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
