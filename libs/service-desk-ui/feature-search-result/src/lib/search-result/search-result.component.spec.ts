import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DeepSearchFacade,
  DeepSearchFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      providers: [
        { provide: DeepSearchFacade, useClass: DeepSearchFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
      ],
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
