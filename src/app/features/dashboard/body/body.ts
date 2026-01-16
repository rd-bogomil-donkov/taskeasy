import { Component } from '@angular/core';
import { ITask } from "./task/task.model";
import { Task } from './task/task';

@Component({
  selector: 'app-body',
  imports: [Task],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  toDoTasks: ITask[] = [];
  inProgressTasks: ITask[] = [];
  doneTasks: ITask[] = [];
}
