import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetOverviewTask } from '../../../../../shared/components/bottom-sheet-overview-create-task/bottom-sheet-overview-task';
import { AuthService } from '../../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-bar',
  imports: [MatButtonModule, MatBottomSheetModule],
  templateUrl: './crud-bar.html',
  styleUrl: './crud-bar.css',
})
export class CrudBar {
  private _bottomSheet = inject(MatBottomSheet);
  private authService = inject(AuthService)
  private router = inject(Router)

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewTask);
  }

  onLogOut(){
    this.authService.setLogIn(false)
    this.router.navigate(["/login"])
    console.log("Logged out successfully")
  }
}
