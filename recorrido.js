/* metriiax · Recorrido de un pedido: el vídeo avanza y retrocede con el scroll.
   Fotograma a fotograma (WebP) en un canvas, como las páginas de producto de Apple:
   va fino en cualquier navegador, también en iPhone, sin los saltos de mover un <video>.
   Los fotogramas llegan en paquetes (video/recorrido/*.bin, índice en indice.json);
   se descodifican al vuelo y solo se guardan unos pocos ya descodificados. */
(() => {
  'use strict';
  const sec = document.getElementById('como');
  if (!sec) return;
  const cv = sec.querySelector('canvas.rvx'), ctx = cv.getContext('2d', { alpha: false });
  const capa = sec.querySelector('.rv-carga'), barra = sec.querySelector('.rv-prog i');
  const BASE = '/video/recorrido/';
  const con = navigator.connection || {};
  const ligero = matchMedia('(max-width: 820px)').matches || con.saveData || /(^|-)2g$/.test(con.effectiveType || '');

  let N = 0, ratio = 16 / 9, blobs = [], cargados = 0;
  let objetivo = 0, actual = 0, mostrado = -1, enCurso = false, pendiente = -1, visible = false, raf = 0;
  const cache = new Map(), MAX_CACHE = 36;
  const soportaFiltro = 'filter' in ctx;

  // ---------- tamaño del lienzo (nitidez en pantallas retina) ----------
  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
    if (w && h && (cv.width !== w || cv.height !== h)) { cv.width = w; cv.height = h; const m = mostrado; mostrado = -1; if (m >= 0) pedir(m); }
  }

  // ---------- dibujar: en horizontal llena la pantalla; en vertical se ve entero sobre un fondo difuminado ----------
  function dibujar(img) {
    const W = cv.width, H = cv.height, iw = img.width, ih = img.height;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    if (W / H >= 1) {
      const s = Math.max(W / iw, H / ih), w = iw * s, h = ih * s;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      return;
    }
    const sc = Math.max(W / iw, H / ih), wc = iw * sc, hc = ih * sc;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    if (soportaFiltro) { ctx.filter = 'blur(28px) brightness(.45)'; ctx.drawImage(img, (W - wc) / 2, (H - hc) / 2, wc, hc); ctx.filter = 'none'; }
    else { ctx.globalAlpha = .32; ctx.drawImage(img, (W - wc) / 2, (H - hc) / 2, wc, hc); ctx.globalAlpha = 1; }
    // en vertical, un poco más grande que el ancho de la pantalla (recorta algo los lados) para que se vea bien
    const s = Math.min(W * 1.3 / iw, H / ih), w = iw * s, h = ih * s;
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  }

  // ---------- descodificar con caché pequeña ----------
  async function bitmap(i) {
    if (cache.has(i)) { const b = cache.get(i); cache.delete(i); cache.set(i, b); return b; }
    const blob = blobs[i];
    let b;
    if (window.createImageBitmap) b = await createImageBitmap(blob);
    else b = await new Promise((ok, ko) => { const im = new Image(), u = URL.createObjectURL(blob); im.onload = () => { URL.revokeObjectURL(u); ok(im); }; im.onerror = ko; im.src = u; });
    cache.set(i, b);
    while (cache.size > MAX_CACHE) { const k = cache.keys().next().value, v = cache.get(k); cache.delete(k); if (v && v.close) v.close(); }
    return b;
  }
  function cercano(i) {
    if (blobs[i]) return i;
    for (let d = 1; d < N; d++) { if (blobs[i - d]) return i - d; if (blobs[i + d]) return i + d; }
    return -1;
  }
  async function pedir(i) {
    const j = cercano(i);
    if (j < 0 || j === mostrado) return;
    if (enCurso) { pendiente = j; return; }
    enCurso = true;
    try {
      const b = await bitmap(j);
      dibujar(b); mostrado = j;
      if (capa && !capa.classList.contains('fuera')) capa.classList.add('fuera');
    } catch (_) { /* fotograma dañado: se salta */ }
    enCurso = false;
    if (pendiente >= 0 && pendiente !== mostrado) { const p = pendiente; pendiente = -1; pedir(p); } else pendiente = -1;
  }

  // ---------- scroll → fotograma (con un suavizado corto para que no tiemble) ----------
  function progreso() {
    const r = sec.getBoundingClientRect(), total = sec.offsetHeight - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }
  function bucle() {
    raf = 0;
    const p = progreso();
    if (barra) barra.style.transform = `scaleX(${p.toFixed(4)})`;
    objetivo = p * Math.max(0, N - 1);
    actual += (objetivo - actual) * 0.32;
    if (Math.abs(objetivo - actual) < 0.05) actual = objetivo;
    const i = Math.round(actual);
    if (N && i !== mostrado) pedir(i);
    if (visible && (Math.abs(objetivo - actual) > 0.01 || enCurso)) raf = requestAnimationFrame(bucle);
  }
  const mover = () => { if (!raf) raf = requestAnimationFrame(bucle); };

  // ---------- carga de los paquetes (primero el que toca, luego en orden) ----------
  async function cargar() {
    let idx;
    try { idx = await (await fetch(BASE + 'indice.json', { cache: 'force-cache' })).json(); } catch (_) { return; }
    const v = idx.variantes[ligero ? 'm' : 'd'] || idx.variantes.d;
    N = v.n; ratio = idx.ratio || ratio; blobs = new Array(N);
    const paq = v.paquetes.map((p, k) => ({ ...p, desde: v.paquetes.slice(0, k).reduce((s, q) => s + q.t.length, 0) }));
    const actualPaq = Math.min(paq.length - 1, Math.floor((progreso() * (N - 1)) / (paq[0].t.length || 1)));
    const orden = [paq[actualPaq], ...paq.filter((_, k) => k !== actualPaq)];
    let sig = 0;
    async function trabajador() {
      while (sig < orden.length) {
        const p = orden[sig++];
        for (let intento = 0; intento < 3; intento++) {
          try {
            const buf = await (await fetch(BASE + p.f, { cache: 'force-cache' })).arrayBuffer();
            let o = 0;
            p.t.forEach((t, k) => { blobs[p.desde + k] = new Blob([buf.slice(o, o + t)], { type: 'image/webp' }); o += t; });
            cargados += p.t.length;
            mostrado = -1; mover();
            break;
          } catch (_) { await new Promise(r => setTimeout(r, 800 * (intento + 1))); }
        }
      }
    }
    await Promise.all([trabajador(), trabajador(), trabajador()]);
  }

  // ---------- arranque: solo cuando la sección se acerca ----------
  let empezado = false;
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      visible = e.isIntersecting;
      if (visible) { if (!empezado) { empezado = true; medir(); cargar(); } mover(); }
    });
  }, { rootMargin: '150% 0px 150% 0px' });
  io.observe(sec);
  addEventListener('scroll', mover, { passive: true });
  addEventListener('resize', () => { medir(); mover(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { medir(); mover(); }).observe(cv);
})();
