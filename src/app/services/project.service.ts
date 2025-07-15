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
    },
    {
      id: 5,
      name: 'Weather Forecast Web App',
      description: `Modern weather forecast web application built with HTML, CSS, and JavaScript. Real-time data, interactive charts, and responsive design...`,
      longDescription: `Weather Forecast is a modern web application that provides real-time weather updates, forecasts, and interactive visualizations for locations worldwide. The app features a clean, responsive UI, dynamic weather icons, and detailed hourly/daily forecasts. Users can search for any city, view temperature, humidity, wind, and precipitation data, and enjoy a seamless experience across devices.\n\nKey Features:\n- Real-time weather data from OpenWeatherMap API\n- 7-day and hourly forecasts with interactive charts\n- Search by city with autocomplete\n- Dynamic weather icons and backgrounds\n- Responsive, mobile-friendly design\n- Error handling for invalid locations\n- Light and dark mode support\n\nBuilt entirely with HTML, CSS, and JavaScript for maximum compatibility and performance.`,
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'OpenWeatherMap API',
        'Chart.js',
        'Responsive Design'
      ],
      githubUrl: 'https://github.com/Kilany99/Weather-Forecast',
      imageUrl: 'https://img.freepik.com/premium-vector/weather-infographic-line-climate-forecast-banner-with-rain-sunny-cold-day-elements-clouds-sky-moon-icons-precipitation-cloudiness-prediction-vector-meteorology-background_440128-757.jpg',
      screenshots: ['images/weather-forecast-ss1.png', 'images/weather-forecast-ss2.png'], // <-- Add your own screenshots
      videoUrl: '', // Optionally add a demo video
      liveDemoUrl: 'https://kilany-forecast.netlify.app'
    },
    {
      id: 6,
      name: '8086 Microprocessor-Based Safe Lock System',
      description: `Digital safe lock system using Intel 8086, 4x4 keypad, and 16x2 LCD. Pure assembly with advanced features...`,
      longDescription: `A digital safe lock system implemented using an Intel 8086 Microprocessor, a 4x4 matrix keypad for input, and a 16x2 LCD for displaying status and feedback. This project demonstrates fundamental principles of embedded systems, assembly programming, and peripheral interfacing using the 8255 Programmable Peripheral Interface (PPI).\n\n✨ Features\n- 4-Digit Password Security: Users enter a 4-digit numeric password for access control.\n- Interactive Keypad Input: Utilizes a common 4x4 matrix keypad for user input.\n- LCD Display Interface: Provides clear visual feedback on a 16x2 LCD, displaying prompts like \"PASSWORD\", \"WRONG :(\", \"Correct :)\", \"New Password\", and \"Done\".\n- Configurable Password: The default password can be easily set within the assembly code's memory initializations.\n- Limited Access Attempts: Implements a security measure allowing a limited number of incorrect password attempts (3 tries) before locking out.\n- Password Change/Reset: After successful authentication, the system offers functionality to reset or change the current password.\n- Visual Feedback: Asterisks (*) are displayed for entered password digits, and specific messages indicate correct or incorrect attempts.\n- \"Appear\" Feature: A special key allows temporarily showing the entered password characters for verification.\n- \"Delete\" (Backspace) Feature: Allows correcting entered digits before confirmation.\n- \"Exit\" & \"Reset\" Functions: Special keys for resetting the system state or initiating a password change.\n- Door Lock Control (Implied): The system is designed to provide an output signal (e.g., to a relay) upon correct password entry, simulating the unlocking of a safe or door.\n- Pure 8086 Assembly: The entire system logic is implemented in low-level 8086 assembly language, offering deep insights into microprocessor programming.\n- 8255 PPI Interfacing: Leverages the 8255 PPI chip to manage communication with both the keypad (input) and the LCD (output).`,
      technologies: [
        '8086 Assembly',
        'Intel 8086',
        '4x4 Matrix Keypad',
        '16x2 LCD',
        '8255 PPI',
        'Embedded Systems',
        'Microprocessor Programming'
      ],
      githubUrl: 'https://github.com/Kilany99/Safe-Lock',
      imageUrl: 'https://securamsys.com/cdn/shop/files/wifi-safe-lock-banner-for-shopify_cb632cc6-5c10-4b5a-83df-1695e0777959.jpg?v=1723149892&width=2800',
      screenshots: ['images/safe-lock-ss1.png', 'images/safe-lock-ss2.png'], // <-- Add your own screenshots
      videoUrl: '' // Optionally add a demo video
    }
  ];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }
}