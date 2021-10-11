import { LazyLoadEvent } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvtFacade, SvtFacadeStub, SvtItem } from '@orbita/orbita-ui/domain-logic';
import { Router } from '@angular/router';

import { SvtItemsBlockComponent } from './svt-items-block.component';

@Component({})
class ExampleComponent {}

describe('SvtItemsBlockComponent', () => {
  let component: SvtItemsBlockComponent;
  let fixture: ComponentFixture<SvtItemsBlockComponent>;
  let svtFacade: SvtFacade;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'tickets/new-sd-request', component: ExampleComponent }])],
      declarations: [SvtItemsBlockComponent],
      providers: [{ provide: SvtFacade, useClass: SvtFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvtItemsBlockComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    svtFacade = TestBed.inject(SvtFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeTable()', () => {
    it('should call search() method', () => {
      const spy = jest.spyOn(svtFacade, 'searchSvtItems');
      const filters = { foo: 'bar' };

      component.changeTable({ filters } as LazyLoadEvent);

      expect(spy).toHaveBeenCalledWith(filters);
    });
  });

  describe('clearTable()', () => {
    it('should call search() method', () => {
      const spy = jest.spyOn(svtFacade, 'removeAllItems');

      component.clearTable();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call clearEmployeeShortEntities() method', () => {
      const spy = jest.spyOn(svtFacade, 'removeAllItems');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('redirectToNewSdRequestPage()', () => {
    it('should redirect to employee page', () => {
      const item = { workplace: { id_tn: 456 }, barcode_item: { id: 123 } } as SvtItem;
      const spy = jest.spyOn(router, 'navigate');

      component.redirectToNewSdRequestPage(item);

      expect(spy).toHaveBeenCalledWith(['/tickets', 'new-sd-request'], { queryParams: { id_tn: 456, barcode: 123 } });
    });
  });
});
