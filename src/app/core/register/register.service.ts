import { inject, Injectable } from "@angular/core"
import { IUser } from "../user/user.model"
import { UserService } from "../user/user.service"

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private readonly userService = inject(UserService)

    validateInput(user: IUser, repeatPassword?: string): [Boolean, string] {
        if (!user.name)
            return [false, 'Please enter valid name!']

        if (!user.password)
            return [false, 'Please enter valid password']

        if (user.password != repeatPassword)
            return [false, 'Passwords must match']

        return [true, '']
    }

    registerUser(user: IUser): [Boolean, string] {
        if (this.userService.userExists(user))
            return [false, 'user: [' + user.name + '] already exists'];

        this.userService.addUser(user)

        return [true, '']
    }
}