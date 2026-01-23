import { computed, Injectable, signal } from '@angular/core';
import { ITask } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<ITask[]>([]);

  filteredTasks = signal<ITask[]>([...this.tasks()]);
  projects = computed(() => this.tasks().map(t => t.project))
  assignees = computed(() => this.tasks().map(t => t.assignee))
  estimations = computed(() => this.tasks().map(t => t.estimation))

  constructor() {
    let storedTasks: ITask[] = [];

    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem('tasks');
      storedTasks = item ? (JSON.parse(item) as ITask[]) : [];
    }

    this.tasks = signal<ITask[]>(storedTasks);
    this.filteredTasks.set([...this.tasks()]);
  }

  addTask(task: ITask) {
    this.tasks.update(current => [...current, task]);
    this.filteredTasks.update(current => [...current, task])
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  removeTask(taskToRemove: ITask | null) {
    this.tasks.update(tasks =>
      tasks.filter(task =>
        task !== taskToRemove
      )
    );
    this.filteredTasks.update(current => current.filter(task =>
      task !== taskToRemove
    ))
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  updateTask(updatedTask: ITask) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    )
    this.filteredTasks.update(current =>
      current.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    )
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  updateTaskStatus(task: ITask | null, status?: 'todo' | 'in-progress' | 'done') {
    if (!status) return;

    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === task?.id ? { ...t, status } : t
      )
    );

    this.filteredTasks.update(current =>
      current.map(t =>
        t.id === task?.id ? { ...t, status } : t
      )
    )
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  resetFilters() {
    this.filteredTasks.set([...this.tasks()]);
  }

  filterTasks(projectFilterValues: string, assigneeFilterValues: string, estimationFilterValues: string) {
    this.filteredTasks.set([])

    for (let i = 0; i < projectFilterValues.length; i++)
      this.filteredTasks.update(current => [...current, ...this.tasks().filter(t => t.project === projectFilterValues[i])])

    for (let i = 0; i < assigneeFilterValues.length; i++)
      this.filteredTasks.update(current => [...current, ...this.tasks().filter(t => t.assignee === assigneeFilterValues[i])])

    for (let i = 0; i < estimationFilterValues.length; i++)
      this.filteredTasks.update(current => [...current, ...this.tasks().filter(t => t.estimation.toString() === estimationFilterValues[i])])
  }

}
