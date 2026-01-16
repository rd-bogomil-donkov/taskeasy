import { Component, signal } from '@angular/core';
import { Header } from "./features/dashboard/header/header";
import { Body } from './features/dashboard/body/body';

@Component({
  selector: 'app-root',
  imports: [Header, Body],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taskeasy');
}
