# Guía para agregar imágenes de proyectos al Portfolio

Este documento explica cómo agregar las capturas de pantalla de los proyectos que se mostrarán en la sección de Portfolio.

## Ubicación de las imágenes

Las imágenes de los proyectos deben colocarse en:
```
public/projects/
```

## Formato de nombre de archivo

El nombre del archivo debe coincidir exactamente con el **ID del proyecto** definido en los archivos de traducciones (`messages/es.json` y `messages/en.json`).

**Formato:** `{project-id}.jpg`

### Proyectos actuales y nombres de archivos requeridos:

| Proyecto | ID en código | Nombre de archivo requerido |
|----------|--------------|---------------------------|
| Cebala E-Commerce | `cebala` | `cebala.jpg` |
| DracoStore E-Commerce | `dracostore` | `dracostore.jpg` |
| Estudio Casa Brava | `casa-brava-studio` | `casa-brava-studio.jpg` |
| Casa Brava E-Commerce | `casa-brava-ecommerce` | `casa-brava-ecommerce.jpg` |
| Schweizer Psychology | `schweizer` | `schweizer.jpg` |
| SUEN Uruguay | `suen` | `suen.jpg` |

## Especificaciones de imagen

Para obtener los mejores resultados:

### 1. Formato
- **Formato recomendado:** JPG (mejor compresión para fotos)
- También soportado: PNG, WebP

### 2. Dimensiones
- **Ancho mínimo:** 1920px
- **Proporción de aspecto:** 
  - `21:9` para layout "large-title" (ultra-wide)
  - `4:5` para layout "split-vertical" (vertical)
  - `16:9` para layouts "compact" y "magazine-spread" (estándar)
- El sistema se adapta automáticamente, pero estas proporciones lucen mejor

### 3. Tamaño de archivo
- **Máximo recomendado:** 500KB por imagen
- Usa herramientas de compresión como:
  - [TinyPNG](https://tinypng.com/)
  - [ImageOptim](https://imageoptim.com/)
  - [Squoosh](https://squoosh.app/)

### 4. Calidad
- Capturas de pantalla de alta calidad del sitio web completo
- Preferiblemente de la página de inicio o sección principal
- Asegúrate de que el contenido sea legible

## Cómo tomar capturas de pantalla de calidad

### Opción 1: Herramientas de navegador
1. **Full Page Screen Capture** (Chrome Extension)
2. **Awesome Screenshot** (Chrome/Firefox)
3. **GoFullPage** (Chrome Extension)

### Opción 2: Herramientas de desarrollo
1. Abre DevTools (F12)
2. Ctrl/Cmd + Shift + P
3. Escribe "Capture full size screenshot"
4. Guarda la imagen

### Opción 3: Servicios online
- [Screely](https://screely.com/) - Agrega mockup de navegador
- [Browserframe](https://browserframe.com/) - Frame de navegador
- [Screenshot.rocks](https://screenshot.rocks/) - Múltiples estilos

## Proceso de implementación

### 1. Preparar la imagen
```bash
# 1. Toma la captura de pantalla del proyecto
# 2. Redimensiona a 1920px de ancho (mantén proporción)
# 3. Comprime la imagen a <500KB
# 4. Renombra según el ID del proyecto
```

### 2. Colocar en la carpeta correcta
```bash
# Copia la imagen a la carpeta public/projects/
cp tu-imagen.jpg public/projects/{project-id}.jpg

# Ejemplo para Estudio Casa Brava:
cp screenshot-casa-brava.jpg public/projects/casa-brava-studio.jpg
```

### 3. Verificar el resultado
El componente automáticamente detectará la imagen y la mostrará con:
- Efecto de hover (zoom suave)
- Overlay oscuro al pasar el mouse
- Lazy loading para mejor rendimiento
- Fallback automático si la imagen no existe

## Comportamiento del sistema

### Si la imagen existe:
✅ Se muestra la imagen real con todos los efectos visuales

### Si la imagen NO existe:
⚠️ Se muestra un placeholder elegante con:
- Número del proyecto
- Mensaje "Imagen del proyecto no disponible"
- Nombre del proyecto

## Agregar un nuevo proyecto

Si agregas un nuevo proyecto:

1. **Agrega el proyecto a los archivos de traducciones** (`messages/es.json` y `messages/en.json`):
```json
{
  "id": "nuevo-proyecto",
  "title": "Título del Proyecto",
  "year": "2026",
  "category": "landing",
  "stack": "Next.js, TypeScript, etc.",
  "description": "Descripción del proyecto..."
}
```

2. **Agrega la imagen del proyecto**:
```bash
public/projects/nuevo-proyecto.jpg
```

¡Y listo! El sistema automáticamente mostrará el nuevo proyecto con su imagen.

## Troubleshooting

### La imagen no se muestra
- ✅ Verifica que el nombre del archivo coincida EXACTAMENTE con el ID del proyecto
- ✅ Verifica que la extensión sea `.jpg` (minúsculas)
- ✅ Verifica que la imagen esté en `public/projects/`
- ✅ Limpia la caché del navegador (Ctrl+Shift+R / Cmd+Shift+R)

### La imagen se ve borrosa
- ✅ Usa imágenes de al menos 1920px de ancho
- ✅ No uses imágenes muy comprimidas (<80% calidad)

### La imagen tarda en cargar
- ✅ Comprime la imagen a <500KB
- ✅ Usa formato JPG en lugar de PNG para fotos

---

**Última actualización:** Julio 2026
