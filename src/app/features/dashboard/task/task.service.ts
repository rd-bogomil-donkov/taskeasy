import { Injectable, signal } from '@angular/core';
import { ITask } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<ITask[]>([]);

  addTask(task: ITask) {
    this.tasks.update(current => [...current, task]);
  }

  removeTask(taskToRemove: ITask | null) {
    this.tasks.update(tasks =>
      tasks.filter(task =>
        task !== taskToRemove
      )
    );
  }

  updateTask(updatedTask: ITask) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    )
  }

  updateTaskStatus(task: ITask | null, status?: 'todo' | 'in-progress' | 'done') {
    if (!status) return;

    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === task?.id ? { ...t, status } : t
      )
    );
  }

}
