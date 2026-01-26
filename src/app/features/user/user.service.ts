import { inject, Injectable, signal } from '@angular/core';
import { IUser } from './user.model';
import { PersistanceService } from '../../core/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = signal<IUser[]>([])
  private persistanceService = inject(PersistanceService)

  constructor() {
    this.users.set(this.persistanceService.getUsers())
  }

  loginUser(user: IUser): Boolean {
    if (!this.validateUser(user)) {
      console.log("log in unsuccessfull")
      return false
    }

    console.log("User: " + user.name + " log in successfull")
    return true
  }

  registerUser(user: IUser): Boolean {
    console.log("Registering: " + user.name)
    if (this.userExists(user))
      return false;

    this.users().push(user)
    this.persistanceService.addUser(user)

    console.log(this.users())
    console.log("User: " + user.name + " is registered")
    return true
  }

  private validateUser(user: IUser): Boolean {
    console.log("users length " + this.users().length)
    let foundUser = this.users().find(u => u.name == user.name && u.password == user.password)
    let isValidUser: boolean = foundUser != undefined
    console.log("user found: " + foundUser)
    console.log("isValid " + isValidUser)

    console.log("User validation: " + isValidUser)
    return isValidUser
  }

  private userExists(user: IUser): Boolean {
    let userExist: boolean = this.users().find(u => u.name == user.name) != undefined

    console.log("User exists: " + userExist)
    return userExist
  }

  getUsers() {
    return this.users()
  }
}
