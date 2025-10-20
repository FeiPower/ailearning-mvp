import React, { useState } from 'react';
import { TrendingUp, Award, Target, Clock, LayoutDashboard, BookOpen, MessageSquare, Settings, Wrench } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card, { CardBody } from '../../components/Card';
import Badge from '../../components/Badge';
import ProgressBar from '../../components/ProgressBar';
import analyticsData from '../../data/analytics.json';
import achievementsData from '../../data/achievements.json';
import enrollmentsData from '../../data/enrollments.json';
import coursesData from '../../data/courses.json';
import './StudentAnalytics.css';

const StudentAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/student' },
    { id: 'courses', label: 'My Courses', icon: <BookOpen />, href: '/student/courses', badge: 4 },
    { id: 'analytics', label: 'Progress', icon: <TrendingUp />, href: '/student/analytics' },
    { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare />, href: '/student/messages', badge: 2 },
    { id: 'settings', label: 'Settings', icon: <Settings />, href: '/student/settings' },
  ];
  const { student_dashboard } = analyticsData;
  const currentUserId = "USR-2025-0001";
  const userEnrollments = enrollmentsData.filter(e => e.user_id === currentUserId);
  
  const unlockedAchievements = achievementsData.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const monthlyData = [
    { month: 'Jul', hours: 8 },
    { month: 'Aug', hours: 15 },
    { month: 'Sep', hours: 22 },
    { month: 'Oct', hours: 24.5 }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="My Progress" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={3}
        />
        
        <main className="dashboard-main">
          <div className="student-analytics-page">
            <div className="analytics-header">
              <h1 className="page-title">My Progress</h1>
              <p className="page-subtitle">Track your learning journey and achievements</p>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid">
        <Card variant="elevated" className="stat-card">
          <CardBody>
            <div className="stat-icon" style={{backgroundColor: 'rgba(44, 90, 160, 0.1)', color: 'var(--primary-blue)'}}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-value">24.5h</div>
            <div className="stat-label">Total Learning Time</div>
          </CardBody>
        </Card>

        <Card variant="elevated" className="stat-card">
          <CardBody>
            <div className="stat-icon" style={{backgroundColor: 'rgba(0, 166, 81, 0.1)', color: 'var(--primary-green)'}}>
              <Target size={24} />
            </div>
            <div className="stat-value">{userEnrollments.length}</div>
            <div className="stat-label">Courses Enrolled</div>
          </CardBody>
        </Card>

        <Card variant="elevated" className="stat-card">
          <CardBody>
            <div className="stat-icon" style={{backgroundColor: 'rgba(233, 75, 60, 0.1)', color: 'var(--accent-red)'}}>
              <Award size={24} />
            </div>
            <div className="stat-value">{unlockedAchievements.length}</div>
            <div className="stat-label">Achievements Unlocked</div>
          </CardBody>
        </Card>

        <Card variant="elevated" className="stat-card">
          <CardBody>
            <div className="stat-icon" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)'}}>
              <Clock size={24} />
            </div>
            <div className="stat-value">7 days</div>
            <div className="stat-label">Current Streak</div>
          </CardBody>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="charts-section-analytics">
        <Card variant="elevated" className="chart-card-analytics">
          <CardBody>
            <h3 className="chart-title">Learning Time Trend</h3>
            <p className="chart-subtitle">Monthly study hours</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="month" stroke="#666666" style={{fontSize: '12px'}} />
                <YAxis stroke="#666666" style={{fontSize: '12px'}} />
                <Tooltip />
                <Bar dataKey="hours" fill="#2C5AA0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card variant="elevated" className="chart-card-analytics">
          <CardBody>
            <h3 className="chart-title">Weekly Activity</h3>
            <p className="chart-subtitle">Last 7 days</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={student_dashboard.study_time_week}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="day" stroke="#666666" style={{fontSize: '12px'}} />
                <YAxis stroke="#666666" style={{fontSize: '12px'}} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#00A651" 
                  strokeWidth={3}
                  dot={{ fill: '#00A651', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Course Progress */}
      <Card variant="elevated" className="progress-card">
        <CardBody>
          <h3 className="section-title-analytics">Course Progress</h3>
          <div className="course-progress-list">
            {userEnrollments.map(enrollment => {
              const course = coursesData.find(c => c.course_id === enrollment.course_id);
              return (
                <div key={enrollment.enrollment_id} className="course-progress-item">
                  <div className="course-info-analytics">
                    <h4 className="course-name">{course?.title || 'Unknown Course'}</h4>
                    <p className="course-lessons">{enrollment.completed_lessons} / {enrollment.total_lessons} lessons completed</p>
                  </div>
                  <div className="course-progress-bar">
                    <ProgressBar value={enrollment.progress_percentage} showLabel />
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Achievements */}
      <Card variant="elevated" className="achievements-card">
        <CardBody>
          <h3 className="section-title-analytics">Achievements ({unlockedAchievements.length}/{achievementsData.length})</h3>
          <div className="achievements-stat">
            <span className="total-points">{totalPoints} Points Earned</span>
          </div>
          <div className="achievements-grid">
            {achievementsData.map(achievement => (
              <div 
                key={achievement.achievement_id} 
                className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="achievement-footer">
                    <Badge variant={achievement.unlocked ? 'success' : 'default'} size="sm">
                      {achievement.points} points
                    </Badge>
                    {achievement.unlocked && (
                      <span className="unlock-date">
                        Unlocked: {new Date(achievement.unlocked_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAnalytics;

