import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSearchResultComponent } from './abstract-search-result.component';

@Component({})
class TestComponent {}

describe('AbstractSearchResultComponent', () => {
  let component: AbstractSearchResultComponent<TestComponent>;
  let fixture: ComponentFixture<AbstractSearchResultComponent<TestComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbstractSearchResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
