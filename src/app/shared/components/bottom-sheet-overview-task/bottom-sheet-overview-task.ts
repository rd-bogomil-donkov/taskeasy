import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ITask } from '../../../features/dashboard/task/task.model';

import { MatSelectModule } from '@angular/material/select';
import { BottomSheetOverviewTaskService } from './bottom-sheet-overview-task.service';

@Component({
  selector: 'app-bottom-sheet-overview-create-task',
  imports: [
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './bottom-sheet-overview-task.html',
  styleUrl: './bottom-sheet-overview-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetOverviewTask {
  private readonly _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetOverviewTask>>(MatBottomSheetRef);
  private readonly taskData: ITask = inject(MAT_BOTTOM_SHEET_DATA)
  private readonly bottomSheetOverviewTaskService = inject(BottomSheetOverviewTaskService)
  readonly assignees: string[]
  readonly estimations: string[] = ['1', '2', '3', '5', '8', '13', '21']

  contextLabel!: string;
  task: IBottomSheetOverviewTask = {
    project: '',
    assignee: '',
    estimation: '',
    description: ''
  };

  constructor() {
    if (this.taskData == null) {
      this.contextLabel = 'Create'
    }
    else {
      this.contextLabel = 'Edit'
      this.task = this.bottomSheetOverviewTaskService.getTaskData(this.taskData)
    }

    this.assignees = this.bottomSheetOverviewTaskService.getAssignees()
  }

  onButtonClick() {
    if (this.taskData == null)
      this.bottomSheetOverviewTaskService.createTask(this.task)
    else
      this.bottomSheetOverviewTaskService.editTask(this.taskData, this.task)

    this._bottomSheetRef.dismiss()
  }
}
