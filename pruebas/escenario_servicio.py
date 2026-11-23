import asyncio, json, re
from playwright.async_api import async_playwright
BASE="http://localhost:8765/app/"
IGN=re.compile(r"supabase|Failed to load resource|ERR_FAILED|fonts\.g|net::|favicon",re.I)
R=[]
def ok(paso,cond,det=""): R.append(("OK " if cond else "FALLO ")+paso+(f" — {det}" if det else "")); 
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    ctx=await b.new_context(viewport={"width":420,"height":860})
    await ctx.route("**/*supabase*", lambda r: r.abort()); await ctx.route("**/fonts.googleapis.com/**", lambda r: r.abort())
    errs=[]
    async def pagina(h):
      pg=await ctx.new_page(); pg.on("pageerror",lambda e: errs.append(h+": "+str(e)[:250])); pg.on("console",lambda m: m.type=="error" and not IGN.search(m.text) and errs.append(h+" console: "+m.text[:250])); pg.on("dialog",lambda d: asyncio.ensure_future(d.accept()))
      await pg.goto(BASE+"#"+h); await pg.wait_for_timeout(900); return pg
    cli=await pagina("inicio")
    await cli.evaluate("()=>{localStorage.clear();sessionStorage.clear()}"); await cli.reload(); await cli.wait_for_timeout(800)
    await cli.evaluate("()=>{Acceso.entrar();Acceso.abrirAdmin();const c=document.querySelector('[data-consent]');c&&c.click()}")
    tk=await cli.evaluate("tokenDemo(3)")
    J=lambda pg,js: pg.evaluate(js)
    # --- 1. Cliente pide desde la mesa 3
    await cli.evaluate("h=>{location.hash=h}","m3-"+tk); await cli.wait_for_timeout(900)
    n0=await J(cli,"Store.all('pedidos').length")
    mas=cli.locator("[data-mas]"); cnt=await mas.count(); ok("cliente ve la carta con botones +",cnt>0,f"{cnt} botones")
    if cnt: await mas.nth(0).click(); await cli.wait_for_timeout(150); await cli.locator("[data-mas]").nth(1).click(); await cli.wait_for_timeout(150)
    await cli.locator('[data-a="cesta"]').first.click(); await cli.wait_for_timeout(300)
    env=cli.locator('[data-a="enviar"]'); ok("cesta con botón enviar",await env.count()>0)
    if await env.count(): await env.first.click(); await cli.wait_for_timeout(900)
    peds=await J(cli,"Store.all('pedidos').filter(p=>p.mesa===3)")
    ok("pedido creado en mesa 3",len(peds)>=1,f"{len(peds)} pedidos; items={[ (i['q'],i['n']) for i in (peds[-1]['items'] if peds else [])]}")
    pid=peds[-1]['id'] if peds else None
    val=await J(cli,"cfgReglas().validar"); ok("regla validar leída",val is not None,f"validar={val}")
    # --- 2. Camarero acepta
    cam=await pagina("camarero")
    av=await J(cam,"Store.all('avisos').filter(a=>a.pedido==='%s').map(a=>a.tipo)"%pid)
    ok("aviso de validar para el camarero",bool(av) or not val,f"{av}")
    acc=cam.locator("[data-aceptar]")
    if val: 
      ok("botón aceptar visible",await acc.count()>0)
      if await acc.count(): await acc.first.click(); await cam.wait_for_timeout(900)
    p=await J(cam,"Store.get('pedidos','%s')"%pid)
    ok("pedido aceptado",bool(p and p.get('aceptado')),str(p and p.get('aceptado')))
    tks=await J(cam,"Store.all('tickets').filter(t=>t.pedido==='%s').map(t=>t.dest+':'+t.estado)"%pid)
    ok("tickets para cocina/barra creados",len(tks)>=1,str(tks))
    m3=await J(cam,"mesa(3)"); ok("mesa 3 queda ocupada",m3.get('abierta') is True,f"consumo={len(m3.get('consumo') or [])}")
    # --- 3. Cocina y barra preparan
    for dest in ["cocina","barra"]:
      k=await pagina(dest); hay=await J(k,"Store.all('tickets').filter(t=>t.pedido==='%s'&&t.dest==='%s').length"%(pid,dest))
      if not hay: await k.close(); continue
      emp=k.locator("[data-emp]"); 
      if await emp.count(): await emp.first.click(); await k.wait_for_timeout(500)
      lis=k.locator("[data-listo]"); ok(f"{dest}: botón listo",await lis.count()>0)
      if await lis.count(): await lis.first.click(); await k.wait_for_timeout(700)
      est=await J(k,"Store.get('tickets','%s-%s').estado"%(pid,dest)); ok(f"{dest}: ticket marcado listo",est in("listo","servido","hecho"),est)
      await k.close()
    # --- 4. Camarero sirve
    await cam.reload(); await cam.wait_for_timeout(900)
    lst=await J(cam,"Store.all('avisos').filter(a=>a.tipo==='listo'&&!a.atendido).length"); ok("aviso 'listo' al camarero",lst>=1,str(lst))
    srv=cam.locator("[data-servir]")
    if await srv.count(): await srv.first.click(); await cam.wait_for_timeout(700)
    lst2=await J(cam,"Store.all('avisos').filter(a=>a.tipo==='listo'&&!a.atendido).length"); ok("camarero marca servido",lst2<lst,f"{lst}->{lst2}")
    # --- 5. Cliente llama al camarero
    await cli.reload(); await cli.wait_for_timeout(900)
    ll=cli.locator('[data-a="llamar"]'); ok("botón llamar al camarero",await ll.count()>0)
    if await ll.count(): await ll.first.click(); await cli.wait_for_timeout(700)
    lla=await J(cli,"Store.all('avisos').filter(a=>a.tipo==='llamada'&&a.mesa===3&&!a.atendido).length"); ok("aviso de llamada creado",lla>=1)
    await cam.reload(); await cam.wait_for_timeout(800)
    okb=cam.locator("[data-ok]")
    if await okb.count(): await okb.first.click(); await cam.wait_for_timeout(600)
    lla2=await J(cam,"Store.all('avisos').filter(a=>a.tipo==='llamada'&&a.mesa===3&&!a.atendido).length"); ok("camarero atiende la llamada",lla2<lla,f"{lla}->{lla2}")
    # --- 6. Cliente pide la cuenta en efectivo, camarero cobra
    await cli.reload(); await cli.wait_for_timeout(900)
    for sel in ['[data-a="hoja-cuenta"]','[data-a="cuenta"]']:
      e=cli.locator(sel)
      if await e.count(): await e.first.click(); await cli.wait_for_timeout(500); break
    ef=cli.locator('[data-forma="efectivo"],[data-a="efectivo"]')
    ok("cliente puede elegir pagar en efectivo",await ef.count()>0)
    if await ef.count(): await ef.first.click(); await cli.wait_for_timeout(400)
    pc=cli.locator('.hoja [data-a="cuenta"]')
    if await pc.count(): await pc.first.click(); await cli.wait_for_timeout(700)
    forma_pedida=await J(cli,"cuentaDe(3)"); ok("la cuenta queda pedida en efectivo",forma_pedida=="efectivo",str(forma_pedida))
    cu=await J(cli,"Store.all('avisos').filter(a=>a.tipo==='cuenta'&&a.mesa===3&&!a.atendido).length"); ok("aviso de cuenta creado",cu>=1)
    total=await J(cam,"totalMesa(mesa(3))")
    await cam.evaluate("()=>{document.querySelector('[data-sub=\"todas\"]').click()}"); await cam.wait_for_timeout(400)
    mb=cam.locator('[data-mesa="3"]')
    if await mb.count(): await mb.first.click(); await cam.wait_for_timeout(500)
    cob=cam.locator('[data-cobrar][data-forma="efectivo"]'); ok("botón cobrar en la hoja de la mesa",await cob.count()>0)
    if await cob.count(): await cob.first.click(); await cam.wait_for_timeout(900)
    m3=await J(cam,"mesa(3)"); cuentas=await J(cam,"Store.all('cuentas').filter(c=>c.mesa===3)")
    ok("mesa 3 cobrada y libre",m3.get('abierta') is False and len(cuentas)>=1,f"total={total} cuentas={[ (c['total'],c['forma']) for c in cuentas]}")
    ok("total cobrado = consumo",bool(cuentas) and abs(cuentas[-1]['total']-total)<0.01,f"{total} vs {cuentas[-1]['total'] if cuentas else None}")
    # --- 7. Para llevar
    ll=await pagina("llevar")
    m=ll.locator("[data-mas]")
    if await m.count(): await m.first.click(); await ll.wait_for_timeout(200)
    await ll.locator('[data-a="cesta"]').first.click(); await ll.wait_for_timeout(300)
    for sel,v in [("#ll-nombre","Prueba QA"),("#ll-tel","600123123")]:
      if await ll.locator(sel).count(): await ll.fill(sel,v)
    if await ll.locator("#ll-hora").count():
      opts=await ll.evaluate("[...document.querySelectorAll('#ll-hora option')].map(o=>o.value).filter(Boolean)")
      if opts: await ll.select_option("#ll-hora",opts[0])
    for c in await ll.locator("input[type=checkbox][required]").all(): await c.check()
    sb=ll.locator('[data-a="pedir-ll"]')
    n1=await J(ll,"Store.all('pedidos').filter(p=>p.llevar).length")
    if await sb.count(): await sb.last.click(); await ll.wait_for_timeout(1000)
    n2=await J(ll,"Store.all('pedidos').filter(p=>p.llevar).length"); ok("pedido para llevar creado",n2>n1,f"{n1}->{n2}; vista={await J(ll,'document.body.dataset.v')}")
    lid=await J(ll,"(Store.all('pedidos').filter(p=>p.llevar).slice(-1)[0]||{}).id")
    camp=await pagina("camarero"); a=camp.locator("[data-aceptar]")
    if await a.count(): await a.first.click(); await camp.wait_for_timeout(700)
    k=await pagina("cocina")
    for sel in ["[data-emp]","[data-listo]"]:
      e=k.locator(sel)
      if await e.count(): await e.first.click(); await k.wait_for_timeout(500)
    await k.close(); await camp.reload(); await camp.wait_for_timeout(800)
    ent=camp.locator("[data-servir]")
    if await ent.count(): await ent.first.click(); await camp.wait_for_timeout(700)
    pl=await J(camp,"Store.get('pedidos','%s')"%lid) if lid else None
    ok("para llevar: aceptado, listo y entregado",bool(pl and pl.get('recogido')),str(pl and {k:pl.get(k) for k in ('aceptado','listoT','recogido')}))
    await camp.close(); await ll.close()
    # --- 8. Reserva
    rs=await pagina("reservar")
    campos=await rs.evaluate("[...document.querySelectorAll('#app input,#app select,#app textarea')].map(e=>(e.id||e.name)+':'+e.type)")
    for e in await rs.locator("#app input[type=text],#app input:not([type]),#app input[type=tel],#app input[type=email]").all():
      idn=(await e.get_attribute("id")) or ""
      await e.fill("600111222" if "tel" in idn else ("qa@ejemplo.es" if "mail" in idn else "Reserva QA"))
    await rs.evaluate("()=>{const d=document.querySelector('#rs-fecha');if(d){const f=new Date(Date.now()+2*864e5);d.value=f.toISOString().slice(0,10);d.dispatchEvent(new Event('input',{bubbles:true}));d.dispatchEvent(new Event('change',{bubbles:true}))}}"); await rs.wait_for_timeout(300)
    for s in await rs.locator("#app select").all():
      o=await s.evaluate("s=>[...s.options].map(o=>o.value).filter(Boolean)")
      if o: await s.select_option(o[min(1,len(o)-1)])
    hb=rs.locator("[data-hora]:not([disabled])")
    ok("reserva: hay horas libres",await hb.count()>0,str(await hb.count()))
    for c in await rs.locator("input[type=checkbox][required]").all(): await c.check()
    if await hb.count(): await hb.first.click(); await rs.wait_for_timeout(300)
    ok("reserva: la casilla de privacidad sigue marcada tras elegir hora",await rs.locator("#rs-acepto").is_checked())
    r1=await J(rs,"Store.all('reservas').length")
    sb=rs.locator("button[type=submit]")
    if await sb.count(): await sb.first.click(); await rs.wait_for_timeout(1000)
    r2=await J(rs,"Store.all('reservas').length"); ok("reserva creada",r2>r1,f"{r1}->{r2} campos={campos} vista={await J(rs,'location.hash')}")
    rid=await J(rs,"(Store.all('reservas').slice(-1)[0]||{}).id")
    pn=await pagina("panel"); await pn.evaluate("()=>document.querySelector('[data-tab=reservas]').click()"); await pn.wait_for_timeout(600)
    bts=await pn.evaluate("[...document.querySelectorAll('#app button')].filter(b=>b.offsetParent).map(b=>[...b.attributes].filter(a=>a.name.startsWith('data-')).map(a=>a.name+'='+a.value).join(',')+':'+b.innerText.trim().slice(0,20)).filter(x=>/res|confirm/i.test(x)).slice(0,8)")
    cf=pn.locator('[data-est="confirmada"]')
    if await cf.count(): await cf.first.click(); await pn.wait_for_timeout(600)
    est=await J(pn,"(Store.get('reservas','%s')||{}).estado"%rid) if rid else None
    ok("panel: reserva confirmada",est=="confirmada",f"estado={est}; botones={bts}")
    await pn.close(); await rs.close()
    # --- 9. Fichar
    fi=await pagina("fichar"); b1=await fi.evaluate("[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.innerText.trim()).slice(0,12)")
    ok("pantalla de fichar con botones",len(b1)>0,str(b1))
    await fi.close()
    print("\n".join(R)); print("ERRORES JS:",json.dumps(errs,ensure_ascii=False,indent=1))
    await b.close()
asyncio.run(main())
