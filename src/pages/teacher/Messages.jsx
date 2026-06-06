import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  Send,
  Sparkles
} from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Sarah Smith', role: 'Parent', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', lastMessage: "That's wonderful news! Th...", time: '10:42 AM', unread: 0, active: true },
  { id: 2, name: 'Michael Johnson', role: 'Student', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', lastMessage: 'Can we schedule a meetin...', time: '09:15 AM', unread: 2 },
  { id: 3, name: 'David Martinez', role: 'Student', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', lastMessage: 'I have submitted my assign...', time: 'Yesterday', unread: 0 },
  { id: 4, name: 'Emma Chen', role: 'Student', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', lastMessage: 'Thank you for the feedbac...', time: 'Yesterday', unread: 0 },
  { id: 5, name: 'Priya Patel', role: 'Student', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', lastMessage: 'Sir, could you please expla...', time: 'Mon', unread: 1 },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="messages-layout">
      {/* Left Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-search-container">
          <div className="messages-search-bar">
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Search messages..." />
          </div>
        </div>

        <div className="messages-tabs">
          {['All', 'Students', 'Parents'].map(tab => (
            <button 
              key={tab} 
              className={`messages-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="messages-contacts-list">
          {CONTACTS.map(contact => (
            <div key={contact.id} className={`contact-item ${contact.active ? 'active' : ''}`}>
              <div className="contact-avatar-wrapper">
                <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
                <div className="status-dot online"></div>
              </div>
              <div className="contact-info">
                <div className="contact-info-top">
                  <h4>{contact.name}</h4>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="contact-info-bottom">
                  <p>{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="unread-badge">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="messages-chat-area">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-user">
            <img src={CONTACTS[0].avatar} alt="Sarah Smith" className="chat-avatar" />
            <div className="chat-user-info">
              <h2>Sarah Smith</h2>
              <p>Parent (Alice Freeman)</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-icon-btn"><Phone size={18} /></button>
            <button className="chat-icon-btn"><Video size={18} /></button>
            <button className="chat-icon-btn"><Info size={18} /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          <div className="chat-timestamp-center">Today, 09:30 AM</div>

          {/* Outgoing Message */}
          <div className="message-row outgoing">
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                Good morning Mrs. Smith! I wanted to give you a quick update on Alice's performance in class lately.
              </div>
              <div className="message-time">09:35 AM</div>
            </div>
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Me" className="message-avatar" />
          </div>

          {/* Incoming Message */}
          <div className="message-row incoming">
            <img src={CONTACTS[0].avatar} alt="Sarah" className="message-avatar" />
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                Good morning Mr. Fox! Oh, I'd love to hear about it. How is she doing?
              </div>
              <div className="message-time">09:40 AM</div>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="message-row outgoing">
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                She is doing fantastically. She just scored a 92% on her mid-term physics exam! Her practical work has also improved significantly.
              </div>
              <div className="message-time">09:41 AM</div>
            </div>
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Me" className="message-avatar" />
          </div>

          {/* Incoming Message */}
          <div className="message-row incoming">
            <img src={CONTACTS[0].avatar} alt="Sarah" className="message-avatar" />
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                That's wonderful news! Thank you for the update and your continued support. She has been studying very hard.
              </div>
              <div className="message-time">10:42 AM</div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="chat-input-area">
          <div className="chat-input-container">
            <button className="chat-action-btn"><Paperclip size={18} /></button>
            <button className="chat-action-btn"><ImageIcon size={18} /></button>
            <input type="text" placeholder="Type your message here..." className="chat-input-field" />
            <button className="chat-action-btn"><Smile size={18} /></button>
            <button className="chat-send-btn"><Send size={18} /></button>
          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <button className="ai-assistant-fab">
          <Sparkles size={18} /> AI Assistant
        </button>
      </div>
    </div>
  );
}
