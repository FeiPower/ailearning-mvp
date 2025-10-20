import React, { useState } from 'react';
import { LayoutDashboard, Users, Key, Settings, Wrench } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card, { CardBody } from '../components/Card';
import Badge from '../components/Badge';
import analyticsData from '../data/analytics.json';
import teamMembersData from '../data/team-members.json';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/admin' },
    { id: 'users', label: 'Users', icon: <Users />, href: '/admin/users' },
    { id: 'licenses', label: 'Licenses', icon: <Key />, href: '/admin/licenses' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/admin/settings' },
  ];

  const { admin_dashboard } = analyticsData;
  const { kpi_cards, usage_trends_monthly, performance_data } = admin_dashboard;

  const licenseData = [
    { name: 'Allocated', value: kpi_cards.licenses_allocated, color: '#2C5AA0' },
    { name: 'Available', value: kpi_cards.licenses_available, color: '#93C5FD' },
    { name: 'Expired', value: kpi_cards.licenses_expired, color: '#BFDBFE' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="ADMINISTRATION" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={2}
        />
        
        <main className="admin-main">
          <div className="admin-container">
            {/* Page Title */}
            <div className="admin-header-section">
              <h2 className="admin-page-title">Institutional</h2>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
              <Card variant="elevated" className="kpi-card animate-slideUp">
                <CardBody>
                  <h3 className="kpi-title">Active Users</h3>
                  <div className="kpi-value">{kpi_cards.active_users.toLocaleString()}</div>
                </CardBody>
              </Card>

              <Card variant="elevated" className="kpi-card animate-slideUp" style={{animationDelay: '100ms'}}>
                <CardBody>
                  <h3 className="kpi-title">New Users</h3>
                  <div className="kpi-value">{kpi_cards.new_users}</div>
                </CardBody>
              </Card>

              <Card variant="elevated" className="kpi-card license-card animate-slideUp" style={{animationDelay: '200ms'}}>
                <CardBody>
                  <h3 className="kpi-title">License status</h3>
                  <div className="license-mini-chart">
                    <ResponsiveContainer width="100%" height={120}>
                      <PieChart>
                        <Pie
                          data={licenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {licenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="license-stats">
                    <div className="license-stat-item">
                      <span className="license-dot" style={{backgroundColor: '#2C5AA0'}}></span>
                      <span className="license-label">Allocated</span>
                      <span className="license-value">{kpi_cards.licenses_allocated.toLocaleString()}</span>
                    </div>
                    <div className="license-stat-item">
                      <span className="license-dot" style={{backgroundColor: '#93C5FD'}}></span>
                      <span className="license-label">Available</span>
                      <span className="license-value">{kpi_cards.licenses_available}</span>
                    </div>
                    <div className="license-stat-item">
                      <span className="license-dot" style={{backgroundColor: '#BFDBFE'}}></span>
                      <span className="license-label">Expired</span>
                      <span className="license-value">{kpi_cards.licenses_expired}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="admin-main-grid">
              {/* Team Members Table */}
              <Card variant="elevated" className="team-card">
                <CardBody>
                  <h3 className="section-title-admin">Team Members</h3>
                  <div className="table-container">
                    <table className="team-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Last Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembersData.slice(0, 5).map(member => (
                          <tr key={member.user_id}>
                            <td className="user-cell">{member.name}</td>
                            <td>{member.role}</td>
                            <td>
                              <Badge 
                                variant={member.status === 'Active' ? 'success' : 'warning'}
                                size="sm"
                              >
                                {member.status}
                              </Badge>
                            </td>
                            <td className="last-active-cell">{member.last_active}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              {/* Usage Trends */}
              <Card variant="elevated" className="chart-card-admin">
                <CardBody>
                  <h3 className="section-title-admin">Usage Trends</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={usage_trends_monthly.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="month" stroke="#666666" style={{fontSize: '12px'}} />
                      <YAxis stroke="#666666" style={{fontSize: '12px'}} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #E5E5E5',
                          borderRadius: '8px',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2C5AA0" 
                        strokeWidth={3}
                        dot={{ fill: '#2C5AA0', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card variant="elevated" className="performance-card">
              <CardBody>
                <h3 className="section-title-admin">Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performance_data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                    <XAxis dataKey="month" stroke="#666666" style={{fontSize: '12px'}} />
                    <YAxis stroke="#666666" style={{fontSize: '12px'}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #E5E5E5',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill="#2C5AA0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

