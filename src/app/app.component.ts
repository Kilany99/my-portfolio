import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, HostListener, OnDestroy, PLATFORM_ID, Inject } from '@angular/core'; // <--- Import OnDestroy
import { isPlatformBrowser } from '@angular/common';

// import { RouterModule } from '@angular/router';
import { ScrollStateService } from './shared/scroll-state.service';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { ChatIconComponent } from './chat/chat-icon/chat-icon.component';
import { ChatService } from './chat/chat.service';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule, 
    //RouterModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    MatIconModule,
    ChatWindowComponent,
    ChatIconComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'my-angular-portfolio';

  @ViewChildren('section.section-padding') sections!: QueryList<ElementRef>; 

  private observer!: IntersectionObserver; 

  isShowScrollToTop = false;
  private scrollThreshold = 300;

  constructor(
    private scrollStateService: ScrollStateService, 
    public chatService: ChatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.scrollY > this.scrollThreshold) {
      this.isShowScrollToTop = true;
    } else {
      this.isShowScrollToTop = false;
    }
  }

  // --- Intersection Observer Setup for Scroll State ---
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // The QueryList 'sections' is populated after the view is initialized,
      // and its 'changes' observable emits when the list changes (e.g., after initial population).
      this.sections.changes.subscribe((queryList: QueryList<ElementRef>) => {
          // Set up the observer once the QueryList has elements
          if (queryList.length > 0) {
              this.setupObserver();
          }
      });
    }
  }

  private setupObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Disconnect any previous observer if setup runs again (e.g., view changes)
    if (this.observer) {
        this.observer.disconnect();
    }
    console.log('Setting up Intersection Observer for sections'); // Optional log

    // Set up the Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
         let currentActiveSectionId: string | null = null;
         let minDistanceFromTop = Infinity;

         entries.forEach(entry => {
            if (entry.isIntersecting) {
               // Prioritize elements intersecting and closest to the top half of the viewport
               if (entry.boundingClientRect.top >= 0 && entry.boundingClientRect.top <= window.innerHeight / 2) {
                   if (entry.boundingClientRect.top < minDistanceFromTop) {
                      minDistanceFromTop = entry.boundingClientRect.top;
                      currentActiveSectionId = entry.target.id;
                   }
               } else if (currentActiveSectionId === null && entry.intersectionRatio > 0) {
                   // Fallback: If nothing in top half, take the first intersecting element with any visibility
                    currentActiveSectionId = entry.target.id;
               }
            }
         });

         let finalActiveSectionId = currentActiveSectionId || 'home';

         if (window.scrollY === 0 && this.sections.first && this.sections.first.nativeElement.id === 'home') {
              finalActiveSectionId = 'home';
         }

         const validSectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
         if (validSectionIds.includes(finalActiveSectionId)) {
             this.scrollStateService.setActiveSection(finalActiveSectionId);
         } else {
             this.scrollStateService.setActiveSection('home'); // Default safety
         }
      },
      {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', // Check intersection in the top half of the viewport
        threshold: [0, 0.1, 0.5, 0.9, 1.0] // Observe at multiple thresholds within the top half
      }
    );

    // Start observing each section element
    this.sections.forEach(section => {
       console.log('Observing section:', section.nativeElement.id); // Optional log
       this.observer.observe(section.nativeElement);
    });
  }
  // --------------------------------------------------

  // Clean up observer on component destroy
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('AppComponent ngOnDestroy - Disconnecting observer'); // Optional log
      if (this.observer) {
        this.observer.disconnect();
      }
    }
    // Clean up ScrollStateService subscription in HeaderComponent's ngOnDestroy
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}