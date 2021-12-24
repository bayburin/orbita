import { Component, OnInit } from '@angular/core';

import { DeepSearchFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  loading$ = this.deepSearchFacade.loading$;
  loaded$ = this.deepSearchFacade.loaded$;
  result$ = this.deepSearchFacade.result$;

  constructor(private deepSearchFacade: DeepSearchFacade) {}

  ngOnInit(): void {
    this.deepSearchFacade.search();
  }
}
