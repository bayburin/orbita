import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTemplateComponent } from './search-result-template.component';
import { SearchResultTypes } from '@orbita/service-desk-ui/domain-logic';

describe('SearchResultTemplateComponent', () => {
  let component: SearchResultTemplateComponent;
  let fixture: ComponentFixture<SearchResultTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultTemplateComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTemplateComponent);
    component = fixture.componentInstance;
    component.searchResult = {
      ticket: {
        service_id: 2,
        name: 'fake-question',
        service: {
          name: 'fake-service',
        },
      },
    } as SearchResultTypes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
