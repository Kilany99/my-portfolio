import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string; 
  liveDemoUrl?: string; 
  imageUrl?: string; 
}

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the app
})
export class ProjectService {

  private projects: Project[] = [
    {
      id: 1,
      name: 'Real-Time Order Tracking System (.NET Microservices)',
      description: `Microservices-based system implementing CQRS and Event-Driven Architecture for real-time order tracking,
                   driver assignment, and notifications. Features live map updates, automated retry mechanisms, and
                   distributed caching.`,
      technologies: [
        '.NET 9', 
        'CQRS/ES',
        'Apache Kafka',
        'SignalR',
        'Redis',
        'PostgreSQL',
        'MongoDB',
        'Docker',
        'Microservices',
        'Domain-Driven Design'
      ],
      githubUrl: 'https://github.com/Kilany99/order-tracking-system',
      imageUrl: 'assets/images/order-tracking-system.png'
    },
    {
      id: 2,
      name: 'Full-Stack Parking Management System',
      description: `Integrated solution with Angular web interface and Kotlin mobile app for real-time parking reservations,
                   payment processing, and admin management. Features JWT authentication and automatic reservation cleanup.`,
      technologies: [
        'ASP.NET Core', 
        'Angular',
        'Kotlin',
        'SQL Server',
        'TypeScript',
        'SCSS',
        'Kendo UI',
        'JWT Authentication',
        'REST APIs'
      ],
      githubUrl: 'https://github.com/Kilany99/ParkingSystem',
      imageUrl: 'assets/images/parking-system-architecture.png'
    },
    {
      id: 3,
      name: 'Smart Surveillance System (Graduation Project)',
      description: `AI-powered security system for criminal behavior detection using deep learning and computer vision.
                   Features multi-camera RTSP streaming, cross-platform access, and local network deployment.`,
      technologies: [
        '.NET Core MVC',
        'AngularJS',
        'Java/Android',
        'SQL Server',
        'Computer Vision',
        'Deep Learning',
        'IIS',
        'jQuery',
        'Bootstrap'
      ],
      githubUrl: 'https://github.com/Kilany99/surveillance-system',
      imageUrl: 'assets/images/surveillance-system-demo.gif'
    },
    {
      id: 4,
      name: 'WPF Task Manager (MVVM)',
      description: `Desktop application following strict MVVM pattern with real-time validation, JSON persistence,
                   and custom UI controls. Demonstrates clean architecture and SOLID principles.`,
      technologies: [
        'WPF', 
        'MVVM',
        'FluentValidation',
        'JSON',
        'XAML',
        'ObservableCollections',
        'Custom Controls'
      ],
      githubUrl: 'https://github.com/Kilany99/task-manager-wpf',
      imageUrl: 'assets/images/task-manager-screenshot.png'
    }
  ];

  constructor() { }

  // Method to get all projects
  getProjects(): Project[] {
    return this.projects;
  }


}