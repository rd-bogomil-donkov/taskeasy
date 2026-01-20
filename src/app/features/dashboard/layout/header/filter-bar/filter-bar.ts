import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../task/task.service';

@Component({
  selector: 'app-filter-bar',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBar {
  taskService = inject(TaskService)

  personFilter = new FormControl('');  
  projectFilter = new FormControl('');
  stateFilter = new FormControl('');

  personList: string[] = []
  projectList: string[] = []
  estimations: number[] = []
  
}
