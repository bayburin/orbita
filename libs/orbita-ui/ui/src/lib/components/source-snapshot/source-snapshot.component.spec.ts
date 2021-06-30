import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SourceSnapshot } from '@orbita/orbita-ui/domain-logic';

import { SourceSnapshotComponent } from './source-snapshot.component';

describe('SourceSnapshotComponent', () => {
  let component: SourceSnapshotComponent;
  let fixture: ComponentFixture<SourceSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceSnapshotComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceSnapshotComponent);
    component = fixture.componentInstance;
    component.snapshot = {} as SourceSnapshot;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
