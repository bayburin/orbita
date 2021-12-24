import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';

import { LoadingComponent } from '../../components/loading/loading.component';

@Directive({
  selector: '[libLoadingIndicator]',
})
export class LoadingIndicatorDirective {
  @Input() libLoadingIndicator: number;
  @Input() set libLoadingIndicatorLoadingIds(loadingIds: number[]) {
    this.viewContainerRef.clear();

    if (loadingIds.some((id) => id === this.libLoadingIndicator)) {
      // Случай, когда id файла в списке loadingIds, нужно показать индикатор загрузки
      const componentRef = this.viewContainerRef.createComponent(LoadingComponent);
      const componentInstance = componentRef.instance;
      componentInstance.loading = true;
      componentInstance.size = '24px';
      this.renderer.addClass(componentRef.location.nativeElement, 'text-secondary');
    } else {
      // Иначе показать исходный шаблон
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}
}
