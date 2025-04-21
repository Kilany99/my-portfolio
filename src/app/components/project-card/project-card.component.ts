import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Project } from '../../services/project.service'; 

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-project-card',
  imports: [
    CommonModule, 
    MatCardModule,    
    MatButtonModule,  
    MatIconModule     
  ],
  templateUrl: './project-card.component.html', 
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  constructor() { }
}