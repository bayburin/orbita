import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFacade, CategoryFacadeStub } from '@orbita/service-desk-ui/domain-logic';
import { CategoryListingComponent } from './categories-block.component';

describe('CategoryListingComponent', () => {
  let component: CategoryListingComponent;
  let fixture: ComponentFixture<CategoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CategoryFacade, useClass: CategoryFacadeStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
