import React, { useState } from 'react';
import { LayoutDashboard, Users, Key, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card, { CardBody } from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import licensesData from '../../data/licenses.json';
import './AdminLicenses.css';

const AdminLicenses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/admin' },
    { id: 'users', label: 'Users', icon: <Users />, href: '/admin/users' },
    { id: 'licenses', label: 'Licenses', icon: <Key />, href: '/admin/licenses' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/admin/settings' },
  ];
  const activeCount = licensesData.filter(l => l.status === 'active').length;
  const availableCount = licensesData.filter(l => l.status === 'available').length;
  const expiredCount = licensesData.filter(l => l.status === 'expired').length;

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="License Management" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={2}
        />
        
        <main className="dashboard-main">
          <div className="admin-licenses-page">
            <div className="licenses-header">
              <div>
                <h1 className="page-title">License Management</h1>
                <p className="page-subtitle">Monitor and manage license assignments</p>
              </div>
              <Button variant="primary">Assign License</Button>
            </div>

            <div className="licenses-overview">
        <Card variant="elevated" className="license-stat-card">
          <CardBody>
            <div className="stat-value-license">{activeCount}</div>
            <div className="stat-label-license">Active Licenses</div>
          </CardBody>
        </Card>
        <Card variant="elevated" className="license-stat-card">
          <CardBody>
            <div className="stat-value-license">{availableCount}</div>
            <div className="stat-label-license">Available</div>
          </CardBody>
        </Card>
        <Card variant="elevated" className="license-stat-card">
          <CardBody>
            <div className="stat-value-license">{expiredCount}</div>
            <div className="stat-label-license">Expired</div>
          </CardBody>
        </Card>
      </div>

      <Card variant="elevated">
        <CardBody>
          <h3 className="section-title-licenses">License Assignments</h3>
          <div className="licenses-table-container">
            <table className="licenses-table">
              <thead>
                <tr>
                  <th>License ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Assigned Date</th>
                  <th>Expiration</th>
                  <th>Courses Accessed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {licensesData.map(license => (
                  <tr key={license.license_id}>
                    <td className="license-id-cell">{license.license_id}</td>
                    <td>
                      {license.user_name ? (
                        <div>
                          <div className="user-name-license">{license.user_name}</div>
                          <div className="user-email-license">{license.user_email}</div>
                        </div>
                      ) : (
                        <span className="unassigned">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <Badge variant="info" size="sm">{license.license_type}</Badge>
                    </td>
                    <td>
                      <Badge 
                        variant={
                          license.status === 'active' ? 'success' : 
                          license.status === 'expired' ? 'error' : 'default'
                        }
                        size="sm"
                      >
                        {license.status}
                      </Badge>
                    </td>
                    <td>{license.assigned_date || '-'}</td>
                    <td>{license.expiration_date}</td>
                    <td>{license.courses_accessed}</td>
                    <td>
                      <Button variant="outline" size="sm">
                        {license.user_name ? 'Revoke' : 'Assign'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLicenses;

