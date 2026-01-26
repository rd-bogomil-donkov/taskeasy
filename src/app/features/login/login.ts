import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLabel, MatFormField } from "@angular/material/select";
import { IUser } from '../user/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../user/user.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatLabel, MatFormField, FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  loginUser: IUser = {
    name: '',
    password: ''
  }

  onLogin() {
    console.log("Logging")
    if (!this.validateName()) {
      console.log("invalid name input")
      //dialog logic
      return
    }

    if (this.userService.loginUser(this.loginUser)) {
      this.authService.setLogIn(true)
      this.router.navigate(['/tasks'])
    } else {
      //dialog logic
    }
  }

  private validateName(): Boolean {
    return this.loginUser.name != undefined || this.loginUser.name != null
  }
}
