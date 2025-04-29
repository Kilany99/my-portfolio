import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, HostListener  } from '@angular/core';
// import { RouterModule } from '@angular/router'; 
import { ScrollStateService } from './shared/scroll-state.service'; // 

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [
    //RouterModule, 
    HeaderComponent, 
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    MatIconModule 
  ],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-portfolio';

  // <--- Get references to all sections by their class or tag
  @ViewChildren('section') sections!: QueryList<ElementRef>; // Target elements with #section template variable

  private observer!: IntersectionObserver; // Observer instance

    // <--- Property to control button visibility (initially false)
  isShowScrollToTop = false;
  private scrollThreshold = 300; // Pixels scrolled to show button

  
  constructor(private scrollStateService: ScrollStateService) {}

  // Listen for scroll events on the window
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Check scroll position to decide whether to show the button
    // window.scrollY is the vertical scroll position
    if (window.scrollY > this.scrollThreshold) {
      this.isShowScrollToTop = true;
    } else {
      this.isShowScrollToTop = false;
    }
  }
  ngAfterViewInit(): void {
     // Observe each section element
     this.observer = new IntersectionObserver(
       (entries) => {
         let activeSectionId: string | null = null;
         let highestVisibleRatio = 0;

         entries.forEach(entry => {
           // Find the section that is intersecting and closest to the top
           // A high intersectionRatio means more of the element is visible
           if (entry.isIntersecting) {
             // Simple check: if it's intersecting AND its top is near or above viewport top
             // Alternative: Find the one with the largest intersectionRatio
             if (entry.intersectionRatio > highestVisibleRatio && entry.boundingClientRect.top <= (window.innerHeight * 0.5 + 1) ) { // Consider elements intersecting and in upper half
                highestVisibleRatio = entry.intersectionRatio;
                activeSectionId = entry.target.id; // Get ID from the element
             } else if (entry.intersectionRatio > highestVisibleRatio && activeSectionId === null) {
                // Fallback: if nothing in upper half, just take the first intersecting one with highest ratio
                 highestVisibleRatio = entry.intersectionRatio;
                 activeSectionId = entry.target.id;
             }
           }
         });

         // Default to 'home' if no section is intersecting (e.g., at top of page)
         if (activeSectionId === null) {
             // Check the first section if it's at the very top
             if (this.sections.first && this.sections.first.nativeElement.getBoundingClientRect().top >= 0 && this.sections.first.nativeElement.getBoundingClientRect().top <= window.innerHeight * 0.5) {
                  activeSectionId = this.sections.first.nativeElement.id;
             } else {
                 // If no section is clearly active, might retain previous or default
                 activeSectionId = 'home'; // Default
             }
         }


         // Update the service if the active section has changed
         if (activeSectionId) {
             this.scrollStateService.setActiveSection(activeSectionId);
         }

       },
       {
         root: null, // viewport
         rootMargin: '0px', // No extra margin around the viewport
         threshold: [0, 0.1, 0.5, 0.9, 1.0] // Observe when different percentages are visible
       }
     );

     // Start observing each section element after they are available
     this.sections.forEach(section => {
       this.observer.observe(section.nativeElement);
     });
     this.sections.changes.subscribe(() => {
      if (this.sections.length > 0) {
          this.setupObserver();
      }
  });
  if (this.sections.length > 0) {
     this.setupObserver();
  }

    }

    private setupObserver(): void {
      if (this.observer) {
          this.observer.disconnect();
      }
      // Set up the Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => {
           let currentActiveSectionId: string | null = null;
           let minDistanceFromTop = Infinity; // Track which intersecting element is closest to the top
  
           entries.forEach(entry => {
              // Find the entry that is intersecting and closest to the top of the viewport
              // Only consider entries that are intersecting
              if (entry.isIntersecting) {
                  // Determine the active section ID based on intersection and position
                  // Simple approach: the topmost intersecting element
                  if (entry.boundingClientRect.top < minDistanceFromTop) {
                     minDistanceFromTop = entry.boundingClientRect.top;
                     currentActiveSectionId = entry.target.id;
                  }
              
              }
           });
  
           // If after checking all entries, we didn't find a clearly active section
           // This can happen when scrolling rapidly between sections or at the very top/bottom
           // We fall back to 'home' or the previously active section if needed.
           let finalActiveSectionId = currentActiveSectionId || 'home'; // Default to 'home' if nothing is clearly active
  
           // Handle edge case: If scrolled to the very top, force active section to 'home'
           if (window.scrollY === 0 && this.sections.first && this.sections.first.nativeElement.id === 'home') {
                finalActiveSectionId = 'home';
           }
  
  
           // Update the service with the determined active section ID
           const validSectionIds = ['home', 'about', 'skills', 'projects', 'contact']; // List your section IDs
           if (validSectionIds.includes(finalActiveSectionId)) {
               this.scrollStateService.setActiveSection(finalActiveSectionId);
           } else {
               this.scrollStateService.setActiveSection('home'); // Default safety
           }
  
        },
        {
          root: null, // Observe relative to the viewport
          rootMargin: '0px', // Observe relative to the standard viewport boundary
         // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Trigger at multiple points of intersection
          threshold: [0, 1] // Trigger when 0% or 100% is visible
       
     
        }
      );
  
      // ... Start observing each section element ...
       this.sections.forEach(section => {
         this.observer.observe(section.nativeElement);
       });
  }
  // Clean up observer on component destroy
  ngOnDestroy(): void {
     if (this.observer) {
        this.observer.disconnect();
     }
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0, // Scroll to the top (0,0)
      behavior: 'smooth' // Use smooth scrolling animation
    });
  }
}