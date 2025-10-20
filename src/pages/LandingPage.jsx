import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Brain } from 'lucide-react';
import Button from '../components/Button';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <Brain size={64} />
          </div>
          <h1 className="hero-title">AI Fluency Training</h1>
          <p className="hero-subtitle">
            Plataforma de E-Learning en Inteligencia Artificial para Profesionales Médicos
          </p>
          <p className="hero-description">
            Selecciona un rol para explorar la demo de la plataforma
          </p>
          
          <div className="role-cards">
            <Link to="/student" className="role-card">
              <div className="role-icon">
                <GraduationCap size={48} />
              </div>
              <h3>Vista de Estudiante</h3>
              <p>Dashboard de estudiante, cursos, progreso y analytics</p>
              <Button variant="primary" className="role-button">
                Explorar Dashboard
              </Button>
            </Link>
            
            <Link to="/admin" className="role-card">
              <div className="role-icon">
                <Users size={48} />
              </div>
              <h3>Vista de Administrador</h3>
              <p>Gestión institucional, licencias, equipo y métricas</p>
              <Button variant="secondary" className="role-button">
                Explorar Admin
              </Button>
            </Link>
          </div>
          
          <div className="demo-note">
            <p>
              <strong>Nota:</strong> Esta es una demo con datos simulados para validación con stakeholders.
              Todas las características de UI/UX están completamente funcionales.
            </p>
          </div>
        </div>
      </div>
      
      <div className="landing-footer">
        <p>MVP Demo - AI Fluency Training Platform © 2025</p>
      </div>
    </div>
  );
};

export default LandingPage;

