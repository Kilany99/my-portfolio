import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  private readonly baseUrl = 'https://192.168.43.144:45455/api/chat'; 
  private isChatOpenSubject = new BehaviorSubject<boolean>(false);
  isChatOpen$ = this.isChatOpenSubject.asObservable();

  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.addMessage({
      text: "Hi there! I'm Abdalla's portfolio assistant. Ask me about his skills, projects, or experience!",
      sender: 'bot',
      timestamp: new Date(),
    });
  }

  toggleChat(): void {
    this.isChatOpenSubject.next(!this.isChatOpenSubject.value);
  }

  closeChat(): void {
    this.isChatOpenSubject.next(false);
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  async sendMessage(userMessage: string): Promise<void> {
    if (!userMessage.trim()) return;

    const userChatMessage: ChatMessage = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    this.addMessage(userChatMessage);

    try {
      const response = await axios.post<ChatResponse>(
        this.baseUrl,  
        { message: userMessage } as ChatRequest,  
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const botMessage: ChatMessage = {
        text: response.data.botMessage,  // Matches backend's BotMessage property
        sender: 'bot',
        timestamp: new Date(),
      };
      this.addMessage(botMessage);
    } catch (error: any) {
      const errorText = error.response?.data || 'Sorry, I encountered an error while processing your message.';
      const errorMessage: ChatMessage = {
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      };
      this.addMessage(errorMessage);
      console.error('Error sending message to chatbot:', error);
    }
  }
}
