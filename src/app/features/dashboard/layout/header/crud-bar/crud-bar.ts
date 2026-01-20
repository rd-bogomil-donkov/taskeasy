import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetOverviewCreateTask } from '../../body/bottom-sheet-overview-create-task/bottom-sheet-overview-create-task';

@Component({
  selector: 'app-crud-bar',
  imports: [MatButtonModule, MatBottomSheetModule],
  templateUrl: './crud-bar.html',
  styleUrl: './crud-bar.css',
})
export class CrudBar {
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewCreateTask);
  }
}
