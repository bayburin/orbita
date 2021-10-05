import { Component } from '@angular/core';
import { SvtFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-svt-items-block',
  templateUrl: './svt-items-block.component.html',
  styleUrls: ['./svt-items-block.component.scss'],
})
export class SvtItemsBlockComponent {
  constructor(private svtFacade: SvtFacade) {}
}
