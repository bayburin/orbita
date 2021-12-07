import { Component, OnInit } from '@angular/core';

import { DashboardFacade, UserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss'],
})
export class DashboardBlockComponent implements OnInit {
  dashboardLoading$ = this.dashboardFacade.loading$;
  dashboardLoaded$ = this.dashboardFacade.loaded$;
  recommendations$ = this.userRecommendationFacade.all$;
  categories$ = this.dashboardFacade.categories$;
  services$ = this.dashboardFacade.services$;

  constructor(private dashboardFacade: DashboardFacade, private userRecommendationFacade: UserRecommendationFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.loadDashboard();
  }
}
