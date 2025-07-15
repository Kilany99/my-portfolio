import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ScrollStateService } from '../../shared/scroll-state.service'; 
import { Subscription } from 'rxjs'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
 //   RouterModule, 
    CommonModule,
    MatIconModule 
  ],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  // This class will be TRUE when the header should be SOLID (on Home section)
  @HostBinding('class.is-solid') isSolid = false; // Start not-solid (transparent)

  private scrollStateSubscription!: Subscription;
  isNavOpen = false;
  currentActiveSectionId: string = 'home'; // Initialize to 'home'

  navLinks = [
    { label: 'Home', path: '#home' },
    { label: 'About', path: '#about' },
    { label: 'Skills', path: '#skills' },
    { label: 'Projects', path: '#projects' },
    { label: 'Contact', path: '#contact' }
  ];
  menuOpen = false;
  isDarkMode = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  constructor(private scrollStateService: ScrollStateService) { }

  ngOnInit(): void {
     // Subscribe to changes in the active section
     this.scrollStateSubscription = this.scrollStateService.activeSection$.subscribe(activeSectionId => {
        this.isSolid = (activeSectionId === 'home');
      // Update the current active section ID property
        this.currentActiveSectionId = activeSectionId;
     });
  }

  ngOnDestroy(): void {
     if (this.scrollStateSubscription) {
        this.scrollStateSubscription.unsubscribe();
     }
  }
  toggleNav(): void {
   this.isNavOpen = !this.isNavOpen;
 }
 closeNav(): void {
   this.isNavOpen = false;
}
}