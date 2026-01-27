import { inject, Injectable, signal } from '@angular/core';
import { PersistanceService } from '../persistance.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly persistanceService = inject(PersistanceService)
    private readonly loggedIn = signal<boolean>(false)

    constructor() {
        this.loggedIn.set(this.persistanceService.getLogInState())
    }

    setLogIn(flag: boolean) {
        this.loggedIn.set(flag)
        this.persistanceService.updateLogInState(flag)
    }

    isLoggedIn(): boolean {
        return this.persistanceService.getLogInState()
    }
}