import { UserRecommendationViewForm } from '../../entities/form/user-recommendation-view-form.interface';
import { UserRecommendation } from '../../entities/models/user-recommendation.interface';

/**
 * Фабрика по созданию сущностей рекомендаций для пользвоателей
 */
export class UserRecommendationFactory {
  /**
   * Создает объект для формы новой записи
   */
  static createViewForm(rec: UserRecommendation = {} as UserRecommendation): UserRecommendationViewForm {
    return {
      id: rec.id,
      order: rec.order,
      title: rec.title,
      external: rec.external || false,
      link: rec.link,
      query_params: Object.entries(rec.query_params || {}).reduce((acc, [key, val]) => {
        acc.push({
          name: key,
          value: val as any,
        });

        return acc;
      }, [] as { name: string; value: string }[]),
    };
  }

  /**
   * Создает запись в виде формы, адаптированной под сервер, на основании заполненной формы
   *
   * @param viewForm - форма, заполненная пользователем
   */
  static createServerForm(viewForm: UserRecommendationViewForm): UserRecommendation {
    return {
      id: viewForm.id,
      order: viewForm.order,
      title: viewForm.title,
      external: viewForm.external,
      link: viewForm.link,
      query_params: viewForm.query_params.reduce((acc, el) => {
        acc[el.name] = el.value;

        return acc;
      }, {} as { [key: string]: string | number }),
    };
  }
}
