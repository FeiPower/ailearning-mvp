import React, { useState } from 'react';
import { Search, Eye, LayoutDashboard, Users, Key, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card, { CardBody } from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import teamMembersData from '../../data/team-members.json';
import './AdminUsers.css';

const AdminUsers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/admin' },
    { id: 'users', label: 'Users', icon: <Users />, href: '/admin/users' },
    { id: 'licenses', label: 'Licenses', icon: <Key />, href: '/admin/licenses' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/admin/settings' },
  ];

  const filteredUsers = teamMembersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="User Management" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={2}
        />
        
        <main className="dashboard-main">
          <div className="admin-users-page">
            <div className="users-header">
              <div>
                <h1 className="page-title">User Management</h1>
                <p className="page-subtitle">Manage team members and their access</p>
              </div>
              <Button variant="primary">Add User</Button>
            </div>

            <Card variant="elevated">
        <CardBody>
          <div className="users-toolbar">
            <div className="search-container-users">
              <Search size={18} className="search-icon-users" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-users"
              />
            </div>
            <div className="users-count">
              {filteredUsers.length} users found
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Courses</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.user_id}>
                    <td className="user-name-cell">{user.name}</td>
                    <td className="user-email-cell">{user.email}</td>
                    <td>
                      <Badge variant="default" size="sm">{user.role}</Badge>
                    </td>
                    <td>
                      <Badge 
                        variant={user.status === 'Active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td>{user.courses_completed}</td>
                    <td>
                      <div className="progress-cell">
                        <span>{user.progress_percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<Eye size={16} />}
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <div className="user-details">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{selectedUser.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{selectedUser.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{selectedUser.role}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <Badge variant={selectedUser.status === 'Active' ? 'success' : 'warning'}>
                {selectedUser.status}
              </Badge>
            </div>
            <div className="detail-row">
              <span className="detail-label">Courses Completed:</span>
              <span className="detail-value">{selectedUser.courses_completed}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Progress:</span>
              <span className="detail-value">{selectedUser.progress_percentage}%</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Active:</span>
              <span className="detail-value">{selectedUser.last_active}</span>
            </div>
            <div className="modal-actions">
              <Button variant="secondary">Edit User</Button>
              <Button variant="outline">Deactivate</Button>
            </div>
          </div>
        )}
      </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;

