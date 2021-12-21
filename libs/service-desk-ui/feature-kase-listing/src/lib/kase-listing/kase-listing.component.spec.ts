import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaseListingComponent } from './kase-listing.component';

describe('KaseListingComponent', () => {
  let component: KaseListingComponent;
  let fixture: ComponentFixture<KaseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KaseListingComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
