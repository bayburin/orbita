import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    component.comments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('does not raise error if comments is empty', () => {
      const changesObj: SimpleChanges = {
        comments: new SimpleChange(undefined, [], true),
      };

      expect(component.ngOnChanges(changesObj)).toBeUndefined();
    });
  });
});
