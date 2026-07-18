# ENVIA2 — La Misión V4.3 Automática

Esta versión deja automatizada toda la campaña:

- Las misiones se desbloquean automáticamente cada día a las 12:00 AM, hora de Nueva York.
- El progreso, puntos y misiones completadas se guardan automáticamente en el navegador.
- Aparece confirmación al completar cada misión.
- Al completar las siete misiones aparece “¡Estás listo para ser ENVIA2!”.
- La página muestra automáticamente cuándo se abre la próxima misión.
- El 31 de julio de 2026 a las 8:00 PM cambia automáticamente al modo estreno.
- El contador desaparece y aparece “Estreno disponible ahora”.
- Los botones del tráiler cambian automáticamente a “Ver video oficial”.
- El registro y las redes de ACTIVA permanecen activos.

IMPORTANTE:
El enlace del videoclip oficial todavía está vacío en `app/page.js`:

const VIDEO_URL = "";

Cuando tengas el enlace oficial de YouTube, colócalo entre las comillas. Todo lo demás ya funcionará automáticamente.

## Publicar
1. Descomprime el ZIP.
2. En GitHub usa `Add file → Upload files`.
3. Reemplaza los archivos existentes.
4. Commit recomendado: `Automatizar campaña completa de ENVIA2`
5. Vercel desplegará automáticamente.
