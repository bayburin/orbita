import { Component, OnInit } from '@angular/core';
import { UserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'service-desk-ui-admin-home-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {
  userRecommendations$ = this.userRecommendationFacade.all$;
  loading$ = this.userRecommendationFacade.loading$;
  loaded$ = this.userRecommendationFacade.loaded$;

  constructor(private userRecommendationFacade: UserRecommendationFacade) {}

  ngOnInit(): void {
    this.userRecommendationFacade.loadAll();
  }
}
