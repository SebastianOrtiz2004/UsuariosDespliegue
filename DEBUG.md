# 🐛 Guía de Debugging

## Problema: Spinner de carga infinito

Si ves que la aplicación se queda cargando indefinidamente, sigue estos pasos:

### 1. Verificar que el Backend esté corriendo

Abre una terminal y ejecuta:
```bash
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor ejecutándose en http://localhost:8000
✅ Conexión a PostgreSQL: OK
```

### 2. Verificar la URL de la API

Abre `frontend/.env` y verifica:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Abrir la Consola del Navegador

1. Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Ve a la pestaña **Console**
3. Busca errores en rojo

Errores comunes:
- `Network Error` → Backend no está corriendo
- `CORS policy` → Problema de CORS
- `401 Unauthorized` → Token inválido o expirado
- `404 Not Found` → URL incorrecta

### 4. Verificar la Pestaña Network

1. En las herramientas de desarrollador, ve a **Network**
2. Recarga la página
3. Busca la petición a `/api/users`
4. Verifica:
   - **Status**: Debe ser `200` (no `404`, `401`, `500`)
   - **Headers**: Debe incluir `Authorization: Bearer <token>`
   - **Response**: Debe mostrar los datos o un error

### 5. Verificar el Token JWT

En la consola del navegador, ejecuta:
```javascript
localStorage.getItem('token')
```

Debería mostrar un token. Si es `null`, necesitas iniciar sesión de nuevo.

### 6. Probar el Endpoint Directamente

Abre una nueva pestaña y ve a:
```
http://localhost:8000/health
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "API funcionando correctamente",
  "database": "connected"
}
```

### 7. Verificar CORS

En `backend/.env`, verifica:
```env
FRONTEND_URL=http://localhost:3000
```

Debe coincidir con la URL donde corre el frontend.

## Soluciones Comunes

### Error: "Network Error"
**Solución**: El backend no está corriendo. Inícialo con `npm run dev` en la carpeta backend.

### Error: "CORS policy"
**Solución**: Verifica que `FRONTEND_URL` en backend coincida con la URL del frontend.

### Error: "401 Unauthorized"
**Solución**: 
1. Cierra sesión y vuelve a iniciar sesión
2. Verifica que el token se esté guardando en localStorage

### Error: "404 Not Found"
**Solución**: Verifica que la URL en `VITE_API_URL` sea correcta y que el backend esté en ese puerto.

### Spinner infinito sin errores
**Solución**: 
1. Abre la consola del navegador
2. Verifica la pestaña Network
3. Busca la petición a `/api/users` y revisa su estado

## Comandos Útiles

```bash
# Verificar que el backend esté corriendo
curl http://localhost:8000/health

# Ver logs del backend
# (en la terminal donde corre npm run dev)
```

