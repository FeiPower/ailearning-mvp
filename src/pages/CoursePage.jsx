import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Play, CheckCircle, Download, FileText, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import coursesData from '../data/courses.json';
import './CoursePage.css';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.course_id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      // Set first lesson as current
      if (foundCourse.modules && foundCourse.modules[0]?.lessons?.length > 0) {
        setCurrentLesson(foundCourse.modules[0].lessons[0]);
        // Expand first module by default
        setExpandedModules({ [foundCourse.modules[0].module_id]: true });
      }
    }
  }, [courseId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const selectLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  const markAsComplete = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.lesson_id]));
    }
  };

  const getTotalLessons = () => {
    if (!course) return 0;
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  const getCompletedPercentage = () => {
    const total = getTotalLessons();
    return total > 0 ? Math.round((completedLessons.size / total) * 100) : 0;
  };

  if (!course) {
    return (
      <div className="course-loading">
        <div className="loading-spinner"></div>
        <p>Cargando curso...</p>
      </div>
    );
  }

  return (
    <div className="course-page">
      {/* Course Header */}
      <div className="course-header">
        <div className="course-header-content">
          <Link to="/student" className="back-button">
            <ArrowLeft size={20} />
            <span>Volver al Dashboard</span>
          </Link>
          <h1 className="course-page-title">{course.title}</h1>
          <div className="course-progress-header">
            <span className="progress-text-header">{getCompletedPercentage()}% Completado</span>
            <ProgressBar value={getCompletedPercentage()} size="sm" variant="secondary" />
          </div>
        </div>
      </div>

      <div className="course-layout">
        {/* Lesson Sidebar */}
        <aside className="lesson-sidebar">
          <div className="sidebar-header-lesson">
            <h3>Contenido del Curso</h3>
            <Badge variant="info" size="sm">
              {completedLessons.size} / {getTotalLessons()}
            </Badge>
          </div>
          
          <div className="modules-list">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.module_id} className="module-item">
                <button
                  className="module-header"
                  onClick={() => toggleModule(module.module_id)}
                >
                  <span className="module-title">
                    <span className="module-number">Módulo {moduleIndex + 1}</span>
                    <span className="module-name">{module.title}</span>
                  </span>
                  {expandedModules[module.module_id] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                
                {expandedModules[module.module_id] && (
                  <div className="lessons-list">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.has(lesson.lesson_id);
                      const isCurrent = currentLesson?.lesson_id === lesson.lesson_id;
                      
                      return (
                        <button
                          key={lesson.lesson_id}
                          className={`lesson-item ${isCurrent ? 'lesson-current' : ''} ${isCompleted ? 'lesson-completed' : ''}`}
                          onClick={() => selectLesson(lesson)}
                        >
                          <span className="lesson-icon">
                            {isCompleted ? (
                              <CheckCircle size={18} className="check-icon" />
                            ) : (
                              <span className="lesson-number">{lessonIndex + 1}</span>
                            )}
                          </span>
                          <span className="lesson-info">
                            <span className="lesson-title-text">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration_minutes} min</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="course-main-content">
          {currentLesson && (
            <>
              {/* Video Player Section */}
              <div className="video-section">
                <div className="video-player">
                  <div className="video-placeholder">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop" 
                      alt="Video thumbnail"
                      className="video-thumbnail"
                    />
                    <button className="play-button">
                      <Play size={48} />
                    </button>
                  </div>
                  <div className="video-controls">
                    <button className="control-btn">
                      <Play size={20} />
                    </button>
                    <div className="progress-bar-video">
                      <div className="progress-fill" style={{width: '45%'}}></div>
                    </div>
                    <span className="time-display">2:30 / 5:35</span>
                  </div>
                </div>

                <div className="lesson-details">
                  <div className="lesson-header-details">
                    <div>
                      <h2 className="lesson-title-main">{currentLesson.title}</h2>
                      <p className="lesson-meta">
                        {currentLesson.type === 'video' && '📹 Video'} • {currentLesson.duration_minutes} minutos
                      </p>
                    </div>
                    <Button
                      variant={completedLessons.has(currentLesson.lesson_id) ? 'secondary' : 'primary'}
                      onClick={markAsComplete}
                      leftIcon={<CheckCircle size={18} />}
                    >
                      {completedLessons.has(currentLesson.lesson_id) ? 'Completado' : 'Marcar como Completado'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Course Materials */}
              <div className="course-materials">
                <h3 className="materials-title">Materiales del Curso</h3>
                <div className="materials-list">
                  <a href="#" className="material-item">
                    <Download size={20} className="material-icon" />
                    <span>Descargar: PDF 1</span>
                  </a>
                  <a href="#" className="material-item">
                    <FileText size={20} className="material-icon" />
                    <span>Descargar: PDF 2</span>
                  </a>
                  <a href="#" className="material-item">
                    <ExternalLink size={20} className="material-icon" />
                    <span>Enlace Externo</span>
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div className="lesson-navigation">
                <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
                  Lección Anterior
                </Button>
                <Button variant="primary" rightIcon={<ArrowRight size={18} />}>
                  Siguiente Lección
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePage;

