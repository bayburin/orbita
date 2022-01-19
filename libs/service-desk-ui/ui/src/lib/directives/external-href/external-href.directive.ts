import { Directive, Input, ElementRef } from '@angular/core';

import { UserRecommendation } from '@orbita/service-desk-ui/domain-logic';

@Directive({
  selector: '[libExternalHref]',
})
export class ExternalHrefDirective {
  @Input() set libExternalHref(recommendation: UserRecommendation) {
    const queryParams = Object.entries(recommendation.query_params || {})
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    this.elementRef.nativeElement.href = `${recommendation.link}?${queryParams}`;
  }

  constructor(private elementRef: ElementRef) {}
}
