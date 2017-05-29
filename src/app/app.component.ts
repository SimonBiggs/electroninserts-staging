import 'hammerjs';

import { Component } from '@angular/core';
import {MdSidenav, MdToolbar} from "@angular/material";

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
