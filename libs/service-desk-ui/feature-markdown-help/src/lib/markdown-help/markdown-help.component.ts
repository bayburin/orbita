import { Component, OnInit, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'lib-markdown-help',
  templateUrl: './markdown-help.component.html',
  styleUrls: ['./markdown-help.component.scss'],
})
export class MarkdownHelpComponent {
  selectedOption: string;
  @ViewChild('markdownScrollParent', { static: true }) markdownScrollParent: ElementRef;
  @HostListener('window:scroll') onScroll() {
    const componentPosition = this.markdownScrollParent.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const scroller = this.markdownScrollParent.nativeElement.querySelector('.scroller');

    if (scrollPosition > componentPosition - 30) {
      this.renderer.setStyle(scroller, 'position', 'fixed');
      this.renderer.setStyle(scroller, 'top', '30px');
    } else {
      this.renderer.setStyle(scroller, 'position', 'relative');
      this.renderer.removeStyle(scroller, 'top');
    }
  }

  constructor(private renderer: Renderer2) {}

  /**
   * Перемещает экран к указанному id.
   */
  scrollToElement(element: Element): void {
    this.selectedOption = element.getAttribute('id');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
