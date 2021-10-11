import { TestBed } from '@angular/core/testing';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { WorkViewModel } from '@orbita/orbita-ui/domain-logic';

import { SortWorkByHistoryPipe } from './sort-work-by-history.pipe';

describe('SortWorkByHistoryPipe', () => {
  let pipe: SortWorkByHistoryPipe;
  let authHelper: AuthHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthHelper, useClass: AuthHelperStub }, SortWorkByHistoryPipe],
      declarations: [SortWorkByHistoryPipe],
    });

    pipe = TestBed.inject(SortWorkByHistoryPipe);
    authHelper = TestBed.inject(AuthHelper);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array', () => {
    const currentUser = { group_id: 2 };
    const emptyWork = { id: 1, group_id: 1, histories: [] } as WorkViewModel;
    const currentUserWork = { id: 2, group_id: 2, histories: [{ id: 5 }] } as WorkViewModel;
    const anotherWork = { id: 3, group_id: 3, histories: [{ id: 3 }, { id: 4 }] } as WorkViewModel;
    const source = [anotherWork, emptyWork, currentUserWork];
    const target = [currentUserWork, anotherWork, emptyWork];
    jest.spyOn(authHelper, 'getJwtPayload').mockReturnValue(currentUser);

    expect(pipe.transform(source)).toEqual(target);
  });
});
