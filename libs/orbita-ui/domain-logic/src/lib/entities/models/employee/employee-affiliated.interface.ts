import { EmployeeBase } from './employee-base.interface';
import { EmployeeContact } from './employee-contact.interface';

/**
 * Работник смежных компаний
 */
export interface EmployeeAffiliated extends EmployeeBase {
  /**
   * Идентификатор компании
   */
  readonly companyId: number;

  /**
   * Данные о компании
   */
  readonly company: EmployeeCompany;

  /**
   * Контактные данные
   */
  readonly employeeContact: EmployeeContact;
}

export interface EmployeeCompany {
  readonly id: number;
  readonly shortName: string;
  readonly name: string;
}
