import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../../../task/task.service';

@Component({
  selector: 'app-bottom-sheet-overview-create-task',
  imports: [
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './bottom-sheet-overview-create-task.html',
  styleUrl: './bottom-sheet-overview-create-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetOverviewCreateTask {
  project?: string;
  assignee?: string;
  estimation?: number;
  description: string = '';

  taskService = inject(TaskService)

  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewCreateTask>>(MatBottomSheetRef);

  onCreate() {
    if (!this.project)
      return;

    if (!this.assignee)
      return;

    if (!this.estimation)
      return;

    this.taskService.addTask(
      {
        id: crypto.randomUUID(),
        project: this.project,
        assignee: this.assignee,
        estimation: this.estimation,
        description: this.description,
        status: 'todo'
      }
    )

    this._bottomSheetRef.dismiss()
  }
}
