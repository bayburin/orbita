import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SdRequestFacade,
  SdRequestFacadeStub,
  UserFacade,
  UserFacadeStub,
  ServiceDeskFacade,
  ServiceDeskFacadeStub,
} from '@orbita/orbita-ui/domain-logic';

import { SdRequestsBlockComponent } from './sd-requests-block.component';

describe('SdRequestsBlockComponent', () => {
  let component: SdRequestsBlockComponent;
  let fixture: ComponentFixture<SdRequestsBlockComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SdRequestsBlockComponent],
      providers: [
        { provide: SdRequestFacade, useClass: SdRequestFacadeStub },
        { provide: UserFacade, useClass: UserFacadeStub },
        { provide: ServiceDeskFacade, useClass: ServiceDeskFacadeStub },
        MessageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdRequestsBlockComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    jest.spyOn(sdRequestFacade, 'connectToSdRequestsCreateChannel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to SdRequests::Create channel', () => {
    expect(sdRequestFacade.connectToSdRequestsCreateChannel).toHaveBeenCalled();
  });

  describe('tableChanged', () => {
    it('should call setTableMetadata method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'loadSdRequestsTable');
      component.tableChanged({});

      expect(spy).toHaveBeenCalledWith({});
    });

    it('should save event data', () => {
      const data = { rows: 20 };

      component.tableChanged(data);

      expect(component.tableEventData).toEqual(data);
    });
  });

  describe('reloadTable', () => {
    it('should call reloadTableData method', () => {
      const spy = jest.spyOn(sdRequestFacade, 'loadSdRequestsTable');
      component.reloadTable();

      expect(spy).toHaveBeenCalled();
    });
  });
});
