import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

import { CommentComponent } from './comment.component';
import { DatetimePipe } from './../../pipes/datetime/datetime.pipe';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent, DatetimePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = { sender: {} } as MessageViewModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
