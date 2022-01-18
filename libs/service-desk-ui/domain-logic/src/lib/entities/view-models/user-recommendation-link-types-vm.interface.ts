export interface UserRecommendationLinkTypesVM {
  /**
   * Название типа
   */
  title: string;
  /**
   * Тип badge
   */
  badge: string;
}

/**
 * Фабрика для создания представлений
 */
class UserRecommendationLinkTypesVMFactory {
  static create(title: string, badge: string): UserRecommendationLinkTypesVM {
    return { title, badge };
  }
}

const UserRecommendationLinkTypesVMMap: Record<string, UserRecommendationLinkTypesVM> = {
  true: UserRecommendationLinkTypesVMFactory.create('Внешняя', 'internal'),
  false: UserRecommendationLinkTypesVMFactory.create('Внутренняя', 'external'),
};

/**
 * Функция возвращает значение объекта UserRecommendationLinkTypesVMMap исходя из полученного типа external
 *
 * @param external - тип ссылки (true - внешняя, false - внутренняя)
 */
export function getUserRecommendationLinkTypes(external: boolean): UserRecommendationLinkTypesVM {
  return UserRecommendationLinkTypesVMMap[external.toString()];
}
