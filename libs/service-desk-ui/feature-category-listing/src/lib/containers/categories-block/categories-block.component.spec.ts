import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBlockComponent } from './categories-block.component';

describe('CategoriesBlockComponent', () => {
  let component: CategoriesBlockComponent;
  let fixture: ComponentFixture<CategoriesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
