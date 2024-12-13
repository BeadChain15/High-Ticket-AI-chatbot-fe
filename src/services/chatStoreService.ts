import { Conversation, Message } from '../types';

class ChatStoreService {
  private currentConversation: Conversation | null = null;

  constructor() {
    // Load conversation from localStorage on initialization
    const savedConversation = localStorage.getItem('currentConversation');
    if (savedConversation) {
      const parsed = JSON.parse(savedConversation);
      // Convert ISO strings back to Date objects for timestamps
      parsed.messages = parsed.messages.map((msg: Message) => ({
        ...msg,
        // timestamp: new Date(msg.timestamp)
      }));
      this.currentConversation = parsed;
    }
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

  addMessage(message: Message): void {
    if (!this.currentConversation) {
      this.getCurrentConversation();
    }
    this.currentConversation!.messages.push(message);
    this.saveToStorage();
  }

  startNewThread(): void {
    this.currentConversation = {
      id: Date.now().toString(),
      messages: [],
    };
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(
      'currentConversation',
      JSON.stringify(this.currentConversation)
    );
  }
}

// Export a singleton instance
export const chatStoreService = new ChatStoreService();