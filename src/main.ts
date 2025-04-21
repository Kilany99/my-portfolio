import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { provideAnimations } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide routing using the routes array
    provideAnimations() // Provide browser animations for Material
   
  ]
}).catch(err => console.error(err));