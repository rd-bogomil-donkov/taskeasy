import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter-bar',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBar {
  personFilter = new FormControl('');  
  projectFilter = new FormControl('');
  stateFilter = new FormControl('');

  personList: string[] = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5'];
  projectList: string[] = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
  stateList: string[] = ['To do', 'In progress', 'Done'];
  
}
