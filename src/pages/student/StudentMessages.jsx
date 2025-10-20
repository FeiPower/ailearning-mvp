import React, { useState } from 'react';
import { Search, Send, MoreVertical, LayoutDashboard, BookOpen, TrendingUp, MessageSquare, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card, { CardBody } from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import messagesData from '../../data/messages.json';
import './StudentMessages.css';

const StudentMessages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(messagesData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/student' },
    { id: 'courses', label: 'My Courses', icon: <BookOpen />, href: '/student/courses', badge: 4 },
    { id: 'analytics', label: 'Progress', icon: <TrendingUp />, href: '/student/analytics' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare />, href: '/student/messages', badge: 2 },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/student/settings' },
  ];

  const filteredConversations = messagesData.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Simulated send
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="Messages" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={3}
        />
        
        <main className="dashboard-main">
          <div className="student-messages-page">
            <div className="messages-container">
        {/* Conversations List */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h2 className="conversations-title">Messages</h2>
            <div className="search-container-messages">
              <Search size={18} className="search-icon-messages" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-messages"
              />
            </div>
          </div>

          <div className="conversations-list">
            {filteredConversations.map((conv) => (
              <div
                key={conv.conversation_id}
                className={`conversation-item ${selectedConversation?.conversation_id === conv.conversation_id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv)}
              >
                <img 
                  src={conv.participant.avatar} 
                  alt={conv.participant.name}
                  className="conversation-avatar"
                />
                <div className="conversation-info">
                  <div className="conversation-header-row">
                    <h4 className="conversation-name">{conv.participant.name}</h4>
                    <span className="conversation-time">
                      {formatTime(conv.last_message_time)}
                    </span>
                  </div>
                  <div className="conversation-preview-row">
                    <p className="conversation-preview">{conv.last_message}</p>
                    {conv.unread_count > 0 && (
                      <Badge variant="error" size="sm">{conv.unread_count}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Thread */}
        <div className="messages-thread">
          {selectedConversation ? (
            <>
              <div className="thread-header">
                <div className="thread-participant">
                  <img 
                    src={selectedConversation.participant.avatar} 
                    alt={selectedConversation.participant.name}
                    className="thread-avatar"
                  />
                  <div>
                    <h3 className="thread-name">{selectedConversation.participant.name}</h3>
                    <p className="thread-role">{selectedConversation.participant.role}</p>
                  </div>
                </div>
                <button className="thread-options">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="messages-body">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.message_id}
                    className={`message ${message.sender === 'student' ? 'message-sent' : 'message-received'}`}
                  >
                    <div className="message-content">
                      <p className="message-text">{message.content}</p>
                      <span className="message-timestamp">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="message-input-field"
                />
                <Button 
                  variant="primary" 
                  onClick={handleSendMessage}
                  leftIcon={<Send size={18} />}
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <EmptyState
              icon={<Search size={48} />}
              title="No conversation selected"
              description="Select a conversation from the list to start messaging"
            />
          )}
        </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentMessages;

