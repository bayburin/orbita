import { Component, OnInit } from '@angular/core';

import { UserRecommendationFacade, CategoryFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss'],
})
export class DashboardBlockComponent implements OnInit {
  recommendations$ = this.userRecommendationFacade.all$;
  recommendationsLoading$ = this.userRecommendationFacade.loading$;
  recommendationsLoaded$ = this.userRecommendationFacade.loaded$;
  categories$ = this.categoryFacade.all$;
  categoriesLoading$ = this.categoryFacade.loading$;
  categoriesLoaded$ = this.categoryFacade.loaded$;

  constructor(private userRecommendationFacade: UserRecommendationFacade, private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.userRecommendationFacade.loadAll();
    this.categoryFacade.loadAll();
  }
}
