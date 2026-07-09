# Guía para agregar nuevos clientes

Este documento explica cómo agregar nuevos clientes a la sección de "Clientes" del sitio web.

## Estructura de archivos

- **`data/clients-data.ts`**: Contiene el array de clientes con toda la información
- **`components/clients.tsx`**: Componente visual que muestra los clientes
- **`public/clients/`**: Carpeta donde se almacenan los logos de los clientes

## Cómo agregar un nuevo cliente

### 1. Agregar el logo del cliente

Primero, coloca el logo del cliente en la carpeta `public/clients/`. El formato recomendado es **PNG** con fondo transparente.

**Ejemplo:**
```
public/clients/nombre-cliente.png
```

### 2. Agregar el cliente al array

Abre el archivo `data/clients-data.ts` y agrega un nuevo objeto al array `clientsData`:

```typescript
{
  id: 'identificador-unico',           // ID único en formato kebab-case
  name: 'Nombre del Cliente',          // Nombre completo del cliente
  logo: '/clients/nombre-logo.png',    // Ruta al logo (relativa a /public)
  website: 'https://ejemplo.com',      // (Opcional) URL del sitio web del cliente
  category: 'Categoría'                // (Opcional) Categoría o industria del cliente
}
```

### Ejemplo completo

```typescript
export const clientsData: Client[] = [
  {
    id: 'estudio-casa-brava',
    name: 'Estudio Casa Brava',
    logo: '/clients/estudiocasbrava.png',
    website: 'https://estudiocasabrava.com',
    category: 'Interior Design'
  },
  {
    id: 'mi-nuevo-cliente',
    name: 'Mi Nuevo Cliente',
    logo: '/clients/mi-nuevo-cliente.png',
    website: 'https://minuevocliente.com',
    category: 'E-commerce'
  },
  // Agrega más clientes aquí...
];
```

## Propiedades del objeto Cliente

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | string | ✅ Sí | Identificador único del cliente (kebab-case) |
| `name` | string | ✅ Sí | Nombre completo del cliente |
| `logo` | string | ✅ Sí | Ruta al archivo del logo |
| `website` | string | ❌ No | URL del sitio web del cliente |
| `category` | string | ❌ No | Categoría o industria del cliente |

## Recomendaciones

1. **Formato de logos**: Usar PNG con fondo transparente
2. **Tamaño de logos**: Recomendado entre 500px - 1000px de ancho
3. **Proporción**: Logos con proporción 3:2 o 16:9 funcionan mejor
4. **Nomenclatura**: Usar nombres descriptivos en kebab-case (ej: `estudio-casa-brava.png`)
5. **Optimización**: Comprimir las imágenes antes de subirlas para mejorar el rendimiento

## Vista previa

Los logos se mostrarán en:
- Un grid responsivo (2 columnas en móvil, 3 en tablet, 4 en desktop)
- Efecto grayscale que desaparece al hacer hover
- Overlay con información del cliente al pasar el mouse
- Numeración automática en la esquina superior derecha

---

**Última actualización:** Julio 2026
