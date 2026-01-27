import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}