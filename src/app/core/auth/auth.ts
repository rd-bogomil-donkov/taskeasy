import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';
import { DialogService } from '../../shared/components/dialog/dialog.service';

@Component({
  selector: 'app-auth',
  imports: [MatLabel, MatFormField, FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private readonly dialogService = inject(DialogService);
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly userService = inject(UserService)
  loginUser: IUser = {
    name: '',
    password: ''
  }

  onLogin() {
    const [result, message] = this.userService.validateUser(this.loginUser)

    if (result) {
      this.authService.setLogIn(true)
      this.router.navigate(['/dashboard'])
    } else {
      this.dialogService.openDialog('Error', message)
    }
  }
}
