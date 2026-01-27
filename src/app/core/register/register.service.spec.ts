import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('RegisterService', () => {
    let service: RegisterService;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    const validUser: IUser = {
        name: 'username',
        password: 'password'
    };

    beforeEach(() => {
        userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
            'userExists',
            'addUser'
        ]);

        TestBed.configureTestingModule({
            providers: [
                RegisterService,
                { provide: UserService, useValue: userServiceSpy },
                provideZonelessChangeDetection()
            ]
        });

        service = TestBed.inject(RegisterService);
    });

    describe('validateInput()', () => {
        it('should fail when name is missing', () => {
            const user = { ...validUser, name: '' };

            const result = service.validateInput(user, user.password);

            expect(result).toEqual([false, 'Please enter valid name!']);
        });

        it('should fail when password is missing', () => {
            const user = { ...validUser, password: '' };

            const result = service.validateInput(user, '');

            expect(result).toEqual([false, 'Please enter valid password']);
        });

        it('should fail when passwords do not match', () => {
            const result = service.validateInput(validUser, 'differentPassword');

            expect(result).toEqual([false, 'Passwords must match']);
        });

        it('should succeed with valid input', () => {
            const result = service.validateInput(validUser, validUser.password);

            expect(result).toEqual([true, '']);
        });
    });

    describe('registerUser()', () => {
        it('should fail if user already exists', () => {
            userServiceSpy.userExists.and.returnValue(true);

            const result = service.registerUser(validUser);

            expect(userServiceSpy.userExists).toHaveBeenCalledWith(validUser);
            expect(userServiceSpy.addUser).not.toHaveBeenCalled();
            expect(result).toEqual([
                false,
                'user: [username] already exists'
            ]);
        });

        it('should add user if user does not exist', () => {
            userServiceSpy.userExists.and.returnValue(false);

            const result = service.registerUser(validUser);

            expect(userServiceSpy.userExists).toHaveBeenCalledWith(validUser);
            expect(userServiceSpy.addUser).toHaveBeenCalledWith(validUser);
            expect(result).toEqual([true, '']);
        });
    });
});
