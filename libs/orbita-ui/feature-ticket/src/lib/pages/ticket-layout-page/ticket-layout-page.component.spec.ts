import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SdRequestFacade, SdRequestFacadeStub } from '@orbita/orbita-ui/domain-logic';

import { TicketLayoutPageComponent } from './ticket-layout-page.component';

describe('TicketLayoutPageComponent', () => {
  let component: TicketLayoutPageComponent;
  let fixture: ComponentFixture<TicketLayoutPageComponent>;
  let sdRequestFacade: SdRequestFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TicketLayoutPageComponent],
      providers: [{ provide: SdRequestFacade, useClass: SdRequestFacadeStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketLayoutPageComponent);
    component = fixture.componentInstance;
    sdRequestFacade = TestBed.inject(SdRequestFacade);
    jest.spyOn(sdRequestFacade, 'connectToSdRequestsUpdateChannel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to SdRequests::Update channel', () => {
    expect(sdRequestFacade.connectToSdRequestsUpdateChannel).toHaveBeenCalled();
  });
});
