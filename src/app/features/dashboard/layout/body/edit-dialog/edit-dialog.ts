import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ITask } from '../../../task/task.model';
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface DialogData {
  task: ITask,
  tasks: ITask[]
}

@Component({
  selector: 'app-edit-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog {
  readonly dialogRef = inject(MatDialogRef<EditDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly tasks = model(this.data.tasks)
  readonly editTask = model(this.data.task)


  onNoClick(): void {
    this.dialogRef.close();
  }
}
