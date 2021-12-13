import { Injectable } from '@angular/core';

import { ApplicationPolicy } from '../application/application.policy';
import { isUserHasRole } from '../../utils/is-user-has-role.function';
import { isQuestionBelongsByServiceToUser, isQuestionBelongsToUser } from '../../utils/question.functions';

@Injectable({
  providedIn: 'root',
})
export class QuestionPolicy extends ApplicationPolicy {
  showFlags(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return (
        isQuestionBelongsToUser(this.object, this.user) || isQuestionBelongsByServiceToUser(this.object, this.user)
      );
    } else {
      return isUserHasRole(this.user, 'content_manager') || isUserHasRole(this.user, 'operator');
    }
  }

  publish(): boolean {
    return isUserHasRole(this.user, 'content_manager') && (this.object.state === 'draft' || this.object.correction);
  }

  destroy(): boolean {
    return isUserHasRole(this.user, 'content_manager');
  }
}
