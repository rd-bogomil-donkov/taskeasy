import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { PersistanceService } from '../persistance.service';
import { IUser } from './user.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UserService', () => {
    let service: UserService;
    let persistanceSpy: jasmine.SpyObj<PersistanceService>;

    const mockUsers: IUser[] = [
        { name: 'alice', password: '123' },
        { name: 'bob', password: '456' }
    ];

    const newUser: IUser = { name: 'john', password: 'password123' };

    beforeEach(() => {
        persistanceSpy = jasmine.createSpyObj<PersistanceService>('PersistanceService', [
            'getUsers',
            'addUser'
        ]);

        // Simulate existing users from persistence
        persistanceSpy.getUsers.and.returnValue([...mockUsers]);

        TestBed.configureTestingModule({
            providers: [
                UserService,
                { provide: PersistanceService, useValue: persistanceSpy },
                provideZonelessChangeDetection()
            ]
        });

        service = TestBed.inject(UserService);
    });

    it('should initialize with users from PersistanceService', () => {
        expect(service.getUsers()).toEqual(mockUsers);
        expect(persistanceSpy.getUsers).toHaveBeenCalled();
    });

    describe('addUser()', () => {
        it('should add a user to users array and call persistanceService.addUser', () => {
            service.addUser(newUser);

            expect(service.getUsers()).toContain(newUser);
            expect(persistanceSpy.addUser).toHaveBeenCalledWith(newUser);
        });
    });

    describe('validateUser()', () => {
        it('should return true for valid user', () => {
            const result = service.validateUser(mockUsers[0]);
            expect(result).toEqual([true, '']);
        });

        it('should return false for invalid user', () => {
            const invalidUser: IUser = { name: 'charlie', password: '789' };
            const result = service.validateUser(invalidUser);
            expect(result).toEqual([false, 'Invalid username or password']);
        });
    });

    describe('userExists()', () => {
        it('should return true if user exists', () => {
            const result = service.userExists(mockUsers[1]);
            expect(result).toBeTrue();
        });

        it('should return false if user does not exist', () => {
            const unknownUser: IUser = { name: 'unknown', password: 'pass' };
            const result = service.userExists(unknownUser);
            expect(result).toBeFalse();
        });
    });

    describe('getUsers()', () => {
        it('should return the current list of users', () => {
            const users = service.getUsers();
            expect(users).toEqual(mockUsers);
        });
    });
});
