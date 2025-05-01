import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Use rxjs for state management
import { delay, tap } from 'rxjs/operators'; // Operators for simulation

// Define a type for chat messages
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot'; 
  timestamp: Date;
}

@Injectable({
  providedIn: 'root', 
})
export class ChatService {
  // State for the chat window visibility
  private isChatOpenSubject = new BehaviorSubject<boolean>(false);
  isChatOpen$ = this.isChatOpenSubject.asObservable(); // Observable for components

  // State for the chat messages
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable(); // Observable for components

  constructor() {
    // Optional: Add an initial bot greeting message
    this.addMessage({
      text: "Hi there! I'm Abdalla's portfolio assistant. Ask me about his skills, projects, or experience!",
      sender: 'bot',
      timestamp: new Date(),
    });
  }

  /**
   * Toggles the visibility of the chat window.
   */
  toggleChat(): void {
    this.isChatOpenSubject.next(!this.isChatOpenSubject.value);
  }

  /**
   * Closes the chat window.
   */
  closeChat(): void {
    this.isChatOpenSubject.next(false);
  }

  /**
   * Adds a message to the chat history.
   * @param message The message to add.
   */
  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  /**
   * Sends a user message and simulates a bot response.
   * @param userMessage The message from the user.
   */
  sendMessage(userMessage: string): void {
    if (!userMessage.trim()) {
      return; // Don't send empty messages
    }

    // Add user message to the chat
    const newUserMessage: ChatMessage = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    this.addMessage(newUserMessage);

    of(`You asked: "${userMessage}"\n\n(I'm under bulding right now, please wait for me to finish building my model and then I will respond to your questions.)`)
      .pipe(
        delay(1000), // Simulate network latency
        tap((botResponseText) => {
          const botMessage: ChatMessage = {
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
          };
          this.addMessage(botMessage); // Add the simulated bot response
        })
      )
      .subscribe(); // Subscribe to execute the simulation
    // ----------------------------------------------------------------
  }

  // --- Placeholder for Real AI Backend Communication ---
 
  // ----------------------------------------------------
}