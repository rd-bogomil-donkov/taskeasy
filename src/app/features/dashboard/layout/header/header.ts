import { Component } from '@angular/core';
import { FilterBar } from "./filter-bar/filter-bar";
import { CrudBar } from "./crud-bar/crud-bar";

@Component({
  selector: 'app-header',
  imports: [FilterBar, CrudBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
