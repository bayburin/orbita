import { Injectable } from '@angular/core';

import { ApplicationPolicyService } from '../application/application-policy.service';
import { isUserHasRole } from '../../../infrastructure/utils/is-user-has-role.function';
import {
  isQuestionBelongsByServiceToUser,
  isQuestionBelongsToUser,
} from '../../../infrastructure/utils/question.functions';
import { QuestionVM } from '../../../entities/view-models/question-vm.interface';
import { QuestionOverviewVM } from '../../../entities/view-models/question-overview-vm.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionPolicyService extends ApplicationPolicyService {
  get question(): QuestionVM {
    return this._object as QuestionVM;
  }

  get questionOverview(): QuestionOverviewVM {
    return this._object as QuestionOverviewVM;
  }

  viewManageInfo(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return (
        isQuestionBelongsToUser(this.questionOverview, this.user) ||
        isQuestionBelongsByServiceToUser(this.questionOverview, this.user)
      );
    } else {
      return isUserHasRole(this.user, 'content_manager') || isUserHasRole(this.user, 'operator');
    }
  }

  publish(): boolean {
    return (
      isUserHasRole(this.user, 'content_manager') &&
      (this.question.ticket.state === 'draft' || !!this.question.correction)
    );
  }

  destroy(): boolean {
    return isUserHasRole(this.user, 'content_manager');
  }
}
