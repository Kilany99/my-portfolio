import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// import { provideRouter } from '@angular/router';

// <--- IMPORT provideAnimations HERE
import { provideAnimations } from '@angular/platform-browser/animations'; 

// import { routes } from './app.routes'; 
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    
    provideAnimations() 
  ]
};