import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProjectCardComponent } from '../project-card/project-card.component'; 
import { Project, ProjectService } from '../../services/project.service'; 

// Import animation functions
import { trigger, state, style, animate, transition,query,stagger } from '@angular/animations';
import { ScrollAnimationDirective } from '../../shared/scroll-animation.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    ScrollAnimationDirective
    // ... other imports
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('listAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })), // Define the 'void' state style
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })), // Define the 'visible' state style
  
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
    ])
  ]
  
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  listState = 'void'; // <-- Add state property

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    // Use a tiny timeout to ensure the elements are rendered before changing the state
    setTimeout(() => {
       this.listState = 'visible'; // <-- Change state after data is loaded and rendered
    }, 50); // timeout to ensure the elements are rendered before changing the state
  }
}