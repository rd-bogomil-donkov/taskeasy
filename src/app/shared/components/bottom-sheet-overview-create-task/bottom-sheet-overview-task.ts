import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../../../features/dashboard/task/task.service';
import { ITask } from '../../../features/dashboard/task/task.model';

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
  templateUrl: './bottom-sheet-overview-task.html',
  styleUrl: './bottom-sheet-overview-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetOverviewTask {
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetOverviewTask>>(MatBottomSheetRef);

  private taskData: ITask = inject(MAT_BOTTOM_SHEET_DATA)

  contextLabel!: string;
  task: IBottomSheetOverviewTask = {
    project: '',
    assignee: '',
    estimation: undefined,
    description: ''
  };

  taskService = inject(TaskService)

  constructor() {
    if (this.taskData == null) {
      this.contextLabel = 'Create'
    }
    else {
      this.task = this.getTaskData()
    }
  }

  private getTaskData(): IBottomSheetOverviewTask {
    this.contextLabel = 'Edit'

    return {
      assignee: this.taskData.assignee,
      project: this.taskData.project,
      estimation: this.taskData.estimation,
      description: this.taskData.description
    }
  }

  onButtonClick() {
    if (this.taskData == null)
      this.createTask()
    else
      this.editTask()

    this._bottomSheetRef.dismiss()
  }

  private createTask() {
    if (!(this.task.project && this.task.assignee && this.task.estimation)) return;

    this.taskService.addTask(
      {
        id: crypto.randomUUID(),
        project: this.task.project,
        assignee: this.task.assignee,
        estimation: this.task.estimation,
        description: this.task.description,
        status: 'todo'
      }
    )
  }

  private editTask() {
    if (!(this.task.project && this.task.assignee && this.task.estimation)) return;

    this.taskService.updateTask({
      id: this.taskData.id,
      assignee: this.task.assignee,
      project: this.task.project,
      estimation: this.task.estimation,
      description: this.task.description,
      status: this.taskData.status
    })
  }

}
