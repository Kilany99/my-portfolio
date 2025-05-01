import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProjectCardComponent } from '../project-card/project-card.component'; 
import { Project, ProjectService } from '../../services/project.service'; 
import { SafeUrlPipe } from '../../shared/safe-url.pipe'; 

// Import animation functions
import { trigger, state, style, animate, transition,query,stagger } from '@angular/animations';
import { ScrollAnimationDirective } from '../../shared/scroll-animation.directive';

// Import Material Modules for Detail View
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';     
import { MatCardModule } from '@angular/material/card';     

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    ScrollAnimationDirective,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SafeUrlPipe
    
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('listAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })), 
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })), 
  
      // Transition from void state to visible state
      transition('void => visible', [
        query(':enter', style({ opacity: 0, transform: 'translateY(50px)' }), { optional: true }), // Initial state for entering items (redundant with state style but can be belt-and-suspenders)
        query(':enter', stagger('150ms', [ // Stagger the animation
           animate('500ms ease-out') // Animate to the 'visible' state implicitly
        ]), { optional: true })
      ]),
  
      // Keep the exit transition if you want elements to animate out when listState goes back to 'void' or component is destroyed
      transition('visible => void', [ // Transition from visible to void
           query(':leave', stagger('100ms', [
             animate('500ms ease-out', style({ opacity: 0, transform: 'translateY(50px)' }))
           ]), { optional: true })
      ])
    ]),
     //  animation for the detail view transition ---
     trigger('detailAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })), // Start off-screen to the right
      state('*', style({ opacity: 1, transform: 'translateX(0)' })), // End at original position

      transition('void => *', [ // When entering
          animate('500ms ease-out')
      ]),
      transition('* => void', [ // When leaving
          animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' })) // Slide off-screen to the left
      ])
  ])

  ]
  
  
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  listState = 'void';

  // <--- Property to hold the selected project for detail view
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    // Use a tiny timeout to ensure the elements are rendered before changing the state
    setTimeout(() => {
       this.listState = 'visible';
    }, 50);
  }

  // <--- Method to set the selected project and show the detail view
  viewProject(project: Project): void {
     this.selectedProject = project;
  
     const projectsSection = document.getElementById('projects');
     if (projectsSection) {
         projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  }

  // <--- Method to clear the selected project and show the list view
  closeProject(): void {
     this.selectedProject = null;
      // Optional: Scroll back to the top of the projects section when detail view closes
      const projectsSection = document.getElementById('projects');
     if (projectsSection) {
         projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  }
}