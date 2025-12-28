# 🔐 Guía de Configuración: Autenticación con Supabase

Esta guía te ayudará a configurar la autenticación con Supabase en tu aplicación N-Anime-App.

## 📋 Requisitos Previos

1. **Cuenta de Supabase**: Crea una cuenta gratuita en [supabase.com](https://supabase.com)
2. **Proyecto de Supabase**: Crea un nuevo proyecto en el dashboard de Supabase

---

## 🚀 Paso 1: Configurar Variables de Entorno

1. Ve a tu proyecto de Supabase
2. Navega a **Settings** > **API**
3. Copia las siguientes credenciales:
   - `Project URL`
   - `anon public` key

4. Abre el archivo `.env.local` en la raíz del proyecto
5. Reemplaza los valores con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **Importante**: Nunca compartas estas claves públicamente ni las subas a Git (ya están en `.gitignore`)

---

## 🗄️ Paso 2: Configurar la Base de Datos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Haz clic en **New query**
3. Abre el archivo `supabase-setup.sql` de este proyecto
4. Copia y pega todo el contenido en el editor SQL
5. Haz clic en **Run** para ejecutar el script

Esto creará:
- ✅ Tabla `user_profiles` (perfiles de usuario)
- ✅ Tabla `user_favorites` (favoritos)
- ✅ Tabla `watch_progress` (progreso de episodios)
- ✅ Políticas de seguridad (Row Level Security)
- ✅ Trigger para auto-crear perfiles

---

## 🔑 Paso 3: Configurar OAuth (Opcional pero Recomendado)

### Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Google+ API**
4. Ve a **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
5. Configura las URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:3000`, `https://tu-dominio.com`
   - **Authorized redirect URIs**: `https://n-anime-app.vercel.app/auth/v1/callback`
6. Copia el **Client ID** y **Client Secret**

7. En Supabase:
   - Ve a **Authentication** > **Providers**
   - Habilita **Google**
   - Pega el Client ID y Client Secret
   - Guarda los cambios

### GitHub OAuth

1. Ve a [GitHub Settings](https://github.com/settings/developers)
2. Haz clic en **New OAuth App**
3. Configura:
   - **Application name**: N-Anime-App
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://tu-proyecto.supabase.co/auth/v1/callback`
4. Copia el **Client ID** y genera un **Client Secret**

5. En Supabase:
   - Ve a **Authentication** > **Providers**
   - Habilita **GitHub**
   - Pega el Client ID y Client Secret
   - Guarda los cambios

---

## 🌐 Paso 4: Configurar URLs de Redirección

1. En Supabase, ve a **Authentication** > **URL Configuration**
2. Configura:
   - **Site URL**: `http://localhost:3000` (desarrollo)
   - **Redirect URLs**: Agrega las siguientes:
     - `http://localhost:3000/auth/callback`
     - `https://tu-dominio.com/auth/callback` (producción)

---

## ✅ Paso 5: Verificar la Instalación

1. Inicia el servidor de desarrollo:
```bash
bun dev
```

2. Abre tu navegador en `http://localhost:3000`

3. Verifica que aparezca el botón "Iniciar sesión" en el header

4. Prueba las siguientes funcionalidades:
   - ✅ Registro con email/password
   - ✅ Login con email/password
   - ✅ Login con Google (si configuraste OAuth)
   - ✅ Login con GitHub (si configuraste OAuth)
   - ✅ Ver perfil de usuario
   - ✅ Agregar anime a favoritos
   - ✅ Ver página de favoritos
   - ✅ Cerrar sesión

---

## 🎨 Funcionalidades Implementadas

### Autenticación
- ✅ Registro con email/password
- ✅ Login con email/password
- ✅ OAuth con Google
- ✅ OAuth con GitHub
- ✅ Cierre de sesión
- ✅ Persistencia de sesión
- ✅ Middleware para rutas protegidas

### Páginas de Usuario
- ✅ `/perfil` - Perfil del usuario
- ✅ `/favoritos` - Lista de animes favoritos
- ✅ `/mi-lista` - Continuar viendo (episodios en progreso)

### Componentes
- ✅ UserMenu en el header
- ✅ LoginForm y RegisterForm
- ✅ FavoriteButton en páginas de anime
- ✅ OAuth buttons (Google y GitHub)

### Rutas Protegidas
Las siguientes rutas requieren autenticación:
- `/perfil`
- `/favoritos`
- `/mi-lista`

Los usuarios no autenticados serán redirigidos a `/login` con un parámetro `redirect` para volver después de autenticarse.

---

## 🔒 Seguridad

La implementación incluye:
- ✅ **Row Level Security (RLS)**: Los usuarios solo pueden ver/modificar sus propios datos
- ✅ **Server Components**: Las verificaciones de autenticación se hacen en el servidor
- ✅ **Server Actions**: Todas las mutaciones requieren autenticación
- ✅ **Cookies HTTP-only**: Las sesiones se almacenan de forma segura
- ✅ **Middleware**: Protege rutas automáticamente

---

## 🚢 Despliegue a Producción

### Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega:
```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

### Actualizar URLs de OAuth

1. En Google Cloud Console y GitHub OAuth Apps:
   - Agrega tu dominio de producción a las URLs autorizadas
   - `https://tu-dominio.vercel.app`

2. En Supabase Authentication > URL Configuration:
   - Actualiza Site URL: `https://tu-dominio.vercel.app`
   - Agrega Redirect URL: `https://tu-dominio.vercel.app/auth/callback`

---

## 🐛 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Confirma tu email si Supabase requiere verificación

### Error: "OAuth callback error"
- Verifica que las URLs de callback estén configuradas correctamente
- Asegúrate de que el Client ID y Secret sean correctos

### Error: "User not found" en rutas protegidas
- Verifica que las variables de entorno estén configuradas
- Comprueba que el middleware esté funcionando (debe estar en la raíz del proyecto)

### Las sesiones no persisten
- Verifica que las cookies estén habilitadas en el navegador
- Comprueba que el dominio sea correcto en producción

---

## 📚 Próximos Pasos (Funcionalidades Futuras)

Puedes extender la funcionalidad actual con:
- 📊 Analytics de visualización (trackear animes más vistos)
- 🔔 Notificaciones cuando salgan nuevos episodios
- 👥 Sistema de amigos y listas compartidas
- ⭐ Sistema de calificaciones y reviews
- 🎯 Recomendaciones personalizadas basadas en favoritos
- 📱 Sincronización entre dispositivos
- 🌙 Preferencias de usuario (tema oscuro/claro)

---

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa los logs en el navegador (Console)
2. Revisa los logs de Supabase (Dashboard > Logs)
3. Verifica que todas las tablas se hayan creado correctamente
4. Asegúrate de que RLS esté habilitado en todas las tablas

---

¡Listo! 🎉 Ahora tienes autenticación completa con Supabase en tu aplicación de anime.
