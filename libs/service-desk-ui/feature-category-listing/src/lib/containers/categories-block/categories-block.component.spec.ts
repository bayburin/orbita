import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFacade, CategoryFacadeStub } from '@orbita/service-desk-ui/domain-logic';
import { CategoriesBlockComponent } from './categories-block.component';

describe('CategoriesBlockComponent', () => {
  let component: CategoriesBlockComponent;
  let fixture: ComponentFixture<CategoriesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesBlockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CategoryFacade, useClass: CategoryFacadeStub }],
    }).compileComponents();
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
