/**
 * Фабрика для создания представлений
 */
class ServiceTypesVMFactory {
  static create<T>(title: string, badge: string): T {
    return { title, badge } as unknown as T;
  }
}

// =================================================================

export interface ServiceHiddenTypesVM {
  /**
   * Название типа
   */
  title: string;
  /**
   * Тип badge
   */
  badge: string;
}

const ServiceHiddenTypesVMMap: Record<string, ServiceHiddenTypesVM> = {
  true: ServiceTypesVMFactory.create<ServiceHiddenTypesVM>('Скрытая', 'hidden'),
  false: ServiceTypesVMFactory.create<ServiceHiddenTypesVM>('Открытая', 'visible'),
};

/**
 * Функция возвращает значение объекта ServiceHiddenTypesVM исходя из полученного типа external
 *
 * @param external - тип ссылки (true - внешняя, false - внутренняя)
 */
export function getServiceHiddenTypes(external: boolean): ServiceHiddenTypesVM {
  return ServiceHiddenTypesVMMap[external.toString()];
}

// =================================================================

export interface ServiceHasCommonCaseTypesVM {
  /**
   * Название типа
   */
  title: string;
  /**
   * Тип badge
   */
  badge: string;
}

const ServiceHasCommonCaseTypesVMMap: Record<string, ServiceHasCommonCaseTypesVM> = {
  true: ServiceTypesVMFactory.create<ServiceHasCommonCaseTypesVM>('Да', 'common-case'),
  false: ServiceTypesVMFactory.create<ServiceHasCommonCaseTypesVM>('Нет', 'not-common-case'),
};

/**
 * Функция возвращает значение объекта UserRecommendationLinkTypesVMMap исходя из полученного типа external
 *
 * @param external - тип ссылки (true - внешняя, false - внутренняя)
 */
export function getServiceHasCommonCaseTypes(external: boolean): ServiceHasCommonCaseTypesVM {
  return ServiceHasCommonCaseTypesVMMap[external.toString()];
}
