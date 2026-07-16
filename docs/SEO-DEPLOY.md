# SEO post-deploy — felipegutierrez.dev

Checklist para indexación y monitoreo orgánico en Uruguay / LATAM después del deploy en producción.

## 1. Variables de entorno

Configurar en Vercel/Render:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (opcional) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Token de verificación de Google Search Console |

## 2. Google Search Console

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad: `https://felipegutierrez.dev`
3. Verificar dominio (DNS TXT) o usar meta tag vía `NEXT_PUBLIC_GSC_VERIFICATION`
4. Enviar sitemap: `https://felipegutierrez.dev/sitemap.xml`
5. Inspeccionar URLs:
   - `https://felipegutierrez.dev/` (español — default)
   - `https://felipegutierrez.dev/en` (inglés)
6. Revisar **Internacionalización** → confirmar que `es` y `en` no tienen errores de hreflang

## 3. Google Analytics 4

1. Crear propiedad GA4 para `felipegutierrez.dev`
2. Copiar Measurement ID (`G-XXXXXXXX`) a `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Redeploy
4. Crear informe personalizado: tráfico orgánico por país (Uruguay, Argentina, México, Colombia, Chile)

## 4. Queries a monitorear (3–6 meses)

- `desarrollador full stack uruguay`
- `desarrollador web montevideo`
- `qa engineer uruguay`
- `felipe gutierrez desarrollador`
- `felipegutierrez.dev`
- `desarrollo saas uruguay`
- `react native uruguay`

## 5. Señales off-site

- Perfil de LinkedIn con link a `https://felipegutierrez.dev`
- GitHub README con link al portfolio
- Google Business Profile (si aplica freelance local en Montevideo)
- Backlinks desde proyectos del portfolio (con permiso del cliente)

## 6. Mantenimiento mensual

- Revisar cobertura e impresiones en GSC
- Actualizar `lastModified` del sitemap si hay cambios relevantes de contenido
- Verificar Core Web Vitals en PageSpeed Insights (mobile + desktop)
- Ajustar copy en `messages/es.json` según queries reales que aparezcan en GSC
