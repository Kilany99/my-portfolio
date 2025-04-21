import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterModule, 
    HeaderComponent, 
    FooterComponent  
  ],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-portfolio';
}