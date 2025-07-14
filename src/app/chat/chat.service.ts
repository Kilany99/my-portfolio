// chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs'; 
import { tap, catchError, finalize, ignoreElements } from 'rxjs/operators'; 
import axios from 'axios';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  botMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = 'https://localhost:7220/api/chat';

  private isChatOpenSubject = new BehaviorSubject<boolean>(false);
  isChatOpen$ = this.isChatOpenSubject.asObservable();

  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  // Loading state subject and observable
  private _isLoading = new BehaviorSubject<boolean>(false); // Initialize with false
  public readonly isLoading$ = this._isLoading.asObservable(); // Expose as public observable

  constructor() {
    // Initial welcome message from the bot
    this.addMessage({
      text: "Hi there! I'm Abdalla's portfolio assistant. Ask me about his skills, projects, or experience!",
      sender: 'bot',
      timestamp: new Date(),
    });
  }

  toggleChat(): void {
    console.log('Toggling chat. Current:', this.isChatOpenSubject.value);
    const newValue = !this.isChatOpenSubject.value;
    this.isChatOpenSubject.next(newValue);
    console.log('New value set to:', newValue);
  }
  closeChat(): void {
    this.isChatOpenSubject.next(false);
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  // MODIFIED: Now returns an Observable<void>
  sendMessage(userMessage: string): Observable<void> {
    if (!userMessage.trim()) {
      // If the message is empty, return an observable that immediately completes
      return of(undefined);
    }

    // Add the user's message to the chat immediately for better UX
    const userChatMessage: ChatMessage = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    this.addMessage(userChatMessage);

    // Set loading state to true before making the API call
    this._isLoading.next(true);

    // Use 'from' to convert the Axios promise into an Observable
    return from(axios.post<ChatResponse>(
      this.baseUrl,
      { message: userMessage } as ChatRequest, // Ensure the request body matches your backend's expectation
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 100000,
      }
    )).pipe(
      tap(response => {
        const botMessage: ChatMessage = {
          text: response.data.botMessage, 
          sender: 'bot',
          timestamp: new Date(),
        };
        this.addMessage(botMessage);
      }),
      catchError(error => {
        const errorText = error.response?.data?.message || 'Sorry, I encountered an error while processing your message.';
        const errorMessage: ChatMessage = {
          text: errorText,
          sender: 'bot',
          timestamp: new Date(),
        };
        this.addMessage(errorMessage);
        console.error('Error sending message to chatbot:', error);

        return of(undefined);
      }),
      ignoreElements(),  //This operator will discard the emitted AxiosXHR value allowing the Observable to be of type Observable<void
      finalize(() => {
        console.log('ChatService: Observable stream finalized. Setting isLoading to false.'); // DEBUG LOG
        this._isLoading.next(false);
      })
    );
  }
}