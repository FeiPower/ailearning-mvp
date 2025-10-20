# AI Fluency Training - E-Learning MVP

MVP Demo de plataforma e-learning para entrenamiento en Inteligencia Artificial aplicada a medicina.

## 🎯 Características

- ✅ **Dashboard de Estudiante**: Cursos en progreso, analytics, gráficos de tiempo de estudio
- ✅ **Reproductor de Cursos**: Video player, sidebar de lecciones, materiales descargables
- ✅ **Dashboard Administrativo**: KPIs institucionales, gestión de licencias, métricas de equipo
- ✅ **Diseño Responsive**: Mobile-first, optimizado para todos los dispositivos
- ✅ **Data Faker**: Datos realistas en JSON para demostración completa
- ✅ **UI/UX Profesional**: Sistema de diseño completo basado en PRD

## 🚀 Inicio Rápido

### Instalación

```bash
cd elearning-mvp
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build de Producción

```bash
npm run build
npm run preview
```

## 📦 Deployment a GitHub Pages

### Opción 1: Workflow Automático (Recomendado)

El proyecto incluye un workflow de GitHub Actions que despliega automáticamente a GitHub Pages cuando haces push a `main`.

1. Ve a Settings > Pages en tu repositorio
2. Source: GitHub Actions
3. Haz push a main y el deploy se ejecutará automáticamente

### Opción 2: Deploy Manual

```bash
npm run deploy
```

Este comando construye el proyecto y lo publica usando gh-pages.

## 🏗️ Estructura del Proyecto

```
elearning-mvp/
├── src/
│   ├── components/       # Componentes reutilizables (Button, Card, etc.)
│   ├── pages/           # Páginas principales (Dashboard, Course, Admin)
│   ├── data/            # JSON faker data
│   ├── styles/          # CSS global y sistema de diseño
│   └── App.jsx          # Router principal
├── public/              # Assets estáticos
└── index.html
```

## 🎨 Sistema de Diseño

El proyecto implementa un sistema de diseño completo basado en el PRD:

- **Colores**: Paleta definida con variables CSS
- **Tipografía**: Montserrat (headings) + Source Sans Pro (body)
- **Componentes**: Button, Card, Badge, ProgressBar
- **Responsive**: Breakpoints en 640px, 768px, 1024px, 1280px

## 📊 Data Faker

Los datos de demostración incluyen:

- 4 usuarios (estudiante, admin, instructor)
- 3 cursos completos con módulos y lecciones
- Analytics de plataforma y progreso
- Equipo institucional y métricas admin

## 🛠️ Tecnologías

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos
- **CSS Variables** - Sistema de diseño

## 📱 Vistas Disponibles

### Landing Page (`/`)
Página de selección de rol con acceso a las diferentes vistas.

### Student Dashboard (`/student`)
- Cursos en progreso con progress bars
- Gráfico de tiempo de estudio semanal
- Donut chart de completación de cursos
- Racha de aprendizaje

### Course Player (`/course/:courseId`)
- Video player simulado
- Sidebar con módulos y lecciones
- Progress tracking
- Materiales descargables
- Navegación entre lecciones

### Admin Dashboard (`/admin`)
- KPIs: Active Users, New Users
- License status (donut chart)
- Team members table
- Usage trends (line chart)
- Performance metrics (bar chart)

## 🎯 Propósito

Este MVP está diseñado para:
- ✅ Validación con stakeholders
- ✅ Demostración de propuesta de valor
- ✅ Presentación de UI/UX completa
- ✅ Testing de flujos de usuario
- ✅ Feedback antes de desarrollo backend

## 📄 Licencia

Demo MVP - AI Fluency Training Platform © 2025

