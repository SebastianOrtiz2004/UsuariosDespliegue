# 🚀 Despliegue en Vercel - Guía Paso a Paso

Vercel es la opción **más sencilla y rápida** para desplegar tu frontend. Sigue estos pasos:

## 📋 Requisitos

1. ✅ Cuenta en GitHub (gratis)
2. ✅ Cuenta en Vercel (gratis, puedes usar GitHub para registrarte)
3. ✅ Tu backend debe estar desplegado y accesible (o usar localhost para pruebas)

## 🎯 Método 1: Desde GitHub (MÁS FÁCIL - Recomendado)

### Paso 1: Subir código a GitHub

1. **Crea un repositorio en GitHub:**
   - Ve a [github.com](https://github.com)
   - Click en "New repository"
   - Nombre: `ape3-parte7-frontend` (o el que prefieras)
   - Público o Privado (como prefieras)
   - **NO** marques "Initialize with README"
   - Click en "Create repository"

2. **Sube tu código:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/ape3-parte7-frontend.git
   git push -u origin main
   ```
   
   ⚠️ **Nota**: Reemplaza `TU_USUARIO` con tu usuario de GitHub

### Paso 2: Conectar con Vercel

1. **Ve a Vercel:**
   - Abre [vercel.com](https://vercel.com)
   - Click en "Sign Up" (puedes usar tu cuenta de GitHub)

2. **Importar proyecto:**
   - Click en "Add New..." → "Project"
   - Selecciona "Import Git Repository"
   - Busca tu repositorio `ape3-parte7-frontend`
   - Click en "Import"

3. **Configurar proyecto:**
   Vercel detectará automáticamente que es Vite, pero verifica:
   - **Framework Preset:** Vite ✅
   - **Root Directory:** `./` (o deja vacío)
   - **Build Command:** `npm run build` ✅
   - **Output Directory:** `dist` ✅
   - **Install Command:** `npm install` ✅

4. **Configurar Variables de Entorno:**
   - En la sección "Environment Variables"
   - Click en "Add"
   - **Name:** `VITE_API_URL`
   - **Value:** La URL de tu backend
     - Si tu backend está en producción: `https://tu-backend.com`
     - Si aún no está desplegado: `http://localhost:8000` (solo para pruebas)
   - Click en "Add"

5. **Desplegar:**
   - Click en "Deploy"
   - Espera 1-2 minutos
   - ¡Listo! 🎉

### Paso 3: Obtener tu URL

Después del despliegue, Vercel te dará una URL como:
```
https://ape3-parte7-frontend.vercel.app
```

## 🎯 Método 2: Desde CLI (Alternativo)

Si prefieres usar la terminal:

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login

```bash
vercel login
```

Te abrirá el navegador para autenticarte.

### Paso 3: Desplegar

```bash
cd frontend
vercel
```

Sigue las instrucciones:
- Set up and deploy? → **Yes**
- Which scope? → Tu cuenta
- Link to existing project? → **No**
- Project name? → `ape3-parte7-frontend`
- Directory? → **./** (enter)
- Override settings? → **No**

### Paso 4: Configurar Variables de Entorno

```bash
vercel env add VITE_API_URL
```

Cuando te pregunte el valor, ingresa la URL de tu backend.

### Paso 5: Desplegar a Producción

```bash
vercel --prod
```

## 🔧 Configuración Importante

### Variable de Entorno: VITE_API_URL

**En Vercel:**
1. Ve a tu proyecto en vercel.com
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `VITE_API_URL`
   - **Value:** URL de tu backend (ej: `https://api.tu-dominio.com`)

**⚠️ IMPORTANTE:** Después de agregar variables de entorno, necesitas hacer un **redeploy**:
- Click en "Deployments"
- Click en los 3 puntos del último deployment
- Click en "Redeploy"

## ✅ Verificar el Despliegue

1. Abre la URL que te dio Vercel
2. Deberías ver la página de login
3. Abre la consola del navegador (F12)
4. Verifica que no haya errores de conexión

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a GitHub, Vercel desplegará automáticamente una nueva versión.

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs de build en Vercel

### Error: "Cannot connect to API"
- Verifica que `VITE_API_URL` esté configurada correctamente
- Asegúrate de hacer redeploy después de agregar variables

### Error: "404 en rutas"
- Verifica que `vercel.json` tenga la configuración de rewrites
- Ya está incluido en el proyecto ✅

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel para Vite](https://vercel.com/docs/frameworks/vite)

## 🎉 ¡Listo!

Tu frontend estará desplegado y accesible desde cualquier lugar del mundo.

