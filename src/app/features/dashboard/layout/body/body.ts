import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Task } from '../../task/task';
import { TaskService } from '../../task/task.service';
import { ITask } from '../../task/task.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkMenu, CdkMenuItem, CdkContextMenuTrigger } from '@angular/cdk/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewTask } from '../../../../shared/components/bottom-sheet-overview-create-task/bottom-sheet-overview-task';

@Component({
  selector: 'app-body',
  imports: [Task, DragDropModule, CdkContextMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  taskService = inject(TaskService)
  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);
  private _bottomSheet = inject(MatBottomSheet);

  toDoTasks = computed(() => this.taskService.tasks().filter(task => task.status === 'todo'));
  inProgressTasks = computed(() => this.taskService.tasks().filter(task => task.status === 'in-progress'));
  doneTasks = computed(() => this.taskService.tasks().filter(task => task.status === 'done'));

  selectedTask = signal<ITask | null>(null);
  status?: 'todo' | 'in-progress' | 'done';

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      // Reorder inside the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      switch (event.container.id) {
        case 'toDoList': this.status = 'todo'; break;
        case 'inProgressList': this.status = 'in-progress'; break;
        case 'doneList': this.status = 'done'; break;
      }

      this.taskService.updateTaskStatus(this.selectedTask(), this.status)

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSelectTask(task: ITask) {
    this.selectedTask?.set(task);
  }

  onEdit() {
    this._bottomSheet.open(BottomSheetOverviewTask,{
      data: this.selectedTask()
    });
  }

  onDelete() {
    this.taskService.removeTask(this.selectedTask());
  }
}
