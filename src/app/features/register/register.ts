import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  imports: [MatLabel, MatFormField, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly router = inject(Router)
  readonly userService = inject(UserService)
  registerUser: IUser = {
    name: '',
    password: ''
  } 
  repeatPassword?: string

  onRegister(){
    if(!this.validateInput()){
      console.log("Invalid input")
      return
    }

    if(!this.userService.registerUser(this.registerUser)){
      //dialog logic
    }

    this.router.navigate(['/login'])
  }

  private validateInput(): Boolean{
    if(!this.registerUser.name)
      return false

    if(this.registerUser.password != this.repeatPassword)
      return false 

    return true
  }
}
