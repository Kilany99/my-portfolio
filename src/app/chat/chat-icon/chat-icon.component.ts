import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service'; 

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-chat-icon', 
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule    
  ],
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.scss'],
})
export class ChatIconComponent {

  constructor(private chatService: ChatService) { } // <--- Inject ChatService

  /**
   * Calls the ChatService to toggle the chat window visibility.
   */
  openChat(): void {
    this.chatService.toggleChat(); // Toggle the chat window
  }
}