import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

// Also need to import Header and Footer components here
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterModule, // <-- Needed for <router-outlet> and routerLink
    HeaderComponent, // <-- Import the standalone HeaderComponent
    FooterComponent  // <-- Import the standalone FooterComponent
  ],
  templateUrl: './app.component.html', // Your existing template should work
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-portfolio';
}