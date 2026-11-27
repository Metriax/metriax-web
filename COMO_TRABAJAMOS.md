# Cómo trabajamos los tres en metriiax sin pisarnos

## La idea en una frase

**GitHub es el sitio común.** Todo el código está en `github.com/Metriax/metriax-web`. Cada uno trabaja
con su propio Claude (da igual qué plan tenga), pero todos leen y escriben en ese mismo repositorio.
La web publicada (www.metriiax.com) es siempre lo que hay en la rama `main`.

## Cómo va un cambio, paso a paso

1. **Pides el cambio a tu Claude** (en claude.ai o en Claude Code), con este repositorio conectado.
2. Claude crea una **rama** solo para ese cambio, por ejemplo `samuel/arreglo-cocina`.
   Es una copia de trabajo: lo que hagas ahí no afecta a la web ni a los demás.
3. Claude lo prueba y abre un **pull request** («propuesta de cambio») en GitHub.
4. Vercel crea sola una **versión de prueba** con tu cambio y deja el enlace en el pull request.
   Ábrelo y mira que todo está bien.
5. Si está bien, Claude **fusiona** el pull request. En un minuto está publicado en www.metriiax.com.

Nadie puede subir nada directamente a la web: `main` está protegida y solo acepta pull requests.
Así, si dos personas trabajan a la vez, cada una va en su rama y GitHub avisa si los cambios chocan.

## Qué decirle a tu Claude

- Para empezar algo: «Trabaja en el repositorio Metriax/metriax-web. Lee CLAUDE.md y haz [lo que quieras]».
- Para publicarlo: «Abre el pull request» y, cuando hayas visto la versión de prueba, «fusiónalo».
- Para ver qué están haciendo los demás: «¿Qué pull requests hay abiertos?».

`CLAUDE.md` tiene todas las normas técnicas; cualquier Claude las sigue si se lo pedís.

## Normas entre nosotros

- **Avisad en el grupo** cuando empecéis algo grande, sobre todo si toca la app (`app/app.js`):
  es un solo archivo enorme y es donde más se choca.
- **Cambios pequeños y seguidos**, mejor que uno enorme después de una semana.
- Si GitHub dice que hay **conflictos**, no los resolváis a ciegas: que Claude os explique qué choca y,
  si es código de otro socio, habladlo.
- **Base de datos (Supabase):** los cambios los coordina Javier. Las versiones de prueba usan la base de datos
  real, así que probad con el restaurante de demo Nómada (`/app/?r=nomada`).
- **Nunca** pongáis contraseñas, claves ni datos de clientes en el repositorio: es público.

## Dos personas con la misma cuenta

Somos tres personas con dos cuentas de GitHub (y de Claude): dos hermanos comparten una. Funciona igual,
porque lo que separa el trabajo son las **ramas**, no las cuentas. Solo hay que cuidar tres cosas:

- **Poned vuestro nombre en la rama**, no el de la cuenta: `javier/...`, `hermano/...`, `samuel/...`.
  Así se ve en GitHub quién está haciendo qué aunque la cuenta sea la misma.
- **No trabajéis los dos en la misma rama a la vez.** Cada uno su tarea y su pull request.
- **Verificación en dos pasos compartida:** guardad los códigos de recuperación en un sitio que veáis los dos,
  o registrad una llave de acceso (passkey) en el móvil de cada uno, para que ninguno dependa del otro para entrar.

## Primera vez (cada socio)

1. Crea tu cuenta en github.com (si no la tienes), acepta la invitación a la organización **Metriax**
   que te llega al correo y **activa la verificación en dos pasos** (GitHub la exige).
2. En tu Claude, conecta GitHub (en claude.ai: Configuración › Conectores › GitHub) y da acceso a la organización Metriax.
3. Pídele a Claude: «Lee CLAUDE.md del repositorio Metriax/metriax-web y resúmeme cómo trabajamos».
