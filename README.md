# ENVIA2 — La Misión

Plataforma oficial de ENVIA2 para Congreso Activa.

## Estreno configurado

- Fecha: 31 de agosto de 2026
- Hora: 8:00 PM
- Zona horaria: Nueva York / Nueva Jersey (`-04:00` durante agosto)

## Cómo subirlo a GitHub

1. Descomprime este proyecto.
2. En el repositorio `enviados-la-mision`, selecciona **Add file → Upload files**.
3. Arrastra todos los archivos y carpetas del proyecto, no la carpeta contenedora.
4. Confirma con **Commit changes**.
5. Regresa a Vercel e importa el repositorio.
6. Vercel detectará automáticamente **Next.js**.
7. Presiona **Deploy**.

## Agregar el video

Cuando tengas el enlace oficial, abre:

`app/page.js`

Busca:

```js
const VIDEO_URL = "";
```

Y reemplázalo por:

```js
const VIDEO_URL = "https://youtu.be/TU_VIDEO";
```

## Uso local

```bash
npm install
npm run dev
```
