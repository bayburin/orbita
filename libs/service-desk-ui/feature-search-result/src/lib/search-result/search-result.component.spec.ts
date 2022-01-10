import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DeepSearchFacade,
  DeepSearchFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
  AttachmentFacade,
  AttachmentFacadeStub,
  QuestionFacade,
  QuestionFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, RouterTestingModule],
      declarations: [SearchResultComponent],
      providers: [
        { provide: DeepSearchFacade, useClass: DeepSearchFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
        { provide: AttachmentFacade, useClass: AttachmentFacadeStub },
        { provide: QuestionFacade, useClass: QuestionFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
