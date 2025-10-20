import React, { useState } from 'react';
import { Building, CreditCard, Shield, Zap, LayoutDashboard, Users, Key, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import Card, { CardBody } from '../../components/Card';
import Badge from '../../components/Badge';
import institutionData from '../../data/institution-settings.json';
import './AdminSettings.css';

const AdminSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/admin' },
    { id: 'users', label: 'Users', icon: <Users />, href: '/admin/users' },
    { id: 'licenses', label: 'Licenses', icon: <Key />, href: '/admin/licenses' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/admin/settings' },
  ];
  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: <Building size={18} />,
      content: (
        <div className="settings-grid">
          <Card variant="elevated">
            <CardBody>
              <h3 className="settings-card-title">Institution Information</h3>
              <div className="settings-info-list">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{institutionData.institution_name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Plan:</span>
                  <Badge variant="primary">{institutionData.subscription_plan}</Badge>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Licenses:</span>
                  <span className="info-value">{institutionData.billing.total_licenses}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Licenses Used:</span>
                  <span className="info-value">{institutionData.billing.licenses_used}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <h3 className="settings-card-title">Course Catalog</h3>
              <div className="settings-info-list">
                <div className="info-item">
                  <span className="info-label">Available Courses:</span>
                  <span className="info-value">{institutionData.course_catalog.available_courses}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Custom Courses:</span>
                  <span className="info-value">{institutionData.course_catalog.custom_courses}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Enrollments:</span>
                  <span className="info-value">{institutionData.course_catalog.total_enrollments}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Completion Rate:</span>
                  <span className="info-value">{institutionData.course_catalog.completion_rate}%</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: <CreditCard size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-card-title">Billing Information</h3>
            <div className="settings-info-list">
              <div className="info-item">
                <span className="info-label">Monthly Cost:</span>
                <span className="info-value">${institutionData.billing.monthly_cost_usd.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Billing Cycle:</span>
                <Badge variant="info">{institutionData.billing.billing_cycle}</Badge>
              </div>
              <div className="info-item">
                <span className="info-label">Next Billing Date:</span>
                <span className="info-value">{institutionData.billing.next_billing_date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Payment Method:</span>
                <span className="info-value">{institutionData.billing.payment_method}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      )
    },
    {
      id: 'features',
      label: 'Features',
      icon: <Zap size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-card-title">Enabled Features</h3>
            <div className="features-grid">
              {Object.entries(institutionData.features).map(([key, value]) => (
                <div key={key} className="feature-item">
                  <div className="feature-name">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                  <Badge variant={value ? 'success' : 'default'} size="sm">
                    {value ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield size={18} />,
      content: (
        <Card variant="elevated">
          <CardBody>
            <h3 className="settings-card-title">Security Policies</h3>
            <div className="settings-info-list">
              <div className="info-item">
                <span className="info-label">Password Policy:</span>
                <Badge variant="info">{institutionData.policies.password_policy}</Badge>
              </div>
              <div className="info-item">
                <span className="info-label">Session Timeout:</span>
                <span className="info-value">{institutionData.policies.session_timeout_minutes} minutes</span>
              </div>
              <div className="info-item">
                <span className="info-label">MFA Required:</span>
                <Badge variant={institutionData.policies.require_mfa ? 'success' : 'default'}>
                  {institutionData.policies.require_mfa ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="info-item">
                <span className="info-label">Data Retention:</span>
                <span className="info-value">{institutionData.policies.data_retention_days} days</span>
              </div>
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
          title="Institutional Settings" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={2}
        />
        
        <main className="dashboard-main">
          <div className="admin-settings-page">
            <div className="settings-header-admin">
              <h1 className="page-title">Institutional Settings</h1>
              <p className="page-subtitle">Configure your organization's preferences</p>
            </div>

            <Tabs tabs={tabs} defaultTab="general" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;

