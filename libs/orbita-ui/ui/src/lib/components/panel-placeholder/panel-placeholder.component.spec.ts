import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlaceholderComponent } from './panel-placeholder.component';

describe('PanelPlaceholderComponent', () => {
  let component: PanelPlaceholderComponent;
  let fixture: ComponentFixture<PanelPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelPlaceholderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
