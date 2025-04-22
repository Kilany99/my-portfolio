import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router'; 

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
}