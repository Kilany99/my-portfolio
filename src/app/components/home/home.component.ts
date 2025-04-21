import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   

// Import animation functions
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
    imports: [
    CommonModule,
    RouterModule,
 ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ 
    trigger('fadeIn', [ // Define a trigger named 'fadeIn'
      state('void', style({ opacity: 0 })), // State when element is entering (initially invisible)
      transition('void => *', [ // Transition from void to any state (*)
        animate('1500ms ease-out') // Animate over 1000ms (1 second)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}