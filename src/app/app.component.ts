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
         // Or if we scroll rapidly between sections
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
  
      this.observer = new IntersectionObserver(
        (entries) => {
          let currentActiveSectionId: string | null = null;
          let minDistanceFromTop = Infinity; // Track which intersecting element is closest to the top
  
          entries.forEach(entry => {
             // We only care about elements that are currently intersecting
             if (entry.isIntersecting) {
                // Prioritize elements that are intersecting and in the top half of the viewport
                if (entry.boundingClientRect.top >= 0 && entry.boundingClientRect.top <= window.innerHeight / 2) {
                    // If this intersecting element is closer to the top than our current best candidate
                    if (entry.boundingClientRect.top < minDistanceFromTop) {
                       minDistanceFromTop = entry.boundingClientRect.top;
                       currentActiveSectionId = entry.target.id; // Found a new best candidate in the top half
                    }
                } else if (currentActiveSectionId === null && entry.intersectionRatio > 0) {
                   // Fallback: If no element is in the top half yet,
                   // consider the first intersecting element with any visibility
                   // This helps when the first section is just scrolling out or the next is just entering
                    currentActiveSectionId = entry.target.id; // Take this one as a fallback candidate
                }
             }
          });
  
          // If after checking all entries, we didn't find a clear active section (e.g., between sections)
          // default to 'home'. We also explicitly set 'home' if scrolled to the very top.
          let finalActiveSectionId = currentActiveSectionId || 'home';
  
          // Handle edge case: If scrolled to the very top, force active section to 'home'
          if (window.scrollY === 0 && this.sections.first && this.sections.first.nativeElement.id === 'home') {
               finalActiveSectionId = 'home';
          }
  
  
           // Check if the determined activeSectionId is one of our expected section IDs
           // This adds robustness against unexpected elements triggering the observer
           const validSectionIds = ['home', 'about', 'skills', 'projects', 'contact']; // List your section IDs
           if (validSectionIds.includes(finalActiveSectionId)) {
               this.scrollStateService.setActiveSection(finalActiveSectionId);
           } else {
               // If somehow an unexpected ID is determined, default to home
               this.scrollStateService.setActiveSection('home'); // Default safety
           }
          // ---------------------------------
  
        },
        {
          root: null, // viewport
          rootMargin: '0px 0px -50% 0px', // Adjust root margin to prioritize intersection in the top half
          threshold: [0] // Trigger as soon as any pixel is visible
        }
      );
  
      // Start observing each section element
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