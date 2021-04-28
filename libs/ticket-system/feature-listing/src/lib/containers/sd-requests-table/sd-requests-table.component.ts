import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SdRequestFacade, SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss']
})
export class SdRequestsTableComponent implements OnInit {
  sdRequests$: Observable<SdRequest[]>;

  constructor(private sdRequestFacade: SdRequestFacade) { }

  ngOnInit(): void {
    // TODO: Убрать
    this.sdRequestFacade.loadAll();
  }
}
