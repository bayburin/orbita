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
  /**
   * Ключ
   */
  is_hidden?: boolean;
}

const serviceHiddenTypesVMMap: Record<string, ServiceHiddenTypesVM> = {
  true: ServiceTypesVMFactory.create<ServiceHiddenTypesVM>('Скрытая', 'hidden'),
  false: ServiceTypesVMFactory.create<ServiceHiddenTypesVM>('Открытая', 'visible'),
};

/**
 * Массив представлений типов услуг
 */
export const serviceHiddenVMArray = Object.keys(serviceHiddenTypesVMMap)
  .map((el) => el === 'true')
  .reduce<ServiceHiddenTypesVM[]>((arr, is_hidden) => {
    arr.push({
      is_hidden,
      ...getServiceHiddenTypes(is_hidden),
    });

    return arr;
  }, []);

/**
 * Функция возвращает значение объекта ServiceHiddenTypesVM исходя из полученного типа external
 *
 * @param external - тип ссылки (true - внешняя, false - внутренняя)
 */
export function getServiceHiddenTypes(external: boolean): ServiceHiddenTypesVM {
  return serviceHiddenTypesVMMap[external.toString()];
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
  /**
   * Ключ
   */
  has_common_case?: boolean;
}

const serviceHasCommonCaseTypesVMMap: Record<string, ServiceHasCommonCaseTypesVM> = {
  true: ServiceTypesVMFactory.create<ServiceHasCommonCaseTypesVM>('Да', 'common-case'),
  false: ServiceTypesVMFactory.create<ServiceHasCommonCaseTypesVM>('Нет', 'not-common-case'),
};

/**
 * Массив представлений типов услуг
 */
export const serviceHasCommonCaseVMArray = Object.keys(serviceHasCommonCaseTypesVMMap)
  .map((el) => el === 'true')
  .reduce<ServiceHasCommonCaseTypesVM[]>((arr, has_common_case) => {
    arr.push({
      has_common_case,
      ...getServiceHasCommonCaseTypes(has_common_case),
    });

    return arr;
  }, []);

/**
 * Функция возвращает значение объекта UserRecommendationLinkTypesVMMap исходя из полученного типа external
 *
 * @param external - тип ссылки (true - внешняя, false - внутренняя)
 */
export function getServiceHasCommonCaseTypes(external: boolean): ServiceHasCommonCaseTypesVM {
  return serviceHasCommonCaseTypesVMMap[external.toString()];
}
