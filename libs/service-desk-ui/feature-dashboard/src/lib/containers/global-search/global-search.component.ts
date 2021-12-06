import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, takeWhile, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'lib-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
  searchCtrl: FormControl;
  searchTerm: string;
  loading: boolean;
  @ViewChild(NgbTypeahead) globalSearch: NgbTypeahead;
  private alive = true;
  private readonly minLengthSearch = 3;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchCtrl = new FormControl({ name: this.searchTerm });
  }

  /**
   * Поиск, вызывающийся сразу после того, как пользователь ввел данные.
   *
   * @param searchTerm - строка поиска
   */
  search = (searchTerm: Observable<string>) => {
    return searchTerm.pipe(
      debounceTime(500),
      takeWhile(() => this.alive),
      mergeMap((term) => {
        if (!term || term.length < this.minLengthSearch) {
          return of([]);
        }

        this.loading = true;
        // FIXME: Тут вызвать поиск
        return of([]);
      })
    );
  };

  /**
   * Событие поиска по нажатии на кнопку "Поиск".
   */
  onSearch(): void {
    if (!this.searchTerm || this.minLengthSearch < 3) {
      return;
    }
    this.router.navigate(['search'], { queryParams: { search: this.searchTerm.trim() } });
  }

  /**
   * Форматирует выводимые данные.
   */
  formatter = (val: { name: string }) => val.name;

  ngOnDestroy() {
    this.alive = false;
  }
}
