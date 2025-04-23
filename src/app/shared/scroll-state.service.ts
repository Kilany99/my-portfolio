import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root' 
})
export class ScrollStateService {
  // BehaviorSubject holds the ID of the currently active (topmost visible) section
  private activeSectionSubject = new BehaviorSubject<string>('home'); // Start with 'home'

  // Observable stream that components can subscribe to
  activeSection$ = this.activeSectionSubject.asObservable();

  constructor() { }

  /**
   * Updates the active section ID.
   * @param sectionId The ID of the section that is now considered active.
   */
  setActiveSection(sectionId: string): void {
    this.activeSectionSubject.next(sectionId);
  }
}