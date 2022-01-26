import { Component, OnInit } from '@angular/core';
import { AdminHomeFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  loading$ = this.adminHomeFacade.loading$;
  loaded$ = this.adminHomeFacade.loaded$;

  constructor(private adminHomeFacade: AdminHomeFacade) {}

  ngOnInit(): void {
    this.adminHomeFacade.init();
  }
}
