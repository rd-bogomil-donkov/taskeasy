import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { PersistanceService } from '../persistance.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let persistanceServiceMock: jasmine.SpyObj<PersistanceService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PersistanceService', ['getLogInState', 'updateLogInState']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PersistanceService, useValue: spy },
        provideZonelessChangeDetection(),
      ],
    });

    persistanceServiceMock = TestBed.inject(PersistanceService) as jasmine.SpyObj<PersistanceService>;
    // Default mock return
    persistanceServiceMock.getLogInState.and.returnValue(false);

    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize loggedIn signal from persistanceService', () => {
    expect(persistanceServiceMock.getLogInState).toHaveBeenCalled();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('setLogIn should update signal and call persistanceService', () => {
    service.setLogIn(true);

    expect(persistanceServiceMock.updateLogInState).toHaveBeenCalledWith(true);

    expect(service.isLoggedIn()).toBe(false);
  });

  it('isLoggedIn should return value from persistanceService', () => {
    persistanceServiceMock.getLogInState.and.returnValue(true);
    expect(service.isLoggedIn()).toBe(true);
  });
});
