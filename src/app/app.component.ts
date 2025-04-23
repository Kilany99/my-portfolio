import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList  } from '@angular/core';
// import { RouterModule } from '@angular/router'; 
import { ScrollStateService } from './shared/scroll-state.service'; // 

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';


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
    ContactComponent 
  ],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-portfolio';

  // <--- Get references to all sections by their class or tag
  @ViewChildren('section') sections!: QueryList<ElementRef>; // Target elements with #section template variable

  private observer!: IntersectionObserver; // Observer instance

  
  constructor(private scrollStateService: ScrollStateService) {}

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
                 // For simplicity, let's default to 'home' if nothing else is prominent
                 // A more robust solution involves tracking previous state or using thresholds
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
  }

  // Clean up observer on component destroy
  ngOnDestroy(): void {
     if (this.observer) {
        this.observer.disconnect();
     }
  }
}