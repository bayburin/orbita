import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Category } from '@orbita/service-desk-ui/domain-logic';
import { AbstractSearchResultComponent } from './../abstract-search-result/abstract-search-result.component';

@Component({
  selector: 'lib-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends AbstractSearchResultComponent<Category> {}
