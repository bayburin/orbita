import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { RouterTestingModule } from '@angular/router/testing';
import { FioInitialsPipe } from '@orbita/orbita-ui/ui';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authHelper: AuthHelper;
  const user = {
    fio: 'Фамилия Имя Отчество',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent, FioInitialsPipe],
      providers: [{ provide: AuthHelper, useClass: AuthHelperStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    authHelper = TestBed.inject(AuthHelper);
    spyOn(authHelper, 'getJwtPayload').and.returnValue(user);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
