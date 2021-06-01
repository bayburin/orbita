import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'orbita-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.appFacade.init();
  }
}
