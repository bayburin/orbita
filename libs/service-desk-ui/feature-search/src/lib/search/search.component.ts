import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { SearchFacade, SearchResultTypes } from '@orbita/service-desk-ui/domain-logic';
import { Observable, of } from 'rxjs';
import { debounceTime, takeWhile, switchMap } from 'rxjs/operators';

@Component({
  selector: 'service-desk-ui-search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchCtrl: FormControl;
  searchTerm: string;
  loading$ = this.searchFacade.loading$;
  @ViewChild(NgbTypeahead) globalSearch: NgbTypeahead;
  private alive = true;
  private readonly minLengthSearch = 3;

  constructor(private router: Router, private searchFacade: SearchFacade) {}

  ngOnInit(): void {
    this.searchCtrl = new FormControl({ name: this.searchTerm });
    this.searchCtrl.valueChanges.pipe(takeWhile(() => this.alive)).subscribe((res: string | SearchResultTypes) => {
      if (typeof res === 'string') {
        this.searchTerm = res;
        return;
      }

      // this.searchTerm = res.name;
      // TODO: Тут редирект на категорию/услугу/вопрос
      // this.router.navigateByUrl(res.getShowLink());
    });
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
      switchMap((term) => {
        if (!term || term.length < this.minLengthSearch) {
          return of([]);
        }

        this.searchFacade.search(term);

        return this.searchFacade.result$;
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

    this.router.navigate(['search-result'], { queryParams: { search: this.searchTerm.trim() } });
  }

  /**
   * Форматирует выводимые данные.
   */
  formatter = (val: { name: string }) => val.name;

  ngOnDestroy() {
    this.alive = false;
  }
}
