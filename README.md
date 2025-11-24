# APE3 Parte 7 - Frontend Full Stack

Aplicación frontend desarrollada en React con TypeScript, implementando arquitectura limpia y patrones modernos de desarrollo.

## 🚀 Características

- **Framework**: React 18 con TypeScript
- **Arquitectura**: Arquitectura limpia con separación de responsabilidades
- **Estado Global**: Context API para manejo de estado (Auth y Usuarios)
- **Rutas**: React Router DOM con protección de rutas
- **HTTP Client**: Axios con interceptors para JWT
- **UI Responsiva**: Diseño adaptativo para móviles y desktop
- **Manejo de Errores**: Sistema global de manejo de errores
- **Loading States**: Feedback visual durante operaciones asíncronas

## 📋 Funcionalidades

### Autenticación
- ✅ Login de usuarios
- ✅ Registro de nuevos usuarios
- ✅ Perfil de usuario
- ✅ Protección de rutas privadas
- ✅ Interceptors para adjuntar tokens JWT automáticamente

### Gestión de Usuarios
- ✅ Listar usuarios
- ✅ Crear nuevos usuarios
- ✅ Visualizar perfil del usuario autenticado

### UX/UI
- ✅ Loading states en todas las operaciones
- ✅ Manejo de errores con mensajes claros
- ✅ Alertas de éxito
- ✅ Diseño responsivo
- ✅ Feedback visual inmediato

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
Crea un archivo `.env` basado en `.env.example`:
```env
VITE_API_URL=http://localhost:8000
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

4. **Compilar para producción:**
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── UsersList.tsx
│   ├── Profile.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorAlert.tsx
│   └── SuccessAlert.tsx
├── context/            # Context API (Estado Global)
│   ├── AuthContext.tsx
│   └── UsersContext.tsx
├── services/           # Servicios API
│   └── api.ts
├── types/              # Tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 🔐 Arquitectura

### Context API
- **AuthContext**: Maneja autenticación, login, registro, logout y perfil
- **UsersContext**: Maneja la lista de usuarios y creación de nuevos usuarios

### Servicios API
- **api.ts**: Cliente HTTP con Axios
  - Interceptor de requests: Adjunta token JWT automáticamente
  - Interceptor de responses: Maneja errores globales y redirección en 401

### Componentes
- **ProtectedRoute**: Componente HOC para proteger rutas privadas
- **Layout**: Layout principal con navegación
- Componentes de UI reutilizables (LoadingSpinner, ErrorAlert, SuccessAlert)

## 🌐 Despliegue

### Vercel

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Desplegar:**
```bash
vercel
```

O conecta tu repositorio en [Vercel](https://vercel.com) y el despliegue será automático.

**Configuración en Vercel:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Variables de entorno en Vercel:**
- `VITE_API_URL`: URL de tu API backend

### Netlify

1. **Instalar Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Desplegar:**
```bash
netlify deploy --prod
```

O conecta tu repositorio en [Netlify](https://netlify.com) y el despliegue será automático usando el archivo `netlify.toml`.

**Variables de entorno en Netlify:**
- `VITE_API_URL`: URL de tu API backend

### Firebase Hosting

1. **Instalar Firebase CLI:**
```bash
npm i -g firebase-tools
```

2. **Inicializar Firebase:**
```bash
firebase init hosting
```

3. **Configurar:**
- Public directory: `dist`
- Single-page app: Yes
- Build command: `npm run build`

4. **Desplegar:**
```bash
npm run build
firebase deploy
```

### AWS S3 + CloudFront

1. **Compilar:**
```bash
npm run build
```

2. **Subir a S3:**
```bash
aws s3 sync dist/ s3://tu-bucket-name --delete
```

3. **Configurar CloudFront** para servir desde S3 con configuración de SPA (redirecciones a index.html)

## 🔧 Configuración del Backend

Asegúrate de que tu backend tenga los siguientes endpoints:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/profile` - Obtener perfil (requiere JWT)
- `GET /api/users` - Listar usuarios (requiere JWT)
- `POST /api/users` - Crear usuario (requiere JWT)

**Formato de respuesta esperado:**

Login/Register:
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Características de UI

- Diseño moderno y limpio
- Gradientes y sombras para profundidad
- Animaciones suaves
- Responsive design (mobile-first)
- Estados de carga visuales
- Mensajes de error y éxito claros

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (< 480px)
- 📱 Tablets (480px - 768px)
- 💻 Desktop (> 768px)

## 🔒 Seguridad

- Tokens JWT almacenados en localStorage
- Interceptors automáticos para adjuntar tokens
- Redirección automática en caso de token inválido
- Rutas protegidas con componente ProtectedRoute

## 📄 Licencia

Este proyecto es parte de la actividad APE3 Parte 7.

