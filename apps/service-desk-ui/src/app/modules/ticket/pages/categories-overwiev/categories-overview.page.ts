import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CategoryService } from '../../../../shared/services/category/category.service';
import { Category } from '../../models/category/category.model';

@Component({
  selector: 'service-desk-ui-categories-overview-page',
  templateUrl: './categories-overview.page.html',
  styleUrls: ['./categories-overview.page.scss'],
})
export class CategoriesOverviewPageComponent implements OnInit {
  loading = false;
  categories: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loading = true;
    this.categoryService
      .loadCategories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((result) => {
        this.categories = result;
      });
  }
}
