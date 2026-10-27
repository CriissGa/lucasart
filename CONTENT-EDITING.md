# Editar las fotos

El proyecto combinado está en `C:\Projects\lucasart`. El diseño proviene de lucasartAI y mantiene el proyecto Sanity `dlsh5m3v`, dataset `production`.

1. Abre el Studio (`cd studio-lucas-art-test` y `npm run dev`) e inicia sesión con una cuenta autorizada.
2. En **Imágenes del sitio**, cambia el fondo y la foto destacada del inicio, el retrato del inicio y el retrato de Sobre mí.
3. En **Collection**, cambia la portada y las fotos de Concerts, Portraits o Street. Arrastra las fotos para ordenarlas. Mantén una colección publicada por categoría.
4. En **BookHero**, selecciona exactamente diez fotos, en orden. Cada foto permite descripción, título y enlace a una colección. Esta selección alimenta el libro interactivo.
5. Ajusta el recorte y punto de enfoque y pulsa **Publish**.

Los campos todavía sin contenido conservan las imágenes de respaldo del diseño. Una colección publicada con una galería vacía queda vacía, para permitir retirar fotos.

El sitio se genera de forma estática: publicar en Sanity requiere una nueva compilación y despliegue del sitio para reflejar cambios en producción. Ejecuta `npm run build` para generar `dist`. En el proveedor de alojamiento, configura un webhook de Sanity para activar ese despliegue al publicar. Aún no se ha configurado un proveedor ni un webhook desde este repositorio.

Publica también el Studio actualizado con `npm run deploy` desde su carpeta cuando vayas a usar el panel alojado. Los cambios locales de esquema no actualizan por sí solos un Studio ya desplegado.
