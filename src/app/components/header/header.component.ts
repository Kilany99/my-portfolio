import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule, // <-- Needed for routerLink
    CommonModule 
  ],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
}