import { AfterViewChecked, Directive, ElementRef, Input, QueryList, Renderer2 } from '@angular/core';

@Directive({
  selector: '[libCalcScrollWidthByWorks]',
})
export class CalcScrollWidthByWorksDirective implements AfterViewChecked {
  /**
   * Список элементов, ширину которых необходимо учитывать
   */
  @Input() calculatedElements: QueryList<ElementRef>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    if (!this.calculatedElements) {
      return;
    }

    const currentWidth = this.el.nativeElement.offsetWidth;
    let width = 0;

    this.calculatedElements.toArray().forEach((element) => (width = width + element.nativeElement.offsetWidth));

    if (currentWidth < width) {
      this.renderer.setStyle(this.el.nativeElement, 'width', `${width - 2}px`);
    }
  }
}
