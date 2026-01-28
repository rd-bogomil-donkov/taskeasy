import { computed, inject, Injectable, signal } from '@angular/core';
import { ITask } from './task.model';
import { UserService } from '../../../core/user/user.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly userService = inject(UserService)
  readonly projects = computed(() => this.tasks().map(t => t.project))
  readonly assignees = computed(() => this.userService.getUsers().map(t => t.name))
  readonly estimations = ['1', '2', '3', '5', '8', '13', '21']
  tasks = signal<ITask[]>([]);
  filteredTasks = signal<ITask[]>([...this.tasks()]);

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

  removeTask(taskToRemove: ITask) {
    console.log("tasks before :")
    this.printTasks()
    this.tasks.update(tasks =>
      tasks.filter(task =>
        task.id !== taskToRemove.id
      )
    );
    this.filteredTasks.update(current => current.filter(task =>
      task !== taskToRemove
    ))
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    console.log("tasks after")
    this.printTasks()
  }

  printTasks(){
    console.log(this.tasks().length)
    this.tasks().forEach(t=>console.log(t.project))
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
    const filtered = this.tasks().filter(t =>
      (projectFilterValues.length === 0 || projectFilterValues.includes(t.project)) &&
      (assigneeFilterValues.length === 0 || assigneeFilterValues.includes(t.assignee)) &&
      (estimationFilterValues.length === 0 || estimationFilterValues.includes(t.estimation.toString()))
    );

    this.filteredTasks.set(filtered);
  }
}
