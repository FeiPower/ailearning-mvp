import React, { useState } from 'react';
import { User, Bell, Shield, Save, LayoutDashboard, BookOpen, TrendingUp, MessageSquare, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import Card, { CardBody } from '../../components/Card';
import Button from '../../components/Button';
import usersData from '../../data/users.json';
import './StudentSettings.css';

const StudentSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/student' },
    { id: 'courses', label: 'My Courses', icon: <BookOpen />, href: '/student/courses', badge: 4 },
    { id: 'analytics', label: 'Progress', icon: <TrendingUp />, href: '/student/analytics' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare />, href: '/student/messages', badge: 2 },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/student/settings' },
  ];
  const user = usersData[0];
  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    specialty: user.specialty,
    institution: user.institution
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    alert('Settings saved! (Simulated)');
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-section-title">Personal Information</h3>
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardBody>
        </Card>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-section-title">Notification Preferences</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Email Notifications</h4>
                  <p className="setting-description">Receive course updates via email</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Course Reminders</h4>
                  <p className="setting-description">Get reminded about upcoming deadlines</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Achievement Alerts</h4>
                  <p className="setting-description">Notifications for unlocked achievements</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Weekly Progress Report</h4>
                  <p className="setting-description">Receive weekly summary of your learning</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      )
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: <Shield size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-section-title">Privacy Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Profile Visibility</h4>
                  <p className="setting-description">Control who can see your profile</p>
                </div>
                <select className="form-select">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Institution Only</option>
                </select>
              </div>

              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Show Learning Activity</h4>
                  <p className="setting-description">Display your progress to others</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <h4 className="setting-title">Data Sharing</h4>
                  <p className="setting-description">Share anonymized data for research</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="password-section">
              <h3 className="settings-section-title">Change Password</h3>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input type="password" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-input" />
              </div>
              <Button variant="secondary">Update Password</Button>
            </div>
          </CardBody>
        </Card>
      )
    }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="Settings" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={3}
        />
        
        <main className="dashboard-main">
          <div className="student-settings-page">
            <div className="settings-header">
              <h1 className="page-title">Settings</h1>
              <p className="page-subtitle">Manage your account preferences</p>
            </div>

            <Tabs tabs={tabs} defaultTab="profile" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentSettings;

