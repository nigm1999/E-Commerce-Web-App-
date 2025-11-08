import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite}from 'flowbite';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('task-2');
  ngOnInit(): void {
    initFlowbite();
  }
}
