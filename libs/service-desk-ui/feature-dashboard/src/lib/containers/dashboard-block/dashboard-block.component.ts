import { Component, OnInit } from '@angular/core';

import {
  DashboardFacade,
  UserRecommendationFacade,
  CategoryFacade,
  ServiceFacade,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss'],
})
export class DashboardBlockComponent implements OnInit {
  dashboardLoading$ = this.dashboardFacade.loadingDashboard$;
  dashboardLoaded$ = this.dashboardFacade.loadedDashboard$;
  recommendations$ = this.userRecommendationFacade.all$;
  categories$ = this.categoryFacade.all$;
  services$ = this.serviceFacade.all$;

  constructor(
    private dashboardFacade: DashboardFacade,
    private userRecommendationFacade: UserRecommendationFacade,
    private categoryFacade: CategoryFacade,
    private serviceFacade: ServiceFacade
  ) {}

  ngOnInit(): void {
    this.dashboardFacade.loadDashboard();
  }
}
