import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../user/user.model';
import { RegisterService } from './register.service';
import { DialogService } from '../../shared/components/dialog/dialog.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [MatLabel, MatFormField, FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly router = inject(Router)
  private readonly registerService = inject(RegisterService)
  private readonly dialogService = inject(DialogService)
  private readonly authService = inject(AuthService)

  user: IUser = {
    name: '',
    password: ''
  }
  repeatPassword?: string

  onRegister() {
    let result: Boolean
    let message: string

    [result, message] = this.registerService.validateInput(this.user, this.repeatPassword)

    if (!result) {
      this.dialogService.openDialog('Error', message)
      return
    }

    [result, message] = this.registerService.registerUser(this.user)

    if (result) {
      this.authService.setLogIn(true)
      this.router.navigate(['/dashboard'])
    }
    else
      this.dialogService.openDialog('Error', message)
  }

}
