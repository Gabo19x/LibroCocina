# 🍖 El Jardín Culinario

Aplicación web de recetas de cocina con sistema de autenticación, 
roles de usuario y gestión completa de contenido, como: ver recetas, crear sesion, guardar favoritos, sistema de busqueda.

🔗 **[Ver demo en vivo](https://mi-jardin-culinario.vercel.app/)**

---

## Funcionalidades

- Catálogo de recetas con imagen, ingredientes y pasos.
- Búsqueda directa y filtrado por etiquetas.
- Sección de receta más reciente en el home.
- Autenticación con email y contraseña, para crear sesion o usuario.
- Sistema de favoritos para usuarios registrados.
- Panel de administración para gestión de recetas *(solo admin)*.
- Diseño responsive (Mobile First).

## Roles

| Rol | Permisos |
|---|---|
| Visitante | Ver recetas y buscar |
| Usuario | Ver recetas + guardar favoritos |
| Admin | CRUD completo de recetas |

## Stack tecnológico

- **Frontend:** React + Vite + SCSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Vercel
- **Diseño:** Figma

## Correr localmente

1. Clona el repositorio
   git clone https://github.com/tu-usuario/jardin-culinario.git

2. Instala dependencias
   npm install

3. Crea un archivo .env.local con tus variables de Supabase
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_KEY=tu_anon_key

4. Corre el proyecto
   npm run dev

## Variables de entorno necesarias

| Variable | Descripción |
|---|---|
| VITE_SUPABASE_URL | URL del proyecto en Supabase |
| VITE_SUPABASE_KEY | Anon key de Supabase |

