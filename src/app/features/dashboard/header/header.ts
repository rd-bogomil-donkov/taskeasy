import { Component } from '@angular/core';
import { FilterBar } from "./filter-bar/filter-bar";

@Component({
  selector: 'app-header',
  imports: [FilterBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
