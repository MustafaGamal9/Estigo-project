import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-chatbot-icon',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Add FormsModule here
  ],
  templateUrl: './chatbot-icon.component.html',
  styleUrls: ['./chatbot-icon.component.css']
})
export class ChatbotIconComponent {
  isChatOpen = false; // State to manage chat window visibility
  userInput: string = ''; // For the input field

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  // Placeholder for message sending logic
  sendMessage() {
    if (!this.userInput.trim()) return; 
    
    this.userInput = ''; 
  }
}