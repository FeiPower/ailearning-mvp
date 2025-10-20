import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, TrendingUp, MessageSquare, Settings, Wrench } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import analyticsData from '../data/analytics.json';
import './StudentDashboard.css';

const StudentDashboard = () => {
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
  const { courses_in_progress, study_time_week, course_completion } = student_dashboard;

  const pieData = [
    { name: 'In Progress', value: course_completion.in_progress, color: '#2C5AA0' },
    { name: 'Not Started', value: course_completion.not_started, color: '#93C5FD' },
    { name: 'Completed', value: course_completion.completed, color: '#BFDBFE' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="Student Dashboard" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={3}
        />
        
        <main className="dashboard-main">
          <div className="dashboard-container">
            {/* Welcome Section */}
            <div className="welcome-section animate-fadeIn">
              <div className="welcome-content">
                <div className="user-avatar">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alejandro" alt="User" />
                </div>
                <div>
                  <h2>Bienvenido, Alejandro 👋</h2>
                  <p>Continúa tu aprendizaje donde lo dejaste</p>
                </div>
              </div>
              <div className="streak-badge">
                <span className="streak-icon">🔥</span>
                <div>
                  <div className="streak-number">7 días</div>
                  <div className="streak-label">Racha actual</div>
                </div>
              </div>
            </div>

            {/* Course Progress Cards */}
            <section className="section">
              <h3 className="section-title">Cursos en Progreso</h3>
              <div className="courses-grid">
                {courses_in_progress.map((course, index) => (
                  <Card key={course.course_id} variant="elevated" hover className="animate-slideUp" style={{animationDelay: `${index * 100}ms`}}>
                    <CardHeader>
                      <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                      <div className="course-badge-container">
                        <Badge variant="primary" size="sm">En progreso</Badge>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <h4 className="course-title">{course.title}</h4>
                      <p className="course-next-lesson">Siguiente: {course.next_lesson}</p>
                      <div className="course-progress">
                        <ProgressBar value={course.progress_percentage} showLabel />
                      </div>
                      <p className="course-time">{course.time_remaining_hours}h restantes</p>
                    </CardBody>
                    <CardFooter>
                      <Link to={`/course/${course.course_id}`}>
                        <Button variant="primary" size="md" style={{width: '100%'}}>
                          Continuar
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Charts Section */}
            <div className="charts-grid">
              {/* Study Time Chart */}
              <Card variant="elevated" className="chart-card">
                <CardBody>
                  <h3 className="chart-title">Tiempo de Estudio</h3>
                  <p className="chart-subtitle">Últimos 7 días</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={study_time_week}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="day" stroke="#666666" style={{fontSize: '12px'}} />
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
                        dataKey="hours" 
                        stroke="#2C5AA0" 
                        strokeWidth={3}
                        dot={{ fill: '#2C5AA0', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>

              {/* Course Completion Pie Chart */}
              <Card variant="elevated" className="chart-card">
                <CardBody>
                  <h3 className="chart-title">Completación de Cursos</h3>
                  <p className="chart-subtitle">Estado general</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-legend">
                    <div className="legend-item">
                      <span className="legend-dot" style={{backgroundColor: '#2C5AA0'}}></span>
                      <span className="legend-label">En Progreso</span>
                      <span className="legend-value">{course_completion.in_progress}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{backgroundColor: '#93C5FD'}}></span>
                      <span className="legend-label">Sin Empezar</span>
                      <span className="legend-value">{course_completion.not_started}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{backgroundColor: '#BFDBFE'}}></span>
                      <span className="legend-label">Completado</span>
                      <span className="legend-value">{course_completion.completed}%</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;

