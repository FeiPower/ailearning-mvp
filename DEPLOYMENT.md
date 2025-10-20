# Guía de Deployment - GitHub Pages

## 📋 Prerequisitos

- Repositorio en GitHub
- Node.js 18+ instalado
- Acceso a Settings del repositorio

## 🚀 Método 1: GitHub Actions (Automático - Recomendado)

### Configuración Inicial

1. **Habilitar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings > Pages
   - Source: **GitHub Actions**

2. **Verificar el Workflow**
   - El archivo `.github/workflows/deploy.yml` ya está incluido
   - Se ejecutará automáticamente en cada push a `main`

3. **Hacer Push**
   ```bash
   git add .
   git commit -m "Initial MVP deployment"
   git push origin main
   ```

4. **Verificar Deployment**
   - Ve a Actions tab en GitHub
   - Espera a que termine el workflow (2-3 minutos)
   - Tu sitio estará disponible en: `https://[username].github.io/139_AI_Fluency_Training/`

### Troubleshooting

Si el workflow falla:
- Verifica que Pages esté configurado en "GitHub Actions"
- Asegúrate de que los permisos de Pages estén habilitados
- Revisa los logs en la pestaña Actions

## 🔧 Método 2: Deploy Manual con gh-pages

### Instalación

El paquete `gh-pages` ya está incluido en `package.json`.

### Deploy

```bash
cd elearning-mvp
npm run deploy
```

Este comando:
1. Ejecuta `npm run build`
2. Publica el contenido de `dist/` a la rama `gh-pages`

### Configuración Pages (si usas este método)

1. Settings > Pages
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `/ (root)`
4. Save

## 🌐 URL del Proyecto

Tu sitio estará disponible en:
```
https://[tu-username].github.io/139_AI_Fluency_Training/
```

## 📝 Actualizaciones

### Con GitHub Actions
Simplemente haz push a main:
```bash
git add .
git commit -m "Update MVP"
git push origin main
```

### Con gh-pages Manual
```bash
npm run deploy
```

## ⚙️ Configuración de Base Path

El base path está configurado en `vite.config.js`:
```js
base: '/139_AI_Fluency_Training/'
```

**Importante:** Si cambias el nombre del repositorio, actualiza este valor.

## 🔍 Testing Local del Build

Antes de hacer deploy, prueba el build localmente:

```bash
npm run build
npm run preview
```

Abre http://localhost:4173/139_AI_Fluency_Training/

## 📦 Contenido del Deploy

El deploy incluye:
- Todos los assets optimizados
- HTML, CSS, JS minificados
- Imágenes y recursos estáticos
- Archivo `.nojekyll` (para evitar procesamiento Jekyll)

## 🎯 Checklist Pre-Deploy

- [ ] Todos los datos JSON están actualizados
- [ ] Las rutas usan el base path correcto
- [ ] Build local funciona correctamente
- [ ] No hay console.errors en producción
- [ ] Responsive design verificado en múltiples dispositivos
- [ ] Todos los links funcionan correctamente

## 🐛 Problemas Comunes

### Página en blanco después del deploy
- Verifica que `base` en vite.config.js coincida con el nombre del repo
- Asegúrate de usar `BrowserRouter` con `basename` en App.jsx

### Assets no cargan (404)
- Verifica que las rutas sean relativas
- Comprueba el base path en vite.config.js

### GitHub Actions no se ejecuta
- Verifica permisos en Settings > Actions > General
- Habilita "Read and write permissions"

## 📞 Soporte

Para más información:
- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

