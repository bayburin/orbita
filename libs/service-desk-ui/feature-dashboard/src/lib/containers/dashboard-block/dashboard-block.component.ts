import { Component, OnInit } from '@angular/core';

import { UserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss'],
})
export class DashboardBlockComponent implements OnInit {
  recommendations$ = this.userRecommendationFacade.all$;
  recommendationsLoading$ = this.userRecommendationFacade.loading$;
  recommendationsLoaded$ = this.userRecommendationFacade.loaded$;

  constructor(private userRecommendationFacade: UserRecommendationFacade) {}

  ngOnInit(): void {
    this.userRecommendationFacade.loadAll();
  }
}
