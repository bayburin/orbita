import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectAdblockComponent } from './detect-adblock.component';

describe('DetectAdblockComponent', () => {
  let component: DetectAdblockComponent;
  let fixture: ComponentFixture<DetectAdblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectAdblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectAdblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
