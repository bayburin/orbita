import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvtItemsBlockComponent } from './svt-items-block.component';

describe('SvtItemsBlockComponent', () => {
  let component: SvtItemsBlockComponent;
  let fixture: ComponentFixture<SvtItemsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvtItemsBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvtItemsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
