import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Body } from './layout/body/body';

@Component({
  selector: 'app-dashboard',
  imports: [Header,Body],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
