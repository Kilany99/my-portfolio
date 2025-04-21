import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProjectCardComponent } from '../project-card/project-card.component'; 
import { Project, ProjectService } from '../../services/project.service'; 

@Component({
  selector: 'app-projects',
  standalone: true, // <-- Standalone component
  imports: [
    CommonModule, 
    ProjectCardComponent 
  ],
  templateUrl: './projects.component.html', 
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  // Inject the ProjectService via the constructor (Service providedIn: 'root' doesn't need import here)
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}