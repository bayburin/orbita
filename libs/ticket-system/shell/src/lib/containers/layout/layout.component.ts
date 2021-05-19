import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'ticket-system-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.init();
  }
}
