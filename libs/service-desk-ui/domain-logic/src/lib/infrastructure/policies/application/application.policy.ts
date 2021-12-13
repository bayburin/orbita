import { Injectable } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { User } from './../../../entities/model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationPolicy {
  /**
   * Пользователь, запрашивающий доступ (текущий пользователь)
   */
  user: User = this.authHelper.getJwtPayload();
  /**
   * Объект, к которому запрашивается доступ
   */
  object: any;

  constructor(private authHelper: AuthHelper) {}

  authorize(object: any, method: string): boolean {
    this.object = object;

    return (this as any)[method]();
  }
}
