# ⚡ Despliegue Rápido en Vercel (5 minutos)

## 🎯 Pasos Rápidos

### 1. Sube tu código a GitHub (2 min)

```bash
cd frontend
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ape3-parte7-frontend.git
git push -u origin main
```

### 2. Conecta con Vercel (2 min)

1. Ve a [vercel.com](https://vercel.com) y regístrate (usa GitHub)
2. Click en "Add New..." → "Project"
3. Selecciona tu repositorio `ape3-parte7-frontend`
4. En "Environment Variables", agrega:
   - **Name:** `VITE_API_URL`
   - **Value:** `http://localhost:8000` (o la URL de tu backend)
5. Click en "Deploy"

### 3. ¡Listo! (1 min)

Espera 1-2 minutos y tendrás tu frontend desplegado.

## 🔗 Tu URL será algo como:

```
https://ape3-parte7-frontend.vercel.app
```

## ⚠️ Importante

Después de desplegar tu backend, actualiza `VITE_API_URL` en Vercel:
1. Settings → Environment Variables
2. Edita `VITE_API_URL`
3. Cambia a la URL de tu backend en producción
4. Redeploy

## 📝 Notas

- ✅ Cada `git push` despliega automáticamente
- ✅ Vercel es completamente gratis para proyectos personales
- ✅ SSL/HTTPS incluido automáticamente
- ✅ CDN global incluido

