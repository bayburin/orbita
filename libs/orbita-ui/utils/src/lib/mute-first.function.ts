import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

export const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) => {
  return combineLatest([first$, second$]).pipe(
    map(([_first, second]) => second),
    distinctUntilChanged()
  );
};
