import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[libDisableOnLoading]',
})
export class DisableOnLoadingDirective {
  @Input() libDisableOnLoading: number;
  @Input() set libDisableOnLoadingIds(loadingIds: number[]) {
    if (loadingIds.some((id) => id === this.libDisableOnLoading)) {
      // Случай, когда id файла в списке loadingIds, нужно добавить атрибут disable
      this.elementRef.nativeElement.disabled = true;
    } else {
      // Иначе удалить атрибут disable
      this.elementRef.nativeElement.disabled = false;
    }
  }

  constructor(private elementRef: ElementRef) {}
}
