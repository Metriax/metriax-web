// Tarjeta NFC en 3D que gira sola en la portada (Three.js). Logos de prueba dibujados aquí mismo.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const caja = document.querySelector(".nfc3d"); if (caja) iniciar();

async function iniciar() {
  const cv = caja.querySelector("canvas");
  let r; try { r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" }); } catch (e) { caja.remove(); return; }
  try { await document.fonts.load('850 120px "Archivo"'); } catch (e) {}
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 0.92;
  const escena = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(r); escena.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; escena.environmentIntensity = 0.6;
  const cam = new THREE.PerspectiveCamera(28, 1, 1, 1000); cam.position.set(0, 0, 230);
  const luz = new THREE.DirectionalLight(0xffffff, 1.25); luz.position.set(-80, 120, 160); escena.add(luz);
  const luz2 = new THREE.DirectionalLight(0xffe8c8, 0.6); luz2.position.set(120, -40, 80); escena.add(luz2);
  const borde = new THREE.DirectionalLight(0xE7C27A, 1.4); borde.position.set(60, 40, -160); escena.add(borde);

  // Tarjeta ISO CR80: 85,6 × 54 mm, canto redondeado de 3,18 mm
  const W = 85.6, H = 54, G = 0.9, R = 3.18;
  const tarjeta = new THREE.Group(); escena.add(tarjeta);
  const canto = new THREE.MeshPhysicalMaterial({ color: 0xC9A04E, roughness: 0.28, metalness: 0.85, clearcoat: 0.6, clearcoatRoughness: 0.2 });
  tarjeta.add(new THREE.Mesh(new RoundedBoxGeometry(W, H, G, 6, R), canto));
  // caras: rectángulo redondeado con la textura
  const forma = new THREE.Shape(); const x = -W / 2, y = -H / 2;
  forma.moveTo(x + R, y); forma.lineTo(x + W - R, y); forma.quadraticCurveTo(x + W, y, x + W, y + R); forma.lineTo(x + W, y + H - R);
  forma.quadraticCurveTo(x + W, y + H, x + W - R, y + H); forma.lineTo(x + R, y + H); forma.quadraticCurveTo(x, y + H, x, y + H - R);
  forma.lineTo(x, y + R); forma.quadraticCurveTo(x, y, x + R, y);
  const geo = new THREE.ShapeGeometry(forma, 24), uv = geo.attributes.uv, pos = geo.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  const mat = () => new THREE.MeshPhysicalMaterial({ roughness: 0.55, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.18 });
  const frente = new THREE.Mesh(geo, mat()); frente.position.z = G / 2 + 0.02; tarjeta.add(frente);
  const dorso = new THREE.Mesh(geo, mat()); dorso.position.z = -G / 2 - 0.02; dorso.rotation.y = Math.PI; tarjeta.add(dorso);

  // Diseños de prueba: fondo, tinta y acento
  const DIS = [
    { fondo: "#EEF0ED", tinta: "#1C2124", acento: "#B98128", rojo: "#962B23", canto: 0xC9A04E },
    { fondo: "#962B23", tinta: "#FFFFFF", acento: "#E7B35A", rojo: "#561510", canto: 0xC9A04E },
    { fondo: "#2A3338", tinta: "#EEF0ED", acento: "#D9A956", rojo: "#962B23", canto: 0xC9A04E },
  ];
  const tex = (dib) => { const c = document.createElement("canvas"); c.width = 1712; c.height = 1080; dib(c.getContext("2d"), c.width, c.height);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = r.capabilities.getMaxAnisotropy(); return t; };
  // Logo A (delante): el símbolo de Metriax y el nombre
  function marca(g, cx, cy, s, d) {
    g.save(); g.translate(cx - s / 2, cy - s / 2); g.fillStyle = d.tinta; g.fillRect(0, 0, s, s);
    g.fillStyle = d.rojo; g.beginPath(); g.moveTo(0, 0); g.lineTo(s / 2, 0); g.arc(0, 0, s / 2, 0, Math.PI / 2); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(s, s); g.lineTo(s / 2, s); g.arc(s, s, s / 2, Math.PI, Math.PI * 1.5); g.closePath(); g.fill();
    g.fillStyle = d.acento; g.beginPath(); g.moveTo(s, 0); g.lineTo(s, s / 4); g.arc(s, 0, s / 4, Math.PI / 2, Math.PI); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(0, s); g.lineTo(0, s * .75); g.arc(0, s, s / 4, Math.PI * 1.5, 0); g.closePath(); g.fill(); g.restore();
  }
  const caraA = d => tex((g, w, h) => {
    g.fillStyle = d.fondo; g.fillRect(0, 0, w, h);
    const gr = g.createRadialGradient(w * .2, h * .1, 10, w * .2, h * .1, w); gr.addColorStop(0, "rgba(255,255,255,.10)"); gr.addColorStop(1, "rgba(0,0,0,.10)"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    marca(g, w / 2, h * .42, 300, d);
    g.fillStyle = d.tinta; g.textAlign = "center"; g.font = '850 150px "Archivo", sans-serif'; g.fillText("Metriax", w / 2, h * .78);
    g.globalAlpha = .55; g.font = '600 46px "Archivo", sans-serif'; g.fillText("EL SISTEMA DE SALA PARA TU BAR", w / 2, h * .9); g.globalAlpha = 1;
  });
  // Logo B (detrás): el símbolo de "toca aquí" con las ondas NFC
  const caraB = d => tex((g, w, h) => {
    g.fillStyle = d.fondo; g.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h * .42;
    g.strokeStyle = d.acento; g.lineCap = "round";
    [110, 190, 270].forEach((rr, i) => { g.lineWidth = 34 - i * 4; g.globalAlpha = 1 - i * .22; g.beginPath(); g.arc(cx - 120, cy, rr, -Math.PI / 4, Math.PI / 4); g.stroke(); });
    g.globalAlpha = 1; g.fillStyle = d.tinta; g.beginPath(); g.arc(cx - 120, cy, 46, 0, Math.PI * 2); g.fill();
    g.textAlign = "center"; g.fillStyle = d.tinta; g.font = '850 112px "Archivo", sans-serif'; g.fillText("Acerca tu móvil", w / 2, h * .78);
    g.globalAlpha = .6; g.font = '600 52px "Archivo", sans-serif'; g.fillText("y pide desde la mesa", w / 2, h * .88); g.globalAlpha = 1;
    marca(g, w - 130, h - 120, 90, d);
  });
  const texs = DIS.map(d => ({ a: caraA(d), b: caraB(d), canto: d.canto }));
  let n = 0; const poner = i => { frente.material.map = texs[i].a; dorso.material.map = texs[i].b; frente.material.needsUpdate = dorso.material.needsUpdate = true; canto.color.setHex(texs[i].canto); };
  poner(0);

  function medir() { const w = caja.clientWidth, h = caja.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h;
    const k = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    cam.position.z = Math.max((H * 1.42) / k, (W * 1.18) / (k * cam.aspect)); cam.updateProjectionMatrix(); }
  addEventListener("resize", medir); medir();

  const lento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ang = -0.5, visible = true, ultimo = performance.now(), vuelta = 0;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) { ultimo = performance.now(); requestAnimationFrame(bucle); } }).observe(caja);
  function bucle(t) {
    if (!visible) return;
    const dt = Math.min(0.05, (t - ultimo) / 1000); ultimo = t;
    ang += dt * (lento ? 0.25 : 0.9);
    // cambia de diseño cuando la tarjeta está de canto (no se nota)
    const v = Math.floor((ang + Math.PI / 2) / (2 * Math.PI)); if (v !== vuelta) { vuelta = v; n = (n + 1) % texs.length; poner(n); }
    tarjeta.rotation.y = ang;
    tarjeta.rotation.x = -0.18 + Math.sin(t / 1700) * 0.08;
    tarjeta.rotation.z = Math.sin(t / 2300) * 0.05;
    tarjeta.position.y = Math.sin(t / 1100) * 1.6;
    r.render(escena, cam); 
    requestAnimationFrame(bucle);
  }
  caja.classList.add("lista"); requestAnimationFrame(bucle);
}
