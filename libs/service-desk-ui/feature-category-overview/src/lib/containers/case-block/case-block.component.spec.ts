import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseBlockComponent } from './case-block.component';

describe('CaseBlockComponent', () => {
  let component: CaseBlockComponent;
  let fixture: ComponentFixture<CaseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
