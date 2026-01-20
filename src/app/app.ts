import { Component } from '@angular/core';
import { Header } from "./features/dashboard/layout/header/header";
import { Body } from './features/dashboard/layout/body/body';

@Component({
  selector: 'app-root',
  imports: [Header, Body],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
