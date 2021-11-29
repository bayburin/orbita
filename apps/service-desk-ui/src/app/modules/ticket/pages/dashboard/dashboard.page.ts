import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';

import { DashboardI } from '../../../../core/interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Service } from '../../models/service/service.model';
import { Ticket } from '../../models/ticket/ticket.model';
import { toggleQuestionList } from '../../animations/toggle-question-list.animation';
import { contentBlockAnimation } from '../../../../core/animations/content.animation';
import { UserRecommendationI } from '../../../../core/interfaces/user-recommendation.interface';

@Component({
  selector: 'service-desk-ui-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [toggleQuestionList, contentBlockAnimation],
})
export class DashboardPageComponent implements OnInit {
  data: DashboardI;
  loading = false;
  limits = {
    services: 6,
    questions: 3,
  };

  constructor(private dashboardDataService: DashboardService) {}

  ngOnInit() {
    this.loading = true;
    this.dashboardDataService
      .loadAll()
      .pipe(
        finalize(() => (this.loading = false)),
        map((data) => {
          data.services.map((service) => {
            service.questionLimit = this.limits.questions;

            return service;
          });

          return data;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  /**
   * Переключатель "Показать все вопросы".
   *
   * @param service - сервис, у которого необходимо показать/скрыть вопросы.
   */
  toggleQuestionLimit(service: Service): void {
    service.questionLimit = this.isNeedToDropDown(service) ? service.questions.length + 1 : this.limits.questions;
  }

  /**
   * Проверка, меньше ли текущий лимит выводимых вопросов количества всех вопросов.
   *
   * @param service - сервис, содержащий вопросы.
   */
  isNeedToDropDown(service: Service): boolean {
    return service.questionLimit < service.questions.length;
  }

  trackByService(index: number, service: Service) {
    return service.id;
  }

  trackByTicket(index: number, ticket: Ticket) {
    return ticket.id;
  }

  trackByRecommendation(index: number, recommendation: UserRecommendationI) {
    return recommendation.id;
  }
}
