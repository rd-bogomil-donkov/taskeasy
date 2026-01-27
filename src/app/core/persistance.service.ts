import { Injectable, signal } from '@angular/core';
import { ITask } from '../features/dashboard/task/task.model';
import { IUser } from './user/user.model';

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    private readonly users = signal<IUser[]>([])
    private readonly tasks = signal<ITask[]>([])
    private readonly logInState = signal<boolean>(false)

    constructor() {
        if (typeof localStorage !== 'undefined') {
            const storedUsers = localStorage.getItem('users');
            this.users.set(storedUsers ? JSON.parse(storedUsers) : []);

            const storedTasks = localStorage.getItem('tasks');
            this.tasks.set(storedTasks ? JSON.parse(storedTasks) : []);

            const storedLogInState = localStorage.getItem('log-in-state');
            this.logInState.set(storedLogInState ? JSON.parse(storedLogInState) : []);
        }
    }

    addUser(user: IUser) {
        const updated = [...this.users(), user];
        this.users.set(updated);
        localStorage.setItem('users', JSON.stringify(updated));
    }

    updateLogInState(flagState: boolean) {
        this.logInState.set(flagState);
        localStorage.setItem('log-in-state', JSON.stringify(flagState));
    }

    getUsers() {
        return structuredClone(this.users())
    }

    getTasks() {
        return structuredClone(this.tasks())
    }

    getLogInState() {
        return structuredClone(this.logInState()) 
    }
}
