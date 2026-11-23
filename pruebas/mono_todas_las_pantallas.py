import asyncio, json, re, sys
from playwright.async_api import async_playwright
BASE="http://localhost:8765/app/"
IGN=re.compile(r"supabase|Failed to load resource|ERR_FAILED|fonts\.g|net::|favicon",re.I)
SEED="""async()=>{const c=carta().filter(p=>!agotado(p.id));const k=c.slice(0,6).map(p=>p.id);
 await Acc.pedir(3,tokenDemo(3),{[k[0]]:2,[k[1]]:1},'sin sal',null);
 const p1=Store.all('pedidos').slice(-1)[0]; await Acc.aceptar(p1.id,'ana');
 await Acc.pedir(5,tokenDemo(5),{[k[2]]:1},'',null);
 await Acc.comanda(7,{[k[3]]:3,[k[4]]:1},'para compartir','carlos');
 await Acc.pedirLlevar({nombre:'Luis',tel:'600000000',hora:'',nota:''},{[k[5]]:2},null);
 const f=new Date(Date.now()+864e5).toISOString().slice(0,10);
 try{await Acc.reservar({fecha:f,personas:4,hora:'21:00',nombre:'Marta QA',tel:'600111222',email:'',nota:''},'web');}catch(e){}
 try{await Acc.fichar('ana','entrada');}catch(e){}
 return Store.all('pedidos').length}"""
VISTAS=[("panel","data-tab"),("admin","data-atab"),("camarero","data-sub"),("cocina",None),("barra",None),("recogida",None),("fichar",None),("carta",None),("m3",None),("llevar",None),("reservar",None)]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":1280,"height":860})
    await ctx.route("**/*supabase*", lambda r: r.abort()); await ctx.route("**/fonts.googleapis.com/**", lambda r: r.abort())
    pg=await ctx.new_page(); errores=[]; C={"r":"","el":""}
    pg.on("pageerror",lambda e: errores.append({"donde":C["r"],"tras":C["el"],"error":str(e)[:300]}))
    pg.on("console",lambda m: m.type=="error" and not IGN.search(m.text) and errores.append({"donde":C["r"],"tras":C["el"],"error":"console: "+m.text[:300]}))
    pg.on("dialog",lambda d: asyncio.ensure_future(d.accept()))
    resumen=[]
    async def preparar(ruta):
      await pg.goto(BASE+"#inicio"); await pg.evaluate("()=>{localStorage.clear();sessionStorage.clear()}"); await pg.reload(); await pg.wait_for_timeout(700)
      await pg.evaluate("()=>{Acceso.entrar();Acceso.abrirAdmin();const c=document.querySelector('[data-consent]');c&&c.click()}")
      n=await pg.evaluate(SEED); 
      if ruta=="m3": ruta="m3-"+await pg.evaluate("tokenDemo(3)")
      await pg.evaluate("h=>{location.hash=h}",ruta); await pg.wait_for_timeout(900); return ruta
    for v,attr in VISTAS:
      ruta=await preparar(v); C["r"]=v; C["el"]="(abrir)"
      tabs=[None]
      if attr: tabs=await pg.evaluate(f"[...new Set([...document.querySelectorAll('[{attr}]')].map(e=>e.getAttribute('{attr}')))]")
      for tab in tabs:
        if tab is not None:
          ruta=await preparar(v); C["r"]=f"{v}/{tab}"
          await pg.evaluate(f"t=>{{const e=document.querySelector('[{attr}=\"'+t+'\"]');e&&e.click()}}",tab); await pg.wait_for_timeout(600)
          act=await pg.evaluate(f"t=>{{const e=document.querySelector('[{attr}=\"'+t+'\"]');return e&&(e.getAttribute('aria-current')==='page'||e.getAttribute('aria-pressed')==='true'||e.getAttribute('aria-selected')==='true')}}",tab)
          if not act: errores.append({"donde":C["r"],"tras":"(abrir pestaña)","error":"PRUEBA: la pestaña no queda activa"})
        vistos=set(); n=0
        for i in range(int(__import__('os').environ.get('LIM','400'))):
          info=await pg.evaluate("""(vistos)=>{
            const sel='#app button:not([disabled]),#app [role=tab],#app a[href^="#"],#app input[type=checkbox],#app input[type=radio],#app select,#app summary,#comanda-ui button:not([disabled])';
            const els=[...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect();return (r.width>0&&r.height>0)||e.tagName==='SELECT'});
            const fir=e=>{const at=[...e.attributes].filter(a=>!['class','style','aria-pressed','aria-selected','aria-current','aria-checked','aria-expanded','value','checked','selected','aria-label','title','data-desde'].includes(a.name));const tieneData=at.some(a=>a.name.startsWith('data-')||a.name==='id'||a.name==='name');return e.tagName+'|'+at.map(a=>a.name+'='+a.value).join(',')+'|'+(tieneData?'':(e.innerText||'').replace(/[0-9:,.€]+/g,'#').trim().slice(0,24));};
            for(const e of els){const f=fir(e); if(vistos.includes(f)) continue;
              const t=(e.innerText||e.getAttribute('aria-label')||e.name||e.id||'').trim().replace(/\\s+/g,' ').slice(0,40);
              if(/data-salir|data-bloquear|data-consent|data-admin-cerrar|data-local-salir|data-atab=|data-tab=|data-sub=/.test(f)) return {f,saltar:1};
              if(e.matches('a[href^="#"]')) return {f,saltar:1};
              if(e.tagName==='SELECT'){const o=[...e.options].filter(o=>!o.selected&&!o.disabled)[0]; if(o){e.value=o.value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}}
              else e.click();
              return {f,t}}
            return null}""", list(vistos))
          if not info: break
          vistos.add(info["f"])
          if info.get("saltar"): continue
          n+=1; C["el"]=info.get("t") or info["f"][:50]
          await pg.wait_for_timeout(140)
          h=await pg.evaluate("location.hash.slice(1)")
          if h!=ruta and not h.startswith(("reserva-","pedido-")):
            await pg.evaluate("h=>{location.hash=h}",ruta); await pg.wait_for_timeout(350)
            if tab is not None: await pg.evaluate(f"t=>{{const e=document.querySelector('[{attr}=\"'+t+'\"]');e&&e.click()}}",tab); await pg.wait_for_timeout(300)
        resumen.append((C["r"],n))
    print(json.dumps({"resumen":resumen,"errores":errores},ensure_ascii=False))
    await b.close()
asyncio.run(main())
