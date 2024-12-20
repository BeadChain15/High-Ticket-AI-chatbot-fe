import axios from 'axios';
import { Conversation, Message } from '../types';

class ChatStoreService {
  private currentConversation: Conversation | null = null;
  private currentThreadId: string | null = null

  constructor() {
    // Load conversation from sessionStorage on initialization
    const savedConversation = sessionStorage.getItem('currentConversation');
    if (savedConversation) {
      const parsed = JSON.parse(savedConversation);
      // Convert ISO strings back to Date objects for timestamps if necessary
      parsed.messages = parsed.messages.map((msg: Message) => ({
        ...msg,
        // timestamp: new Date(msg.timestamp) // Uncomment if needed
      }));
      this.currentConversation = parsed;
    }
    this.currentThreadId = sessionStorage.getItem('currentThreadId')
  }

  getCurrentConversation(): Conversation {
    if (!this.currentConversation) {
      this.currentConversation = {
        id: Date.now().toString(),
        messages: [],
      };
      this.saveToStorage();
    }
    return this.currentConversation;
  }

  getCurrentThreadId(): string {
    console.log("Class:::", this.currentThreadId, sessionStorage.getItem('currentThreadId'))
    return this.currentThreadId || ""
  }

  addMessage(message: Message): void {
    if (!this.currentConversation) {
      this.getCurrentConversation();
    }
    this.currentConversation!.messages.push(message);
    this.saveToStorage();
  }

  async startNewThread(threadId: string) {
    console.log("step2")
    await axios
    .post(`${import.meta.env.VITE_API_URL}/api/thread`, {threadId})
    .then((res) => {
      console.log("--New ThreadID--", res.data)
       if (res.data) {
        this.currentConversation = {
          id: Date.now().toString(),
          messages: [],
        };
        this.currentThreadId = res.data
        this.saveToStorage();
       }
      })
      .catch((error) => {
        console.error("Error creating new thread:", error);
      });
      console.log("step3")
  }

  private saveToStorage(): void {
    sessionStorage.setItem(
      'currentConversation',
      JSON.stringify(this.currentConversation)
    );
    sessionStorage.setItem(
      'currentThreadId',
      JSON.stringify(this.currentThreadId)
    );
  }
}

// Export a singleton instance
export const chatStoreService = new ChatStoreService();