import { Component, computed, inject, OnInit } from '@angular/core';
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
export class FilterBar implements OnInit {
  private readonly taskService = inject(TaskService)

  readonly projects = computed(() =>
    [...new Set(this.taskService.projects())].sort()
  );
  readonly assignees = this.taskService.assignees
  readonly estimations = this.taskService.estimations

  readonly projectFilter = new FormControl('')
  readonly assigneeFilter = new FormControl('')
  readonly estimationFilter = new FormControl('')

  projectFilterValues: string = ''
  assigneeFilterValues: string = ''
  estimationFilterValues: string = ''

  ngOnInit() {
    this.projectFilter.valueChanges.subscribe(values => {
      if (values && values.length > 0) {
        this.projectFilterValues = values
      } else {
        this.projectFilterValues = ''
      }
    });

    this.assigneeFilter.valueChanges.subscribe(values => {
      if (values && values.length > 0) {
        this.assigneeFilterValues = values
      } else {
        this.assigneeFilterValues = ''
      }
    });

    this.estimationFilter.valueChanges.subscribe(values => {
      if (values && values.length > 0) {
        this.estimationFilterValues = values
      } else {
        this.estimationFilterValues = ''
      }
    });
  }

  onApply() {
    if (!this.projectFilterValues && !this.assigneeFilterValues && this.estimationFilterValues.length == 0) {
      this.taskService.resetFilters()
    } else {
      this.taskService.filterTasks(this.projectFilterValues, this.assigneeFilterValues, this.estimationFilterValues)
    }
  }
}
