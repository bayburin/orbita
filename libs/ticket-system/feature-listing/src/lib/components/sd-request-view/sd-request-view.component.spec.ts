import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdRequestViewComponent } from './sd-request-view.component';

describe('SdRequestViewComponent', () => {
  let component: SdRequestViewComponent;
  let fixture: ComponentFixture<SdRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
