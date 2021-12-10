import { Component, OnInit } from '@angular/core';

import { HomeFacade, UserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-home-block',
  templateUrl: './home-block.component.html',
  styleUrls: ['./home-block.component.scss'],
})
export class HomeBlockComponent implements OnInit {
  homeLoading$ = this.homeFacade.loading$;
  homeLoaded$ = this.homeFacade.loaded$;
  recommendations$ = this.userRecommendationFacade.all$;
  categories$ = this.homeFacade.categories$;
  services$ = this.homeFacade.services$;

  constructor(private homeFacade: HomeFacade, private userRecommendationFacade: UserRecommendationFacade) {}

  ngOnInit(): void {
    this.homeFacade.loadHome();
  }
}
