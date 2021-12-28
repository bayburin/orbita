import { QuestionOverviewVM } from './../../entities/view-models/question-overview-vm.interface';
import { isQuestionBelongsByServiceToUser, isQuestionBelongsToUser } from './question.functions';
import { User } from './../../entities/models/user.interface';
import { ResponsibleUser } from './../../entities/models/responsible-user.interface';

describe('isQuestionBelongsToUser', () => {
  let user: User;
  let question: QuestionOverviewVM;
  const createUser = (tn: number): User =>
    ({
      tn,
    } as User);
  const createQuestion = (name = '', tns: number[]): QuestionOverviewVM =>
    ({
      ticket: {
        name,
        responsible_users: tns.map((tn) => ({ tn } as ResponsibleUser)),
      },
    } as QuestionOverviewVM);

  beforeEach(() => {
    user = createUser(17664);
  });

  it('should return true if tn of user match with one of question tn', () => {
    question = createQuestion('fake', [17664, 12345]);

    expect(isQuestionBelongsToUser(question, user)).toBe(true);
  });

  it('should return false if tn of user does not match with any of question tn', () => {
    question = createQuestion('fake', [56789, 12345]);

    expect(isQuestionBelongsToUser(question, user)).toBe(false);
  });
});

describe('isQuestionBelongsByServiceToUser', () => {
  let user: User;
  let question: QuestionOverviewVM;
  const createUser = (tn: number): User =>
    ({
      tn,
    } as User);
  const createQuestion = (name = '', tns: number[]): QuestionOverviewVM =>
    ({
      ticket: {
        name,
        service: {
          responsible_users: tns.map((tn) => ({ tn } as ResponsibleUser)),
        },
      },
    } as QuestionOverviewVM);

  beforeEach(() => {
    user = createUser(17664);
  });

  it('should return true if tn of user match with one of service tn', () => {
    question = createQuestion('fake', [17664, 12345]);

    expect(isQuestionBelongsByServiceToUser(question, user)).toBe(true);
  });

  it('should return false if tn of user does not match with any of service tn', () => {
    question = createQuestion('fake', [56789, 12345]);

    expect(isQuestionBelongsByServiceToUser(question, user)).toBe(false);
  });
});
