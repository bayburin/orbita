import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentUser } from '@orbita/orbita-ui/domain-logic';
import { FioInitialsPipe } from '@orbita/orbita-ui/ui';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, FioInitialsPipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.currentUser = { fio: 'fake-fio' } as CurrentUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
