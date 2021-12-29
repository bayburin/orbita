import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKaseComponent } from './new-kase.component';

describe('NewKaseComponent', () => {
  let component: NewKaseComponent;
  let fixture: ComponentFixture<NewKaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
