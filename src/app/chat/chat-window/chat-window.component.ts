import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService, ChatMessage } from '../chat.service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 


import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-chat-window', 
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatCardModule,
    MatInputModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  // Observable stream of messages from the service
  messages$: Observable<ChatMessage[]>;

  // Property to hold the user's current input message
  userMessage: string = '';

  private messagesSubscription!: Subscription; // Subscription for managing scroll
  @ViewChild('messageList') private messageListEl!: ElementRef; // Reference to the message list div

  constructor(private chatService: ChatService) {
    // Assign the messages observable from the service
    this.messages$ = this.chatService.messages$;
  }

  ngOnInit(): void {
     // Subscribe to messages to automatically scroll to the bottom when new messages arrive
     this.messagesSubscription = this.messages$.subscribe(() => {
       // Use a small timeout to ensure the DOM is updated before scrolling
       setTimeout(() => this.scrollToBottom(), 50);
     });
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }


  /**
   * Sends the user's message via the ChatService.
   */
  sendMessage(): void {
    this.chatService.sendMessage(this.userMessage); // Send the message
    this.userMessage = ''; // Clear the input field
  }

  /**
   * Handles sending message when Enter key is pressed in the input field.
   * @param event The keyboard event.
   */
  onEnter(event: Event): void {
     event.preventDefault(); // Prevent default form submission/newline
     this.sendMessage(); // Send the message
  }

  /**
   * Scrolls the message list to the bottom.
   */
  private scrollToBottom(): void {
    if (this.messageListEl) {
      this.messageListEl.nativeElement.scrollTop = this.messageListEl.nativeElement.scrollHeight;
    }
  }

  /**
   * Closes the chat window via the ChatService.
   */
  closeChat(): void {
    this.chatService.closeChat(); // Close the chat window
  }
}