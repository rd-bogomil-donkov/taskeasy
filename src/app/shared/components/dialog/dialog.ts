import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  title = this.data.title
  content = this.data.content
}
