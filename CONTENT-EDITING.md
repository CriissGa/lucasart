# Editar las fotos

Las fotos locales de `src/assets/collections` y `src/assets/images` están optimizadas como WebP, calidad 85 y hasta 2400 px por lado, conservando la proporción y la transparencia. Guarda los originales de alta resolución fuera del repositorio para impresión o futuras ediciones. Las imágenes de Sanity siguen servidas por su CDN con formato automático.

Reemplazar los archivos reduce el tamaño de la versión actual, pero no elimina los originales de los commits anteriores. Reducir también el historial de Git requiere una limpieza independiente del historial remoto.

El proyecto combinado está en `C:\Projects\lucasart`. El diseño proviene de lucasartAI y mantiene el proyecto Sanity `dlsh5m3v`, dataset `production`.

1. Abre el Studio (`cd studio-lucas-art-test` y `npm run dev`) e inicia sesión con una cuenta autorizada.
2. En **Imágenes del sitio**, cambia el fondo y la foto destacada del inicio, el retrato del inicio y el retrato de Sobre mí.
3. En **Collections**, cambia las portadas y fotos. Para crear una colección nueva, escribe el nombre y pulsa **Generate** en **Website URL**. Por ejemplo, Events and Nightlife → `events-and-nightlife`. Arrastra las fotos para ordenarlas. Cada colección debe tener una URL única.
4. En **BookHero**, selecciona exactamente diez fotos, en orden. Cada foto permite descripción, título y enlace a una colección. Esta selección alimenta el libro interactivo.
5. Ajusta el recorte y punto de enfoque y pulsa **Publish**.

Los campos sin contenido y las galerías vacías usan la selección local de respaldo. Si falla la consulta a Sanity, la compilación utiliza los datos locales. Si una imagen de la CDN falla en el navegador, se sustituye por una WebP local; en galerías se asigna por posición y se repite la selección local si es necesario. El libro utiliza su selección local independiente de las colecciones publicadas.

La web se despliega desde GitHub a Vercel con el adaptador oficial de Astro y renderizado en el servidor. Las páginas consultan el contenido publicado de Sanity al abrirse, compartiendo una sola consulta entre sus componentes. Publicar fotos o colecciones no requiere otro push, webhook ni recompilación. Recarga la página para ver los cambios; los borradores permanecen ocultos.

Los cambios de código sí requieren un push y un despliegue exitoso en Vercel. Usa el preset Astro y la salida del adaptador (`.vercel/output`); no fuerces `dist` como sitio estático. `npm run build` valida esa salida. Cloudflare no interviene en este flujo.

Publica también el Studio actualizado con `npm run deploy` desde su carpeta cuando vayas a usar el panel alojado. Los cambios locales de esquema no actualizan por sí solos un Studio ya desplegado.
