import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, LayoutDashboard, TrendingUp, MessageSquare, Settings, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import ProgressBar from '../../components/ProgressBar';
import coursesData from '../../data/courses.json';
import enrollmentsData from '../../data/enrollments.json';
import './StudentCourses.css';

const StudentCourses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/student' },
    { id: 'courses', label: 'My Courses', icon: <BookOpen />, href: '/student/courses', badge: 4 },
    { id: 'analytics', label: 'Progress', icon: <TrendingUp />, href: '/student/analytics' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare />, href: '/student/messages', badge: 2 },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/student/settings' },
  ];

  const currentUserId = "USR-2025-0001";
  const userEnrollments = enrollmentsData.filter(e => e.user_id === currentUserId);

  const getEnrollmentStatus = (courseId) => {
    const enrollment = userEnrollments.find(e => e.course_id === courseId);
    if (!enrollment) return { status: 'available', progress: 0 };
    return { status: enrollment.status, progress: enrollment.progress_percentage };
  };

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const enrollmentInfo = getEnrollmentStatus(course.course_id);
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'enrolled') return matchesSearch && enrollmentInfo.status !== 'available';
    if (filter === 'available') return matchesSearch && enrollmentInfo.status === 'available';
    if (filter === 'completed') return matchesSearch && enrollmentInfo.progress === 100;
    
    return matchesSearch;
  });

  const getStatusBadge = (status, progress) => {
    if (progress === 100) return <Badge variant="success">Completed</Badge>;
    if (status === 'in_progress') return <Badge variant="info">In Progress</Badge>;
    if (status === 'not_started') return <Badge variant="warning">Not Started</Badge>;
    return <Badge variant="default">Available</Badge>;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="My Courses" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={3}
        />
        
        <main className="dashboard-main">
          <div className="student-courses-page">
            {/* Page Header */}
            <div className="courses-header">
              <div>
                <h1 className="page-title">Course Catalog</h1>
                <p className="page-subtitle">Browse and enroll in available courses</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="courses-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Courses ({coursesData.length})
          </button>
          <button
            className={`filter-btn ${filter === 'enrolled' ? 'filter-active' : ''}`}
            onClick={() => setFilter('enrolled')}
          >
            My Courses ({userEnrollments.length})
          </button>
          <button
            className={`filter-btn ${filter === 'available' ? 'filter-active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'filter-active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid-page">
        {filteredCourses.map((course) => {
          const enrollmentInfo = getEnrollmentStatus(course.course_id);
          const isEnrolled = enrollmentInfo.status !== 'available';
          
          return (
            <Card key={course.course_id} variant="elevated" hover className="course-card-full">
              <CardHeader>
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="course-image"
                />
                <div className="course-badge-overlay">
                  {getStatusBadge(enrollmentInfo.status, enrollmentInfo.progress)}
                </div>
              </CardHeader>
              <CardBody>
                <div className="course-level">{course.level}</div>
                <h3 className="course-title-full">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{course.total_duration_hours}h</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{course.enrollment_count} students</span>
                  </div>
                  <div className="meta-item">
                    <Star size={16} fill="currentColor" />
                    <span>{course.average_rating}</span>
                  </div>
                </div>

                {isEnrolled && enrollmentInfo.progress > 0 && (
                  <div className="course-progress-section">
                    <div className="progress-label-row">
                      <span className="progress-label-text">Progress</span>
                      <span className="progress-percentage">{enrollmentInfo.progress}%</span>
                    </div>
                    <ProgressBar value={enrollmentInfo.progress} size="md" />
                  </div>
                )}
              </CardBody>
              <CardFooter>
                {isEnrolled ? (
                  <Link to={`/course/${course.course_id}`} style={{width: '100%'}}>
                    <Button variant="primary" size="md" style={{width: '100%'}}>
                      Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" size="md" style={{width: '100%'}}>
                    Enroll Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

            {filteredCourses.length === 0 && (
              <div className="no-results">
                <BookOpen size={48} />
                <h3>No courses found</h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentCourses;

