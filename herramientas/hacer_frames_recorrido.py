# Convierte el vídeo en paquetes de fotogramas WebP para el recorrido con scroll de la portada.
# Uso: python3 hacer_frames.py video.mp4 carpeta_salida
import subprocess, sys, json, pathlib, shutil, tempfile
src, out = sys.argv[1], pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
VARIANTES = {"d": dict(w=1280, fps=24, q=82), "m": dict(w=854, fps=12, q=78)}
POR_PAQUETE = 24
indice = {"v": 1, "ratio": 16/9, "variantes": {}}
for k, o in VARIANTES.items():
    tmp = pathlib.Path(tempfile.mkdtemp())
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", f"fps={o['fps']},scale={o['w']}:-2:flags=lanczos",
                    "-c:v", "libwebp", "-quality", str(o["q"]), "-compression_level", "6", str(tmp / "%04d.webp")], check=True)
    frames = sorted(tmp.glob("*.webp")); paquetes = []
    for i in range(0, len(frames), POR_PAQUETE):
        grupo = frames[i:i+POR_PAQUETE]; nombre = f"{k}{i//POR_PAQUETE:02d}.bin"; tamanos = []
        with open(out / nombre, "wb") as f:
            for fr in grupo:
                b = fr.read_bytes(); f.write(b); tamanos.append(len(b))
        paquetes.append({"f": nombre, "t": tamanos})
    indice["variantes"][k] = {"w": o["w"], "fps": o["fps"], "n": len(frames), "paquetes": paquetes}
    if k == "d": shutil.copy(frames[0], out / "portada.webp")
    shutil.rmtree(tmp)
(out / "indice.json").write_text(json.dumps(indice, separators=(",", ":")))
for k, v in indice["variantes"].items():
    print(k, v["n"], "fotogramas,", len(v["paquetes"]), "paquetes,", round(sum(sum(p["t"]) for p in v["paquetes"])/1e6, 1), "MB")
