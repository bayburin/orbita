import { Component } from '@angular/core';
import { SdRequestFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss'],
})
export class OverviewBlockComponent {
  sdRequest$ = this.sdRequestFacade.selected$;

  constructor(private sdRequestFacade: SdRequestFacade) {}
}
