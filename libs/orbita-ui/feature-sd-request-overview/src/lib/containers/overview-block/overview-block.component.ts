import { Component, OnInit } from '@angular/core';
import { SdRequestFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss'],
})
export class OverviewBlockComponent implements OnInit {
  sdRequest$ = this.sdRequestFacade.selected$;
  loading$ = this.sdRequestFacade.loading$;
  error$ = this.sdRequestFacade.error$;

  constructor(private sdRequestFacade: SdRequestFacade) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
  }
}
