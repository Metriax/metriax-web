#!/usr/bin/env python3
"""Recalcula la política de seguridad (CSP) de la portada.

Cada script escrito dentro de index.html se autoriza por su huella (sha256).
Si cambias cualquier <script> de index.html, ejecuta:  python3 herramientas/csp_portada.py
y sube también vercel.json. Si no, el navegador bloqueará ese script.
"""
import base64, hashlib, json, re, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
html = (raiz / "index.html").read_text(encoding="utf-8")
huellas = []
for m in re.finditer(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", html, re.S):
    h = base64.b64encode(hashlib.sha256(m.group(1).encode("utf-8")).digest()).decode()
    huellas.append(f"'sha256-{h}'")
SUPA = "https://nchhioxmgrdngrzkxzza.supabase.co"
csp = "; ".join([
    "default-src 'self'",
    "script-src 'self' " + " ".join(huellas),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    f"connect-src 'self' {SUPA}",
    "worker-src 'self' blob:",
    "media-src 'self' blob: data:",
    "object-src 'none'", "base-uri 'self'", "form-action 'self'",
    "frame-ancestors 'none'", "upgrade-insecure-requests",
])
comunes = [
    {"key": "X-Content-Type-Options", "value": "nosniff"},
    {"key": "X-Frame-Options", "value": "DENY"},
    {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
    {"key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), usb=()"},
]
vj = raiz / "vercel.json"
conf = json.loads(vj.read_text(encoding="utf-8"))
reglas = [r for r in conf.get("headers", []) if r["source"] not in ("/", "/privacidad/(.*)", "/tarjeta-3d/(.*)")]
reglas += [
    {"source": "/", "headers": [{"key": "Content-Security-Policy", "value": csp}] + comunes},
    {"source": "/privacidad/(.*)", "headers": [{"key": "Content-Security-Policy", "value": "default-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"}] + comunes},
    {"source": "/tarjeta-3d/(.*)", "headers": comunes},
]
conf["headers"] = reglas
vj.write_text(json.dumps(conf, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"CSP de la portada actualizada con {len(huellas)} scripts.")
