# Pruebas automáticas de la app (modo demo)

Funcionan contra la app en **modo demo** (datos en el navegador, sin tocar Supabase).

1. Sirve la carpeta de la web: `python3 -m http.server 8765`
2. Instala Playwright y Chrome.
3. Ejecuta:
   - `python3 pruebas/escenario_servicio.py` → servicio completo: pedir desde la mesa, aceptar, cocina, listo, servido, llamar al camarero, pedir la cuenta, cobrar, para llevar, reserva y su confirmación, fichar. Debe salir todo «OK» y «ERRORES JS: []».
   - `LIM=500 python3 pruebas/mono_todas_las_pantallas.py` → abre cada pantalla y cada pestaña del panel, del panel maestro y del camarero y pulsa todos los botones, casillas y desplegables. Debe salir «0 errores».
