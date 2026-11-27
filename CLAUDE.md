# metriiax · instrucciones para Claude (y para cualquier persona del equipo)

Este repositorio es la web pública **www.metriiax.com** y la app (`/app`, `/acceso`).
Somos tres socios y cada uno trabaja con su propio Claude. Este archivo es la memoria compartida:
**léelo entero antes de tocar nada.** La guía para personas está en `COMO_TRABAJAMOS.md`.

## Regla número uno: nunca se trabaja directamente en `main`

`main` es lo que está publicado. Cada push a `main` se publica solo en www.metriiax.com (en ~1 minuto).
`main` está protegida: no admite pushes directos, solo **pull requests** (fusión «squash»).

Flujo obligatorio para cualquier cambio:

1. `git checkout main && git pull` (partir SIEMPRE de lo último publicado).
2. Crear una rama por tarea: `nombre/tarea-corta` (p. ej. `javier/boton-reservas`, `samuel/arreglo-cocina`).
3. Hacer el cambio, probarlo (ver «Antes de proponer») y hacer commit con mensaje en español.
4. `git push -u origin <rama>` y abrir un pull request contra `main` con `gh pr create`, explicando qué cambia.
5. Vercel crea una **versión de prueba** de la rama (enlace en el pull request). Revisarla.
6. Antes de fusionar: `git fetch origin && git rebase origin/main` (traer lo que hayan publicado los demás) y volver a probar.
7. Fusionar con `gh pr merge --squash --delete-branch`. Eso publica en www.metriiax.com.

Si el usuario pide «súbelo» o «publícalo», es este flujo completo; nunca `git push origin main`.

En sesiones de Claude en la nube donde `gh pr create` / `gh pr merge` fallen (sin GraphQL), usa la API REST:
`gh api repos/Metriax/metriax-web/pulls -f title=... -f head=<rama> -f base=main -f body=...` para abrirlo y
`gh api -X PUT repos/Metriax/metriax-web/pulls/<n>/merge -f merge_method=squash` para fusionarlo (y después borra la rama).

## Para no pisarse

- **Una tarea = una rama = un pull request**, pequeño. Mejor tres pull requests de 20 líneas que uno de 600.
- `app/app.js` es un único archivo de ~3.400 líneas: es donde más choques habrá. Antes de empezar en él,
  mirar los pull requests abiertos (`gh pr list`) por si otra persona está tocando la misma zona.
- **Versión de la app:** `app/index.html` carga `app.js?v=N`. Súbela en cada cambio de `app.js`.
  Si al hacer rebase hay conflicto en ese número, quédate con el mayor + 1.
- Si un rebase da conflictos que no entiendes, **para y pregunta** al usuario; no descartes cambios de otra persona.
- No reescribas ni borres código de otra persona salvo que la tarea lo pida.

## Antes de proponer un cambio

- Pruebas (desde la raíz, con un servidor local en el puerto 8765: `python3 -m http.server 8765`):
  - `python3 pruebas/escenario_servicio.py` → todas OK.
  - `python3 pruebas/mono_todas_las_pantallas.py` → 0 errores.
  - Detalles en `pruebas/LEEME.md`.
- Si cambias cualquier `<script>` de `index.html`: `python3 herramientas/csp_portada.py` (actualiza la CSP de `vercel.json`).
- Para cambiar el vídeo del recorrido: `python3 herramientas/hacer_frames_recorrido.py nuevo.mp4 video/recorrido`.

## Cuidado con las versiones de prueba de Vercel

Las versiones de prueba (`*.vercel.app`) usan la **base de datos real** de Supabase. Prueba con el restaurante
de demostración (`/app/?r=nomada`), nunca crees ni borres datos de clientes. Los pagos (Stripe) solo funcionan
desde www.metriiax.com.

## Lo que NUNCA va en este repositorio (es público)

Contraseñas, `.env`, claves `service_role`, `whsec_`, tokens, el esquema de la base de datos, migraciones SQL
ni datos de clientes. La base de datos y las funciones de Supabase se gestionan aparte; los cambios de base
de datos se hacen solo con prueba en seco (migración + pruebas + `raise exception`) y con el visto bueno de Javier.

## Lo que no se toca

- El proyecto de Vercel llamado `metriax` (es otra tienda, no tiene nada que ver).
- `tres-hermanos-demo.vercel.app` (demo antigua a la que apuntan tarjetas NFC reales).
- FisioCare (otro proyecto).
- Los registros DNS de correo de IONOS.

## Datos útiles

- Marca: **metriiax** (con dos i). Nombres internos antiguos con una i (`metriax-web`, `@metriax.app`) no se cambian.
- Hosting: Vercel, proyecto `metriax-web`. Base de datos: Supabase, proyecto `nchhioxmgrdngrzkxzza`.
- Contacto y super-admin de la app: hola@metriiax.com.
