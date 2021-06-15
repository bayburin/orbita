import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Priorities } from '@orbita/orbita-ui/domain-logic';
import { Statuses } from '@orbita/orbita-ui/domain-logic';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';

import { SdRequestsTableComponent } from './sd-requests-table.component';

describe('SdRequestsTableComponent', () => {
  let component: SdRequestsTableComponent;
  let fixture: ComponentFixture<SdRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrbitaUiUiModule, FormsModule],
      declarations: [SdRequestsTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('priority() should return PrioritiesData object', () => {
    expect(component.priority(Priorities.DEFAULT).title).toEqual('Стандартный');
  });

  it('status() should return StatusesData object', () => {
    expect(component.status(Statuses.OPENED).title).toEqual('Открыта');
  });
});
