import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ScrollStateService } from '../../shared/scroll-state.service'; 
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-header',
  imports: [
 //   RouterModule, 
    CommonModule 
  ],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  // This class will be TRUE when the header should be SOLID (on Home section)
  @HostBinding('class.is-solid') isSolid = false; // Start not-solid (transparent)

  private scrollStateSubscription!: Subscription;

  constructor(private scrollStateService: ScrollStateService) { }

  ngOnInit(): void {
     // Subscribe to changes in the active section
     this.scrollStateSubscription = this.scrollStateService.activeSection$.subscribe(activeSectionId => {
        this.isSolid = (activeSectionId === 'home');
        // console.log('Active Section ID:', activeSectionId, 'isSolid:', this.isSolid); //  logging for debugging
     });
  }

  ngOnDestroy(): void {
     if (this.scrollStateSubscription) {
        this.scrollStateSubscription.unsubscribe();
     }
  }
}