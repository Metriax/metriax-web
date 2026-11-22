// Acceso único de Metriax: entra con Supabase y manda a cada persona a su pantalla.
// Usa la misma sesión que la app (storageKey "metriax-auth"), así que al llegar a /app ya está dentro.
(function(){
  const SUPA_URL = "https://nchhioxmgrdngrzkxzza.supabase.co";
  const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGhpb3htZ3Jkbmdyemt4enphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwOTgwMDEsImV4cCI6MjExMDY3NDAwMX0.e4X335EXPQ47LscEdBz01e6e-z8p00vF7r0_WndF9ek"; // clave pública (anon): las reglas de la base de datos protegen los datos
  const PANTALLA = { super:"admin", dueno:"panel", sala:"camarero", cocina:"cocina" };
  const NOMBRE = { super:"Panel de administración de Metriax", dueno:"Panel del restaurante", sala:"Pantalla de sala", cocina:"Pantalla de cocina" };
  const PARADO = { suspendido:"El servicio de este restaurante está suspendido. Escríbenos a hola@metriiax.com.", baja:"Este restaurante está dado de baja. Escríbenos a hola@metriiax.com." };
  const $ = id => document.getElementById(id);
  const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, { auth:{ persistSession:true, autoRefreshToken:true, storageKey:"metriax-auth" } });
  const ir = (slug, rol) => location.href = "/app/?r=" + encodeURIComponent(slug) + "#" + PANTALLA[rol];

  function error(t){ const e=$("error"); e.textContent=t||""; e.hidden=!t; }

  async function destinos(){
    const { data:{ user } } = await sb.auth.getUser();
    if(!user) return null;
    const { data:esSuper } = await sb.rpc("es_super");
    const { data:filas } = await sb.from("miembros").select("tenant, rol");
    const lista = [];
    if(esSuper){
      const { data:rs } = await sb.from("restaurantes").select("slug, nombre").order("creado");
      lista.push({ slug:(rs&&rs[0]&&rs[0].slug)||"demo", rol:"super", texto:NOMBRE.super });
    }
    for(const f of (filas||[])){
      const { data:ficha } = await sb.rpc("mi_ficha", { p_tenant:f.tenant });
      const estado = ficha && ficha.estado;
      lista.push({ slug:f.tenant, rol:f.rol, estado, texto:NOMBRE[f.rol]+" · "+f.tenant });
    }
    return { user, lista };
  }

  async function mostrarSesion(auto){
    const d = await destinos();
    if(!d){ $("sesion").hidden=true; $("f").hidden=false; return; }
    const usables = d.lista.filter(x => !PARADO[x.estado]);
    if(auto && usables.length===1 && d.lista.length===1) return ir(usables[0].slug, usables[0].rol);
    $("quien").textContent = d.user.email.endsWith("@metriax.app") ? d.user.email.split(".")[0] : d.user.email;
    const cont = $("destinos"); cont.textContent="";
    if(!d.lista.length){ const p=document.createElement("p"); p.className="error"; p.textContent="Tu cuenta no tiene ningún restaurante asignado. Pídeselo al dueño o a Metriax."; cont.append(p); }
    for(const x of d.lista){
      if(PARADO[x.estado]){ const p=document.createElement("p"); p.className="error"; p.textContent=x.slug+": "+PARADO[x.estado]; cont.append(p); continue; }
      const b=document.createElement("button"); b.type="button"; b.className="btn"; b.textContent=x.texto;
      b.addEventListener("click", () => ir(x.slug, x.rol)); cont.append(b);
    }
    $("f").hidden=true; $("sesion").hidden=false;
  }

  $("f").addEventListener("submit", async e => {
    e.preventDefault(); error("");
    const usuario=$("usuario").value.trim(), codigo=$("codigo").value.trim().toLowerCase(), clave=$("clave").value;
    if(!usuario || !clave) return error("Escribe tu correo o usuario y tu contraseña.");
    const conCorreo = usuario.includes("@");
    if(!conCorreo && !/^[a-z0-9-]{2,40}$/.test(codigo)) return error("Si entras con usuario, escribe también el código del restaurante.");
    // Las cuentas del personal creadas desde el panel usan este formato (igual que la app)
    const email = conCorreo ? usuario : usuario.toLowerCase()+"."+codigo+"@metriax.app";
    const intentos = [clave];
    if(clave.length<10 && codigo) intentos.push("metriax-"+codigo+"-"+clave);
    $("entrar").disabled=true; $("entrar").textContent="Entrando…";
    let fallo=null;
    for(const p of intentos){ const { error:er } = await sb.auth.signInWithPassword({ email, password:p }); fallo=er; if(!er) break; }
    $("entrar").disabled=false; $("entrar").textContent="Entrar";
    if(fallo) return error(/invalid/i.test(fallo.message) ? "Usuario o contraseña incorrectos." : "No se ha podido entrar: "+fallo.message);
    mostrarSesion(true);
  });

  $("salir").addEventListener("click", async () => { await sb.auth.signOut(); $("sesion").hidden=true; $("f").hidden=false; });
  mostrarSesion(false);
})();
