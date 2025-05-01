import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string; 
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  imageUrl?: string;
  screenshots?: string[]; 
  videoUrl?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = [
    {
      id: 1,
      name: 'Real-Time Order Tracking System (.NET Microservices)',
      description: `Microservices-based system implementing CQRS and Event-Driven Architecture...`, // Summary
      longDescription: `A microservices-based real-time order tracking system built with .NET 9, implementing CQRS and EDD patterns. The system provides real-time order tracking, driver assignment, and notifications for both customers and drivers.
                        Core Functionality:
                        Real-time order tracking with live map updates
                        Automated driver assignment with retry mechanism
                        Order status management and updates
                        Location history tracking
                        Push notifications for order updates
                        Email notifications for important events
                        Technical Features
                        CQRS (Command Query Responsibility Segregation) architecture
                        Domain-Driven Design (DDD) implementation
                        Event-driven architecture using Kafka
                        Real-time updates using SignalR
                        Distributed caching with Redis
                        Polyglot persistence (PostgreSQL + MongoDB)
                        Microservices architecture
`, // <--- Detailed description
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
      imageUrl: 'images/orders.png',
      screenshots: ['images/orders_ss1.png', 'images/orders_ss2.png'], // <--- Add screenshot URLs
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1' // <--- Add video embed URL
    },
    {
      id: 2,
      name: 'Full-Stack Parking Management System',
      description: `Integrated solution with Angular web interface and Kotlin mobile app...`, // Summary
      longDescription: `
                      This project is a full-stack application designed for parking space management and improve user experience for both customers and administrators. This project integrates an ASP.NET Core API, Angular frontend, and a Kotlin mobile app to provide a seamless solution for parking space reservation, payment, and management.
                      Key Features: Real-time Parking Availability: Users can view available parking spaces in real-time. User Registration and Authentication JWT: Users can register, log in, and reset passwords through secure authentication mechanisms. Booking and Reservation: Users can reserve parking spaces and view their reservation history. automatic cancellation for expired on-hold reservations: periodically cancel reservations after 24 hr. Admin Panel: Admins can manage parking spots, monitor reservations, and update parking space statuses. Payment Integration: Payment options are provided for users to pay for their parking bookings. Mobile App Integration: A mobile application built using Kotlin for a native Android experience, providing access to all features on the go. Tech Stack Frontend: Angular Backend: ASP.NET Core Web API Mobile App: Kotlin (Android) Database: SQL Server Authentication: JWT Token-based Authentication.
                      Project Structure:
                      ASP.NET Core API: The backend of the system is built using ASP.NET Core to provide a RESTful API that serves data to the Angular frontend and Kotlin mobile application. The API handles operations such as user authentication, parking space management, reservation processing, and payment handling.

                      Angular Frontend: The frontend is developed using Angular, providing an intuitive user interface for both customers and admins. The application interacts with the backend API for tasks like parking space display, reservations, and payment.

                      Kotlin Mobile App: A Kotlin-based Android mobile app allows users to interact with the parking system, including browsing available spaces, making reservations, and managing their accounts.
                      `,
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
      imageUrl: 'images/parking.jpg',
      screenshots: ['images/parking_ss1.jpg', 'images/parking_ss2.jpg'], // <--- Add screenshot URLs
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2' // <--- Add video embed URL
    },
     {
      id: 3,
      name: 'Smart Surveillance System (Graduation Project)',
      description: `AI-powered security system for criminal behavior detection...`, // Summary
      longDescription: `This graduation project focused on building an intelligent surveillance system leveraging computer vision and deep learning techniques
                        Smart system for anomaly detection and recognition using deep learning and computer vision.
                        Worked on this project as a full stack web and mobile developer.
                        Achievements:
                        1- building the front UI of the web and mobile applications.
                        2- building the back end of the web and mobile applications.
                        3- building the database and the API.
                        4- video streaming using multiple IP cameras by RTSP to a web server.
                        5- deployment of the system over a local network and allowing access from outside the network using port forwarding.  
`, // <--- Detailed description
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
      imageUrl: 'images/Surveillance.avif',
      screenshots: ['images/surveillance_ss1.avif', 'images/surveillance_ss2.avif'], // <--- Add screenshot URLs
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3' // <--- Add video embed URL
    },
    {
      id: 4,
      name: 'WPF Task Manager (MVVM)',
      description: `Desktop application following strict MVVM pattern...`, // Summary
      longDescription: `A modern desktop task management application built with WPF (.NET) following MVVM architecture pattern, designed to help users organize tasks with advanced filtering, prioritization, and reminders
                        Key Features:
                        ✅ MVVM Architecture with strict separation of concerns
                        ✅ SOLID Principles & Clean Architecture implementation
                        ✅ Real-time data validation using FluentValidation
                        ✅ Complex data binding with ObservableCollections
                        ✅ Custom UI controls and converters (priority colors, strike-through effects)
                        ✅ JSON persistence for tasks/categories/tags
                        ✅ Context menus & keyboard shortcuts.`, // <--- Detailed description
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
      imageUrl: 'images/task-manager.jpg',
       screenshots: ['images/task-manager_ss1.jpg', 'images/task-manager_ss2.jpg'], 
       videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_4' 
    }
  ];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }
}