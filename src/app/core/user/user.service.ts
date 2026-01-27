import { inject, Injectable, signal } from '@angular/core';
import { IUser } from './user.model';
import { PersistanceService } from '../../core/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly persistanceService = inject(PersistanceService)
  private readonly users = signal<IUser[]>([])

  constructor() {
    this.users.set(this.persistanceService.getUsers())
  }

  addUser(user: IUser) {
    this.users().push(user)
    this.persistanceService.addUser(user)
  }

  validateUser(user: IUser): [Boolean, string] {
    let foundUser = this.users().find(u => u.name == user.name && u.password == user.password)

    if (foundUser != undefined)
      return [true, '']
    else
      return [false, 'Invalid username or password']
  }

  userExists(user: IUser): Boolean {
    let userExist: boolean = this.users().find(u => u.name == user.name) != undefined

    return userExist
  }

  getUsers() {
    return this.users()
  }
}
