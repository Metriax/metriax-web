"use strict";
/* =====================================================================
   PLANTILLA BASE ("demo en blanco"). Son los valores con los que arranca
   un restaurante nuevo. Todo se cambia desde el panel, sin tocar código:
   Marca y ajustes, Carta, Menú del día, Reglas y Tarjetas NFC.
   ===================================================================== */
const PLATAFORMA = "metriiax";
const BAR_DEF = {
  nombre:"Tres Hermanos", ciudad:"Móstoles · desde 1969", eslogan:"Alta cocina castellana. La casa del caracol.",
  mesas:24, interiorHasta:16, logo:"", color:"#c9a24a", color2:"#efe7d8", estilo:"noche", activo:true,
  camareros:[{id:"ana",n:"Ana",color:"#c9a24a"},{id:"carlos",n:"Carlos",color:"#3e7cb1"},{id:"sara",n:"Sara",color:"#b5532a"}],
  google:"https://search.google.com/local/writereview?placeid=ChIJT3LyEb2NQQ0R9IBJNnXS5bI", mapa:"https://www.google.com/maps/place/?q=place_id:ChIJT3LyEb2NQQ0R9IBJNnXS5bI"
};
// Reglas de funcionamiento de cada restaurante (pestaña Reglas del panel)
const REGLAS_DEF = { validar:true, llevar:true, valorar:true, sugerir:true, agotarSinStock:true };
const ALERGENOS = {
  gluten:{n:"Gluten",en:"Gluten",pt:"Glúten",c:"#b8862b",l:"G"}, crustaceos:{n:"Crustáceos",en:"Crustaceans",pt:"Crustáceos",c:"#e2643a",l:"Cr"}, huevo:{n:"Huevo",en:"Egg",pt:"Ovo",c:"#d39b0c",l:"H"},
  pescado:{n:"Pescado",en:"Fish",pt:"Peixe",c:"#3e7cb1",l:"P"}, cacahuetes:{n:"Cacahuetes",en:"Peanuts",pt:"Amendoins",c:"#9c6b3c",l:"Ca"}, soja:{n:"Soja",en:"Soy",pt:"Soja",c:"#6b8e23",l:"So"},
  lacteos:{n:"Lácteos",en:"Milk",pt:"Leite",c:"#6f8ea8",l:"L"}, frutos:{n:"Frutos de cáscara",en:"Tree nuts",pt:"Frutos de casca rija",c:"#8b5a2b",l:"F"}, apio:{n:"Apio",en:"Celery",pt:"Aipo",c:"#4f9a48",l:"Ap"},
  mostaza:{n:"Mostaza",en:"Mustard",pt:"Mostarda",c:"#b59400",l:"Mo"}, sesamo:{n:"Sésamo",en:"Sesame",pt:"Sésamo",c:"#a38b5b",l:"Se"}, sulfitos:{n:"Sulfitos",en:"Sulphites",pt:"Sulfitos",c:"#8e3b5c",l:"Su"},
  altramuces:{n:"Altramuces",en:"Lupin",pt:"Tremoço",c:"#b3922c",l:"At"}, moluscos:{n:"Moluscos",en:"Molluscs",pt:"Moluscos",c:"#2f8f8f",l:"Ml"}
};
const ICONO_DEST = {cocina:"sarten", barra:"copa"};
const SECCIONES_DEF = [
  {id:"embutidos", n:"Embutidos y conservas", nota:"Ibéricos cortados a cuchillo y latas escogidas", en:["Cured meats & tins","Hand-carved Iberian and selected tins"], pt:["Enchidos e conservas","Ibéricos cortados à faca e conservas escolhidas"], dest:"cocina", icono:"tabla"},
  {id:"mariscos", n:"Mariscos", nota:"A la plancha y a la brasa", en:["Seafood","Grilled"], pt:["Marisco","Na chapa e na brasa"], dest:"cocina", icono:"pincho"},
  {id:"compartir", n:"Para compartir", nota:"Producto de Palencia y recetas de la casa", en:["To share","Palencia produce and house recipes"], pt:["Para partilhar","Produto de Palência e receitas da casa"], dest:"cocina", icono:"tabla"},
  {id:"ensaladas", n:"Ensaladas", nota:"De huerta, según temporada", en:["Salads","Seasonal"], pt:["Saladas","Da época"], dest:"cocina", icono:"tabla"},
  {id:"guisos", n:"Arroces, guisos y asados", nota:"Cocina de cuchara y horno de leña", en:["Rice, stews & roasts","Wood-fired oven"], pt:["Arrozes, guisados e assados","Forno a lenha"], dest:"cocina", icono:"sarten"},
  {id:"pescados", n:"Pescados", nota:"Del Cantábrico y desalado en casa", en:["Fish","From the Cantabrian Sea"], pt:["Peixe","Do Cantábrico"], dest:"cocina", icono:"sarten"},
  {id:"carnes", n:"Carnes a la brasa", nota:"Ternera palentina y brasa de verdad", en:["Grilled meats","Palencia beef over real embers"], pt:["Carnes na brasa","Vitela de Palência"], dest:"cocina", icono:"sarten"},
  {id:"postres", n:"Postres caseros", nota:"Todos hechos en nuestra cocina", en:["Homemade desserts","All made in our kitchen"], pt:["Sobremesas caseiras","Todas feitas na nossa cozinha"], dest:"cocina", icono:"tarta"},
  {id:"vinos", n:"Vinos", nota:"Ribera del Duero como bandera · botella", en:["Wines","Ribera del Duero first · bottle"], pt:["Vinhos","Ribera del Duero em destaque · garrafa"], dest:"barra", icono:"copa"},
  {id:"bebidas", n:"Bebidas", nota:"Cervezas, refrescos y café", en:["Drinks","Beer, soft drinks and coffee"], pt:["Bebidas","Cervejas, refrigerantes e café"], dest:"barra", icono:"copa"},
];
const PLATOS_DEF = [
  ["embutidos","jamon80","Jamón ibérico de bellota","80 g cortado a cuchillo.",18,[],{top:1},["Acorn-fed Iberian ham","80 g, hand-carved."],["Presunto ibérico de bolota","80 g cortado à faca."]],
  ["embutidos","jamon150","Jamón ibérico de bellota (150 g)","150 g cortado a cuchillo.",32,[],{u:"ración"},["Acorn-fed Iberian ham (150 g)","150 g, hand-carved."],["Presunto ibérico de bolota (150 g)","150 g cortado à faca."]],
  ["embutidos","lomo","Lomo curado ibérico de bellota","100 g cortado a cuchillo.",20,[],{},["Cured Iberian loin","100 g, hand-carved."],["Lombo curado ibérico","100 g cortado à faca."]],
  ["embutidos","queso","Queso añejo palentino","100 g.",15,["lacteos"],{},["Aged Palencia cheese","100 g."],["Queijo curado de Palência","100 g."]],
  ["embutidos","tabla","Tabla de ibéricos","80 g de jamón ibérico de bellota, 80 g de lomo y 80 g de queso curado.",32,["lacteos"],{},["Iberian board","80 g ham, 80 g loin and 80 g cured cheese."],["Tábua de ibéricos","80 g de presunto, 80 g de lombo e 80 g de queijo."]],
  ["embutidos","anchoas","Anchoas Sanfilippo grandes","12 lomos con mermelada de pimientos de Torquemada y láminas de pan.",34,["pescado","gluten"],{},["Large Sanfilippo anchovies","12 fillets with Torquemada pepper jam and bread crisps."],["Anchovas Sanfilippo grandes","12 lombos com doce de pimento e lâminas de pão."]],
  ["embutidos","mejillones","Mejillones Ramón Franco","7/8 unidades, directamente de la ría.",12,["moluscos"],{},["Ramón Franco mussels","7-8 pieces, straight from the estuary."],["Mexilhões Ramón Franco","7/8 unidades, direto da ria."]],
  ["mariscos","zamburinas","Zamburiñas","6 unidades a la plancha con ajo, perejil y perlas de vinagre de manzana.",18,["moluscos"],{},["Queen scallops","6 grilled, with garlic, parsley and cider vinegar pearls."],["Vieiras pequenas","6 na chapa com alho, salsa e pérolas de vinagre de maçã."]],
  ["mariscos","gambas","Gambas de Huelva a la plancha","250 g.",30,["crustaceos"],{},["Grilled Huelva prawns","250 g."],["Gambas de Huelva na chapa","250 g."]],
  ["mariscos","ajillo","Gambas al ajillo","En cazuela, con ajo y guindilla.",25,["crustaceos"],{},["Garlic prawns","In a clay pot with garlic and chilli."],["Gambas ao alho","Em tacho de barro com alho e malagueta."]],
  ["mariscos","pulpo","Pulpo a la extremeña","Cocido a baja temperatura y terminado a la brasa, con patatas, pimentón de la Vera y sal en escamas.",24,["moluscos"],{},["Extremadura-style octopus","Slow-cooked, finished on the grill, with potatoes and La Vera paprika."],["Polvo à estremenha","Cozido a baixa temperatura e acabado na brasa, com batatas e colorau."]],
  ["compartir","caracoles","Caracoles guisados a la palentina","Con chorizo y jamón picadito. La receta de la familia desde 1969.",16,[],{etq:"Especialidad de la casa",top:1},["Palencia-style stewed snails","With chorizo and diced ham. The family recipe since 1969."],["Caracóis guisados à palentina","Com chouriço e presunto picado. Receita da família desde 1969."]],
  ["compartir","caracolillos","Caracolillos","Especialidad de la casa (en temporada).",10,[],{},["Small snails","House speciality (in season)."],["Caracoletas","Especialidade da casa (na época)."]],
  ["compartir","croquetas","Croquetas caseras","Riquísimas croquetas de varios sabores.",12,["gluten","lacteos","huevo"],{top:1},["Homemade croquettes","Assorted flavours."],["Croquetes caseiros","Vários sabores."]],
  ["compartir","torreznos","Torreznos de Soria","Como los de antes.",12,[],{top:1},["Soria pork crackling","Just like they used to be."],["Torresmos de Sória","Como os de antigamente."]],
  ["compartir","foie","Escalope de foie palentino","A la plancha con reducción de Pedro Ximénez.",26,["sulfitos"],{},["Palencia foie gras escalope","Seared, with Pedro Ximénez reduction."],["Escalope de foie","Na chapa com redução de Pedro Ximénez."]],
  ["compartir","tartar","Steak tartar","Cortado a cuchillo y aliñado al momento.",24,["huevo","mostaza"],{},["Steak tartare","Hand-cut and dressed to order."],["Steak tártaro","Cortado à faca e temperado na hora."]],
  ["compartir","boletus","Revuelto de boletus","Boletus edulis palentino de Piniculas con huevos de corral.",23,["huevo"],{},["Scrambled eggs with porcini","Palencia porcini and free-range eggs."],["Ovos mexidos com boletos","Boletos de Palência e ovos do campo."]],
  ["compartir","morcilla","Morcilla de Villada","De arroz, al horno con pimientos asados.",12,[],{},["Villada black pudding","Rice black pudding, baked, with roasted peppers."],["Morcela de Villada","De arroz, no forno com pimentos assados."]],
  ["compartir","calabacin","Calabacín rebozado con miel ecológica","Finísimas rodajas de calabacín fritas.",13,["gluten"],{},["Fried courgette with organic honey","Thin crispy courgette slices."],["Curgete frita com mel biológico","Rodelas finíssimas de curgete fritas."]],
  ["compartir","rabas","Rabas de calamar a la andaluza","Calamar de Santander harinado.",15,["gluten","moluscos"],{},["Fried squid strips","Santander squid, floured and fried."],["Lulas fritas","Lula de Santander enfarinhada."]],
  ["compartir","migas","Migas toledanas","Con chorizo, torreznos y huevos de corral.",15,["gluten","huevo"],{},["Toledo-style migas","With chorizo, crackling and free-range eggs."],["Migas toledanas","Com chouriço, torresmos e ovos do campo."]],
  ["compartir","huevoroto","Huevo roto con jamón ibérico","Con patatas fritas en aceite de oliva.",18,["huevo"],{},["Broken eggs with Iberian ham","Over olive-oil fries."],["Ovos rotos com presunto ibérico","Sobre batatas fritas em azeite."]],
  ["ensaladas","tomate","Ensalada de tomate","Tomate de huerto o Raf, según temporada, con cebolla palentina.",14,[],{},["Tomato salad","Garden or Raf tomato with Palencia onion."],["Salada de tomate","Tomate da horta ou Raf com cebola de Palência."]],
  ["ensaladas","zorongollo","Zorongollo","Pimiento asado, cebolla, huevo campero cocido, nuestro aceite de oliva y balsámico.",15,["huevo","sulfitos"],{},["Zorongollo","Roasted pepper, onion, boiled egg, olive oil and balsamic."],["Zorongollo","Pimento assado, cebola, ovo cozido, azeite e balsâmico."]],
  ["ensaladas","mostolena","Ensalada mostoleña","Escarola fina con chimichurri y ternera palentina escabechada.",15,[],{},["Móstoles salad","Endive, chimichurri and pickled Palencia beef."],["Salada de Móstoles","Escarola, chimichurri e vitela de escabeche."]],
  ["guisos","arroz","Arroz palentino","Meloso con lechazo churro IGP. Mínimo 2 personas, precio por persona.",24,[],{u:"persona"},["Palencia rice","Creamy rice with IGP suckling lamb. Min. 2, price per person."],["Arroz palentino","Cremoso com borrego IGP. Mín. 2 pessoas, preço por pessoa."]],
  ["guisos","lechazo","¼ de lechazo churro palentino IGP","Asado a la antigua usanza en horno de leña.",65,[],{etq:"Horno de leña",top:1},["¼ IGP suckling lamb","Roasted the old way in a wood-fired oven."],["¼ de borrego IGP","Assado à moda antiga em forno a lenha."]],
  ["guisos","paletilla","Paletilla asada de lechazo IGP","Lechazo churro palentino.",29,[],{},["Roast lamb shoulder","IGP Palencia suckling lamb."],["Pá de borrego assada","Borrego de Palência IGP."]],
  ["guisos","cochinillo","Cochinillo palentino asado","Piel crujiente, carne jugosa.",29,[],{},["Roast suckling pig","Crispy skin, juicy meat."],["Leitão assado","Pele estaladiça, carne suculenta."]],
  ["guisos","cochifrito","Cochifrito segoviano","Confitado y rematado a 180 °C con láminas de ajo.",29,[],{},["Segovian cochifrito","Confit pork, crisped at 180 °C with garlic."],["Cochifrito segoviano","Confitado e estaladiço com lâminas de alho."]],
  ["guisos","callos","Callos a la madrileña","Con manitas de cerdo, chorizo y jamón picadito.",16,[],{},["Madrid-style tripe","With pig's trotters, chorizo and ham."],["Dobrada à madrilena","Com mãozinhas de porco, chouriço e presunto."]],
  ["guisos","oreja","Oreja en salsa palentina","Al estilo tradicional Tres Hermanos.",16,[],{},["Pig's ear in Palencia sauce","The traditional Tres Hermanos way."],["Orelha em molho palentino","À maneira tradicional da casa."]],
  ["guisos","perdiz","Perdiz de tiro escabechada","A la palentina.",20,[],{},["Pickled partridge","Palencia style."],["Perdiz de escabeche","À palentina."]],
  ["pescados","bacalao","Bacalao con tomate natural","Morro de bacalao desalado por nosotros, con patatas fritas.",25,["pescado"],{},["Cod with fresh tomato","Cod loin desalted in-house, with fries."],["Bacalhau com tomate natural","Lombo dessalgado por nós, com batatas fritas."]],
  ["pescados","rodaballo","Rodaballo a la plancha","Del Cantábrico, con escamas de pimentón de la Vera.",26,["pescado"],{},["Grilled turbot","From the Cantabrian Sea, with La Vera paprika."],["Pregado na chapa","Do Cantábrico, com colorau de La Vera."]],
  ["carnes","chuletillas","Chuletillas de lechazo IGP","300 g a la brasa.",28,[],{top:1},["Lamb cutlets","300 g, IGP, grilled."],["Costeletas de borrego","300 g na brasa, IGP."]],
  ["carnes","entrecot","Entrecot de ternera palentina","Lomo de ternera de Cervera a la brasa.",27,[],{},["Palencia beef entrecôte","Cervera beef loin on the grill."],["Entrecosto de vitela","Lombo de Cervera na brasa."]],
  ["carnes","solomillo","Solomillo de ternera palentina","A la brasa.",30,[],{},["Palencia beef tenderloin","Grilled."],["Lombo de vitela","Na brasa."]],
  ["carnes","solofoie","Solomillo con foie de pato","Con salsa de cerezas de la Vera.",35,["sulfitos"],{},["Tenderloin with duck foie","With La Vera cherry sauce."],["Lombo com foie de pato","Com molho de cerejas."]],
  ["carnes","presa","Presa ibérica de bellota","Con agridulce de trompeta amarilla.",24,[],{},["Iberian pork presa","With sweet-and-sour yellow foot mushrooms."],["Presa ibérica","Com agridoce de cogumelos."]],
  ["carnes","vaca","Lomo de vaca madurada","De Cervera, a la brasa.",40,[],{},["Dry-aged beef loin","From Cervera, grilled."],["Lombo de vaca maturada","De Cervera, na brasa."]],
  ["carnes","chuleton","Chuletón palentino","Trinchado en plato caliente.",65,[],{etq:"Para compartir"},["Palencia T-bone","Carved on a hot plate."],["Chuletão palentino","Trinchado em prato quente."]],
  ["carnes","picana","Picaña de ternera palentina","A la brasa.",22,[],{},["Palencia beef picanha","Grilled."],["Picanha de vitela","Na brasa."]],
  ["carnes","cachopo","Cachopo palentino","Ternera palentina, paleta ibérica de Fisan y queso de Carrión de los Condes. Para compartir.",50,["gluten","lacteos","huevo"],{top:1},["Palencia cachopo","Breaded beef with Iberian ham and cheese. To share."],["Cachopo palentino","Vitela panada com presunto e queijo. Para partilhar."]],
  ["carnes","burger","Hamburguesa de caza","200 g de ciervo, corzo o venado con queso añejo, rúcula, tomate, pepinillo y cebolla caramelizada.",18,["gluten","lacteos","mostaza"],{},["Game burger","200 g venison with aged cheese and caramelised onion."],["Hambúrguer de caça","200 g de veado com queijo curado e cebola caramelizada."]],
  ["postres","tarta","Tarta casera de queso","Cremosa, hecha cada día.",7,["lacteos","huevo","gluten"],{top:1},["Homemade cheesecake","Creamy, made every day."],["Cheesecake caseiro","Cremoso, feito todos os dias."]],
  ["postres","arrozleche","Arroz con leche casero","Con canela.",6,["lacteos"],{},["Rice pudding","With cinnamon."],["Arroz doce","Com canela."]],
  ["postres","milhoja","Milhoja","De crema.",7,["gluten","lacteos","huevo"],{},["Mille-feuille","With custard."],["Mil-folhas","De creme."]],
  ["postres","chocolate","Muerte por chocolate","Tarta de chocolate sobre chocolate y sirope de chocolate.",7,["gluten","lacteos","huevo"],{},["Death by chocolate","Chocolate cake on chocolate with chocolate syrup."],["Morte por chocolate","Bolo de chocolate com calda de chocolate."]],
  ["postres","yogur","Yogur de mascarpone","Con mermelada de cereza.",6,["lacteos"],{},["Mascarpone yoghurt","With cherry jam."],["Iogurte de mascarpone","Com doce de cereja."]],
  ["postres","vinohielo","Copa de vino dulce de hielo","Con queso palentino.",7.5,["lacteos","sulfitos"],{},["Ice wine","With Palencia cheese."],["Vinho de gelo","Com queijo de Palência."]],
  ["vinos","raulcalvo","Raúl Calvo Crianza","D.O. Ribera del Duero · Tempranillo.",25,["sulfitos"],{u:"botella"},["Raúl Calvo Crianza","Ribera del Duero · Tempranillo."],["Raúl Calvo Crianza","Ribera del Duero · Tempranillo."]],
  ["vinos","rodero","Carmelo Rodero Crianza","D.O. Ribera del Duero · Tempranillo y Sauvignon.",43,["sulfitos"],{u:"botella"},["Carmelo Rodero Crianza","Ribera del Duero."],["Carmelo Rodero Crianza","Ribera del Duero."]],
  ["vinos","emiliomoro","Emilio Moro","D.O. Ribera del Duero · Tempranillo.",40.5,["sulfitos"],{u:"botella",top:1},["Emilio Moro","Ribera del Duero · Tempranillo."],["Emilio Moro","Ribera del Duero · Tempranillo."]],
  ["vinos","carraovejas","Pago de Carraovejas","D.O. Ribera del Duero · Tempranillo.",56,["sulfitos"],{u:"botella"},["Pago de Carraovejas","Ribera del Duero."],["Pago de Carraovejas","Ribera del Duero."]],
  ["vinos","vivanco","Vivanco Crianza","D.O. Rioja · Tempranillo, Graciano y Maturana.",26,["sulfitos"],{u:"botella"},["Vivanco Crianza","Rioja."],["Vivanco Crianza","Rioja."]],
  ["vinos","codax","Martín Códax","D.O. Rías Baixas · Albariño.",26,["sulfitos"],{u:"botella"},["Martín Códax","Rías Baixas · Albariño."],["Martín Códax","Rías Baixas · Alvarinho."]],
  ["vinos","verdejo","Raúl Calvo Verdejo","D.O. Rueda.",20,["sulfitos"],{u:"botella"},["Raúl Calvo Verdejo","Rueda."],["Raúl Calvo Verdejo","Rueda."]],
  ["vinos","cava","Cava Juvé & Camps Brut Nature","Macabeo, Xarel·lo y Parellada.",35.5,["sulfitos"],{u:"botella"},["Juvé & Camps Brut Nature cava","Sparkling."],["Cava Juvé & Camps Brut Nature","Espumante."]],
  ["bebidas","cana","Caña","Cerveza de barril.",2.5,["gluten"],{},["Draught beer","Small glass."],["Imperial","Cerveja de pressão."]],
  ["bebidas","refresco","Refresco","Cola, naranja, limón o tónica.",2.8,[],{},["Soft drink","Cola, orange, lemon or tonic."],["Refrigerante","Cola, laranja, limão ou tónica."]],
  ["bebidas","agua","Agua mineral","Con o sin gas.",2.2,[],{},["Mineral water","Still or sparkling."],["Água mineral","Com ou sem gás."]],
  ["bebidas","cafe","Café","Solo, cortado o con leche.",1.8,["lacteos"],{},["Coffee","Espresso, cortado or white."],["Café","Expresso, pingado ou com leite."]],
].map(([sec,id,n,d,p,a,x,en,pt])=>({sec,id,n,d,p,a,u:x.u||"",etq:x.etq||"",top:!!x.top,modelo:x.modelo||"",medida:x.medida||"",en,pt}));
// Fotos de los platos (web del restaurante)
const FOTOS_DEF = {"jamon80": "https://www.tabernatreshermanos.com/_astro/jamon-iberico-al-corte.DmoDkU5J_1xpMEv.webp", "jamon150": "https://www.tabernatreshermanos.com/_astro/jamon-cortado-a-cuchillo.C2ViY8p-_Z98VDB.webp", "lomo": "https://www.tabernatreshermanos.com/_astro/lomo-iberico-de-bellota.B6GSqn06_EGoak.webp", "queso": "https://www.tabernatreshermanos.com/_astro/queso-anejo-palentino.zcT-Qpi0_Z2wExKp.webp", "tabla": "https://www.tabernatreshermanos.com/_astro/tabla-de-ibericos.BL72ckkM_2vj8FB.webp", "anchoas": "https://www.tabernatreshermanos.com/_astro/anchoas-sanfilippo.CYslBnu4_Z2qwfVz.webp", "mejillones": "https://www.tabernatreshermanos.com/_astro/mejillones-ramon-franco.D5WInxZu_Z2saJtU.webp", "zamburinas": "https://www.tabernatreshermanos.com/_astro/zamburinas-a-la-plancha.BUVqAW9p_Z1c21I9.webp", "gambas": "https://www.tabernatreshermanos.com/_astro/gambas-de-huelva.BLLOSiXi_sNfV8.webp", "ajillo": "https://www.tabernatreshermanos.com/_astro/gambas-al-ajillo.aDV4cLVf_eFgyM.webp", "pulpo": "https://www.tabernatreshermanos.com/_astro/pulpo-a-la-extremena.BCwsR7il_Z1ltSok.webp", "caracoles": "https://www.tabernatreshermanos.com/_astro/caracoles-a-la-palentina.6sD3wc9v_ZSszaw.webp", "caracolillos": "https://www.tabernatreshermanos.com/_astro/caracoles-de-la-casa.CdI9u12t_1yXmgO.webp", "croquetas": "https://www.tabernatreshermanos.com/_astro/croquetas-caseras.GkGLm7jc_Ze6hnE.webp", "torreznos": "https://www.tabernatreshermanos.com/_astro/torreznos-crujientes.CsmJvpCT_Z1xQywj.webp", "foie": "https://www.tabernatreshermanos.com/_astro/escalope-de-foie-palentino.QEzPKsbr_Z1jXUBP.webp", "tartar": "https://www.tabernatreshermanos.com/_astro/steak-tartar.MYOtBx66_uE5Ax.webp", "boletus": "https://www.tabernatreshermanos.com/_astro/revuelto-de-boletus.BUUady5-_Z2t7guk.webp", "morcilla": "https://www.tabernatreshermanos.com/_astro/morcilla-de-villada.BXMptPvE_4XW3L.webp", "calabacin": "https://www.tabernatreshermanos.com/_astro/calabacin-rebozado.CiC_l6-l_1Xh8ol.webp", "rabas": "https://www.tabernatreshermanos.com/_astro/rabas-de-calamar.J1sqwMm1_1ygdQ0.webp", "huevoroto": "https://www.tabernatreshermanos.com/_astro/huevo-roto-con-jamon-iberico.BwjcU-ih_Z1zwU68.webp", "zorongollo": "https://www.tabernatreshermanos.com/_astro/zorongollo.CMXEMB3a_Z1C5rGg.webp", "mostolena": "https://www.tabernatreshermanos.com/_astro/ensalada-mostolena.Bx4Z3Emx_Z1NM2Bq.webp", "lechazo": "https://www.tabernatreshermanos.com/_astro/lechazo-churro-de-palencia.DRJOOlFR_Z1LXlYO.webp", "paletilla": "https://www.tabernatreshermanos.com/_astro/lechazo-en-cazuela-de-barro.N6Kzy9LO_1pd15O.webp", "cochinillo": "https://www.tabernatreshermanos.com/_astro/cochinillo-asado.B_bA2jVX_11W2nw.webp", "cochifrito": "https://www.tabernatreshermanos.com/_astro/cochifrito.-8DubkL6_1cD0QL.webp", "perdiz": "https://www.tabernatreshermanos.com/_astro/perdiz-escabechada.DmpQJlPj_Zy0Axc.webp", "bacalao": "https://www.tabernatreshermanos.com/_astro/bacalao-con-tomate.CS6NmLYI_ZkzvVR.webp", "rodaballo": "https://www.tabernatreshermanos.com/_astro/pescado-a-la-plancha.C0cLuoOi_3uaLD.webp", "chuletillas": "https://www.tabernatreshermanos.com/_astro/chuletillas-de-lechazo-a-la-brasa.CHA2IEfB_1QLjaS.webp", "entrecot": "https://www.tabernatreshermanos.com/_astro/carne-a-la-brasa-con-patatas.DGPh1SQL_1L06O7.webp", "solofoie": "https://www.tabernatreshermanos.com/_astro/solomillo-con-foie-de-pato.DncTu3Cr_2fpPEH.webp", "presa": "https://www.tabernatreshermanos.com/_astro/presa-iberica.Bn1XEWQe_QNLV7.webp", "vaca": "https://www.tabernatreshermanos.com/_astro/lomo-de-vaca-madurada.CWuppHEz_Z2nSupr.webp", "chuleton": "https://www.tabernatreshermanos.com/_astro/chuleton-palentino.BoNFCOsS_VBsIU.webp", "cachopo": "https://www.tabernatreshermanos.com/_astro/cachopo-para-compartir.Bq7gwKay_OgS1c.webp", "burger": "https://www.tabernatreshermanos.com/_astro/hamburguesa-de-caza.C-UcsdmE_Z1FT56N.webp", "milhoja": "https://www.tabernatreshermanos.com/_astro/milhojas-casera.DX0RwoxR_wuvmF.webp"};
PLATOS_DEF.forEach(p=>{ if(FOTOS_DEF[p.id]) p.foto=FOTOS_DEF[p.id]; });
const MENU_DEF = {activo:false, precio:22, cuando:"Los miércoles (salvo julio y agosto)",
  primeros:["Sopa de cocido"], segundos:["Garbanzos con verdura","Carnes del cocido"],
  postres:["Postre casero o café"], incluye:"Cocido madrileño completo, como el de casa. Pregunta el precio al camarero."};

/* =====================================================================
   TEXTOS DEL CLIENTE EN 3 IDIOMAS
   ===================================================================== */
const TX = {
  es:{verCarta:"Ver la carta", llegar:"Cómo llegar", llevar:"Pedir para llevar", claim:"Bájate aquí: tapas, raciones y buen rato.", masPedido:"Lo que más se pide",
    ver3d:"Ver plato en 3D", b3dT:"Mira el plato antes de pedir", b3dP:"Pulsa «Ver plato en 3D» y ponlo sobre tu mesa con la cámara del móvil, a tamaño real.",
    buscar:"Busca un plato: croquetas, ensalada…", alergia:"¿Alguna alergia? Toca para ocultar los platos que lo lleven:", ocultando:"Ocultando platos con:",
    sinAl:"Sin alérgenos declarados", vacio:"No hay platos con ese filtro. Pregunta al camarero, que seguro que te apañamos algo.", alergenos:"Alérgenos",
    leyAl:"Información según el Reglamento (UE) 1169/2011. En cocina trabajamos con todos estos ingredientes: si tienes una alergia grave, avisa antes de pedir.",
    opinar:"Déjanos tu opinión en Google", parada:"Parada", agotado:"AGOTADO HOY", agotTemp:"Agotado temporalmente", pagarYa:t=>`Pagar ahora con tarjeta · ${t}`, pagarYaP:"Si pagas ahora, tu pedido va directo a cocina sin esperar.", pagando:"Abriendo el pago seguro…", pagoOk:"¡Pagado! Tu pedido ya está en preparación.", pagoKo:"No se ha completado el pago. Puedes intentarlo otra vez o enviarlo y pagar al final.", pagoConf:"Confirmando el pago…", pagado:"Pagado", pagoNoDisp:"El pago con tarjeta no está disponible ahora. Envía el pedido y paga al final.", enviarSinPagar:"Enviar y pagar al final", yaPagado:"Ya pagado", pendiente:"Pendiente", menuDia:"Menú del día", primeros:"Primeros", segundos:"Segundos", postres:"Postre", incluye:"Incluye",
    mesa:"MESA", teAtiende:"te atiende", llevas:"Llevas", noAbierta:"¡Hola! Tu mesa aún no está abierta", noAbiertaP:n=>`En cuanto ${n} la abra podrás pedir desde aquí. Mientras, puedes ver la carta o avisarle.`,
    avisar:n=>`Avisar a ${n}`, avisado:n=>`${n} ya está avisado`, verCartaMientras:"Ver la carta mientras tanto", soloAbierta:"Solo se puede pedir con la mesa abierta: así nadie pide desde fuera del local.",
    apetece:"¿Qué os apetece?", apeteceP:"Pedid desde aquí cuando queráis. Cada uno puede pedir desde su móvil.", pedido:"Pedido", estados:["Enviado","En preparación","Listo · va a tu mesa"],
    ronda:"Otra ronda de lo mismo para beber", verPedido:"Ver el pedido de la mesa", llamar:"Llamar al camarero", avisadoC:"Avisado", pedirCuenta:"Pagar la cuenta", tuPedido:"Tu pedido", total:"Total",
    nota:"¿Algo que debamos saber? (opcional)", notaPh:"Sin cebolla, poco hecha, para compartir…", enviar:"Enviar pedido", seguir:"Seguir mirando", tambien:"¿Os apetece también…?",
    laCuenta:"La cuenta", comoPagar:"¿Cómo vais a pagar? El pago se hace en la mesa, como siempre.", tarjeta:"Con tarjeta", efectivo:"En efectivo", pedirCuentaA:n=>`Pedir la cuenta a ${n}`, ahoraNo:"Ahora no",
    quePagas:"¿Qué vas a pagar tú?", opTodo:"Toda la mesa", opMio:"Solo lo mío", opElegir:"Elegir platos", opPartes:"A partes iguales",
    compartida:"La cuenta es de toda la mesa: cada uno puede abrirla en su móvil pasando la tarjeta y pagar su parte.",
    nadaMio:"Desde este móvil no hay nada pendiente de pagar. Prueba con «Elegir platos».", eligeP:"Toca + en lo que vas a pagar tú.",
    entre:"¿Entre cuántos pagáis lo que queda?", tuParte:"Tu parte", totalPagar:"A pagar", tuyo:"tuyo",
    pagadoUds:(a,b)=>`${a} de ${b} pagado`, pagarTodoP:"Pagas toda la cuenta y la mesa queda cerrada.", pagarParteP:"Pagas solo tu parte; los demás pueden seguir pagando la suya.",
    oCamarero:"¿Prefieres pagar al camarero?", pedirParteA:n=>`Avisar a ${n} para pagar mi parte`, tParte:n=>`Avisado: ${n} viene a cobrarte tu parte.`,
    pagoParteOk:"¡Pagado! Tu parte ya está cobrada.", pagoTodoOk:"¡Cuenta pagada! Gracias por venir.", minimo:"Con tarjeta, el mínimo es 0,50 €.", cuentaCambio:"La cuenta acaba de cambiar (alguien ha pagado o pedido). Revísala y vuelve a intentarlo.",
    pedidoMesa:"Pedido de la mesa", cestaViva:"Cesta compartida: lo que añada cualquiera de la mesa desde su móvil sale aquí al momento.", tu:"Tú", movilN:n=>`Móvil ${n}`,
    comoPagais:"¿Cómo lo pagáis?", opTodoYo:"Todo yo", pagarSel:t=>`Pagar ahora con tarjeta · ${t}`, pagoSelP:"Lo que pagues ahora entra directo en cocina; lo demás sigue en la cesta para los demás.",
    pagarParteYa:t=>`Pagar mi parte · ${t}`, partesInfo:(n,k)=>`Dividido entre ${n}: ${k} de ${n} partes pagadas`, quedanX:t=>`Quedan ${t}`, partesP:"Cuando estén todas las partes pagadas, el pedido entra solo en cocina. Mientras tanto la cesta no se puede cambiar.",
    cancelarDiv:"Cancelar la división", enviarTodo:"Enviar todo y pagar al final", parteOk:t=>`¡Tu parte está pagada! Quedan ${t}.`, parteCompleta:"¡Pagado entero! El pedido va directo a cocina.",
    bloqueada:"La cesta está bloqueada mientras pagáis a partes iguales.", nadaSel:"Elige qué vas a pagar.", menuFinal:"El menú del día se paga al final, con el camarero.", cestaVacia:"La cesta está vacía.",
    cuentaPedida:"Cuenta pedida", vieneDatafono:n=>`${n} viene enseguida con el datáfono.`, vieneCambio:n=>`${n} viene enseguida con el cambio preparado.`,
    queTal:"¿Qué tal todo?", queTalP:"Tu opinión nos ayuda a mejorar. Tarda 5 segundos.", comentario:"¿Algo que contarnos? (opcional)", enviarOp:"Enviar opinión", saltar:"Prefiero no valorar",
    gracias:"¡Gracias por venir!", graciasG:"Si te ha gustado, nos ayudas muchísimo con una reseña en Google.", irGoogle:"Escribir reseña en Google",
    tEnviado:"¡Pedido enviado! El personal lo confirma en un momento.", tEnviadoDirecto:"¡Pedido enviado! Ya está en cocina y barra.", tListo:"¡Tu pedido está listo! Te lo llevan ahora.", tServido:"Pedido servido. ¡Que aproveche!", tAvisado:n=>`Avisado. ${n} lo tiene ya en su móvil.`, tCuenta:n=>`Cuenta pedida. ${n} viene enseguida.`, tNoBebida:"Todavía no habéis pedido bebida.", tCerrada:"La mesa se ha cerrado. Llama al camarero.",
    elegirMenu:"Elige tu menú", anadirMenu:"Añadir menú", menuDe:"Menú del día",
    llT:"Para llevar", llP:"Pide ahora y recógelo en la barra a la hora que elijas. Pagas al recoger.", nombre:"Tu nombre", tel:"Teléfono (por si hay que avisarte)", hora:"Hora de recogida", loAntes:"Lo antes posible",
    hacerPedido:"Hacer el pedido", tuCodigo:"Tu código de recogida", pagaRecoger:"Pagas al recogerlo, con tarjeta o en efectivo.", estadosLl:["Enviado","Preparando","¡Listo! Pasa a recoger","Recogido"], seguirPedido:"Ver mi pedido para llevar", faltaNombre:"Escribe tu nombre para el pedido.",
    esperaConf:"Esperando a que el personal lo confirme…", rechazado:"No aceptado", rechazadoP:"El personal no ha podido aceptar este pedido. Llama al camarero si crees que es un error.", tAceptado:"Pedido confirmado: ya se está preparando.", tRechazado:"Un pedido no se ha podido aceptar.",
    enlaceMal:"Este enlace no es válido", enlaceMalP:"Acerca otra vez el móvil a la tarjeta de tu mesa o pide ayuda al personal.", comprobando:"Comprobando tu mesa…", pausado:"Ahora mismo no se aceptan pedidos desde el móvil", pausadoP:"Pide directamente al personal. ¡Gracias!", llevarOff:"Ahora mismo no hacemos pedidos para llevar desde la web."},
  en:{verCarta:"See the menu", llegar:"Directions", llevar:"Order to take away", claim:"Hop off here: tapas, sharing plates and good times.", masPedido:"Most popular",
    ver3d:"See it in 3D", b3dT:"See the dish before you order", b3dP:"Tap «See it in 3D» and place it on your table with your phone's camera, at real size.",
    buscar:"Search: croquettes, salad…", alergia:"Any allergies? Tap to hide dishes that contain them:", ocultando:"Hiding dishes with:",
    sinAl:"No declared allergens", vacio:"No dishes match. Ask the waiter, we'll sort something out.", alergenos:"Allergens",
    leyAl:"Information under EU Regulation 1169/2011. Our kitchen handles all these ingredients: if you have a severe allergy, tell us before ordering.",
    opinar:"Review us on Google", parada:"Stop", agotado:"SOLD OUT TODAY", agotTemp:"Temporarily sold out", pagarYa:t=>`Pay now by card · ${t}`, pagarYaP:"Pay now and your order goes straight to the kitchen.", pagando:"Opening secure payment…", pagoOk:"Paid! Your order is being prepared.", pagoKo:"The payment wasn't completed. Try again or send the order and pay at the end.", pagoConf:"Confirming payment…", pagado:"Paid", pagoNoDisp:"Card payment isn't available right now. Send your order and pay at the end.", enviarSinPagar:"Send and pay at the end", yaPagado:"Already paid", pendiente:"To pay", menuDia:"Today's set menu", primeros:"Starters", segundos:"Mains", postres:"Dessert", incluye:"Includes",
    mesa:"TABLE", teAtiende:"your waiter is", llevas:"So far", noAbierta:"Hi! Your table isn't open yet", noAbiertaP:n=>`As soon as ${n} opens it you can order from here. Meanwhile, browse the menu or call them.`,
    avisar:n=>`Call ${n}`, avisado:n=>`${n} is on the way`, verCartaMientras:"Browse the menu meanwhile", soloAbierta:"You can only order when the table is open, so nobody can order from outside.",
    apetece:"What would you like?", apeteceP:"Order from here whenever you like. Everyone can order from their own phone.", pedido:"Order", estados:["Sent","Being prepared","Ready · on its way"],
    ronda:"Same round of drinks again", verPedido:"View table order", llamar:"Call waiter", avisadoC:"Called", pedirCuenta:"Pay the bill", tuPedido:"Your order", total:"Total",
    nota:"Anything we should know? (optional)", notaPh:"No onion, well done, to share…", enviar:"Send order", seguir:"Keep browsing", tambien:"Fancy adding…?",
    laCuenta:"The bill", comoPagar:"How will you pay? You pay at the table as usual.", tarjeta:"By card", efectivo:"In cash", pedirCuentaA:n=>`Ask ${n} for the bill`, ahoraNo:"Not now",
    quePagas:"What are you paying?", opTodo:"Whole table", opMio:"Just mine", opElegir:"Pick items", opPartes:"Split equally",
    compartida:"The bill is shared by the whole table: everyone can open it on their phone by tapping the card and pay their share.",
    nadaMio:"Nothing ordered from this phone is left to pay. Try «Pick items».", eligeP:"Tap + on what you're paying for.",
    entre:"How many of you are splitting what's left?", tuParte:"Your share", totalPagar:"To pay", tuyo:"yours",
    pagadoUds:(a,b)=>`${a} of ${b} paid`, pagarTodoP:"You pay the whole bill and the table is closed.", pagarParteP:"You only pay your share; the others can still pay theirs.",
    oCamarero:"Rather pay the waiter?", pedirParteA:n=>`Ask ${n} to take my share`, tParte:n=>`${n} is coming to take your share.`,
    pagoParteOk:"Paid! Your share is settled.", pagoTodoOk:"Bill paid! Thanks for coming.", minimo:"The card minimum is €0.50.", cuentaCambio:"The bill just changed (someone paid or ordered). Check it and try again.",
    pedidoMesa:"Table order", cestaViva:"Shared basket: whatever anyone at the table adds from their phone shows up here right away.", tu:"You", movilN:n=>`Phone ${n}`,
    comoPagais:"How are you paying?", opTodoYo:"All on me", pagarSel:t=>`Pay now by card · ${t}`, pagoSelP:"What you pay now goes straight to the kitchen; the rest stays in the basket for the others.",
    pagarParteYa:t=>`Pay my share · ${t}`, partesInfo:(n,k)=>`Split between ${n}: ${k} of ${n} shares paid`, quedanX:t=>`${t} left`, partesP:"Once every share is paid, the order goes to the kitchen by itself. Meanwhile the basket can't be changed.",
    cancelarDiv:"Cancel the split", enviarTodo:"Send everything and pay at the end", parteOk:t=>`Your share is paid! ${t} left.`, parteCompleta:"All paid! The order goes straight to the kitchen.",
    bloqueada:"The basket is locked while you split the payment.", nadaSel:"Choose what you're paying for.", menuFinal:"The set menu is paid at the end, with the waiter.", cestaVacia:"The basket is empty.",
    cuentaPedida:"Bill requested", vieneDatafono:n=>`${n} is coming with the card reader.`, vieneCambio:n=>`${n} is coming with your change ready.`,
    queTal:"How was everything?", queTalP:"Your opinion helps us improve. Takes 5 seconds.", comentario:"Anything to tell us? (optional)", enviarOp:"Send", saltar:"Skip",
    gracias:"Thanks for coming!", graciasG:"If you enjoyed it, a Google review helps us a lot.", irGoogle:"Write a Google review",
    tEnviado:"Order sent! The staff will confirm it in a moment.", tEnviadoDirecto:"Order sent! It's in the kitchen and at the bar.", tListo:"Your order is ready! It's on its way.", tServido:"Served. Enjoy!", tAvisado:n=>`Done. ${n} has it on their phone.`, tCuenta:n=>`Bill requested. ${n} is coming.`, tNoBebida:"You haven't ordered drinks yet.", tCerrada:"The table has been closed. Call the waiter.",
    elegirMenu:"Choose your set menu", anadirMenu:"Add set menu", menuDe:"Set menu",
    llT:"Take away", llP:"Order now and pick it up at the bar at the time you choose. Pay on collection.", nombre:"Your name", tel:"Phone (in case we need to call)", hora:"Pick-up time", loAntes:"As soon as possible",
    hacerPedido:"Place order", tuCodigo:"Your pick-up code", pagaRecoger:"Pay when you collect it, by card or cash.", estadosLl:["Sent","Preparing","Ready! Come and collect","Collected"], seguirPedido:"Track my take-away", faltaNombre:"Please enter your name.",
    esperaConf:"Waiting for the staff to confirm…", rechazado:"Not accepted", rechazadoP:"The staff couldn't accept this order. Call the waiter if you think it's a mistake.", tAceptado:"Order confirmed: it's being prepared.", tRechazado:"An order couldn't be accepted.",
    enlaceMal:"This link isn't valid", enlaceMalP:"Tap your phone on your table's card again or ask the staff.", comprobando:"Checking your table…", pausado:"Phone ordering is paused right now", pausadoP:"Please order directly with the staff. Thank you!", llevarOff:"Take-away orders from the web aren't available right now."},
  pt:{verCarta:"Ver a ementa", llegar:"Como chegar", llevar:"Pedir para levar", claim:"Saia aqui: tapas, pratos para partilhar e bons momentos.", masPedido:"Os mais pedidos",
    ver3d:"Ver o prato em 3D", b3dT:"Veja o prato antes de pedir", b3dP:"Toque em «Ver o prato em 3D» e coloque-o na sua mesa com a câmara do telemóvel, em tamanho real.",
    buscar:"Procure: croquetes, salada…", alergia:"Alguma alergia? Toque para esconder os pratos que a contêm:", ocultando:"A esconder pratos com:",
    sinAl:"Sem alergénios declarados", vacio:"Nenhum prato com esse filtro. Pergunte ao empregado.", alergenos:"Alergénios",
    leyAl:"Informação segundo o Regulamento (UE) 1169/2011. Na cozinha trabalhamos com todos estes ingredientes: se tiver uma alergia grave, avise antes de pedir.",
    opinar:"Deixe a sua opinião no Google", parada:"Paragem", agotado:"ESGOTADO HOJE", agotTemp:"Esgotado temporariamente", pagarYa:t=>`Pagar agora com cartão · ${t}`, pagarYaP:"Se pagar agora, o pedido vai direto para a cozinha.", pagando:"A abrir o pagamento seguro…", pagoOk:"Pago! O seu pedido já está a ser preparado.", pagoKo:"O pagamento não foi concluído. Tente de novo ou envie e pague no fim.", pagoConf:"A confirmar o pagamento…", pagado:"Pago", pagoNoDisp:"O pagamento com cartão não está disponível agora. Envie o pedido e pague no fim.", enviarSinPagar:"Enviar e pagar no fim", yaPagado:"Já pago", pendiente:"Por pagar", menuDia:"Menu do dia", primeros:"Entradas", segundos:"Pratos principais", postres:"Sobremesa", incluye:"Inclui",
    mesa:"MESA", teAtiende:"é atendido por", llevas:"Até agora", noAbierta:"Olá! A sua mesa ainda não está aberta", noAbiertaP:n=>`Assim que ${n} a abrir poderá pedir daqui. Entretanto, veja a ementa ou chame-o.`,
    avisar:n=>`Chamar ${n}`, avisado:n=>`${n} já foi avisado`, verCartaMientras:"Ver a ementa entretanto", soloAbierta:"Só se pode pedir com a mesa aberta: assim ninguém pede de fora.",
    apetece:"O que vos apetece?", apeteceP:"Peçam daqui quando quiserem. Cada um pode pedir do seu telemóvel.", pedido:"Pedido", estados:["Enviado","Em preparação","Pronto · a caminho"],
    ronda:"Outra rodada das mesmas bebidas", verPedido:"Ver o pedido da mesa", llamar:"Chamar o empregado", avisadoC:"Avisado", pedirCuenta:"Pagar a conta", tuPedido:"O seu pedido", total:"Total",
    nota:"Algo que devamos saber? (opcional)", notaPh:"Sem cebola, bem passado, para partilhar…", enviar:"Enviar pedido", seguir:"Continuar a ver", tambien:"Apetece-vos também…?",
    laCuenta:"A conta", comoPagar:"Como vão pagar? O pagamento faz-se na mesa, como sempre.", tarjeta:"Com cartão", efectivo:"Em dinheiro", pedirCuentaA:n=>`Pedir a conta a ${n}`, ahoraNo:"Agora não",
    quePagas:"O que vai pagar?", opTodo:"A mesa toda", opMio:"Só o meu", opElegir:"Escolher pratos", opPartes:"Em partes iguais",
    compartida:"A conta é da mesa toda: cada um pode abri-la no telemóvel passando o cartão e pagar a sua parte.",
    nadaMio:"Não há nada pedido deste telemóvel por pagar. Experimente «Escolher pratos».", eligeP:"Toque em + no que vai pagar.",
    entre:"Entre quantos dividem o que falta?", tuParte:"A sua parte", totalPagar:"A pagar", tuyo:"seu",
    pagadoUds:(a,b)=>`${a} de ${b} pago`, pagarTodoP:"Paga a conta toda e a mesa fica fechada.", pagarParteP:"Paga só a sua parte; os outros podem pagar a deles.",
    oCamarero:"Prefere pagar ao empregado?", pedirParteA:n=>`Pedir a ${n} para pagar a minha parte`, tParte:n=>`${n} vem cobrar a sua parte.`,
    pagoParteOk:"Pago! A sua parte está paga.", pagoTodoOk:"Conta paga! Obrigado pela visita.", minimo:"Com cartão, o mínimo é 0,50 €.", cuentaCambio:"A conta acabou de mudar (alguém pagou ou pediu). Reveja e tente de novo.",
    pedidoMesa:"Pedido da mesa", cestaViva:"Cesto partilhado: o que qualquer pessoa da mesa juntar no telemóvel aparece aqui logo.", tu:"Você", movilN:n=>`Telemóvel ${n}`,
    comoPagais:"Como vão pagar?", opTodoYo:"Pago eu tudo", pagarSel:t=>`Pagar já com cartão · ${t}`, pagoSelP:"O que pagar agora vai direto para a cozinha; o resto fica no cesto para os outros.",
    pagarParteYa:t=>`Pagar a minha parte · ${t}`, partesInfo:(n,k)=>`Dividido entre ${n}: ${k} de ${n} partes pagas`, quedanX:t=>`Faltam ${t}`, partesP:"Quando todas as partes estiverem pagas, o pedido entra sozinho na cozinha. Até lá o cesto não pode mudar.",
    cancelarDiv:"Cancelar a divisão", enviarTodo:"Enviar tudo e pagar no fim", parteOk:t=>`A sua parte está paga! Faltam ${t}.`, parteCompleta:"Tudo pago! O pedido vai direto para a cozinha.",
    bloqueada:"O cesto está bloqueado enquanto pagam em partes iguais.", nadaSel:"Escolha o que vai pagar.", menuFinal:"O menu do dia paga-se no fim, com o empregado.", cestaVacia:"O cesto está vazio.",
    cuentaPedida:"Conta pedida", vieneDatafono:n=>`${n} vem já com o terminal de pagamento.`, vieneCambio:n=>`${n} vem já com o troco preparado.`,
    queTal:"Correu tudo bem?", queTalP:"A sua opinião ajuda-nos a melhorar. Demora 5 segundos.", comentario:"Algo a dizer-nos? (opcional)", enviarOp:"Enviar", saltar:"Prefiro não avaliar",
    gracias:"Obrigado pela visita!", graciasG:"Se gostou, uma avaliação no Google ajuda-nos muito.", irGoogle:"Escrever avaliação no Google",
    tEnviado:"Pedido enviado! O pessoal confirma num instante.", tEnviadoDirecto:"Pedido enviado! Já está na cozinha e no bar.", tListo:"O seu pedido está pronto! Já vai a caminho.", tServido:"Servido. Bom apetite!", tAvisado:n=>`Avisado. ${n} já tem no telemóvel.`, tCuenta:n=>`Conta pedida. ${n} vem já.`, tNoBebida:"Ainda não pediram bebidas.", tCerrada:"A mesa foi fechada. Chame o empregado.",
    elegirMenu:"Escolha o seu menu", anadirMenu:"Adicionar menu", menuDe:"Menu do dia",
    llT:"Para levar", llP:"Peça agora e levante no balcão à hora que escolher. Paga ao levantar.", nombre:"O seu nome", tel:"Telefone (caso seja preciso avisar)", hora:"Hora de levantamento", loAntes:"O mais cedo possível",
    hacerPedido:"Fazer o pedido", tuCodigo:"O seu código de levantamento", pagaRecoger:"Paga ao levantar, com cartão ou em dinheiro.", estadosLl:["Enviado","A preparar","Pronto! Venha levantar","Levantado"], seguirPedido:"Ver o meu pedido para levar", faltaNombre:"Escreva o seu nome.",
    esperaConf:"À espera da confirmação do pessoal…", rechazado:"Não aceite", rechazadoP:"O pessoal não pôde aceitar este pedido. Chame o empregado se achar que é um erro.", tAceptado:"Pedido confirmado: já está em preparação.", tRechazado:"Um pedido não pôde ser aceite.",
    enlaceMal:"Esta ligação não é válida", enlaceMalP:"Aproxime de novo o telemóvel do cartão da sua mesa ou peça ajuda ao pessoal.", comprobando:"A verificar a sua mesa…", pausado:"Neste momento não se aceitam pedidos pelo telemóvel", pausadoP:"Peça diretamente ao pessoal. Obrigado!", llevarOff:"Neste momento não fazemos pedidos para levar pela web."}
};
let LANG = (()=>{ try{ const l=localStorage.getItem("lp-lang"); if(l&&TX[l]) return l; }catch(e){} const n=(navigator.language||"es").slice(0,2); return TX[n]?n:"es"; })();
const T = (k,...a) => { const v=(TX[LANG]&&TX[LANG][k]!==undefined)?TX[LANG][k]:TX.es[k]; return typeof v==="function"?v(...a):v; };
const idiomaHTML = () => `<div class="idioma" role="group" aria-label="Idioma / Language">${[["es","ES"],["en","EN"],["pt","PT"]].map(([k,l])=>`<button data-lang="${k}" aria-pressed="${LANG===k}" lang="${k}">${l}</button>`).join("")}</div>`;
document.addEventListener("click",e=>{ const b=e.target.closest("[data-lang]"); if(!b) return; LANG=b.dataset.lang; try{ localStorage.setItem("lp-lang",LANG); }catch(_){} document.documentElement.lang=LANG; vista && vista.pintar(); });
document.documentElement.lang=LANG;

/* =====================================================================
   ALMACÉN: base de datos compartida (Supabase) o este navegador (modo local).
   Cada restaurante es un "tenant": se elige con ?r=nombre en la dirección.
   ===================================================================== */
const TENANT = (()=>{ try{ const r=new URLSearchParams(location.search).get("r"); if(r && /^[a-z0-9-]{2,40}$/.test(r)) return r; }catch(e){} return "tres-hermanos"; })();
// Lo que escriben los clientes sin cuenta (pedidos, avisos, reservas, valoraciones, carritos) se limpia al leerlo:
// el id es siempre el de la fila, los campos numéricos son números y ningún texto lleva < > " ` (no puede inyectar HTML en las pantallas del personal)
const COLS_PUBLICAS = new Set(["pedidos","avisos","reservas","valoraciones","carritos"]);
const CAMPOS_NUM = new Set(["t","mesa","personas","q","p","precio","total","importe","listoT","cambioT","desde"]);
function limpiarDoc(col,id,d){
  if(!COLS_PUBLICAS.has(col) || !d || typeof d!=="object") return d;
  const sano=(v,k)=>{ if(typeof v==="string") return CAMPOS_NUM.has(k)&&v.trim()!==""&&!isNaN(+v) ? +v : v.replace(/[<>"`]/g,"");
    if(typeof v==="number") return Number.isFinite(v)?v:0;
    if(Array.isArray(v)) return v.slice(0,200).map(x=>sano(x,k));
    if(v&&typeof v==="object"){ const o={}; for(const [kk,vv] of Object.entries(v)) o[kk.replace(/[^\w-]/g,"")]=sano(vv,kk); return o; }
    return v; };
  const o=sano(d,""); o.id=id; for(const k of CAMPOS_NUM) if(k in o && typeof o[k]!=="number" && o[k]!=null && typeof o[k]!=="boolean") o[k]=0;
  return o; }
const COLS = ["carritos","mesas","pedidos","tickets","avisos","cuentas","config","valoraciones","chat","nfc","reservas","articulos","movimientos","proveedores","compras","cierres","atenciones","fichajes"];
const Store = {
  modo:"local", data:Object.fromEntries(COLS.map(c=>[c,new Map()])), oyentes:new Set(), colas:new Map(), sb:null, sesion:null, rol:null, cam:null, ver:0,
  on(fn){ this.oyentes.add(fn); },
  emit(){ this.ver++; this.oyentes.forEach(f=>{ try{f();}catch(e){console.error(e);} }); },
  get(c,id){ return this.data[c].get(String(id)); },
  all(c){ return [...this.data[c].values()]; },
  // Cliente sin cuenta conectado a la base de datos: solo puede crear, no leer pedidos ajenos
  publico(){ return this.modo==="supa" && !(this.sesion && this.rol); },
  // Puede ver y mover el día a día del restaurante
  personal(){ return this.modo==="local" || (!!this.sesion && !!this.rol); },
  _cola(k,fn){ const prev=this.colas.get(k)||Promise.resolve(); const p=prev.then(fn).catch(e=>this.fallo(e)); this.colas.set(k,p); return p; },
  async set(c,id,obj){
    id=String(id); const limpio=JSON.parse(JSON.stringify(obj));
    this.data[c].set(id,limpio); this.emit();
    if(this.modo==="supa") return this._cola(c+"/"+id, async()=>{ const {error}=await this.sb.from("docs").upsert({tenant:TENANT,col:c,id,data:limpio,updated_at:new Date().toISOString()}); if(error) throw error; });
    Local.volcar();
  },
  // Lo que crea el cliente: se inserta y nunca se sobrescribe. Devuelve false si la base de datos lo rechaza.
  async crear(c,id,obj){
    if(!this.publico()){ await this.set(c,id,obj); return true; }
    id=String(id); const limpio=JSON.parse(JSON.stringify(obj));
    this.data[c].set(id,limpio); this.emit();
    const {error}=await this.sb.from("docs").insert({tenant:TENANT,col:c,id,data:limpio});
    if(error){ this.data[c].delete(id); this.emit(); this.fallo(error); return false; }
    return true;
  },
  async del(c,id){
    id=String(id); this.data[c].delete(id); this.emit();
    if(this.modo==="supa") return this._cola(c+"/"+id, async()=>{ const {error}=await this.sb.from("docs").delete().eq("tenant",TENANT).eq("col",c).eq("id",id); if(error) throw error; });
    Local.volcar();
  },
  fallo(e){
    console.warn("db",e);
    if(e && (e.code==="42501"||/row-level security|permission/i.test(e.message||""))) toast(this.publico()?"No se ha podido enviar: la mesa no está abierta o el enlace no es válido. Avisa al personal.":"No tienes permiso para esto con tu cuenta.");
    else toast("No se ha podido guardar. Revisa la conexión e inténtalo otra vez.");
  }
};
const Local = {
  clave:t=>"metriax-"+(t||TENANT), canal:null,
  cargar(){ this.leer(); try{ this.canal=new BroadcastChannel("metriax"); this.canal.onmessage=ev=>{ if(Store.modo!=="local") return; if(ev.data===TENANT||ev.data==="*") this.leer(); Store.emit(); }; }catch(e){}
    addEventListener("storage",ev=>{ if(Store.modo!=="local"||!ev.key) return; if(ev.key===this.clave()) this.leer(); Store.emit(); }); },
  leer(){ try{ const o=JSON.parse(localStorage.getItem(this.clave())||"{}"); COLS.forEach(c=>Store.data[c]=new Map(Object.entries(o[c]||{}))); }catch(e){} },
  volcar(){ try{ const o={}; COLS.forEach(c=>o[c]=Object.fromEntries(Store.data[c])); localStorage.setItem(this.clave(),JSON.stringify(o)); this.canal&&this.canal.postMessage(TENANT); }
    catch(e){ toast("Este navegador se ha quedado sin espacio. Usa «Cerrar el día» o sube un logo más pequeño."); } },
  // Otros restaurantes de este navegador (los usa el panel maestro en modo local)
  leerDe(t){ try{ return JSON.parse(localStorage.getItem(this.clave(t))||"{}"); }catch(e){ return {}; } },
  escribirDoc(t,c,id,data){
    if(t===TENANT){ return data===null?Store.del(c,id):Store.set(c,id,data); }
    const o=this.leerDe(t); o[c]=o[c]||{}; if(data===null) delete o[c][id]; else o[c][String(id)]=data;
    try{ localStorage.setItem(this.clave(t),JSON.stringify(o)); this.canal&&this.canal.postMessage(t); }catch(e){ toast("No se ha podido guardar en este navegador."); }
  },
  registro(){ try{ return JSON.parse(localStorage.getItem("metriax-restaurantes")||"[]"); }catch(e){ return []; } },
  guardarRegistro(l){ try{ localStorage.setItem("metriax-restaurantes",JSON.stringify(l)); this.canal&&this.canal.postMessage("*"); }catch(e){} }
};
Local.cargar();

// Conexión con Supabase. Pega aquí los datos de tu proyecto (Supabase > Project Settings > API).
// Mientras sigan con "__", todo funciona en modo local (en este navegador), ideal para enseñar la demo sin internet.
// La clave "anon" es pública por diseño: la seguridad va en las reglas de supabase.sql.
const SUPA_URL = "https://nchhioxmgrdngrzkxzza.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGhpb3htZ3Jkbmdyemt4enphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwOTgwMDEsImV4cCI6MjExMDY3NDAwMX0.e4X335EXPQ47LscEdBz01e6e-z8p00vF7r0_WndF9ek";
// Rol de la cuenta en este restaurante (dueño, sala, cocina o super) y camarero que es
async function leerRol(){
  Store.rol=null; Store.cam=null; Store.estado=null; if(!Store.sesion||!Store.sb) return;
  try{ const {data,error}=await Store.sb.rpc("mi_ficha",{p_tenant:TENANT}); if(!error&&data){ Store.rol=data.rol||null; Store.cam=data.cam||null; Store.estado=data.estado||null; } }catch(e){}
}
async function conectarSupabase(){
  if(!window.supabase || SUPA_URL.startsWith("__")) return false;
  const sb=window.supabase.createClient(SUPA_URL,SUPA_KEY,{auth:{persistSession:true,autoRefreshToken:true,storageKey:"metriax-auth"}});
  Store.sb=sb;
  try{ const {data}=await sb.auth.getSession(); Store.sesion=data.session||null; }catch(e){ Store.sesion=null; }
  await leerRol();
  sb.auth.onAuthStateChange((ev,ses)=>{ const antes=!!Store.sesion; Store.sesion=ses||null; if(antes!==!!ses){ setTimeout(async()=>{ await leerRol(); if(Store.recargar) await Store.recargar().catch(()=>{}); reiniciarVista(); },0); } });
  const cargar=async()=>{ const m=Object.fromEntries(COLS.map(c=>[c,new Map()])); let desde=0;
    while(true){ const {data,error}=await sb.from("docs").select("col,id,data").eq("tenant",TENANT).range(desde,desde+999); if(error) throw error;
      data.forEach(r=>{ if(m[r.col]) m[r.col].set(r.id,limpiarDoc(r.col,r.id,r.data)); }); if(data.length<1000) break; desde+=1000; }
    // El cliente sin cuenta no puede leer pedidos: conserva los que ha traído su propia pantalla
    if(Store.publico()) Store.data.pedidos.forEach((v,k)=>m.pedidos.set(k,v));
    COLS.forEach(c=>Store.data[c]=m[c]); Store.cerrado = !(Store.sesion && Store.rol) && m.config.size===0; Store.emit();
    // Primera vez que entra un administrador: guarda la carta de la plantilla en la base de datos (así sala puede marcar agotados)
    if(Store.sesion && ["dueno","super"].includes(Store.rol) && !m.config.has("carta")) setTimeout(()=>{ if(Store.modo==="supa") Acc.carta({}).catch?.(()=>{}); },0); };
  Store.recargar=cargar;
  try{ await cargar(); }catch(e){ console.warn("supabase",e); toast("No se ha podido conectar con la base de datos. Funcionando en modo local."); Store.sb=null; return false; }
  Store.modo="supa"; Store.emit();
  sb.channel("docs-"+TENANT).on("postgres_changes",{event:"*",schema:"public",table:"docs",filter:"tenant=eq."+TENANT},p=>{
    if(p.eventType==="DELETE"){ const o=p.old||{}; if(o.col && Store.data[o.col] && (!o.tenant||o.tenant===TENANT)){ Store.data[o.col].delete(o.id); Store.emit(); } return; }
    const r=p.new; if(r && r.tenant===TENANT && Store.data[r.col]){ Store.data[r.col].set(r.id,limpiarDoc(r.col,r.id,r.data)); Store.emit(); }
  }).subscribe(st=>{ if(st==="CHANNEL_ERROR"||st==="TIMED_OUT") toast("Conexión en vivo interrumpida. Reintentando…"); if(st==="SUBSCRIBED" && Store._resync){ cargar().catch(()=>{}); } Store._resync=true; });
  document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") cargar().catch(()=>{}); });
  reiniciarVista();
  return true;
}
// Si se publica una versión nueva, la página se recarga sola (al volver a la pestaña, al pasar el NFC o cada 5 min),
// salvo mientras alguien escribe
(function autoActualizar(){ let et=null, pend=false;
  const ver=async()=>{ try{ const r=await fetch(location.pathname+"?v="+Date.now(),{method:"HEAD",cache:"no-store"}); const e=r.headers.get("etag")||r.headers.get("last-modified"); if(!e) return;
    if(et&&e!==et) pend=true; et=et||e; if(pend){ const ae=document.activeElement; if(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return; location.reload(); } }catch(_){} };
  ver(); document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") ver(); }); addEventListener("hashchange",ver); addEventListener("pageshow",e=>{ if(e.persisted) ver(); }); setInterval(ver,300000); })();
async function conectarDB(){ try{ await conectarSupabase(); }catch(e){ console.warn("conexión",e); } if(!vista) reiniciarVista(); }
// Lo que el cliente sin cuenta pide a la base de datos (solo su mesa o su pedido para llevar)
const Remoto = {
  async pago(body){ const {data,error}=await Store.sb.functions.invoke("pago",{body:{tenant:TENANT,...body}});
    if(error){ let d=null; try{ d=await error.context.json(); }catch(_){} return d||{error:"red"}; } return data; },
  async mesa(n,tk){
    const {data,error}=await Store.sb.rpc("mesa_cliente",{p_tenant:TENANT,p_mesa:String(n),p_tk:tk||""}); if(error) throw error;
    if(data && data.ok){ const foto=()=>JSON.stringify([Store.get("mesas",n),Store.get("carritos",n),...(data.pedidos||[]).map(p=>Store.get("pedidos",p.id))]), antes=foto();
      if(data.mesa) Store.data.mesas.set(String(n),data.mesa); if(data.carrito) Store.data.carritos.set(String(n),data.carrito); (data.pedidos||[]).forEach(p=>Store.data.pedidos.set(p.id,p));
      if(foto()!==antes) Store.emit(); }
    return data;
  },
  // Cesta compartida de la mesa: guardar lo de este móvil / quitar lo ya enviado
  async cesta(n,tk,mapa,ronda){ const {data,error}=await Store.sb.rpc("carrito_set",{p_tenant:TENANT,p_mesa:String(n),p_tk:tk||"",p_disp:DISP,p_mapa:mapa,p_ronda:ronda}); if(error) throw error;
    if(data&&data.por){ const {error:_e,...c}=data; Store.data.carritos.set(String(n),c); Store.emit(); } return data; },
  async cestaQuitar(n,tk,quitar){ const {data,error}=await Store.sb.rpc("carrito_quitar",{p_tenant:TENANT,p_mesa:String(n),p_tk:tk||"",p_quitar:quitar}); if(error) throw error;
    if(data&&data.por){ Store.data.carritos.set(String(n),data); Store.emit(); } return data; },
  async reserva(id){
    const {data,error}=await Store.sb.rpc("reserva_publica",{p_tenant:TENANT,p_id:id}); if(error) throw error;
    if(data && JSON.stringify(data)!==JSON.stringify(Store.get("reservas",id))){ Store.data.reservas.set(id,data); Store.emit(); }
    return data;
  },
  async llevar(id){
    const {data,error}=await Store.sb.rpc("pedido_llevar",{p_tenant:TENANT,p_id:id}); if(error) throw error;
    if(data && JSON.stringify(data)!==JSON.stringify(Store.get("pedidos",id))){ Store.data.pedidos.set(id,data); Store.emit(); }
    return data;
  }
};

const CestaMesa = {
  async set(n,tk,mapa,ronda){ if(Store.modo==="supa"&&tk) return Remoto.cesta(n,tk,mapa,ronda);
    const c={mesa:n,por:{},ronda:0,partes:null,...(Store.get("carritos",n)||{})}; if((c.ronda||0)!==ronda) return c;
    const por={...(c.por||{})}; if(Object.keys(mapa).length) por[DISP]=mapa; else delete por[DISP];
    const nc={...c,por,partes:null,t:ahora()}; await Store.set("carritos",n,nc); return nc; },
  async quitar(n,tk,quitar){ if(Store.modo==="supa"&&tk) return Remoto.cestaQuitar(n,tk,quitar);
    const c={mesa:n,por:{},ronda:0,...(Store.get("carritos",n)||{})}, por=JSON.parse(JSON.stringify(c.por||{}));
    Object.entries(quitar||{}).forEach(([d,m])=>{ const a=por[d]||{}; Object.entries(m||{}).forEach(([k,q])=>{ const v=(a[k]||0)-q; if(v>0) a[k]=v; else delete a[k]; }); if(Object.keys(a).length) por[d]=a; else delete por[d]; });
    const nc={...c,por,ronda:(c.ronda||0)+1,partes:null,t:ahora()}; await Store.set("carritos",n,nc); return nc; }
};

/* =====================================================================
   CONFIGURACIÓN Y CONSULTAS
   ===================================================================== */
const ahora = () => Date.now();
const nid = () => { const a=new Uint8Array(8); try{ crypto.getRandomValues(a); }catch(e){ for(let i=0;i<8;i++) a[i]=Math.random()*256|0; } return ahora().toString(36)+[...a].map(b=>"abcdefghijklmnopqrstuvwxyz0123456789"[b%36]).join(""); };
const eur = v => (Math.round(v*100)/100).toLocaleString("es-ES",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";
const eur0 = v => Math.round(v).toLocaleString("es-ES")+" €";
const mmss = ms => { const s=Math.max(0,Math.floor(ms/1000)); const h=Math.floor(s/3600), m=Math.floor(s%3600/60); return h?`${h} h ${String(m).padStart(2,"0")}`:`${m}:${String(s%60).padStart(2,"0")}`; };
const hhmm = t => new Date(t).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const inicioDia = (dias=0) => { const d=new Date(); if(d.getHours()<5) d.setDate(d.getDate()-1); d.setHours(5,0,0,0); d.setDate(d.getDate()-dias); return d.getTime(); };
// Código secreto de 12 caracteres para el enlace NFC de cada mesa
// Cada móvil lleva un identificador propio: así sabe qué pidió él dentro de la cuenta compartida de la mesa
const DISP = (()=>{ try{ let d=localStorage.getItem("disp-mesa"); if(!d||!/^[a-z0-9]{6,16}$/.test(d)){ const a=new Uint8Array(10); crypto.getRandomValues(a); d=[...a].map(b=>"abcdefghijkmnpqrstuvwxyz23456789"[b%32]).join(""); localStorage.setItem("disp-mesa",d); } return d; }catch(_){ return "x"+Math.random().toString(36).slice(2,11); } })();
const tokenNuevo = () => { const a=new Uint8Array(12); try{ crypto.getRandomValues(a); }catch(e){ for(let i=0;i<12;i++) a[i]=Math.random()*256|0; } return [...a].map(b=>"abcdefghijkmnpqrstuvwxyz23456789"[b%32]).join(""); };
// Modo demo (sin base de datos): código fijo por restaurante y mesa, igual en cualquier móvil o tablet
const tokenDemo = n => { const A="abcdefghijkmnpqrstuvwxyz23456789", s="metriax|"+TENANT+"|mesa|"+n; let h=2166136261>>>0, out="";
  for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619)>>>0; }
  for(let i=0;i<12;i++){ h^=(h<<13)>>>0; h>>>=0; h^=h>>>17; h^=(h<<5)>>>0; h>>>=0; out+=A[h%32]; } return out; };
const slugDe = s => norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40);

const cfgBar = () => { const c=Store.get("config","bar")||{}; return {...BAR_DEF,...c, camareros:(c.camareros&&c.camareros.length)?c.camareros:BAR_DEF.camareros}; };
const cfgPrivado = () => ({telefono:"",email:"",...(Store.get("config","privado")||{})});
const cfgReglas = () => ({...REGLAS_DEF,...(Store.get("config","reglas")||{})});
const mesasN = () => Math.max(1,Math.min(99,+cfgBar().mesas||20));
const zonaDe = n => n<=+cfgBar().interiorHasta?"Interior":"Terraza";
const cams = () => cfgBar().camareros;
const cfgCarta = () => { const c=Store.get("config","carta")||{}; return {secciones:(Array.isArray(c.secciones)&&c.secciones.length)?c.secciones:SECCIONES_DEF, platos:Array.isArray(c.platos)?c.platos:PLATOS_DEF, agotados:c.agotados||{}}; };
const secciones = () => cfgCarta().secciones;
// «Fuera de carta»: platos o bebidas por tiempo limitado (config/temporal). Se añaden a la carta del cliente sin tocar la carta fija.
const SEC_TMP = {id:"fuera-carta", n:"Fuera de carta", nota:"Solo por tiempo limitado: cuando se acaba, se acaba", en:["Off the menu","Limited time only"], pt:["Fora da carta","Só por tempo limitado"], dest:"cocina", icono:"sarten"};
const cfgTemp = () => { const c=Store.get("config","temporal")||{}; return Array.isArray(c.items)?c.items:[]; };
const tempVigente = t => { const h=fechaISO(); return t.activo!==false && (!t.desde||t.desde<=h) && (!t.hasta||t.hasta>=h); };
const fmtD = iso => String(iso||"").split("-").reverse().join("/");
const tempPlatos = () => cfgTemp().filter(tempVigente).map(t=>({id:t.id,sec:SEC_TMP.id,n:t.n,d:t.d||"",p:+t.p||0,a:[],u:"",etq:t.hasta?"Hasta el "+fmtD(t.hasta):"Solo por ahora",top:false,foto:"",modelo:"",medida:"",tmp:true,agot:!!t.agot,dest:t.dest==="barra"?"barra":"cocina"}));
const secDe = id => id===SEC_TMP.id?SEC_TMP:secciones().find(s=>s.id===id);
const carta = () => [...cfgCarta().platos.filter(p=>secDe(p.sec)).map(p=>({...p,foto:p.foto!==undefined?p.foto:(FOTOS_DEF[p.id]||""),a:p.a||[],p:+p.p||0,dest:secDe(p.sec).dest||"cocina"})), ...tempPlatos()];
const seccionesConPlatos = () => { const c=carta(); const base=secciones().filter(s=>c.some(p=>p.sec===s.id)); return c.some(p=>p.tmp)?[SEC_TMP,...base]:base; };
const P = id => carta().find(p=>p.id===id);
const cfgMenu = () => ({...MENU_DEF,...(Store.get("config","menu")||{})});
const cfgTurno = () => {
  const cs=cams(), N=mesasN(), def={activos:{},asign:{},escala:60};
  cs.forEach(c=>def.activos[c.id]=true);
  for(let n=1;n<=N;n++) def.asign[n]=cs[Math.floor((n-1)*cs.length/N)].id;
  const c=Store.get("config","turno")||{};
  const asign={...def.asign}; Object.entries(c.asign||{}).forEach(([n,id])=>{ if(cs.some(x=>x.id===id) && +n<=N) asign[n]=id; });
  return {activos:{...def.activos,...(c.activos||{})}, asign, escala:c.escala||def.escala};
};
const precio = id => P(id)?.p ?? 0;
// Agotado a mano o porque falta stock de algún ingrediente de su receta (regla «agotar sin stock»)
// Existencias por plato (config/existencias): número de unidades; vacío = sin límite
const cfgExist = () => Store.get("config","existencias")||{};
const existDe = id => { const v=cfgExist()[id]; return v===undefined||v===null||v==="" ? null : +v; };
const sinExist = id => { const v=existDe(id); return v!==null && v<=0; };
const agotado = id => { if(cfgCarta().agotados[id] || sinExist(id)) return true; const p=P(id); if(p&&p.tmp) return !!p.agot; return !!p && sinStock(p); };
const textoAgot = id => T(sinExist(id)?"agotTemp":"agotado");
// Pagos online: lo pagado y lo pendiente de una mesa
// Lo pagado = lo que se pagó al pedir (pg) + los pagos de la cuenta (pagos: online, tarjeta o efectivo; pueden ser partes)
const r2 = v => Math.round((+v||0)*100)/100;
const pqDe = x => x.pg ? x.q : Math.min(x.q, x.pq||0);   // unidades ya pagadas de una línea
const pagadoMesa = m => r2((m.consumo||[]).filter(x=>x.pg).reduce((a,x)=>a+x.p*x.q,0) + (m.pagos||[]).reduce((a,p)=>a+(+p.importe||0),0));
const pendienteMesa = m => Math.max(0, r2((m.consumo||[]).reduce((a,x)=>a+x.p*x.q,0) - pagadoMesa(m)));
// Lo que paga una persona: toda la mesa, unas líneas (lo suyo o lo que elija) o una parte igual de lo que queda
function importeParte(m, modo, sel, nPers){
  const pend=pendienteMesa(m), cons=m.consumo||[];
  if(modo==="todo") return {importe:pend, lin:[], n:0};
  if(modo==="partes"){ const k=Math.max(1,Math.min(20,Math.round(+nPers)||1)); return {importe:k<=1?pend:Math.min(pend,Math.ceil(r2(pend)*100/k)/100), lin:[], n:k}; }
  const lin=Object.entries(sel||{}).map(([i,q])=>{ const x=cons[+i]; if(!x) return null; const q2=Math.min(Math.round(+q), x.q-pqDe(x)); return q2>0?{i:+i,q:q2}:null; }).filter(Boolean).sort((a,b)=>a.i-b.i);
  return {importe:Math.min(pend, r2(lin.reduce((a,l)=>a+cons[l.i].p*l.q,0))), lin, n:0};
}
// Lo que se pidió desde este móvil y aún no está pagado
const selMio = m => Object.fromEntries((m.consumo||[]).map((x,i)=>[i,x]).filter(([,x])=>x.de===DISP&&x.q-pqDe(x)>0).map(([i,x])=>[i,x.q-pqDe(x)]));
const linTxt = (m,lin) => (lin||[]).map(l=>`${l.q}× ${((m.consumo||[])[l.i]||{}).n||""}`).join(", ");
const metodoTxt = k => ({online:"online con tarjeta",tarjeta:"con tarjeta (datáfono)",efectivo:"en efectivo"})[k]||k;
// La mesa no está reservada a nadie: la lleva quien la coge («Yo me encargo», aceptar su primer pedido o tomar nota)
const camDe = n => { if(!n) return null; const m=Store.get("mesas",n); return m&&m.abierta&&cams().some(c=>c.id===m.cam)?m.cam:null; };
const esCam = id => !!id && cams().some(c=>c.id===id);
const quienAtiende = n => camDe(n) ? nomCam(camDe(n)) : ({en:"a waiter",pt:"um empregado"}[LANG]||"un camarero");
const nomCamMesa = n => camDe(n) ? nomCam(camDe(n)) : "Sin camarero";
const nomCam = id => id ? ((cams().find(c=>c.id===id)||{n:id}).n) : "Barra";
const nP = p => LANG==="en"&&p.en?p.en[0]:LANG==="pt"&&p.pt?p.pt[0]:p.n;
const dP = p => LANG==="en"&&p.en?p.en[1]:LANG==="pt"&&p.pt?p.pt[1]:p.d;
// Nombre (i=0 o 1) o nota (i=2) de una sección en el idioma del cliente
const sT = (s,i) => { const k=i===2?1:0, tr=LANG!=="es"&&s[LANG]; return (tr&&tr[k])||(k?s.nota:s.n)||""; };
const alN = k => (LANG==="es"?ALERGENOS[k].n:ALERGENOS[k][LANG])||ALERGENOS[k].n;
const mesa = n => Store.get("mesas",n) || {n, abierta:false, consumo:[], cuenta:null, desde:null};
const totalMesa = m => (m.consumo||[]).reduce((a,x)=>a+x.p*x.q,0);
const avisosAbiertos = () => Store.all("avisos").filter(a=>!a.atendido);
const escalado = a => !a.atendido && !a.info && (ahora()-a.t)/1000 >= cfgTurno().escala;
const lugar = x => x.llevar ? `Para llevar ${x.codigo}` : `Mesa ${x.mesa}`;
// Enlaces NFC: cada mesa tiene un código secreto; sin él no se puede pedir
const tokenDe = n => (Store.get("nfc",n)||{}).token||"";
const baseURL = () => location.href.split("#")[0].split("?")[0] + "?r=" + TENANT;
const hashMesa = n => { const tk=tokenDe(n); return tk?`#m${n}-${tk}`:""; };
const enlaceMesa = n => { const h=hashMesa(n); return h?baseURL()+h:""; };
// Forma de pago pedida: la guarda el personal en la mesa o viene en el aviso del cliente
function cuentaDe(n){
  const m=mesa(n); if(m.cuenta) return m.cuenta; if(!m.abierta) return null;
  const a=Store.all("avisos").filter(a=>a.mesa===n&&a.tipo==="cuenta"&&!a.parte&&a.t>=(m.desde||0)).sort((x,y)=>y.t-x.t)[0];
  return a?a.forma:null;
}
// -1 no aceptado · 0 enviado (esperando al personal) · 1 en preparación · 2 listo · 3 servido o recogido
function estadoPedido(p){
  if(p.rechazado) return -1;
  if(p.servido || p.recogido) return 3;
  if(p.listoT) return 2;
  if(p.aceptado) return 1;
  return 0;
}
const entrantes = () => Store.all("pedidos").filter(p=>!p.aceptado&&!p.rechazado&&!p.servido&&!p.recogido).sort((a,b)=>a.t-b.t);
const porConfirmar = () => entrantes().filter(p=>!p.pagado);
// Artículo del carrito: id de plato o menú del día "menu~primero~segundo~postre"
function item(key){
  if(key.startsWith("menu~")){ const [,a,b,c]=key.split("~").map(Number); const m=cfgMenu();
    return {id:key, n:`Menú del día: ${m.primeros[a]} + ${m.segundos[b]} + ${m.postres[c]}`, nL:`${T("menuDe")}: ${m.primeros[a]} · ${m.segundos[b]} · ${m.postres[c]}`, p:+m.precio, dest:"cocina"}; }
  const p=P(key); if(!p) return {id:key,n:key,nL:key,p:0,dest:"cocina"}; return {id:key, n:p.n, nL:nP(p), p:precio(key), dest:p.dest};
}
// Carta rápida desde texto: una línea por plato "Sección | Plato | Precio | Descripción (opcional)"
function importarCarta(txt, base){
  const secs=[...base.secciones], platos=[...base.platos], malas=[]; let n=0;
  txt.split("\n").map(l=>l.trim()).filter(Boolean).forEach((l,i)=>{
    const c=l.split(/\s*[|;\t]\s*/); if(c.length<3){ malas.push(i+1); return; }
    const [sn,pn,pr,desc]=c, p=parseFloat(String(pr).replace(",",".").replace(/[^\d.]/g,""));
    if(!sn||!pn||!(p>=0)){ malas.push(i+1); return; }
    let s=secs.find(x=>norm(x.n)===norm(sn));
    if(!s){ const barra=/bebid|vino|cervez|caf|refresc|copa|coct|agua|zumo|licor|drink/i.test(norm(sn)); s={id:"s"+nid().slice(-6)+secs.length,n:sn,nota:"",dest:barra?"barra":"cocina",icono:barra?"copa":"sarten"}; secs.push(s); }
    platos.push({sec:s.id,id:"x"+nid().slice(-6)+n,n:pn,d:desc||"",p:Math.round(p*100)/100,a:[],u:"",etq:"",top:false,modelo:"",medida:""}); n++;
  });
  return {secciones:secs,platos,n,malas};
}

const Acc = {
  async abrir(n, por){ const r=await Store.set("mesas",n,{n,abierta:true,desde:ahora(),consumo:[],cuenta:null,por,...(esCam(por)?{cam:por}:{})}); if(esCam(por)) await this.tomaReg(n,por); return r; },
  // Cada vez que un camarero coge una mesa queda apuntado para el ranking (una vez por mesa abierta)
  tomaReg(n, cam){ const id="t-"+nid(); return Store.set("atenciones",id,{id,tipo:"mesa",cam,mesa:+n,t:ahora()}); },
  async encargar(n, cam){ if(!esCam(cam)||!n) return; const m=mesa(n); if(!m.abierta||m.cam===cam) return;
    await Store.set("mesas",n,{...m,cam}); await this.tomaReg(n,cam); },
  // Cobrar y liberar la mesa: queda libre (verde) para los mismos clientes o para otros
  async cerrar(n, por, forma){
    const m=mesa(n), total=totalMesa(m), pend=pendienteMesa(m);
    const pagos={}, suma=(k,v)=>{ if(v>0) pagos[k]=r2((pagos[k]||0)+v); };
    suma("online",(m.consumo||[]).filter(x=>x.pg).reduce((a,x)=>a+x.p*x.q,0)); (m.pagos||[]).forEach(p=>suma(p.metodo||"online",+p.importe||0));
    const dom=Object.entries(pagos).sort((a,b)=>b[1]-a[1])[0], f=pend>0?(forma||cuentaDe(n)||"sin indicar"):(dom?dom[0]:"online"); suma(f,pend);
    if(m.consumo && m.consumo.length) await Store.set("cuentas",nid(),{mesa:n,total,forma:f,pagos,t:ahora(),por,items:m.consumo,desde:m.desde});
    for(const a of Store.all("avisos").filter(a=>a.mesa===n && !a.atendido && !a.llevar)) await Store.set("avisos",a.id,{...a,atendido:{por,t:ahora(),auto:true}});
    for(const p of Store.all("pedidos").filter(p=>p.mesa===n && !p.llevar && !p.servido && !p.rechazado)) await Store.set("pedidos",p.id,p.aceptado?{...p,servido:true}:{...p,rechazado:{por,t:ahora(),auto:true}});
    return Store.set("mesas",n,{n,abierta:false,consumo:[],cuenta:null,desde:null,cerradaT:ahora()});
  },
  lineas(carrito,sugs){ return Object.entries(carrito).filter(([,q])=>q>0).map(([k,q])=>{ const it=item(k); return {id:k,n:it.n,q,p:it.p,dest:it.dest,sug:sugs&&sugs.has(k)?1:0}; }); },
  // El cliente crea el pedido como "entrante": no llega a cocina ni a barra hasta que el personal lo acepta
  // Ya no hace falta abrir la mesa: el código secreto y la confirmación del personal protegen el pedido
  async pedir(n, tk, carrito, nota, sugs){
    if(!Object.values(carrito).some(q=>q>0)) return false;
    const id=nid(), t=ahora(), items=this.lineas(carrito,sugs);
    if(!await Store.crear("pedidos",id,{id,t,mesa:n,tk:tk||"",items,nota:nota||"",servido:false,lang:LANG,disp:DISP})) return false;
    await Store.crear("avisos","v-"+id,{id:"v-"+id,mesa:n,tk:tk||"",tipo:"validar",pedido:id,det:items.map(x=>`${x.q}× ${x.n}`).join(", ")+(nota?` · «${nota}»`:""),t,atendido:null});
    if(!cfgReglas().validar && Store.personal()) await this.aceptar(id,"auto");
    return true;
  },
  // Pedido de la cesta compartida: cada línea lleva el móvil que la añadió (para «solo lo mío» en la cuenta)
  async pedirMesa(n, tk, lineas, nota, sugs){
    const items=(lineas||[]).filter(l=>l.q>0).map(l=>{ const it=item(l.k); return {id:l.k,n:it.n,q:l.q,p:it.p,dest:it.dest,sug:sugs&&sugs.has(l.k)?1:0,...(l.de?{de:l.de}:{})}; });
    if(!items.length) return false;
    const id=nid(), t=ahora();
    if(!await Store.crear("pedidos",id,{id,t,mesa:n,tk:tk||"",items,nota:nota||"",servido:false,lang:LANG,disp:DISP})) return false;
    await Store.crear("avisos","v-"+id,{id:"v-"+id,mesa:n,tk:tk||"",tipo:"validar",pedido:id,det:items.map(x=>`${x.q}× ${x.n}`).join(", ")+(nota?` · «${nota}»`:""),t,atendido:null});
    if(!cfgReglas().validar && Store.personal()) await this.aceptar(id,"auto");
    return true;
  },
  // Comanda manual del personal: ya sale aceptada y a nombre de quien la toma (cocina y barra la reciben al momento)
  async comanda(n, carrito, nota, por){
    if(!(+n>=1) || !Object.values(carrito).some(q=>q>0)) return false;
    const id=nid(), t=ahora(), items=this.lineas(carrito,null);
    await Store.set("pedidos",id,{id,t,mesa:+n,tk:"",items,nota:nota||"",servido:false,lang:"es",manual:por||"personal"});
    await this.aceptar(id,por||"personal"); return id;
  },
  async pedirLlevar(datos, carrito, sugs){
    const t0=inicioDia(), id=nid(), t=ahora(), items=this.lineas(carrito,sugs);
    // Con base de datos el cliente no ve los demás pedidos: el código es aleatorio y corto
    const codigo="L-"+(Store.personal()?String(Store.all("pedidos").filter(p=>p.llevar && p.t>=t0).length+1).padStart(2,"0"):tokenNuevo().slice(0,3).toUpperCase());
    const ped={id,t,mesa:0,llevar:true,codigo,nombre:datos.nombre,tel:datos.tel||"",hora:datos.hora,nota:datos.nota||"",items,servido:false,lang:LANG};
    if(!await Store.crear("pedidos",id,ped)) return null;
    await Store.crear("avisos","v-"+id,{id:"v-"+id,mesa:0,llevar:true,codigo,tipo:"validar",pedido:id,det:`${datos.nombre} · recoge ${datos.hora} · ${items.map(x=>`${x.q}× ${x.n}`).join(", ")}`,t,atendido:null});
    if(!cfgReglas().validar && Store.personal()) await this.aceptar(id,"auto");
    return ped;
  },
  // El personal comprueba que hay gente en la mesa (o que el pedido para llevar es real) y le da paso
  // Al aceptar: precios y nombres salen de la carta (no de lo que envió el móvil), la mesa se ocupa sola,
  // cocina y barra reciben su parte y se descuenta el stock de los ingredientes
  async aceptar(pid, por){
    const p0=Store.get("pedidos",pid); if(!p0 || p0.aceptado || p0.rechazado) return;
    const t=ahora();
    const items=(p0.items||[]).filter(x=>x&&x.id&&+x.q>0).map(x=>{ const it=item(x.id), q=Math.min(50,Math.max(1,Math.round(+x.q))); return {id:x.id,n:it.n,q,p:it.p,dest:it.dest,c:Math.round(costeDe(x.id)*100)/100,sug:x.sug?1:0,...((x.de||p0.disp)?{de:String(x.de||p0.disp).slice(0,16)}:{})}; });
    const p={...p0,items,aceptado:{por,t}};
    await Store.set("pedidos",pid,p);
    for(const dest of ["cocina","barra"]){ const it=items.filter(x=>x.dest===dest); if(it.length){ const tid=pid+"-"+dest;
      await Store.set("tickets",tid,{id:tid,pedido:pid,mesa:p.mesa||0,llevar:!!p.llevar,codigo:p.codigo||"",hora:p.hora||"",nombre:p.nombre||"",dest,items:it,t,estado:"nuevo",nota:p.nota||"",pagado:p.pagado?1:0}); } }
    { const ex=cfgExist(), cambios={}; items.forEach(x=>{ if(existDe(x.id)!==null) cambios[x.id]=Math.max(0,(cambios[x.id]??existDe(x.id))-x.q); });
      if(Object.keys(cambios).length) await Store.set("config","existencias",{...ex,...cambios}); }
    if(!p.llevar){ const m=mesa(p.mesa);
      const desde=m.abierta?m.desde:Math.min(t,...Store.all("pedidos").filter(x=>x.mesa===p.mesa&&!x.llevar&&!x.rechazado&&x.t>=(m.cerradaT||0)).map(x=>x.t));
      await Store.set("mesas",p.mesa,{...m,n:p.mesa,abierta:true,desde,consumo:[...(m.abierta?(m.consumo||[]):[]),...items.map(x=>p.pagado?{...x,pg:1}:x)],cuenta:m.abierta?m.cuenta:null,por:m.abierta?m.por:por,...(m.abierta&&esCam(m.cam)?{cam:m.cam}:esCam(por)?{cam:por}:{})});
      if(!(m.abierta&&esCam(m.cam)) && esCam(por)) await this.tomaReg(p.mesa,por); }
    const lv=lineasVenta(items); if(lv.length) await Store.set("movimientos","v-"+pid,{id:"v-"+pid,t,tipo:"venta",lineas:lv,ref:lugar(p),por});
    const a=Store.get("avisos","v-"+pid); if(a && !a.atendido) await Store.set("avisos",a.id,{...a,atendido:{por,t}});
  },
  async rechazar(pid, por){
    const p=Store.get("pedidos",pid); if(!p || p.aceptado || p.rechazado) return;
    await Store.set("pedidos",pid,{...p,rechazado:{por,t:ahora()}});
    const a=Store.get("avisos","v-"+pid); if(a && !a.atendido) await Store.set("avisos",a.id,{...a,atendido:{por,t:ahora()}});
  },
  // Con la regla "validar" apagada, la primera pantalla del personal que lo vea lo acepta sola
  // Por seguridad, el primer pedido de una mesa libre siempre lo confirma una persona
  // Un solo dispositivo acepta cada pedido pagado: lo "reclama" en la base de datos antes de aceptarlo
  async reclamar(pid){
    if(Store.modo!=="supa") return true;
    const p0=Store.get("pedidos",pid); if(!p0) return false;
    try{ const {data,error}=await Store.sb.from("docs").update({data:{...p0,aceptando:ahora()}}).eq("tenant",TENANT).eq("col","pedidos").eq("id",String(pid))
        .filter("data->>aceptado","is",null).filter("data->>aceptando","is",null).select("id");
      return !error && data && data.length>0; }catch(e){ return false; }
  },
  async autoAceptar(){
    if(Store.personal() && !this._autoPg){ const pg=entrantes().filter(p=>p.pagado && !p.aceptando);
      if(pg.length){ this._autoPg=true; try{ for(const p of pg){ if(await this.reclamar(p.id)) await this.aceptar(p.id,"pago"); } } finally{ this._autoPg=false; } } }
    if(cfgReglas().validar || !Store.personal() || this._auto) return;
    const ps=entrantes().filter(p=>p.llevar||mesa(p.mesa).abierta); if(!ps.length) return;
    this._auto=true; try{ for(const p of ps) await this.aceptar(p.id,"auto"); } finally { this._auto=false; }
  },
  llamar(n, tk){ const id=nid(); return Store.crear("avisos",id,{id,mesa:n,tk:tk||"",tipo:"llamada",det:"Pide que se acerque el camarero (recomendación o sugerencia)",t:ahora(),atendido:null}); },
  // Pedir la cuenta al camarero: de toda la mesa o solo una parte (lo suyo, unos platos o una parte igual)
  async cuenta(n, tk, forma, parte){
    const m=mesa(n);
    if(parte){ const id=nid(), txt=parte.lin&&parte.lin.length?linTxt(m,parte.lin):parte.n>1?`parte igual (entre ${parte.n})`:"lo que queda";
      return Store.crear("avisos",id,{id,mesa:n,tk:tk||"",tipo:"cuenta",forma,parte:{importe:r2(parte.importe),lin:parte.lin||[],n:parte.n||0},det:`Paga su parte ${forma==="tarjeta"?"con tarjeta":"en efectivo"} · ${eur(parte.importe)} · ${txt}${forma==="tarjeta"?" · lleva el datáfono":""}`,t:ahora(),atendido:null}); }
    if(Store.personal()) await Store.set("mesas",n,{...m,cuenta:forma});
    const id=nid(); return Store.crear("avisos",id,{id,mesa:n,tk:tk||"",tipo:"cuenta",forma,det:`${forma==="tarjeta"?"Paga con tarjeta":"Paga en efectivo"} · ${eur(pendienteMesa(m))}${pagadoMesa(m)?` (ya pagado ${eur(pagadoMesa(m))})`:""}${forma==="tarjeta"?" · lleva el datáfono":""}`,t:ahora(),atendido:null});
  },
  // El personal apunta que ha cobrado una parte; si con eso queda todo pagado, la mesa se libera sola
  async cobroParcial(n, importe, metodo, por, extra={}){
    const m=mesa(n); if(!m.abierta) return false; const pend=pendienteMesa(m); importe=r2(Math.min(+importe||0,pend)); if(!(importe>0)) return false;
    const lin=(extra.lin||[]).filter(l=>l&&(m.consumo||[])[l.i]), consumo=(m.consumo||[]).map(x=>({...x}));
    lin.forEach(l=>{ const x=consumo[l.i]; if(x&&!x.pg) x.pq=Math.min(x.q,(x.pq||0)+l.q); });
    const pago={id:"p-"+nid(),importe,metodo:metodo==="tarjeta"?"tarjeta":"efectivo",t:ahora(),por,...(lin.length?{lin}:{}),...(extra.n?{n:extra.n}:{})};
    await Store.set("mesas",n,{...m,consumo,pagos:[...(m.pagos||[]),pago],reparto:extra.n>1?{quedan:extra.n-1}:(m.reparto||null)});
    if(extra.aviso){ const a=Store.get("avisos",extra.aviso); if(a) await Store.set("avisos",a.id,{...a,cobrado:ahora(),atendido:a.atendido||{por,t:ahora()}}); }
    if(pend-importe<=0.004) await this.cerrar(n,por,pago.metodo);
    return true;
  },
  valorar(n, tk, estrellas, comentario){ const id=nid(), cam=camDe(n); return Store.crear("valoraciones",id,{id,mesa:n,tk:tk||"",estrellas,comentario:comentario||"",t:ahora(),lang:LANG,...(cam?{cam}:{})}); },
  async atender(aid, por){
    const a=Store.get("avisos",aid); if(!a||a.atendido) return;
    await Store.set("avisos",aid,{...a,atendido:{por,t:ahora()}});
    if(a.tipo==="llamada" && cams().some(c=>c.id===por)) await Store.set("atenciones",aid,{id:aid,cam:por,mesa:a.mesa,t:ahora()});
    if(a.mesa && !a.info && a.tipo!=="validar" && a.tipo!=="listo") await this.encargar(a.mesa,por);
    if(a.tipo==="cuenta" && a.forma){ const m=mesa(a.mesa); if(m.abierta && !m.cuenta) await Store.set("mesas",a.mesa,{...m,cuenta:a.forma}); }
  },
  // Fichaje del personal: entrada, pausa, volver y salida (el cronómetro cuenta solo el tiempo trabajado)
  async fichar(cam, accion){
    const f=fichajeAbierto(cam), t=ahora();
    if(accion==="entrada"){ if(f) return; const id=nid(); return Store.set("fichajes",id,{id,cam,ini:t,pausas:[],fin:null}); }
    if(!f) return;
    const pausas=(f.pausas||[]).map(x=>({...x}));
    if(accion==="pausa"){ if(!enPausa(f)) pausas.push({a:t}); return Store.set("fichajes",f.id,{...f,pausas}); }
    pausas.forEach(x=>{ if(!x.b) x.b=t; });
    if(accion==="volver") return Store.set("fichajes",f.id,{...f,pausas});
    if(accion==="salida") return Store.set("fichajes",f.id,{...f,pausas,fin:t});
  },
  jornada(id,h){ return Store.set("config","jornada",{horas:{...cfgJornada().horas,[id]:h}}); },
  legal(patch){ return Store.set("config","legal",{...cfgLegal(),...patch}); },
  temporal(items){ return Store.set("config","temporal",{items}); },
  async servir(aid, por){
    const a=Store.get("avisos",aid); if(!a) return;
    await Store.set("avisos",aid,{...a,atendido:{por,t:ahora()}});
    const p=Store.get("pedidos",a.pedido); if(!p) return;
    if(p.llevar){ await Store.set("pedidos",p.id,{...p,recogido:true,recogidoT:ahora()}); await Store.set("cuentas",nid(),{mesa:0,llevar:true,codigo:p.codigo,total:p.items.reduce((s,x)=>s+x.p*x.q,0),forma:"en barra",t:ahora(),por,items:p.items}); }
    else await Store.set("pedidos",p.id,{...p,servido:true,servidoT:ahora()});
  },
  async ticket(tid, estado){
    const k=Store.get("tickets",tid); if(!k) return;
    const extra = estado==="preparando"?{inicioT:ahora()}:estado==="listo"?{listoT:ahora()}:{};
    await Store.set("tickets",tid,{...k,estado,...extra});
    if(estado==="listo"){
      const p=Store.get("pedidos",k.pedido);
      if(p && Store.all("tickets").filter(x=>x.pedido===k.pedido).every(x=>x.id===tid || x.estado==="listo")){
        await Store.set("pedidos",p.id,{...p,listoT:ahora()});
        // Aviso al camarero (pedido de mesa) o a barra (para llevar): el plato está listo para servir o entregar
        { const id=nid(); await Store.set("avisos",id,{id,mesa:p.mesa||0,llevar:!!p.llevar,codigo:p.codigo||"",tipo:"listo",det:(p.llevar?`${p.nombre} · `:"")+p.items.map(x=>`${x.q}× ${x.n}`).join(", "),t:ahora(),pedido:p.id,atendido:null}); }
      }
    }
  },
  carta(patch){ const c=cfgCarta(); return Store.set("config","carta",{secciones:patch.secciones||c.secciones,platos:patch.platos||c.platos,agotados:{...c.agotados,...(patch.agotados||{})}}); },
  plato(id, cambios){ const c=cfgCarta(); return this.carta({platos:c.platos.map(p=>p.id===id?{...p,...cambios}:p)}); },
  turno(patch){ const t=cfgTurno(); return Store.set("config","turno",{activos:{...t.activos,...(patch.activos||{})},asign:{...t.asign,...(patch.asign||{})},escala:patch.escala||t.escala}); },
  menu(patch){ return Store.set("config","menu",{...cfgMenu(),...patch}); },
  bar(patch){ return Store.set("config","bar",{...cfgBar(),...patch}); },
  privado(patch){ return Store.set("config","privado",{...cfgPrivado(),...patch}); },
  reglas(patch){ return Store.set("config","reglas",{...cfgReglas(),...patch}); },
  async enlaces(todos){ const N=mesasN(), demo=Store.modo!=="supa"; for(let n=1;n<=N;n++){ if(todos || !tokenDe(n)) await Store.set("nfc",n,todos?{n,token:tokenNuevo(),manual:true}:{n,token:demo?tokenDemo(n):tokenNuevo()}); } },
  async enlacesDemo(){ const N=mesasN(); for(let n=1;n<=N;n++){ const r=Store.get("nfc",n)||{}; if(!r.manual && r.token!==tokenDemo(n)) await Store.set("nfc",n,{n,token:tokenDemo(n)}); } },
  chat(texto, de, autor){ const id=nid(); return Store.set("chat",id,{id,de,autor:autor||"",texto,t:ahora(),leido:false}); },
  // Cierre de caja: guarda el resumen del día (con lo que ha salido de cada producto) y archiva lo terminado
  async cerrarDia(){
    const r=resumen(0); const hist=Store.get("config","historial")||{dias:[]};
    const e=economia("hoy"), fecha=new Date(inicioDia()).toLocaleDateString("sv-SE");
    await Store.set("cierres",fecha,{fecha,t:ahora(),fact:e.fact,coste:e.coste,cuentas:e.cuentas.length,pagos:e.pagos,productos:Object.fromEntries(e.lista.map(x=>[x.id,{n:x.n,q:x.q,ing:Math.round(x.ing*100)/100,coste:Math.round(x.coste*100)/100}]))});
    const dias=[...(hist.dias||[]),{fecha:new Date().toISOString().slice(0,10),fact:r.fact,pedidos:r.pedidos.length,cuentas:r.cuentas.length,nota:r.notaMedia}].slice(-90);
    await Store.set("config","historial",{dias});
    for(const c of ["pedidos","tickets","avisos"]) for(const [k,d] of [...Store.data[c]]){ if(!(d.mesa && mesa(d.mesa).abierta) && !(d.llevar && !(Store.get("pedidos",d.pedido||d.id)||{}).recogido && c!=="avisos")) await Store.del(c,k); }
  },
  // Borra la actividad de prueba; conserva la marca, la carta, el inventario, los enlaces NFC y el chat
  async reiniciar(){
    for(const c of ["mesas","pedidos","tickets","avisos","cuentas","valoraciones","reservas","cierres","atenciones"]) for(const k of [...Store.data[c].keys()]) await Store.del(c,k);
    for(const m of Store.all("movimientos").filter(m=>m.tipo==="venta")) await Store.del("movimientos",m.id);
  }
};

// Números de un periodo (dias=0 → hoy; dias=6 → últimos 7 días)
function resumen(dias=0){
  const t0=inicioDia(dias);
  const pedidos=Store.all("pedidos").filter(p=>p.t>=t0&&!p.rechazado);
  const cuentas=Store.all("cuentas").filter(c=>c.t>=t0);
  const abiertas=Store.all("mesas").filter(m=>m.abierta);
  const fact=cuentas.reduce((a,c)=>a+c.total,0);
  const tks=Store.all("tickets").filter(k=>k.t>=t0 && k.listoT);
  const cocinaMedia=tks.length?tks.reduce((a,k)=>a+(k.listoT-k.t),0)/tks.length:null;
  const horas=Array(12).fill(0); pedidos.forEach(p=>{ const h=new Date(p.t).getHours(); if(h>=12&&h<=23) horas[h-12]++; });
  const unidades={}; pedidos.forEach(p=>p.items.forEach(x=>{ const nm=x.id.startsWith("menu~")?"Menú del día":x.n; unidades[nm]=(unidades[nm]||0)+x.q; }));
  const pago={tarjeta:0,efectivo:0}; cuentas.forEach(c=>{ if(c.forma in pago) pago[c.forma]++; });
  let sugU=0, sugE=0; pedidos.forEach(p=>p.items.forEach(x=>{ if(x.sug){ sugU+=x.q; sugE+=x.q*x.p; } }));
  const vals=Store.all("valoraciones").filter(v=>v.t>=t0);
  const notaMedia=vals.length?vals.reduce((a,v)=>a+v.estrellas,0)/vals.length:null;
  const llevar=pedidos.filter(p=>p.llevar);
  const menus=pedidos.reduce((a,p)=>a+p.items.filter(x=>x.id.startsWith("menu~")).reduce((s,x)=>s+x.q,0),0);
  return {pedidos,cuentas,abiertas,fact,cocinaMedia,horas,unidades,pago,sugU,sugE,vals,notaMedia,llevar,menus,
    pendientes:avisosAbiertos().filter(a=>!a.info).length};
}

// Ranking de camareros (dias=0 → hoy): mesas que ha cogido, llamadas atendidas con «Yo me encargo» y media de estrellas de las valoraciones de sus mesas
function ranking(dias=0){
  const t0=inicioDia(dias), todas=Store.all("atenciones").filter(a=>a.t>=t0), tomas=todas.filter(a=>a.tipo==="mesa"), at=todas.filter(a=>a.tipo!=="mesa");
  const todasTomas=Store.all("atenciones").filter(a=>a.tipo==="mesa");
  const camDeVal=v=>v.cam || (todasTomas.filter(a=>String(a.mesa)===String(v.mesa)&&a.t<=v.t).sort((a,b)=>b.t-a.t)[0]||{}).cam;
  const vals=Store.all("valoraciones").filter(v=>v.t>=t0 && +v.estrellas>0);
  return cams().map(c=>{ const vs=vals.filter(v=>camDeVal(v)===c.id);
    return {c,n:at.filter(a=>a.cam===c.id).length, mesas:tomas.filter(a=>a.cam===c.id).length, nVal:vs.length, nota:vs.length?vs.reduce((a,v)=>a+(+v.estrellas),0)/vs.length:null}; })
    .sort((a,b)=>b.mesas-a.mesas||b.n-a.n||a.c.n.localeCompare(b.c.n));
}
const notaTxt = x => x.nota==null?"—":x.nota.toLocaleString("es-ES",{maximumFractionDigits:1,minimumFractionDigits:1});
// Fichaje: horas trabajadas = desde la entrada hasta la salida (o ahora) menos el tiempo en pausa
const fichajeAbierto = cam => Store.all("fichajes").find(f=>f.cam===cam && !f.fin);
const enPausa = f => !!f && (f.pausas||[]).some(x=>!x.b);
const pausadoMs = (f,hasta) => (f.pausas||[]).reduce((a,x)=>a+Math.max(0,(x.b||hasta)-x.a),0);
const trabajadoMs = (f,hasta=ahora()) => { const h=f.fin||hasta; return Math.max(0,h-f.ini-pausadoMs(f,h)); };
const hms = ms => { const t=Math.max(0,Math.floor(ms/1000)); return `${Math.floor(t/3600)}:${String(Math.floor(t%3600/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`; };
const horasTxt = ms => { const m=Math.round(ms/60000); return `${Math.floor(m/60)} h ${String(m%60).padStart(2,"0")} min`; };
// Cronómetro en vivo: corre solo si el fichaje está abierto y no en pausa (lo mueve el reloj general)
const cronPausa = f => { const T0=ahora(), run=!f.fin&&enPausa(f); return `<span class="cron cron-p" data-cron="${run?1:0}" data-base="${pausadoMs(f,T0)}" data-t="${T0}">${hms(pausadoMs(f,T0))}</span>`; };
const cronPausaAct = f => { const T0=ahora(), x=(f.pausas||[]).find(y=>!y.b); return x?`<span class="cron cron-p" data-cron="1" data-base="${T0-x.a}" data-t="${T0}">${hms(T0-x.a)}</span>`:""; };
// Jornada prevista por camarero (horas al día, 8 por defecto) y balance: horas trabajadas menos las que tocaban por los días fichados
const cfgJornada = () => ({horas:{},...(Store.get("config","jornada")||{})});
const jornadaDe = id => { const h=cfgJornada().horas[id]; return h!=null&&h!==""&&!isNaN(+h)?+h:8; };
const diaFich = f => new Date(f.ini-5*3600000).toLocaleDateString("sv-SE");
const difTxt = ms => `${ms<0?"−":"+"}${horasTxt(Math.abs(ms))}`;
const cron = f => { const T0=ahora(); return `<span class="cron" data-cron="${f.fin||enPausa(f)?0:1}" data-base="${trabajadoMs(f,T0)}" data-t="${T0}">${hms(trabajadoMs(f,T0))}</span>`; };

/* =====================================================================
   SONIDO, VIBRACIÓN Y MENSAJES
   ===================================================================== */
let audio=null;
const sonidoOn = () => { try{ return localStorage.getItem("lp-sonido")!=="0"; }catch(e){ return false; } };
function activarAudio(){ try{ audio=audio||new (window.AudioContext||window.webkitAudioContext)(); audio.resume(); }catch(e){} }
// Los navegadores bloquean el audio hasta el primer toque: se desbloquea con cualquier toque o tecla
["pointerdown","keydown","touchstart"].forEach(ev=>addEventListener(ev,()=>{ if(sonidoOn()) activarAudio(); },{passive:true}));
function pitido(tipo="aviso"){
  if(sonidoOn()){ try{ activarAudio(); const notas=tipo==="llamada"?[988,1319,988,1319,988,1319]:tipo==="urgente"?[880,660,880]:tipo==="cocina"?[523,784]:[660,880], vol=tipo==="llamada"?0.6:0.25;
    notas.forEach((f,i)=>{ const o=audio.createOscillator(), g=audio.createGain(); o.type="sine"; o.frequency.value=f; o.connect(g); g.connect(audio.destination);
      const t=audio.currentTime+i*0.16; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.14); o.start(t); o.stop(t+0.15); }); }catch(e){} }
  try{ navigator.vibrate && navigator.vibrate(tipo==="llamada"?[250,100,250,100,250]:tipo==="urgente"?[120,60,120]:[90]); }catch(e){}
}
function toast(t){ const box=document.getElementById("toasts"); box.querySelector(".toast")?.remove(); const d=document.createElement("div"); d.className="toast"; d.setAttribute("role","status"); d.textContent=t; box.appendChild(d); clearTimeout(toast._t); toast._t=setTimeout(()=>d.remove(),3400); }

/* =====================================================================
   ICONOS Y DIBUJOS
   ===================================================================== */
const I = {
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  card:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
  chef:'<path d="M7 14a4 4 0 1 1 2-7.5A4 4 0 0 1 15 6a4 4 0 1 1 2 8v5H7z"/><path d="M7 17h10"/>',
  glass:'<path d="M7 3h10l-1 9a4 4 0 0 1-8 0z"/><path d="M12 16v5M8 21h8"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  menu:'<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 4 6"/>',
  nfc:'<path d="M6 8a8 8 0 0 0 0 8M9.5 9.5a4 4 0 0 0 0 5"/><rect x="13" y="4" width="8" height="16" rx="2"/>',
  live:'<circle cx="12" cy="12" r="3"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/>',
  check:'<path d="M5 12l5 5L20 7"/>',
  speaker:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9a4 4 0 0 1 0 6"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  repeat:'<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>',
  door:'<path d="M5 21V4a1 1 0 0 1 1-1h9l4 2v16"/><path d="M3 21h18M12 12h.01"/>',
  bag:'<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  chat:'<path d="M4 5h16v11H8l-4 4z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  screen:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
};
const ico = (k,cls="i") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const ICONOS_SEC = {
  tabla:`<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="40" rx="26" ry="12" fill="#f3ead4" stroke="#1f1b17" stroke-width="2.5"/><path d="M14 38q6-8 14-2M30 36q6-9 14-1" fill="#d8262f" stroke="#1f1b17" stroke-width="2"/><circle cx="44" cy="40" r="5" fill="#f2c14e" stroke="#1f1b17" stroke-width="2"/></svg>`,
  pincho:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6v50" stroke="#1f1b17" stroke-width="2.5"/><rect x="18" y="22" width="28" height="16" rx="5" fill="#f2c14e" stroke="#1f1b17" stroke-width="2.5"/><path d="M14 44h36l-4 8H18z" fill="#c78b4a" stroke="#1f1b17" stroke-width="2.5"/><circle cx="32" cy="14" r="5" fill="#5d8f3b" stroke="#1f1b17" stroke-width="2"/></svg>`,
  sarten:`<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="28" cy="36" rx="22" ry="12" fill="#3a3530" stroke="#1f1b17" stroke-width="2.5"/><path d="M48 32l14-6" stroke="#1f1b17" stroke-width="5" stroke-linecap="round"/><path d="M14 34q8-6 14 0t14-1" fill="none" stroke="#f2c14e" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="38" r="2.5" fill="#d8262f"/><circle cx="34" cy="38" r="2.5" fill="#d8262f"/></svg>`,
  bocata:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 30q26-16 52 0z" fill="#d9a35b" stroke="#1f1b17" stroke-width="2.5"/><path d="M6 34h52" stroke="#5d8f3b" stroke-width="4"/><path d="M7 38h50" stroke="#d8262f" stroke-width="4"/><path d="M6 42q26 12 52 0z" fill="#d9a35b" stroke="#1f1b17" stroke-width="2.5"/></svg>`,
  tarta:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 30l44-12v26H10z" fill="#f6e3a6" stroke="#1f1b17" stroke-width="2.5"/><path d="M10 30l44-12" stroke="#c97a2b" stroke-width="5"/><path d="M8 48h48" stroke="#1f1b17" stroke-width="2.5"/><circle cx="46" cy="16" r="4" fill="#d8262f" stroke="#1f1b17" stroke-width="2"/></svg>`,
  copa:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 8h20q2 18-10 22Q16 26 18 8z" fill="#fff" stroke="#1f1b17" stroke-width="2.5"/><path d="M19 15h18q-1 12-9 13-8-1-9-13z" fill="#9e1b2c"/><path d="M28 30v18M20 50h16" stroke="#1f1b17" stroke-width="2.5" stroke-linecap="round"/><rect x="40" y="22" width="14" height="30" rx="3" fill="#f2c14e" stroke="#1f1b17" stroke-width="2.5"/><path d="M40 28h14" stroke="#fff" stroke-width="3"/></svg>`
};
const chipAl = k => { const a=ALERGENOS[k]; return `<span class="al" title="${alN(k)}"><i style="background:${a.c}">${a.l}</i>${alN(k)}</span>`; };
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';
// Marca del restaurante: colores, estilo y logo, aplicados a todas las pantallas
const ESTILOS = {moderno:"Moderno", elegante:"Elegante", noche:"Elegante oscuro", clasico:"Dibujado a mano"};
const hexOk = h => /^#[0-9a-f]{6}$/i.test(h||"");
function oscurecer(hex,f){ const n=parseInt(hex.slice(1),16); return "#"+[n>>16,(n>>8)&255,n&255].map(v=>Math.round(v*(1-f)).toString(16).padStart(2,"0")).join(""); }
function aplicarMarca(){
  const b=location.hash==="#admin"?BAR_DEF:cfgBar(), r=document.documentElement, col=hexOk(b.color)?b.color:BAR_DEF.color, col2=hexOk(b.color2)?b.color2:BAR_DEF.color2;
  const clave=[col,col2,b.estilo].join("|"); if(aplicarMarca._k===clave) return; aplicarMarca._k=clave;
  r.style.setProperty("--rojo",col); r.style.setProperty("--rojo-osc",oscurecer(col,.3)); r.style.setProperty("--amarillo",col2);
  r.dataset.estilo=ESTILOS[b.estilo]?b.estilo:"moderno";
}
// Logo subido en el panel o, si no hay, el nombre escrito con la tipografía de la marca
const logoHTML = (cls="") => { const b=cfgBar(); return /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(b.logo||"") ? `<img class="${cls}" src="${esc(b.logo)}" alt="${esc(b.nombre)}">` : `<span class="marca-txt ${cls}">${esc(b.nombre)}</span>`; };
// Reduce el logo a un tamaño razonable antes de guardarlo (máx. 600 px)
function leerLogo(file){
  return new Promise((ok,mal)=>{
    if(!file || !/^image\//.test(file.type)) return mal(new Error("tipo"));
    const fr=new FileReader(); fr.onerror=()=>mal(fr.error);
    fr.onload=()=>{ const img=new Image(); img.onerror=()=>mal(new Error("img")); img.onload=()=>{
      const k=Math.min(1,600/Math.max(img.width,img.height)), c=document.createElement("canvas"); c.width=Math.max(1,Math.round(img.width*k)); c.height=Math.max(1,Math.round(img.height*k));
      c.getContext("2d").drawImage(img,0,0,c.width,c.height); let u=c.toDataURL("image/webp",.85); if(!u.startsWith("data:image/webp")) u=c.toDataURL("image/png"); ok(u); }; img.src=fr.result; };
    fr.readAsDataURL(file);
  });
}

/* =====================================================================
   NEGOCIO: economía y caja, inventario y compras, reservas, avisos y accesos
   ===================================================================== */
// Solo enlaces web normales (evita enlaces "javascript:" en campos editables)
const safeUrl = u => { const s=String(u||"").trim(); return /^https?:\/\/[^\s"'<>]+$/i.test(s)?s:""; };
Object.assign(I,{
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  euro:'<path d="M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'
});

// ---------- Inventario ----------
const UNIDADES = {ud:"unidades", kg:"kg", l:"litros"};
const FRECUENCIAS = {diaria:"Diaria", semanal:"Semanal", quincenal:"Quincenal", mensual:"Mensual", demanda:"Cuando haga falta"};
const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const articulos = () => Store.all("articulos").filter(a=>a.activo!==false).sort((a,b)=>(a.cat||"").localeCompare(b.cat||"")||a.n.localeCompare(b.n));
const ART = id => Store.get("articulos",id);
const fmtQ = (q,ud) => `${(Math.round((+q||0)*100)/100).toLocaleString("es-ES")} ${ud==="ud"?"ud":ud||""}`.trim();
// Stock de cada artículo: último recuento + entradas − ventas y mermas posteriores
let _stk={v:-1,s:{}};
function stocks(){
  if(_stk.v===Store.ver) return _stk.s; const s={};
  Store.all("movimientos").slice().sort((a,b)=>a.t-b.t).forEach(m=>(m.lineas||[]).forEach(l=>{ s[l.a]=m.tipo==="recuento"?(+l.q||0):(s[l.a]||0)+(+l.q||0); }));
  _stk={v:Store.ver,s}; return s;
}
// sin (todavía sin recuento) · agotado · bajo (en o por debajo del stock de seguridad) · exceso (por encima del máximo) · ok
function estadoStock(a){
  const s=stocks()[a.id]; if(s===undefined) return "sin";
  if(s<=0) return "agotado"; if(+a.min>0 && s<=+a.min) return "bajo"; if(+a.max>0 && s>+a.max) return "exceso"; return "ok";
}
const ESTADO_STOCK = {sin:["—","Sin recuento"], agotado:["critico","Agotado"], bajo:["aviso","Bajo mínimo"], exceso:["aviso","Por encima del máximo"], ok:["ok","Bien"]};
const alertasStock = () => articulos().map(a=>({a,e:estadoStock(a)})).filter(x=>["agotado","bajo","exceso"].includes(x.e));
// Consumo (ventas + mermas) de un artículo entre dos fechas
function consumo(aid, desde, hasta=Infinity){ let c=0; Store.all("movimientos").forEach(m=>{ if((m.tipo==="venta"||m.tipo==="merma") && m.t>=desde && m.t<hasta) (m.lineas||[]).forEach(l=>{ if(l.a===aid) c-=+l.q||0; }); }); return c; }
function entradas(aid, desde, hasta=Infinity){ let c=0; Store.all("movimientos").forEach(m=>{ if(m.tipo==="compra" && m.t>=desde && m.t<hasta) (m.lineas||[]).forEach(l=>{ if(l.a===aid) c+=+l.q||0; }); }); return c; }
const mediaDiaria = (aid, dias=14) => consumo(aid, inicioDia(dias-1))/dias;
// Coste de un plato: por su receta (escandallo) o, si no tiene, el coste puesto a mano
function costePlato(p){ if(p.receta && p.receta.length) return p.receta.reduce((s,r)=>{ const a=ART(r.a); return s+(a?(+a.coste||0)*(+r.q||0):0); },0); return +p.coste||0; }
function costeDe(id){ if(String(id).startsWith("menu~")) return +cfgMenu().coste||0; const p=P(id); return p?costePlato(p):0; }
function sinStock(p){
  if(!cfgReglas().agotarSinStock || !p.receta || !p.receta.length) return false;
  const s=stocks(); return p.receta.some(r=>s[r.a]!==undefined && s[r.a] < (+r.q||0));
}
// Lo que se descuenta del inventario al aceptar un pedido
function lineasVenta(items){
  const t={}; items.forEach(x=>{ const p=P(x.id); (p&&p.receta||[]).forEach(r=>{ t[r.a]=(t[r.a]||0)-(+r.q||0)*x.q; }); });
  return Object.entries(t).filter(([a,q])=>q&&ART(a)).map(([a,q])=>({a,q:Math.round(q*1000)/1000}));
}
// Próxima fecha de pedido a un proveedor según cómo trabaja con él
function proximoPedido(pr){
  const hoy=new Date(inicioDia()), ult=Store.all("compras").filter(c=>c.prov===pr.id&&c.estado!=="cancelado").sort((a,b)=>b.t-a.t)[0], d=new Date(hoy);
  if(pr.frec==="diaria"){ return d; }
  if(pr.frec==="semanal"){ const dia=+pr.dia||1; while(d.getDay()!==dia) d.setDate(d.getDate()+1); return d; }
  if(pr.frec==="quincenal"||pr.frec==="mensual"){ const n=pr.frec==="quincenal"?14:30; if(!ult) return d; const x=new Date(ult.t); x.setDate(x.getDate()+n); return x<d?d:x; }
  return null;
}
// Pedido sugerido: llegar al máximo (o al doble del mínimo) cubriendo el consumo hasta la siguiente entrega
function sugerencia(pr){
  const s=stocks(), dias={diaria:1,semanal:7,quincenal:14,mensual:30,demanda:7}[pr.frec]||7, plazo=+pr.plazo||1;
  return articulos().filter(a=>a.prov===pr.id).map(a=>{ const st=s[a.id]??0, obj=+a.max||(+a.min||0)*2, prev=mediaDiaria(a.id)*(dias+plazo);
    const fmt=+a.fmt||1, q=Math.max(0,Math.ceil((obj+prev-st)/fmt)*fmt); return {a,st,obj,prev,q}; });
}

// ---------- Economía y caja ----------
const PERIODOS = {hoy:"Hoy", ayer:"Ayer", d7:"7 días", d30:"30 días", mes:"Este mes", mesant:"Mes anterior"};
function rango(k){
  const h=inicioDia();
  if(k==="ayer") return [inicioDia(1),h];
  if(k==="d7") return [inicioDia(6),Infinity];
  if(k==="d30") return [inicioDia(29),Infinity];
  if(k==="mes"||k==="mesant"){ const a=new Date(h); a.setDate(1); if(k==="mes") return [a.getTime(),Infinity]; const b=new Date(a); b.setMonth(b.getMonth()-1); return [b.getTime(),a.getTime()]; }
  return [h,Infinity];
}
// Ventas cobradas del periodo: facturación, coste, beneficio y lo que ha salido de cada producto
function economia(k){
  const [a,b]=rango(k), cs=Store.all("cuentas").filter(c=>c.t>=a&&c.t<b), prod={}, sinCoste=new Set();
  cs.forEach(c=>(c.items||[]).forEach(x=>{ const key=String(x.id).startsWith("menu~")?"menu":x.id;
    const r=prod[key]=prod[key]||{id:key,n:key==="menu"?"Menú del día":(P(key)?.n||x.n),q:0,ing:0,coste:0,dest:x.dest};
    const cu=x.c!=null?+x.c:costeDe(x.id); r.q+=+x.q||0; r.ing+=(+x.p||0)*(+x.q||0); r.coste+=cu*(+x.q||0); if(!(cu>0)) sinCoste.add(key); }));
  const lista=Object.values(prod).map(r=>({...r,ben:r.ing-r.coste,margen:r.ing?(r.ing-r.coste)/r.ing:0}));
  const fact=cs.reduce((s,c)=>s+(+c.total||0),0), coste=lista.reduce((s,r)=>s+r.coste,0), pagos={};
  cs.forEach(c=>{ if(c.pagos&&Object.keys(c.pagos).length){ Object.entries(c.pagos).forEach(([f,v])=>pagos[f]=(pagos[f]||0)+(+v||0)); return; } const f=c.forma||"sin indicar"; pagos[f]=(pagos[f]||0)+(+c.total||0); });
  const dias={}; cs.forEach(c=>{ const d=new Date(c.t-(new Date(c.t).getHours()<5?864e5:0)).toLocaleDateString("sv-SE"); dias[d]=(dias[d]||0)+(+c.total||0); });
  return {a,b,cuentas:cs,fact,coste,ben:fact-coste,ticket:cs.length?fact/cs.length:0,lista,pagos,dias,noVendidos:carta().filter(p=>!prod[p.id]),sinCoste:[...sinCoste].map(id=>prod[id].n)};
}
function textoCaja(k){
  const e=economia(k), b=cfgBar(), L=[];
  L.push(`🧾 *${b.nombre}* · cierre de caja · ${PERIODOS[k].toLowerCase()} (${new Date(e.a).toLocaleDateString("es-ES")})`); L.push("");
  L.push(`Facturación: ${eur(e.fact)} en ${e.cuentas.length} cuentas · ticket medio ${eur(e.ticket)}`);
  Object.entries(e.pagos).forEach(([f,v])=>L.push(`  · ${f[0].toUpperCase()+f.slice(1)}: ${eur(v)}`));
  if(e.coste>0) L.push(`Coste de producto: ${eur(e.coste)} · beneficio bruto ${eur(e.ben)}`);
  L.push(""); L.push("Productos que han salido:");
  e.lista.sort((x,y)=>y.q-x.q).forEach(x=>L.push(`  ${x.q}× ${x.n} · ${eur(x.ing)}`));
  if(!e.lista.length) L.push("  (ninguno)");
  return L.join("\n");
}

// ---------- Reservas ----------
const RESERVAS_DEF = {activo:true, franjas:"13:00-16:00, 20:00-23:30", paso:30, maxPersonas:10, aforo:40, auto:false, antelacion:30};
const cfgReservas = () => ({...RESERVAS_DEF,...(Store.get("config","reservas")||{})});
const ESTADOS_RES = {pendiente:["aviso","Pendiente"], confirmada:["ok","Confirmada"], sentada:["ok","Sentada"], rechazada:["critico","Rechazada"], cancelada:["critico","Cancelada"], noshow:["critico","No vino"]};
const fechaISO = (d=0) => { const x=new Date(); x.setDate(x.getDate()+d); return x.toLocaleDateString("sv-SE"); };
const fechaLarga = f => new Date(f+"T12:00:00").toLocaleDateString(LANG==="es"?"es-ES":LANG==="pt"?"pt-PT":"en-GB",{weekday:"long",day:"numeric",month:"long"});
function horasReserva(){
  const c=cfgReservas(), paso=Math.max(10,+c.paso||30), out=[];
  String(c.franjas||"").split(",").forEach(fr=>{ const m=fr.trim().match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/); if(!m) return;
    for(let a=+m[1]*60+ +m[2], b=+m[3]*60+ +m[4]; a<b; a+=paso) out.push(String(Math.floor(a/60)).padStart(2,"0")+":"+String(a%60).padStart(2,"0")); });
  return out;
}
const reservasDe = f => Store.all("reservas").filter(r=>r.fecha===f).sort((a,b)=>a.hora.localeCompare(b.hora));
function ocupacion(f, sin){ const o={}; reservasDe(f).filter(r=>["pendiente","confirmada","sentada"].includes(r.estado)&&r.id!==sin).forEach(r=>o[r.hora]=(o[r.hora]||0)+(+r.personas||0)); return o; }
// Reserva confirmada que llega en las próximas 2 horas a esta mesa
function reservaProxima(n){
  const hoy=fechaISO(), ahoraMin=new Date().getHours()*60+new Date().getMinutes();
  return reservasDe(hoy).find(r=>+r.mesa===n && r.estado==="confirmada" && (()=>{ const [h,m]=r.hora.split(":").map(Number), d=h*60+m-ahoraMin; return d>=-30 && d<=120; })());
}

Object.assign(Acc,{
  async reservar(d, origen, por){
    const id=nid(), r={id,t:ahora(),nombre:d.nombre,tel:d.tel,email:d.email||"",personas:+d.personas,fecha:d.fecha,hora:d.hora,nota:d.nota||"",origen,lang:LANG,
      estado:origen==="web"?"pendiente":"confirmada",...(origen==="web"?{}:{mesa:d.mesa?+d.mesa:null,por})};
    return await Store.crear("reservas",id,r) ? id : null;
  },
  async reserva(id, cambios, por){ const r=Store.get("reservas",id); if(!r) return; await Store.set("reservas",id,{...r,...cambios,por,cambioT:ahora()}); },
  // Con «aceptar reservas solas», el personal conectado confirma las que caben en el aforo
  async autoReservas(){
    const c=cfgReservas(); if(!c.auto || !Store.personal() || this._autoRes) return;
    const ps=Store.all("reservas").filter(r=>r.estado==="pendiente"); if(!ps.length) return;
    this._autoRes=true; try{ for(const r of ps){ const o=ocupacion(r.fecha,r.id); if((o[r.hora]||0)+(+r.personas||0)<=+c.aforo && +r.personas<=+c.maxPersonas) await this.reserva(r.id,{estado:"confirmada"},"auto"); } } finally{ this._autoRes=false; }
  },
  movimiento(tipo, lineas, nota, ref, por){ const id=nid(); return Store.set("movimientos",id,{id,t:ahora(),tipo,lineas:lineas.filter(l=>l.a&&+l.q),nota:nota||"",ref:ref||"",por:por||""}); },
  async recibirCompra(cid, lineas, actualizarCoste, por){
    const c=Store.get("compras",cid); if(!c) return;
    await this.movimiento("compra",lineas.map(l=>({a:l.a,q:+l.q})),`Pedido a ${(Store.get("proveedores",c.prov)||{}).n||"proveedor"}`,cid,por);
    if(actualizarCoste) for(const l of lineas){ const a=ART(l.a); if(a && +l.coste>0 && +l.coste!==+a.coste) await Store.set("articulos",a.id,{...a,coste:+l.coste}); }
    await Store.set("compras",cid,{...c,estado:"recibido",recibidoT:ahora(),lineasRecibidas:lineas,total:lineas.reduce((s,l)=>s+(+l.q||0)*(+l.coste||0),0)});
  }
});

// Avisos al personal: stock que llega al mínimo o pasa del máximo, reservas nuevas
let _vig=null;
function vigilar(){
  if(!Store.personal() || !vista || !["panel","camarero"].some(v=>vista.clave&&vista.clave.includes(`"${v}"`))) return;
  const claves=new Set([...alertasStock().map(x=>x.a.id+":"+x.e), ...Store.all("reservas").filter(r=>r.estado==="pendiente").map(r=>"r:"+r.id)]);
  if(_vig){ const nuevas=[...claves].filter(k=>!_vig.has(k));
    if(nuevas.length){ const k=nuevas[0];
      if(k.startsWith("r:")){ const r=Store.get("reservas",k.slice(2)); if(r) toast(`Reserva nueva: ${r.nombre}, ${r.personas} pers., ${r.fecha===fechaISO()?"hoy":r.fecha} a las ${r.hora}`); pitido("aviso"); }
      else { const [id,e]=k.split(":"), a=ART(id); if(a) toast(`Stock: ${a.n} ${e==="exceso"?"por encima del máximo":e==="agotado"?"agotado":"ha llegado al stock de seguridad"} (${fmtQ(stocks()[id],a.ud)})`); pitido(e==="agotado"?"urgente":"aviso"); } } }
  _vig=claves;
}

// ---------- Accesos: PIN por persona (modo demo) ----------
// Con base de datos, cada persona entra con su correo y su contraseña. Sin ella (modo demo), el dueño
// puede poner un PIN para él, para cocina y para cada camarero: así cada uno entra solo a lo suyo.
// Acceso general del local (todo el equipo) y clave de administración (encargado o dueño)
const ACCESO_DEF = {usuario:'taberna', clave:'1234', admin:'1969'};
const AUDIT = {estado:"",filas:null};
const SERVICIO_TABS = ["sala","pedidos","reservas","agotados","temporal","turno"];
const Acceso = {
  cfg(){ const c=Store.get("config","seguridad")||{}; return c; },
  usuario(){ return (this.cfg().local||{}).usuario||ACCESO_DEF.usuario; },
  async hLocal(u,p){ return Pin.hash("local|"+String(u).trim().toLowerCase()+"|"+p); },
  async hAdmin(p){ return Pin.hash("admin|"+p); },
  async comprobarLocal(u,p){ const l=this.cfg().local; const h=await this.hLocal(u,p);
    return l&&l.hash ? h===l.hash : h===await this.hLocal(ACCESO_DEF.usuario,ACCESO_DEF.clave); },
  async comprobarAdmin(p){ const a=this.cfg().admin; const h=await this.hAdmin(p);
    return a ? h===a : h===await this.hAdmin(ACCESO_DEF.admin); },
  // Sesión del local en este dispositivo (30 días)
  dentro(){ try{ const s=JSON.parse(localStorage.getItem("metriax-local-"+TENANT)||"null"); return !!s && ahora()-s.t<30*864e5; }catch(e){ return false; } },
  entrar(){ try{ localStorage.setItem("metriax-local-"+TENANT,JSON.stringify({t:ahora()})); }catch(e){} },
  salir(){ try{ localStorage.removeItem("metriax-local-"+TENANT); }catch(e){} this.cerrarAdmin(); },
  // Administración abierta: se cierra sola tras 15 min sin tocar nada
  MAX: 15*60e3,
  admin(){ if(Store.modo==="supa") return ["dueno","super"].includes(Store.rol);
    try{ const s=JSON.parse(sessionStorage.getItem("metriax-adm-"+TENANT)||"null"); return !!s && ahora()-s.t<this.MAX; }catch(e){ return false; } },
  abrirAdmin(){ try{ sessionStorage.setItem("metriax-adm-"+TENANT,JSON.stringify({t:ahora()})); }catch(e){} },
  tocar(){ if(Store.modo!=="supa" && this.admin()) this.abrirAdmin(); },
  cerrarAdmin(){ try{ sessionStorage.removeItem("metriax-adm-"+TENANT); }catch(e){} }
};
// Con base de datos: el usuario corto del local se convierte en su correo, y la clave corta en una válida para Supabase
const correoLocal = u => u.includes("@") ? u : `${u.trim().toLowerCase()}.${TENANT}@metriax.app`;
const claveSupa = p => p.length>=10 ? p : `metriax-${TENANT}-${p}`;
function VLocal(){
  let error="", fallos=0, bloqueo=0;
  function pintar(){
    const espera=Math.max(0,Math.ceil((bloqueo-ahora())/1000));
    app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:420px;margin:0 auto;width:100%;align-content:center;text-align:center">
      ${logoHTML("login-logo")}<p class="m-hola">Acceso del equipo</p>
      <p class="m-texto">Entra con el usuario y la contraseña del local; en este dispositivo solo hace falta una vez.</p>
      <form id="f-local" class="form-ll" autocomplete="on" style="text-align:left">
        <label>Usuario<input id="lc-u" autocomplete="username" autocapitalize="none" required ${espera?"disabled":""}></label>
        <label>Contraseña<input id="lc-p" type="password" autocomplete="current-password" required ${espera?"disabled":""}></label>
        ${error?`<p role="alert" style="margin:0;color:var(--critico);font-size:16px">${esc(error)}</p>`:""}
        <button class="btn rojo" type="submit" ${espera?"disabled":""}>${espera?`Espera ${espera} s`:"Entrar"}</button></form>
      <a class="btn peq" href="#inicio" style="justify-self:center">${ico("back")}Volver</a></div></div>`;
    app.querySelector("#lc-u")?.focus();
  }
  async function enviar(e){
    if(e.target.id!=="f-local") return; e.preventDefault(); if(ahora()<bloqueo) return;
    const u=app.querySelector("#lc-u").value, p=app.querySelector("#lc-p").value;
    if(await Acceso.comprobarLocal(u,p)){ Acceso.entrar(); toast("Hola, equipo de "+cfgBar().nombre+"."); return reiniciarVista(); }
    fallos++; error="Usuario o contraseña incorrectos."; if(fallos>=5){ bloqueo=ahora()+60000; fallos=0; error="Demasiados intentos. Espera un minuto."; } pintar();
  }
  app.addEventListener("submit",enviar);
  return { titulo:"Acceso · "+cfgBar().nombre, pintar, alCambiar(){}, tic(){ if(bloqueo&&ahora()<bloqueo+1000) pintar(); }, salir(){ app.removeEventListener("submit",enviar); } };
}
const Pin = {
  cfg(){ return Store.get("config","seguridad")||{}; },
  activo(){ return Store.modo!=="supa" && !!this.cfg().dueno; },
  async hash(pin){ const d=new TextEncoder().encode("metriax|"+TENANT+"|"+pin); const h=await crypto.subtle.digest("SHA-256",d); return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join(""); },
  sesion(){ try{ const s=JSON.parse(sessionStorage.getItem("metriax-pin-"+TENANT)||"null"); return s && ahora()-s.t<12*3600e3 ? s : null; }catch(e){ return null; } },
  entrar(quien){ try{ sessionStorage.setItem("metriax-pin-"+TENANT,JSON.stringify({quien,t:ahora()})); }catch(e){} },
  salir(){ try{ sessionStorage.removeItem("metriax-pin-"+TENANT); }catch(e){} },
  // Qué personas pueden abrir cada pantalla
  quienes(v){ const c=this.cfg(), cams=Object.keys(c.camareros||{}).map(id=>"cam:"+id);
    return {camarero:["dueno",...cams], kds:["dueno","cocina",...cams], recogida:["dueno","cocina",...cams], panel:["dueno"], admin:["dueno"]}[v]||["dueno"]; },
  permite(v){ if(!this.activo()) return true; const s=this.sesion(); return !!s && this.quienes(v).includes(s.quien); },
  async comprobar(pin, v){
    const c=this.cfg(), h=await this.hash(pin);
    for(const q of this.quienes(v)){ const guardado=q==="dueno"?c.dueno:q==="cocina"?c.cocina:(c.camareros||{})[q.slice(4)]; if(guardado && guardado===h) return q; }
    return null;
  },
  nombre(q){ return q==="dueno"?"Dueño":q==="cocina"?"Cocina":q&&q.startsWith("cam:")?nomCam(q.slice(4)):""; },
  camarero(){ const s=this.activo()&&this.sesion(); return s&&s.quien.startsWith("cam:")?s.quien.slice(4):null; }
};
function VPin({destino}){
  const nombres={camarero:"Sala",kds:"Cocina y barra",recogida:"Pantalla de recogida",panel:"Panel del restaurante",admin:"Panel maestro"};
  let error="", fallos=0, bloqueo=0;
  function pintar(){
    const espera=Math.max(0,Math.ceil((bloqueo-ahora())/1000));
    app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:420px;margin:0 auto;width:100%;align-content:center;text-align:center">
      ${logoHTML("login-logo")}<p class="m-hola">${nombres[destino]||"Personal"}</p>
      <p class="m-texto">Escribe tu PIN personal. ${destino==="camarero"?"Cada camarero tiene el suyo.":destino==="panel"||destino==="admin"?"Solo el dueño.":""}</p>
      <form id="f-pin" class="form-ll"><label>PIN<input id="pin" type="password" inputmode="numeric" autocomplete="off" maxlength="12" required ${espera?"disabled":""}></label>
      ${error?`<p role="alert" style="margin:0;color:var(--critico);font-size:16px">${esc(error)}</p>`:""}
      <button class="btn rojo" type="submit" ${espera?"disabled":""}>${espera?`Espera ${espera} s`:"Entrar"}</button></form>
      <a class="btn peq" href="#inicio">${ico("back")}Volver</a></div></div>`;
    app.querySelector("#pin")?.focus();
  }
  async function enviar(e){
    if(e.target.id!=="f-pin") return; e.preventDefault(); if(ahora()<bloqueo) return;
    const q=await Pin.comprobar(app.querySelector("#pin").value, destino);
    if(q){ Pin.entrar(q); if(q.startsWith("cam:")) try{ localStorage.setItem("metriax-yo",q.slice(4)); }catch(_){} toast(`Hola, ${Pin.nombre(q)}.`); return reiniciarVista(); }
    fallos++; error="PIN incorrecto."; if(fallos>=5){ bloqueo=ahora()+60000; fallos=0; error="Demasiados intentos. Espera un minuto."; } pintar();
  }
  app.addEventListener("submit",enviar);
  return { titulo:"Acceso · "+cfgBar().nombre, pintar, alCambiar(){}, tic(){ if(bloqueo&&ahora()<bloqueo+1000) pintar(); }, salir(){ app.removeEventListener("submit",enviar); } };
}
document.addEventListener("click",e=>{ if(e.target.closest("[data-bloquear]")){ Pin.salir(); toast("Pantalla bloqueada."); reiniciarVista(); } });

// ---------- Vistas públicas de reservas ----------
Object.assign(TX.es,{reservar:"Reservar mesa", resT:"Reserva tu mesa", resP:"Elige día, hora y cuántos sois. El restaurante te confirma la reserva aquí mismo.", resFecha:"Día", resPersonas:"Personas", resHora:"Hora", resLlena:"Completo",
  resNombre:"Nombre", resTel:"Teléfono", resEmail:"Correo (opcional)", resNota:"¿Algo que debamos saber? (opcional)", resNotaPh:"Trona, celebración, alergias…", resEnviar:"Pedir la reserva", resFalta:"Pon tu nombre, teléfono y la hora.",
  resSinHoras:"No quedan horas libres ese día. Prueba otro día.", resOff:"Ahora mismo no aceptamos reservas por la web. Llámanos y te ayudamos.",
  resTu:"Tu reserva", resEst:{pendiente:"Pendiente de confirmar",confirmada:"¡Confirmada!",sentada:"¡Bienvenidos!",rechazada:"No ha sido posible",cancelada:"Cancelada",noshow:"No presentada"},
  resEstP:{pendiente:"El restaurante la revisará en breve. Puedes dejar esta página abierta: se actualiza sola.",confirmada:"Te esperamos. Si no puedes venir, cancélala aquí para dejar la mesa a otros.",sentada:"Que disfrutéis.",rechazada:"No hay sitio a esa hora. Prueba otra hora u otro día.",cancelada:"Has cancelado la reserva.",noshow:""},
  resCancelar:"Cancelar la reserva", resSeguro:"Pulsa otra vez para cancelar", resNueva:"Hacer otra reserva", resGuardar:"Guarda esta página para ver el estado de tu reserva.", pers:"pers."});
Object.assign(TX.en,{reservar:"Book a table", resT:"Book your table", resP:"Choose the day, time and party size. The restaurant confirms your booking right here.", resFecha:"Day", resPersonas:"People", resHora:"Time", resLlena:"Full",
  resNombre:"Name", resTel:"Phone", resEmail:"Email (optional)", resNota:"Anything we should know? (optional)", resNotaPh:"High chair, celebration, allergies…", resEnviar:"Request booking", resFalta:"Please add your name, phone and a time.",
  resSinHoras:"No times left that day. Try another day.", resOff:"We're not taking online bookings right now. Give us a call and we'll help.",
  resTu:"Your booking", resEst:{pendiente:"Waiting for confirmation",confirmada:"Confirmed!",sentada:"Welcome!",rechazada:"Not possible",cancelada:"Cancelled",noshow:"No-show"},
  resEstP:{pendiente:"The restaurant will review it shortly. Keep this page open: it updates by itself.",confirmada:"See you soon. If you can't make it, cancel here so others can use the table.",sentada:"Enjoy.",rechazada:"There's no room at that time. Try another time or day.",cancelada:"You cancelled the booking.",noshow:""},
  resCancelar:"Cancel booking", resSeguro:"Tap again to cancel", resNueva:"Make another booking", resGuardar:"Save this page to check your booking.", pers:"ppl"});
Object.assign(TX.pt,{reservar:"Reservar mesa", resT:"Reserve a sua mesa", resP:"Escolha o dia, a hora e quantos são. O restaurante confirma a reserva aqui mesmo.", resFecha:"Dia", resPersonas:"Pessoas", resHora:"Hora", resLlena:"Completo",
  resNombre:"Nome", resTel:"Telefone", resEmail:"Email (opcional)", resNota:"Algo que devamos saber? (opcional)", resNotaPh:"Cadeira de bebé, celebração, alergias…", resEnviar:"Pedir a reserva", resFalta:"Indique o nome, o telefone e a hora.",
  resSinHoras:"Não há horas livres nesse dia. Experimente outro dia.", resOff:"Neste momento não aceitamos reservas pela web. Ligue-nos e ajudamos.",
  resTu:"A sua reserva", resEst:{pendiente:"À espera de confirmação",confirmada:"Confirmada!",sentada:"Bem-vindos!",rechazada:"Não foi possível",cancelada:"Cancelada",noshow:"Não compareceu"},
  resEstP:{pendiente:"O restaurante vai revê-la em breve. Pode deixar esta página aberta: atualiza-se sozinha.",confirmada:"Esperamos por si. Se não puder vir, cancele aqui para libertar a mesa.",sentada:"Bom apetite.",rechazada:"Não há lugar a essa hora. Experimente outra hora ou outro dia.",cancelada:"Cancelou a reserva.",noshow:""},
  resCancelar:"Cancelar a reserva", resSeguro:"Toque outra vez para cancelar", resNueva:"Fazer outra reserva", resGuardar:"Guarde esta página para ver o estado da reserva.", pers:"pess."});

function VReservar(){
  const c0=cfgReservas();
  let f={fecha:fechaISO(),personas:2,hora:"",nombre:"",tel:"",email:"",nota:""}, huecos={}, enviando=false;
  async function cargar(){
    if(Store.publico()){ try{ const {data}=await Store.sb.rpc("huecos_reserva",{p_tenant:TENANT,p_fecha:f.fecha}); huecos=data||{}; }catch(e){ huecos={}; } }
    else huecos=ocupacion(f.fecha);
    pintar();
  }
  const leer=()=>{ const g=id=>app.querySelector(id)?.value??""; if(app.querySelector("#rs-nombre")) Object.assign(f,{nombre:g("#rs-nombre").trim(),tel:g("#rs-tel").trim(),email:g("#rs-email").trim(),nota:g("#rs-nota").trim(),acepto:!!app.querySelector("#rs-acepto")?.checked}); };
  function pintar(){
    const c=cfgReservas(), b=cfgBar(), y=window.scrollY;
    const cab=`<div class="m-cab"><div class="m-num" style="background:var(--amarillo);color:var(--tinta)">${ico("calendar")}</div><div style="flex:1"><div class="t">${T("resT")}</div><div class="s">${esc(b.nombre)}${b.ciudad?" · "+esc(b.ciudad):""}</div></div>${idiomaHTML()}</div>`;
    if(!c.activo || b.activo===false){ app.innerHTML=`<div class="app-mesa">${cab}<div class="m-cuerpo"><p class="m-hola">${T("resOff")}</p><a class="btn" href="#carta">${ico("menu")}${T("verCarta")}</a></div></div>`; return; }
    const ahoraMin=new Date().getHours()*60+new Date().getMinutes(), esHoy=f.fecha===fechaISO();
    const horas=horasReserva().map(h=>{ const [hh,mm]=h.split(":").map(Number), pasada=esHoy&&hh*60+mm<ahoraMin+30, llena=(+huecos[h]||0)+f.personas>+c.aforo; return {h,ok:!pasada&&!llena,llena:llena&&!pasada,pasada}; }).filter(x=>!x.pasada);
    if(f.hora && !horas.some(x=>x.h===f.hora&&x.ok)) f.hora="";
    app.innerHTML=`<div class="app-mesa">${cab}<form class="m-cuerpo form-ll" id="f-reserva">
      <p class="m-texto">${T("resP")}</p>
      <div class="fila2"><label>${T("resFecha")}<input id="rs-fecha" type="date" value="${f.fecha}" min="${fechaISO()}" max="${fechaISO(+c.antelacion||30)}" required></label>
      <label>${T("resPersonas")}<select id="rs-personas">${Array.from({length:Math.max(1,+c.maxPersonas||10)},(_,i)=>i+1).map(n=>`<option ${n===f.personas?"selected":""}>${n}</option>`).join("")}</select></label></div>
      <fieldset class="horas"><legend>${T("resHora")} · ${esc(fechaLarga(f.fecha))}</legend>${horas.length?horas.map(x=>`<button type="button" data-hora="${x.h}" aria-pressed="${f.hora===x.h}" ${x.ok?"":"disabled"}>${x.h}${x.llena?`<small>${T("resLlena")}</small>`:""}</button>`).join(""):`<p class="m-texto">${T("resSinHoras")}</p>`}</fieldset>
      <label>${T("resNombre")}<input id="rs-nombre" autocomplete="name" maxlength="60" value="${esc(f.nombre)}" required></label>
      <label>${T("resTel")}<input id="rs-tel" type="tel" autocomplete="tel" maxlength="20" value="${esc(f.tel)}" required></label>
      <label>${T("resEmail")}<input id="rs-email" type="email" autocomplete="email" maxlength="80" value="${esc(f.email)}"></label>
      <label>${T("resNota")}<input id="rs-nota" maxlength="140" placeholder="${T("resNotaPh")}" value="${esc(f.nota)}"></label>
      ${consentHTML("rs-acepto",f.acepto)}<button class="btn rojo" type="submit" ${enviando?"disabled":""}>${ico("calendar")}${T("resEnviar")}</button>
      <a class="btn peq" href="#carta" style="justify-self:start">${ico("back")}${T("verCarta")}</a>
    </form></div>`;
    if(y) window.scrollTo(0,y);
  }
  function clic(e){ const h=e.target.closest("[data-hora]"); if(h&&!h.disabled){ leer(); f.hora=h.dataset.hora; pintar(); } }
  function cambio(e){ const t=e.target; if(t.id==="rs-fecha"&&t.value){ leer(); f.fecha=t.value<fechaISO()?fechaISO():t.value; f.hora=""; cargar(); } if(t.id==="rs-personas"){ leer(); f.personas=+t.value; pintar(); } }
  async function enviar(e){
    if(e.target.id!=="f-reserva") return; e.preventDefault(); leer();
    if(f.nombre.length<2 || f.tel.replace(/\D/g,"").length<6 || !f.hora) return toast(T("resFalta"));
    enviando=true; pintar(); const id=await Acc.reservar(f,"web"); enviando=false;
    if(!id) return pintar();
    try{ localStorage.setItem("metriax-reserva-"+TENANT,id); }catch(_){} location.hash="reserva-"+id;
  }
  app.addEventListener("click",clic); app.addEventListener("change",cambio); app.addEventListener("submit",enviar);
  cargar();
  return { titulo:`${T("reservar")} · ${cfgBar().nombre}`, pintar, alCambiar(){ if(document.activeElement&&app.contains(document.activeElement)&&document.activeElement.matches("input,select")) return; leer(); if(!Store.publico()) huecos=ocupacion(f.fecha); pintar(); },
    salir(){ app.removeEventListener("click",clic); app.removeEventListener("change",cambio); app.removeEventListener("submit",enviar); } };
}
function VReserva({id}){
  let sondeo=null, seguro=false;
  const traer=()=>{ if(Store.publico()) Remoto.reserva(id).catch(()=>{}); };
  function pintar(){
    const r=Store.get("reservas",id), b=cfgBar();
    if(!r){ app.innerHTML=`<div class="app-mesa"><div class="m-cuerpo"><p class="vacio">…</p><a class="btn" href="#reservar">${T("reservar")}</a></div></div>`; return; }
    const [cls]=ESTADOS_RES[r.estado]||["",""], puede=["pendiente","confirmada"].includes(r.estado)&&r.fecha>=fechaISO();
    app.innerHTML=`<div class="app-mesa"><div class="m-cab"><div class="m-num" style="background:var(--amarillo);color:var(--tinta)">${ico("calendar")}</div><div style="flex:1"><div class="t">${T("resTu")}</div><div class="s">${esc(b.nombre)}</div></div>${idiomaHTML()}</div>
      <div class="m-cuerpo">
        <div class="estado-ped res-${r.estado}"><h4><b>${T("resEst")[r.estado]||r.estado}</b><span class="pill ${cls}">${esc(r.hora)}</span></h4>
          <span class="items" style="font-size:18px">${esc(fechaLarga(r.fecha))} · ${esc(r.hora)} · ${r.personas} ${T("pers")}</span>
          <span class="items">${esc(r.nombre)}${r.nota?` · «${esc(r.nota)}»`:""}</span>
          <span class="items">${T("resEstP")[r.estado]||""}</span></div>
        ${r.estado==="pendiente"?`<p class="m-texto" style="font-size:15px">${T("resGuardar")}</p>`:""}
        ${puede?`<button class="btn peq" data-cancelar-res>${seguro?T("resSeguro"):T("resCancelar")}</button>`:""}
        <a class="btn" href="#carta">${ico("menu")}${T("verCarta")}</a>
        ${["rechazada","cancelada"].includes(r.estado)?`<a class="btn rojo" href="#reservar">${ico("calendar")}${T("resNueva")}</a>`:""}
      </div></div>`;
  }
  async function clic(e){
    if(!e.target.closest("[data-cancelar-res]")) return;
    if(!seguro){ seguro=true; return pintar(); }
    if(Store.publico()){ try{ await Store.sb.rpc("cancelar_reserva",{p_tenant:TENANT,p_id:id}); await Remoto.reserva(id); }catch(_){ toast("No se ha podido cancelar. Llama al restaurante."); } }
    else await Acc.reserva(id,{estado:"cancelada"},"cliente");
    seguro=false; pintar();
  }
  app.addEventListener("click",clic);
  traer(); if(Store.publico()) sondeo=setInterval(()=>{ if(document.visibilityState==="visible") traer(); },8000);
  return { titulo:`${T("resTu")} · ${cfgBar().nombre}`, pintar, salir(){ clearInterval(sondeo); app.removeEventListener("click",clic); } };
}

/* =====================================================================
   RUTAS, PERMISOS Y RELOJ
   ===================================================================== */
const app = document.getElementById("app");
/* Redibujado sin parpadeos: en vez de borrar y crear toda la pantalla en cada cambio, se compara con la que hay
   y solo se toca lo que cambia. Las fotos no se recargan, las animaciones no se repiten y no se pierde el foco. */
const Morph = {
  mismo(a,b){ return a.nodeType===b.nodeType && (a.nodeType!==1 || (a.tagName===b.tagName && (a.id||"")===(b.getAttribute("id")||"") && (a.getAttribute("type")||"")===(b.getAttribute("type")||""))); },
  attrs(a,b){
    for(const at of [...a.attributes]) if(!b.hasAttribute(at.name)) a.removeAttribute(at.name);
    for(const at of b.attributes) if(a.getAttribute(at.name)!==at.value) a.setAttribute(at.name,at.value);
  },
  control(a,b){ const foco=document.activeElement===a;
    if(a.tagName==="INPUT"){ const t=(a.type||"").toLowerCase();
      if(t==="checkbox"||t==="radio") a.checked=b.hasAttribute("checked");
      else if(t!=="file" && !foco){ const v=b.getAttribute("value")??""; if(a.value!==v) a.value=v; } }
    else if(a.tagName==="TEXTAREA"){ if(!foco && a.value!==b.textContent) a.value=b.textContent; }
    else if(a.tagName==="SELECT" && !foco){ const o=[...b.options].findIndex(o=>o.hasAttribute("selected")); a.selectedIndex=o>=0?o:(a.options.length?0:-1); } },
  hijos(a,b){
    const B=[...b.childNodes];
    for(let i=0;i<B.length;i++){ const bn=B[i], an=a.childNodes[i];
      if(!an){ a.appendChild(bn); continue; }
      if(!this.mismo(an,bn)){ a.replaceChild(bn,an); continue; }
      if(an.nodeType!==1){ if(an.nodeValue!==bn.nodeValue) an.nodeValue=bn.nodeValue; continue; }
      this.attrs(an,bn);
      if(an.tagName!=="TEXTAREA") this.hijos(an,bn);
      this.control(an,bn);
    }
    while(a.childNodes.length>B.length) a.removeChild(a.lastChild);
  },
  poner(el,html){ const t=document.createElement("template"); t.innerHTML=html; const B=t.content;
    // la primera vez, o si la pantalla es otra completamente distinta, se pinta de golpe
    if(!el.firstChild){ el.appendChild(B); return; }
    this.hijos(el,B); },
  // Engancha el redibujado sin parpadeos a un contenedor: sus «innerHTML = ...» pasan a comparar y actualizar
  activar(el){ const d=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");
    Object.defineProperty(el,"innerHTML",{configurable:true, get(){ return d.get.call(this); }, set(h){ try{ Morph.poner(this,String(h)); }catch(e){ d.set.call(this,h); } }}); }
};
Morph.activar(app);
let vista=null;
function ruta(){
  const h=(location.hash||"#inicio").slice(1); let m;
  if(h==="carta") return {v:"carta"};
  // Enlace de la tarjeta NFC: #m7-código secreto
  if((m=h.match(/^m(\d{1,2})-([a-z0-9]{8,40})$/)) && +m[1]>=1) return {v:"mesa",n:+m[1],tk:m[2]};
  // Enlace antiguo sin código: solo lo puede abrir el personal
  if((m=h.match(/^mesa-(\d{1,2})$/)) && +m[1]>=1) return {v:"mesa",n:+m[1],tk:""};
  if(h==="llevar") return {v:"llevar"};
  if(h==="reservar") return {v:"reservar"};
  if((m=h.match(/^reserva-([a-z0-9]+)$/))) return {v:"reserva",id:m[1]};
  if((m=h.match(/^pedido-([a-z0-9]+)$/))) return {v:"seguir",id:m[1]};
  if(h==="recogida") return {v:"recogida"};
  if(h==="camarero") return {v:"camarero"};
  if(h==="cocina"||h==="barra") return {v:"kds",dest:h};
  if(h==="fichar") return {v:"fichar"};
  if(h==="panel") return {v:"panel"};
  if(h==="admin") return {v:"admin"};
  if(["aviso-legal","privacidad","cookies","registro-jornada"].includes(h)) return {v:"legal",doc:h};
  return {v:"inicio"};
}
// Qué rol necesita cada pantalla del personal (con base de datos; en modo local todo está abierto)
const PERMISOS = {camarero:["sala","dueno","super"], kds:["cocina","sala","dueno","super"], recogida:["cocina","sala","dueno","super"], panel:["sala","dueno","super"], admin:["super"]};
const esPersonal = r => r.v in PERMISOS;
function acceso(r){
  if(!esPersonal(r)) return "ok";
  // Modo demo: si el dueño ha puesto PIN, cada persona entra con el suyo
  if(Store.modo!=="supa" && r.v==="panel") return Acceso.dentro() ? "ok" : "local";
  if(Store.modo!=="supa") return Pin.permite(r.v) ? "ok" : "pin";
  if(!Store.sesion) return "login";
  return PERMISOS[r.v].includes(Store.rol) ? "ok" : "rol";
}
/* =====================================================================
   NORMATIVA: aviso legal, privacidad, cookies, registro de jornada y consentimiento
   Textos de partida pensados para la normativa española (RGPD, LOPDGDD, LSSI-CE, Estatuto de los Trabajadores).
   Conviene que los revise un asesor antes de usarlos con clientes reales.
   ===================================================================== */
// Datos de la empresa que presta la plataforma (encargado del tratamiento). Rellénalos una vez con los de tu empresa.
const PROVEEDOR = {nombre:"metriiax", razon:"", nif:"", domicilio:"", email:""};
const cfgLegal = () => ({razon:"",nif:"",domicilio:"",email:"",telefono:"",...(Store.get("config","legal")||{})});
const dato = v => v ? esc(v) : `<span class="falta">[pendiente de completar]</span>`;
const LG = (es,en,pt) => LANG==="en"?en:LANG==="pt"?pt:es;
const FUENTES_URL = "https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=Patrick+Hand&family=Caveat:wght@600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap";
function cargarFuentes(){ if(document.getElementById("gf")) return; const l=document.createElement("link"); l.id="gf"; l.rel="stylesheet"; l.href=FUENTES_URL; document.head.appendChild(l); }
const consentHTML = (id,marcado) => `<label class="chk"><input type="checkbox" id="${id}" ${marcado?"checked":""} required><span>${LG(`He leído y acepto la <a href="#privacidad" target="_blank" rel="noopener">política de privacidad</a>. Mis datos se usan solo para gestionar este pedido o reserva.`,`I have read and accept the <a href="#privacidad" target="_blank" rel="noopener">privacy policy</a>. My data is used only to handle this order or booking.`,`Li e aceito a <a href="#privacidad" target="_blank" rel="noopener">política de privacidade</a>. Os meus dados só são usados para gerir este pedido ou reserva.`)}</span></label>`;
const Consent = {
  clave:"metriax-consent",
  leer(){ try{ const o=JSON.parse(localStorage.getItem(this.clave)||"null"); return o&&o.v===1?o:null; }catch(e){ return null; } },
  guardar(fuentes){ try{ localStorage.setItem(this.clave,JSON.stringify({v:1,t:Date.now(),fuentes:!!fuentes})); }catch(e){}
    if(fuentes) cargarFuentes(); else document.getElementById("gf")?.remove();
    this.cerrar(); if(vista&&vista.legal) vista.pintar(); },
  mostrar(){ if(document.getElementById("cookies")) return; const d=document.createElement("div"); d.id="cookies"; d.setAttribute("role","dialog"); d.setAttribute("aria-labelledby","ck-t");
    d.innerHTML=`<b id="ck-t">${LG("Cookies y almacenamiento","Cookies and storage","Cookies e armazenamento")}</b><p>${LG("Usamos almacenamiento técnico necesario para que funcionen la carta, tu mesa y las sesiones; no necesita tu permiso. Con tu permiso cargamos además las tipografías desde Google Fonts, lo que envía tu dirección IP a Google. No usamos cookies de analítica ni de publicidad.","We use technical storage needed for the menu, your table and sessions to work; it does not need your consent. With your permission we also load fonts from Google Fonts, which sends your IP address to Google. We use no analytics or advertising cookies.","Usamos armazenamento técnico necessário para o menu, a sua mesa e as sessões funcionarem; não precisa da sua autorização. Com a sua autorização carregamos também tipos de letra do Google Fonts, o que envia o seu IP à Google. Não usamos cookies de análise nem de publicidade.")} <a href="#cookies">${LG("Más información","More information","Mais informação")}</a></p><div class="ck-b"><button type="button" class="b-ui claro" data-consent="min">${LG("Solo las necesarias","Necessary only","Só as necessárias")}</button><button type="button" class="b-ui" data-consent="all">${LG("Aceptar todas","Accept all","Aceitar todas")}</button></div>`;
    document.body.appendChild(d); },
  cerrar(){ document.getElementById("cookies")?.remove(); }
};
document.addEventListener("click",e=>{ const c=e.target.closest("[data-consent]"); if(c){ Consent.guardar(c.dataset.consent==="all"); return; } if(e.target.closest("[data-cookies-abrir]")){ Consent.mostrar(); } });
if(Consent.leer()?.fuentes) cargarFuentes(); else if(!Consent.leer()) Consent.mostrar();
{ const n=document.createElement("nav"); n.className="pie-legal"; n.setAttribute("aria-label","Información legal");
  n.innerHTML=`<a href="#aviso-legal">${LG("Aviso legal","Legal notice","Aviso legal")}</a> · <a href="#privacidad">${LG("Privacidad","Privacy","Privacidade")}</a> · <a href="#cookies">Cookies</a> · <button type="button" data-cookies-abrir>${LG("Gestionar cookies","Manage cookies","Gerir cookies")}</button>`; app.after(n); }

const LEGAL = {
"aviso-legal":{t:"Aviso legal", h:()=>{ const l=cfgLegal(), b=cfgBar(); return `
  <h2>1. Titular del sitio web</h2>
  <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web pertenece a:</p>
  <ul><li><b>Denominación:</b> ${dato(l.razon)} (nombre comercial: ${esc(b.nombre)})</li><li><b>NIF:</b> ${dato(l.nif)}</li><li><b>Domicilio:</b> ${dato(l.domicilio)}</li><li><b>Correo electrónico:</b> ${dato(l.email)}</li>${l.telefono?`<li><b>Teléfono:</b> ${esc(l.telefono)}</li>`:""}</ul>
  <h2>2. Objeto</h2><p>Este sitio permite consultar la carta de ${esc(b.nombre)}, hacer pedidos desde la mesa o para llevar y reservar mesa. La plataforma tecnológica la presta ${esc(PROVEEDOR.nombre)} (${dato(PROVEEDOR.razon)}, NIF ${dato(PROVEEDOR.nif)}).</p>
  <h2>3. Condiciones de uso</h2><p>Quien usa el sitio se compromete a hacerlo de forma lícita y de buena fe. Los pedidos desde la mesa solo deben hacerse estando en ella; el local puede rechazar pedidos que no pueda confirmar. Los precios incluyen impuestos y pueden cambiar sin previo aviso, aplicándose los vigentes al confirmar el pedido.</p>
  <h2>4. Información sobre alérgenos</h2><p>La información de alérgenos de la carta es orientativa. Si tienes una alergia o intolerancia, avisa siempre al personal antes de pedir.</p>
  <h2>5. Propiedad intelectual</h2><p>Los textos, imágenes, logotipos, marcas y el diseño del sitio pertenecen a sus titulares y no pueden reproducirse ni distribuirse sin su autorización.</p>
  <h2>6. Responsabilidad</h2><p>El titular procura que la información sea correcta y que el servicio funcione sin interrupciones, pero no responde de fallos técnicos ajenos a su control ni de usos indebidos del sitio.</p>
  <h2>7. Legislación y jurisdicción</h2><p>Este aviso se rige por la ley española. Los consumidores pueden acudir a los juzgados que les correspondan según la normativa de consumidores y usuarios.</p>`; }},
"privacidad":{t:"Política de privacidad", h:()=>{ const l=cfgLegal(), b=cfgBar(); return `
  <h2>1. Responsable del tratamiento</h2>
  <p><b>${dato(l.razon)}</b> (${esc(b.nombre)}), NIF ${dato(l.nif)}, domicilio ${dato(l.domicilio)}. Contacto para ejercer tus derechos: ${dato(l.email)}.</p>
  <p>La plataforma la presta <b>${esc(PROVEEDOR.nombre)}</b> (${dato(PROVEEDOR.razon)}, NIF ${dato(PROVEEDOR.nif)}, ${dato(PROVEEDOR.domicilio)}), que actúa como <b>encargado del tratamiento</b> con un contrato conforme al artículo 28 del RGPD y solo trata los datos siguiendo las instrucciones del responsable.</p>
  <h2>2. Qué datos tratamos, para qué y con qué base</h2>
  <table><thead><tr><th>Tratamiento</th><th>Datos</th><th>Base jurídica</th><th>Conservación</th></tr></thead><tbody>
   <tr><td>Pedidos desde la mesa</td><td>Número de mesa, productos, notas y alérgenos que indiques. No te identifican.</td><td>Ejecución del contrato (art. 6.1.b RGPD)</td><td>El pedido en curso y, después, los registros contables durante los plazos fiscales y mercantiles (hasta 6 años)</td></tr>
   <tr><td>Pedidos para llevar</td><td>Nombre, teléfono (opcional), hora de recogida y nota</td><td>Ejecución del contrato</td><td>Hasta la entrega y, después, los plazos legales anteriores</td></tr>
   <tr><td>Reservas</td><td>Nombre, teléfono, correo (opcional), fecha, hora, personas y nota</td><td>Ejecución del contrato y medidas precontractuales</td><td>Mientras se gestiona la reserva y, después, bloqueados durante los plazos de prescripción</td></tr>
   <tr><td>Valoraciones</td><td>Estrellas y comentario, sin datos de identificación. No escribas datos personales en el comentario.</td><td>Consentimiento (art. 6.1.a), al enviarlas</td><td>Hasta que se solicite su supresión</td></tr>
   <tr><td>Soporte</td><td>Mensajes del personal con el proveedor</td><td>Interés legítimo en atender consultas (art. 6.1.f)</td><td>Mientras dure la relación de servicio</td></tr>
   <tr><td>Cuentas del personal</td><td>Correo, rol y nombre de usuario</td><td>Relación laboral o interés legítimo en la gestión del acceso</td><td>Mientras tenga acceso</td></tr>
   <tr><td>Registro de jornada del personal</td><td>Horas de entrada, pausas y salida</td><td>Obligación legal (art. 6.1.c; art. 34.9 Estatuto de los Trabajadores)</td><td>4 años</td></tr>
   <tr><td>Datos técnicos</td><td>Dirección IP y registros del servidor</td><td>Interés legítimo en la seguridad (art. 6.1.f)</td><td>Los que fije cada proveedor de alojamiento</td></tr></tbody></table>
  <p>Para pedir o reservar a través de este sitio se te pide aceptar esta política. Si no facilitas los datos obligatorios no podremos gestionar tu reserva o pedido para llevar. No se toman decisiones automatizadas ni se elaboran perfiles.</p>
  <h2>3. Destinatarios y transferencias</h2>
  <p>Tus datos solo los ve el personal del local. Para prestar el servicio intervienen como proveedores: ${esc(PROVEEDOR.nombre)} (plataforma), Supabase (base de datos), Vercel (alojamiento web) y, si lo aceptas en el aviso de cookies, Google (tipografías). Se cargan también dos librerías técnicas desde redes de distribución de contenidos (jsDelivr y unpkg), que reciben tu dirección IP. También podremos comunicar datos a las administraciones cuando una ley lo exija.</p>
  <p>Alguno de estos proveedores puede tratar datos fuera del Espacio Económico Europeo, por ejemplo en EE. UU. En ese caso la transferencia se ampara en una decisión de adecuación de la Comisión Europea (Marco de Privacidad de Datos UE-EE. UU.) o en cláusulas contractuales tipo.</p>
  <h2>4. Tus derechos</h2>
  <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${dato(l.email)} e indicando el derecho y tus datos de contacto; podemos pedirte que acredites tu identidad. Si consideras que no hemos tratado tus datos correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>). Si diste tu consentimiento, puedes retirarlo en cualquier momento sin que afecte a lo ya tratado.</p>
  <h2>5. Seguridad</h2><p>Aplicamos medidas técnicas y organizativas razonables: conexión cifrada, acceso del personal con cuenta o PIN personal, reglas de acceso por restaurante y por rol y límites contra envíos masivos.</p>
  <h2>6. Cookies</h2><p>Consulta la <a href="#cookies">política de cookies</a>.</p>
  <h2>7. Cambios</h2><p>Podemos actualizar esta política; la versión vigente es siempre la publicada aquí.</p>`; }},
"cookies":{t:"Política de cookies", h:()=>{ const c=Consent.leer(); return `
  <p>Este sitio <b>no usa cookies de analítica, de publicidad ni de seguimiento</b>. Guarda en tu dispositivo, con el almacenamiento local del navegador (localStorage y sessionStorage, equivalentes a las cookies a efectos de la LSSI-CE), solo lo imprescindible para que el servicio que pides funcione; ese almacenamiento técnico no necesita tu consentimiento (art. 22.2 LSSI-CE).</p>
  <h2>Almacenamiento necesario (propio)</h2>
  <table><thead><tr><th>Nombre</th><th>Para qué sirve</th><th>Duración</th></tr></thead><tbody>
   <tr><td>metriax-consent</td><td>Recordar tu elección sobre este aviso</td><td>Hasta que lo borres</td></tr>
   <tr><td>lp-lang</td><td>Recordar el idioma elegido</td><td>Hasta que lo borres</td></tr>
   <tr><td>metriax-reserva-…, metriax-ultimo-llevar</td><td>Recordar el identificador de tu última reserva o pedido para que puedas seguirlo</td><td>Hasta que lo borres</td></tr>
   <tr><td>metriax-auth</td><td>Mantener la sesión del personal con cuenta</td><td>Hasta cerrar sesión</td></tr>
   <tr><td>metriax-adm-…, metriax-pin-…</td><td>Mantener abierta la administración o el PIN del personal en esa pestaña</td><td>Hasta cerrar la pestaña</td></tr>
   <tr><td>lp-sonido, metriax-yo</td><td>Preferencias del personal (sonido y quién es)</td><td>Hasta que lo borres</td></tr>
   <tr><td>metriax-&lt;restaurante&gt;</td><td>Solo en modo demo: guarda los datos de prueba en este navegador</td><td>Hasta que lo borres</td></tr></tbody></table>
  <h2>Terceros</h2>
  <table><thead><tr><th>Servicio</th><th>Finalidad</th><th>Condición</th></tr></thead><tbody>
   <tr><td>Google Fonts (Google)</td><td>Cargar las tipografías de la carta. Google recibe tu dirección IP.</td><td><b>Solo con tu permiso</b>; si rechazas, se usan tipografías del sistema</td></tr>
   <tr><td>jsDelivr y unpkg</td><td>Cargar librerías técnicas (conexión con la base de datos y visor 3D). Reciben tu dirección IP.</td><td>Necesarias para el servicio</td></tr></tbody></table>
  <div class="ck-pref"><h3 style="margin:0 0 6px">Tu elección</h3><p style="margin:0">${c?(c.fuentes?"Has aceptado cargar las tipografías de Google Fonts.":"Solo se usa el almacenamiento necesario."):"Todavía no has elegido."}${c?` (${new Date(c.t).toLocaleDateString("es-ES")})`:""}</p><div class="ck-b"><button type="button" class="b-ui claro" data-consent="min">Solo las necesarias</button><button type="button" class="b-ui" data-consent="all">Aceptar todas</button></div></div>
  <p>También puedes borrar estos datos desde los ajustes de tu navegador. Más datos de tratamiento en la <a href="#privacidad">política de privacidad</a>.</p>`; }},
"registro-jornada":{t:"Registro de jornada del personal", h:()=>{ const l=cfgLegal(), b=cfgBar(); return `
  <p>Información para el personal de ${esc(b.nombre)} sobre el registro horario que se hace en las pantallas de cocina y barra (arts. 13 y 14 del RGPD).</p>
  <h2>Responsable</h2><p><b>${dato(l.razon)}</b>, NIF ${dato(l.nif)}, ${dato(l.domicilio)}. Contacto: ${dato(l.email)}. La plataforma la presta ${esc(PROVEEDOR.nombre)} como encargado del tratamiento.</p>
  <h2>Qué se registra y para qué</h2><p>Tu nombre, la hora de entrada, cada pausa (inicio y fin) y la hora de salida, para calcular el tiempo efectivo de trabajo. El cronómetro de pausas sirve para saber cuánto tiempo estás fuera del puesto. La finalidad es cumplir la obligación de registrar la jornada diaria (art. 34.9 del Estatuto de los Trabajadores) y calcular tus horas. No se usa para otros fines, no se geolocaliza y no se toman decisiones automatizadas.</p>
  <h2>Base jurídica</h2><p>Cumplimiento de una obligación legal (art. 6.1.c RGPD).</p>
  <h2>Conservación y acceso</h2><p>El registro se conserva <b>4 años</b> y está a disposición de las personas trabajadoras, de sus representantes legales y de la Inspección de Trabajo y Seguridad Social. Lo ve el personal con acceso a Administración y el encargado del tratamiento. No se borra con «Borrar datos de prueba».</p>
  <h2>Tus derechos</h2><p>Puedes pedir acceso a tu registro, su rectificación si hay un error, y ejercer el resto de derechos del RGPD escribiendo a ${dato(l.email)}. Si no estás conforme, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>`; }}
};
function VLegal({doc}){
  const D=LEGAL[doc]||LEGAL["aviso-legal"];
  const pintar=()=>{ const y=window.scrollY; app.innerHTML=`<div class="legal"><a class="b-ui claro" href="#inicio">← ${LG("Volver","Back","Voltar")}</a><h1>${D.t}</h1><p class="act">Última actualización: noviembre de 2026</p>${D.h()}
    <nav class="legal-nav">${Object.entries(LEGAL).filter(([k])=>k!==doc).map(([k,v])=>`<a href="#${k}">${v.t}</a>`).join("")}</nav></div>`; window.scrollTo(0,y); };
  return { legal:true, titulo:D.t+" · "+cfgBar().nombre, pintar, alCambiar:pintar, salir(){} };
}

function reiniciarVista(){ if(vista && vista.salir) vista.salir(); vista=null; ir(); }
function ir(){
  let r=ruta(); const ac=acceso(r);
  if(ac==="login") r={v:"login",destino:r.v}; else if(ac==="rol") r={v:"sinacceso",destino:r.v}; else if(ac==="pin") r={v:"pin",destino:r.v}; else if(ac==="local") r={v:"local",destino:r.v};
  const clave=JSON.stringify(r);
  if(Store.cerrado && ["inicio","carta","mesa","llevar","seguir","reservar","reserva","recogida"].includes(r.v)){
    vista && vista.salir && vista.salir(); vista={clave:"cerrado"}; document.documentElement.classList.add("cliente"); document.body.dataset.v="cerrado"; document.title="Carta no disponible";
    app.innerHTML=`<div class="app-mesa"><div class="m-cuerpo" style="align-content:center;text-align:center;min-height:80vh"><p class="m-hola">${LG("Esta carta no está disponible","This menu isn't available","Este menu não está disponível")}</p><p class="m-texto">${LG("Pide la carta al personal del local.","Please ask the staff for the menu.","Peça o menu ao pessoal.")}</p></div></div>`; return; }
  if(vista && vista.clave===clave) return;
  vista && vista.salir && vista.salir(); Comanda.cerrar(); AtajoMesa.quitar(); if(r.v==="mesa") setTimeout(()=>AtajoMesa.poner(r.n),0);
  document.documentElement.classList.toggle("staff", ["camarero","panel","admin","sinacceso","pin","local"].includes(r.v));
  // Las pantallas del cliente usan el tema de la marca (también el oscuro); las del personal, siempre el claro
  document.documentElement.classList.toggle("cliente", ["inicio","carta","mesa","llevar","seguir","reservar","reserva","login","pin","sinacceso","local","legal","fichar"].includes(r.v));
  document.body.dataset.v=r.v;
  window.scrollTo(0,0);
  const V={fichar:VFichar,legal:VLegal,login:VLogin,sinacceso:VSinAcceso,pin:VPin,local:VLocal,reservar:VReservar,reserva:VReserva,inicio:VInicio,carta:VCarta,mesa:VMesa,llevar:VLlevar,seguir:VSeguir,recogida:VRecogida,camarero:VCamarero,kds:VKds,panel:VPanel,admin:VAdmin}[r.v];
  aplicarMarca(); try{ if(document.activeElement&&app.contains(document.activeElement)) document.activeElement.blur(); }catch(_){} vista=V(r); vista.clave=clave; document.title=vista.titulo||cfgBar().nombre; vista.pintar();
}
addEventListener("hashchange",ir);
Store.on(()=>{ aplicarMarca(); Acc.autoAceptar(); Acc.autoReservas(); vigilar(); if(!vista) return; if(vista.alCambiar) vista.alCambiar(); else vista.pintar(); });
let pulsando=false;
addEventListener("pointerdown",()=>pulsando=true,true);
addEventListener("pointerup",()=>setTimeout(()=>pulsando=false,0),true);
addEventListener("pointercancel",()=>pulsando=false,true);
setInterval(()=>{
  document.querySelectorAll("[data-desde]").forEach(el=>{ const ms=ahora()-(+el.dataset.desde); el.textContent=(el.dataset.pre||"")+mmss(ms);
    const am=+el.dataset.am||0, ro=+el.dataset.ro||0; if(am) el.classList.toggle("am",ms>=am*1000 && !(ro&&ms>=ro*1000)); if(ro) el.classList.toggle("ro",ms>=ro*1000); });
  document.querySelectorAll("[data-cron]").forEach(el=>{ el.textContent=hms((+el.dataset.base)+(el.dataset.cron==="1"?ahora()-(+el.dataset.t):0)); });
  if(vista && vista.tic && !pulsando) vista.tic();
},1000);
const modoBadge = () => Store.modo==="supa"
  ? `<span class="vivo" title="Lo que pasa en un dispositivo se ve en los demás al momento"><i></i>En vivo · todos los dispositivos</span>`
  : `<span class="vivo local" title="Sin base de datos compartida: funciona entre pestañas de este navegador"><i></i>Modo demo · este navegador</span>`;

/* =====================================================================
   PIEZAS COMPARTIDAS DEL PEDIDO (mesa y para llevar)
   ===================================================================== */
// Venta sugerida según lo que hay en el carrito (se puede apagar en Reglas)
function sugerencias(carrito){
  if(!cfgReglas().sugerir) return [];
  const ks=Object.keys(carrito), its=ks.map(k=>item(k)), c=carta();
  const hayBebida=its.some(x=>x.dest==="barra"), hayComida=its.some(x=>x.dest==="cocina");
  const postre=secciones().find(s=>/postre|dulce|dessert/.test(norm(s.id+" "+s.n)));
  const secsCarrito=new Set(ks.filter(k=>!k.startsWith("menu~")).map(k=>P(k)?.sec));
  let pool=[];
  if(hayBebida && !hayComida) pool=c.filter(p=>p.dest==="cocina"&&p.top);
  else if(hayComida && !hayBebida) pool=c.filter(p=>p.dest==="barra");
  else if(hayComida && postre && !secsCarrito.has(postre.id) && !ks.some(k=>k.startsWith("menu~"))) pool=c.filter(p=>p.sec===postre.id);
  return pool.filter(p=>!agotado(p.id) && !carrito[p.id]).slice(0,2).map(p=>p.id);
}
function listaCarta(cat, carrito){
  if(cat==="menu"){ const m=cfgMenu(); return `<div class="menu-mesa"><b>${T("menuDia")} · ${eur(+m.precio)}</b><span style="font-size:15px;color:var(--tinta-2)">${esc(m.cuando)} · ${T("incluye")}: ${esc(m.incluye)}</span>
    <button class="btn rojo" data-elegir-menu>${ico("plate")}${T("elegirMenu")}</button>
    ${Object.entries(carrito).filter(([k])=>k.startsWith("menu~")).map(([k,q])=>`<div class="lin" style="font-size:15px"><span class="q">${q}×</span><span>${esc(item(k).nL)}</span><button class="btn peq" data-menos="${k}" aria-label="Quitar">−</button></div>`).join("")}</div>`; }
  return carta().filter(p=>p.sec===cat).map(p=>{ const ag=agotado(p.id); return `<div class="item ${ag?"agot":""} ${p.foto?"cf":""}">${p.foto?`<img class="it-foto" src="${esc(safeUrl(p.foto))}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:""}<h4>${esc(nP(p))}</h4><span class="pr">${eur(precio(p.id))}</span>
    <span class="ds">${p.a.length?T("alergenos")+": "+p.a.map(k=>alN(k).toLowerCase()).join(", "):T("sinAl")}</span>
    <div class="acc">${p.modelo?`<button class="mini3d" data-3d="${p.id}" aria-label="${T("ver3d")}">${ico("cube")}</button>`:""}
    ${ag?`<span class="agot-t">${textoAgot(p.id)}</span>`:`<div class="cant">${carrito[p.id]?`<button data-menos="${p.id}" aria-label="−">−</button><span>${carrito[p.id]}</span>`:""}<button data-mas="${p.id}" aria-label="+ ${esc(nP(p))}">+</button></div>`}</div></div>`; }).join("");
}
function catsHTML(cat){
  const m=cfgMenu();
  return `<div class="cats" role="group">${m.activo?`<button data-cat="menu" aria-pressed="${cat==="menu"}">${T("menuDia")}</button>`:""}${seccionesConPlatos().map(s=>`<button data-cat="${s.id}" aria-pressed="${s.id===cat}">${sT(s,0)}</button>`).join("")}</div>`;
}
function cestaLineas(carrito){
  const tot=Object.entries(carrito).reduce((a,[k,q])=>a+item(k).p*q,0);
  return Object.entries(carrito).map(([k,q])=>{ const it=item(k); return `<div class="lin"><span class="q">${q}×</span><span>${esc(it.nL)}</span><span>${eur(it.p*q)}</span></div>`; }).join("")
    + `<div class="total"><span>${T("total")}</span><span>${eur(tot)}</span></div>`;
}
function sugsHTML(carrito){
  const s=sugerencias(carrito); if(!s.length) return "";
  return `<div class="sugs"><h4>${T("tambien")}</h4>${s.map(id=>{ const p=P(id); return `<div class="sug"><span>${esc(nP(p))}<span class="pr">${eur(precio(id))}</span></span><button class="btn peq amar" data-sug="${id}">+ ${LANG==="es"?"Añadir":LANG==="en"?"Add":"Juntar"}</button></div>`; }).join("")}</div>`;
}
function menuHojaHTML(sel){
  const m=cfgMenu();
  const g=(k,arr,t)=>`<h4>${t}</h4><div class="ops">${arr.map((x,i)=>`<button data-msel="${k}" data-i="${i}" aria-pressed="${sel[k]===i}">${esc(x)}</button>`).join("")}</div>`;
  return `<div class="hoja-fondo" data-cerrar><div class="hoja" role="dialog" aria-label="${T("menuDia")}"><div class="asa"></div>
    <h3>${T("menuDia")} · ${eur(+m.precio)}</h3><div class="elige">${g("a",m.primeros,T("primeros"))}${g("b",m.segundos,T("segundos"))}${g("c",m.postres,T("postres"))}</div>
    <p style="margin:0;font-size:15px;color:var(--tinta-2)">${T("incluye")}: ${esc(m.incluye)}</p>
    <button class="btn rojo" data-add-menu ${sel.a!=null&&sel.b!=null&&sel.c!=null?"":"disabled"}>${T("anadirMenu")}</button>
    <button class="btn peq" data-cerrar-b>${T("seguir")}</button></div></div>`;
}
// Gestiona clics comunes del carrito; devuelve true si lo ha atendido
function clicCarrito(t, st){
  const b3=t.closest("[data-3d]"); if(b3){ abrir3D(b3.dataset["3d"]); return true; }
  const c=t.closest("[data-cat]"); if(c){ st.cat=c.dataset.cat; return "pintar"; }
  const mas=t.closest("[data-mas]"); if(mas){ st.carrito[mas.dataset.mas]=(st.carrito[mas.dataset.mas]||0)+1; try{navigator.vibrate&&navigator.vibrate(15);}catch(_){} st.bump=1; return "pintar"; }
  const sg=t.closest("[data-sug]"); if(sg){ st.carrito[sg.dataset.sug]=(st.carrito[sg.dataset.sug]||0)+1; st.sugs.add(sg.dataset.sug); return "pintar"; }
  const menos=t.closest("[data-menos]"); if(menos){ const k=menos.dataset.menos; st.carrito[k]--; if(!st.carrito[k]) delete st.carrito[k]; return "pintar"; }
  if(t.closest("[data-elegir-menu]")){ st.hoja="menu"; st.msel={}; return "pintar"; }
  const ms=t.closest("[data-msel]"); if(ms){ st.msel[ms.dataset.msel]=+ms.dataset.i; return "pintar"; }
  if(t.closest("[data-add-menu]")){ const k=`menu~${st.msel.a}~${st.msel.b}~${st.msel.c}`; st.carrito[k]=(st.carrito[k]||0)+1; st.hoja=null; st.cat="menu"; return "pintar"; }
  return false;
}

/* =====================================================================
   VISTA: ACCESO DEL PERSONAL
   ===================================================================== */
function VLogin({destino}){
  let enviando=false, error="";
  const nombres={camarero:"Sala",kds:"Cocina y barra",recogida:"Pantalla de recogida",panel:"Panel del restaurante",admin:"Panel maestro"};
  function pintar(){
    app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:420px;margin:0 auto;width:100%;align-content:center">
      ${logoHTML("login-logo")}
      <p class="m-hola" style="text-align:center">Acceso del personal</p>
      <p class="m-texto" style="text-align:center">${nombres[destino]||"Personal"}. Entra con tu cuenta; en este dispositivo solo hace falta una vez.</p>
      <form id="f-login" class="form-ll" autocomplete="on">
        <label>Usuario o correo<input id="lg-email" type="text" autocapitalize="none" autocomplete="username" required></label>
        <label>Contraseña<input id="lg-pass" type="password" autocomplete="current-password" required></label>
        ${error?`<p style="margin:0;color:var(--critico);font-size:16px" role="alert">${esc(error)}</p>`:""}
        <button class="btn rojo" type="submit" ${enviando?"disabled":""}>${enviando?"Entrando…":"Entrar"}</button>
      </form>
      <a class="btn peq" href="#inicio" style="justify-self:center">${ico("back")}Volver</a>
      <p class="m-texto" style="font-size:14px;text-align:center">¿No tienes cuenta? Pídesela al dueño o a soporte.</p>
    </div></div>`;
  }
  async function enviar(e){
    if(e.target.id!=="f-login") return; e.preventDefault();
    const email=app.querySelector("#lg-email").value.trim(), pass=app.querySelector("#lg-pass").value;
    enviando=true; error=""; pintar(); app.querySelector("#lg-email").value=email;
    const {error:err}=await Store.sb.auth.signInWithPassword({email:correoLocal(email),password:claveSupa(pass)});
    enviando=false;
    if(err){ error=/invalid/i.test(err.message)?"Usuario o contraseña incorrectos.":"No se ha podido entrar: "+err.message; pintar(); app.querySelector("#lg-email").value=email; return; }
    toast("Sesión iniciada en este dispositivo."); setTimeout(reiniciarVista,300);
  }
  app.addEventListener("submit",enviar);
  return { titulo:"Acceso del personal · "+cfgBar().nombre, pintar, alCambiar(){}, salir(){ app.removeEventListener("submit",enviar); } };
}
async function cerrarSesion(){ if(Store.sb){ await Store.sb.auth.signOut(); toast("Sesión cerrada en este dispositivo."); } }
document.addEventListener("click",e=>{ if(e.target.closest("[data-salir]")) cerrarSesion(); });
function VSinAcceso({destino}){
  const nombres={camarero:"la pantalla de camareros",kds:"cocina y barra",recogida:"la pantalla de recogida",panel:"el panel del restaurante",admin:"el panel maestro"};
  return { titulo:"Sin acceso · "+cfgBar().nombre, pintar(){
    app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:440px;margin:0 auto;width:100%;align-content:center;text-align:center">
      ${logoHTML("login-logo")}
      ${["suspendido","baja"].includes(Store.estado)?`<p class="m-hola">El servicio de ${esc(cfgBar().nombre)} está ${Store.estado==="baja"?"dado de baja":"suspendido"}</p><p class="m-texto">Para volver a usarlo, escribe a <a href="mailto:hola@metriiax.com">hola@metriiax.com</a>.</p>`:`<p class="m-hola">Tu cuenta no tiene acceso a ${nombres[destino]||"esta pantalla"}</p>`}
      <p class="m-texto">Has entrado como ${esc(Store.sesion?.user?.email||"")}${Store.rol?` (${({dueno:"dueño",sala:"sala",cocina:"cocina",super:"super-admin"})[Store.rol]})`:", sin permisos en este restaurante"}. Pide acceso al dueño o a soporte.</p>
      <button class="btn rojo" data-salir>Entrar con otra cuenta</button>
      <a class="btn peq" href="#inicio">${ico("back")}Volver</a>
    </div></div>`;
  }};
}

/* =====================================================================
   VISTA: INICIO
   ===================================================================== */
function VInicio(){
  return { titulo:cfgBar().nombre+" · "+PLATAFORMA, pintar(){
    const abiertas=new Set(Store.all("mesas").filter(m=>m.abierta).map(m=>m.n)), r=resumen(0), N=mesasN(), verMesas=Store.personal()&&!!tokenDe(1);
    const ent=Store.personal()?entrantes().length:0;
    app.innerHTML=`<div class="inicio">
      <div class="ini-top">${logoHTML("ini-logo")}${modoBadge()}</div>
      <div class="ini-hero">
        <div><h1>Todo el restaurante conectado: de la mesa a la cocina</h1>
          <p>Abre cada pantalla en el dispositivo que la va a usar. El cliente pide desde su mesa, sala confirma el pedido y llega a cocina y barra al instante.</p>
          <div class="acciones" style="justify-content:flex-start;margin-top:16px">${verMesas?`<a class="btn rojo" href="${hashMesa(Math.min(4,N))}">${ico("nfc")}Probar como cliente (mesa ${Math.min(4,N)})</a>`:""}<a class="btn" href="#panel">${ico("chart")}Abrir el panel</a></div></div>
        <ol class="flujo" aria-label="Cómo viaja un pedido">
          <li><span>${ico("nfc")}</span><b>El cliente acerca el móvil</b><small>La tarjeta de su mesa lleva un enlace secreto</small></li>
          <li><span>${ico("check")}</span><b>Sala lo confirma</b><small>Comprueba que hay gente: la mesa se ocupa sola</small></li>
          <li><span>${ico("chef")}</span><b>Cocina y barra</b><small>Cada una recibe solo lo suyo</small></li>
          <li><span>${ico("bell")}</span><b>Listo, servido y cobrado</b><small>Al cobrar, la mesa vuelve a verde</small></li>
        </ol>
      </div>
      <div class="pantallas">
        <a class="pant" href="#carta"><span class="quien">Público</span><span class="ico" style="background:#fff4c9">${ico("menu")}</span><h2>Carta web</h2><p>Para Google y redes. Menú del día, alérgenos, 3D y en español, inglés y portugués.</p></a>
        <div class="pant" style="cursor:default"><span class="quien">En la mesa</span><span class="ico" style="background:#ffe1e1">${ico("nfc")}</span><h2>Mesa del cliente</h2><p>Lo que se abre al acercar el móvil a la tarjeta${verMesas?":":". Los enlaces están en el panel, pestaña Tarjetas NFC."}</p>
          ${verMesas?`<div class="mesas-rapidas">${Array.from({length:Math.min(12,N)},(_,i)=>i+1).map(n=>`<a href="${hashMesa(n)}" class="${abiertas.has(n)?"ab":""}" aria-label="Mesa ${n}">${n}</a>`).join("")}</div>`:""}</div>
        ${cfgReglas().llevar?`<a class="pant" href="#llevar"><span class="quien">Público</span><span class="ico" style="background:#fde3c8">${ico("bag")}</span><h2>Para llevar</h2><p>Pide desde la web, elige hora y recoge con tu código.</p></a>`:""}
        <a class="pant" href="#reservar"><span class="quien">Público</span><span class="ico" style="background:#e3eefa">${ico("calendar")}</span><h2>Reservas</h2><p>El cliente reserva desde la web; el restaurante la confirma en el panel o en sala.</p></a>
        <a class="pant" href="#camarero"><span class="quien">Personal</span><span class="ico" style="background:#e3eefa">${ico("bell")}</span><h2>Camarero</h2><p>Confirma pedidos y recibe los avisos de sus mesas, con sonido.${ent?` <b style="color:var(--critico)">${ent} por confirmar</b>`:r.pendientes?` <b style="color:var(--critico)">${r.pendientes} pendientes</b>`:""}</p></a>
        <a class="pant" href="#cocina"><span class="quien">Tablet cocina</span><span class="ico" style="background:#fbe8cf">${ico("chef")}</span><h2>Cocina</h2><p>Solo la comida confirmada, por orden de llegada y con tiempos.</p></a>
        <a class="pant" href="#barra"><span class="quien">Tablet barra</span><span class="ico" style="background:#f2e3ef">${ico("glass")}</span><h2>Barra</h2><p>Solo la bebida. Sin cantar comandas.</p></a>
        <a class="pant" href="#fichar"><span class="quien">Todo el personal</span><span class="ico" style="background:#e3eefa">${ico("users")}</span><h2>Fichar</h2><p>Entrada, pausa y salida con tu propio usuario y contraseña. Solo ves tu fichaje.</p></a>
        <a class="pant" href="#recogida"><span class="quien">Pantalla</span><span class="ico" style="background:#e1f0e4">${ico("screen")}</span><h2>Recogida</h2><p>Para una tele: códigos de los pedidos para llevar.</p></a>
        <a class="pant" href="#panel"><span class="quien">Dueño</span><span class="ico" style="background:#e3f2e1">${ico("chart")}</span><h2>Panel</h2><p>Sala, pedidos, reservas, economía y caja, inventario, compras, carta, marca y equipo.</p></a>
        <a class="pant" href="#admin"><span class="quien">${PLATAFORMA}</span><span class="ico" style="background:#e9e4f7">${ico("gear")}</span><h2>Panel maestro</h2><p>Todos los restaurantes, crear demos y clientes, entrar a ayudar y chat de soporte.</p></a>
      </div>
      <ol class="como" aria-label="Cómo probarlo">
        <li>Abre <b>Camarero</b> en un móvil y activa el sonido.</li><li>En otro móvil abre <b>Mesa ${Math.min(4,N)}</b> y pide algo.</li>
        <li>El camarero lo <b>acepta</b>: la mesa se ocupa y el pedido llega a <b>Cocina</b> y <b>Barra</b>.</li><li>Al <b>cobrar</b>, la mesa vuelve a verde y lo vendido aparece en <b>Economía</b>.</li>
      </ol>
      <div class="ini-pie"><span>${Store.modo==="supa"?"Los datos se comparten entre todos los dispositivos.":"Modo demo: funciona entre pestañas de este navegador, sin internet."} Restaurante: <b>${esc(TENANT)}</b></span><span>Funciona con ${PLATAFORMA}</span></div>
    </div>`;
  }};
}

/* =====================================================================
   VISTA: CARTA PÚBLICA
   ===================================================================== */
function VCarta(){
  const quitados=new Set(), enganchados=new WeakSet(); let q="", onScroll, clic;
  function filtrar(){
    const qq=norm(q); let vis=0;
    app.querySelectorAll(".plato").forEach(el=>{ const al=el.dataset.al?el.dataset.al.split(" "):[]; const ok=(!qq||el.dataset.txt.includes(qq))&&!al.some(x=>quitados.has(x)); el.hidden=!ok; if(ok) vis++; });
    app.querySelectorAll("section.parada").forEach(s=>s.hidden=!s.querySelector(".plato:not([hidden])"));
    app.querySelector("#vacio").hidden=vis>0;
    app.querySelector("#aviso-f").textContent=quitados.size?`${T("ocultando")} ${[...quitados].map(k=>alN(k).toLowerCase()).join(", ")}.`:"";
  }
  function activa(){
    const enl=[...app.querySelectorAll(".ruta a")]; if(!enl.length) return; const SS=seccionesConPlatos(); let act=SS[0]?SS[0].id:"";
    for(const s of SS){ const el=document.getElementById("sec-"+s.id); if(el&&!el.hidden&&el.getBoundingClientRect().top<190) act=s.id; }
    enl.forEach(a=>{ const on=a.dataset.sec===act; if(on&&a.getAttribute("aria-current")!=="true"){ const cont=app.querySelector(".ruta-scroll"), li=a.closest("li"); cont.scrollTo({left:li.offsetLeft-(cont.clientWidth-li.offsetWidth)/2,behavior:"smooth"}); } a.setAttribute("aria-current",on); });
  }
  function pintar(){
    const bar=cfgBar(), m=cfgMenu(), SS=seccionesConPlatos(), dest=carta().filter(p=>p.top && !agotado(p.id)), y=window.scrollY;
    app.innerHTML=`<div class="carta">
      <header>
        <a class="volver" href="#inicio">${ico("back")}</a>${idiomaHTML()}
        ${logoHTML("logo")}
        ${bar.ciudad?`<p class="ciudad">${esc(bar.ciudad.toUpperCase())}</p>`:""}
        ${bar.eslogan?`<p class="claim">${esc(bar.eslogan)}</p>`:""}
        <div class="acciones"><a class="btn rojo" href="#sec-${SS[0]?SS[0].id:""}" data-scroll>${ico("menu")}${T("verCarta")}</a>${cfgReservas().activo&&bar.activo!==false?`<a class="btn" href="#reservar">${ico("calendar")}${T("reservar")}</a>`:""}${cfgReglas().llevar&&bar.activo!==false?`<a class="btn amar" href="#llevar">${ico("bag")}${T("llevar")}</a>`:""}${safeUrl(bar.google)?`<a class="btn" href="${esc(safeUrl(bar.google))}">${ico("pin")}${T("llegar")}</a>`:""}</div>
      </header>
      <nav class="ruta" aria-label="${T("verCarta")}"><div class="ruta-scroll"><ol>${SS.map((s,i)=>`<li><a href="#sec-${s.id}" data-sec="${s.id}" data-scroll><span class="stop">${i+1}</span><span class="nom">${sT(s,0)}</span></a></li>`).join("")}</ol></div></nav>
      ${m.activo?`<section class="menu-dia" aria-labelledby="md"><span class="cinta">${T("menuDia").toUpperCase()}</span>
        <h2 id="md"><span>${esc(m.cuando)}</span><span class="pz">${eur(+m.precio)}</span></h2>
        <div class="menu-cols"><div><h3>${T("primeros")}</h3><ul>${m.primeros.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><h3>${T("segundos")}</h3><ul>${m.segundos.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><h3>${T("postres")}</h3><ul>${m.postres.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
        <p class="incl">${T("incluye")}: ${esc(m.incluye)}</p></section>`:""}
      ${dest.length?`<div class="destacados"><h2>${T("masPedido")}</h2><div class="tira">${dest.map(p=>`<button class="dest" data-ir="${p.id}"><b>${esc(nP(p))}</b><span>${eur(precio(p.id))}${p.modelo?" · 3D":""}</span></button>`).join("")}</div></div>`:""}
      ${carta().some(p=>p.modelo)?`<div class="banda3d"><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="4" width="32" height="56" rx="6" fill="#fff" stroke="#1f1b17" stroke-width="3"/><ellipse cx="32" cy="38" rx="11" ry="4" fill="#f2c14e" stroke="#1f1b17" stroke-width="2"/><path d="M23 36q9-8 18 0" fill="#e9a43a" stroke="#1f1b17" stroke-width="2"/><path d="M8 20q-4 6 0 12M56 20q4 6 0 12" fill="none" stroke="#1f1b17" stroke-width="2.5" stroke-linecap="round"/></svg><p><strong>${T("b3dT")}</strong>${T("b3dP")}</p></div>`:""}
      <div class="herr">
        <label class="buscar" for="q">${ico("search")}<input id="q" type="search" placeholder="${T("buscar")}" autocomplete="off" aria-label="${T("buscar")}"></label>
        <p class="filtro-t">${T("alergia")}</p>
        <div class="chips" id="filtros" role="group">${Object.keys(ALERGENOS).map(k=>`<button class="chip" type="button" aria-pressed="${quitados.has(k)}" data-k="${k}">${alN(k)}</button>`).join("")}</div>
        <p class="aviso-filtro" id="aviso-f" aria-live="polite"></p>
      </div>
      ${SS.map((s,i)=>`<section class="parada" id="sec-${s.id}" aria-labelledby="h-${s.id}">
        <div class="p-head">${ICONOS_SEC[s.icono]||ICONOS_SEC[ICONO_DEST[s.dest]]||""}<div><span class="p-num">${i+1}</span><h2 id="h-${s.id}">${sT(s,1)}</h2></div></div><p class="p-nota">${sT(s,2)}</p>
        <div class="platos">${carta().filter(p=>p.sec===s.id).map(p=>`<article class="plato ${agotado(p.id)?"agotado":""}" data-id="${p.id}" data-al="${p.a.join(" ")}" data-txt="${norm(p.n+" "+nP(p)+" "+dP(p))}" data-agot="${textoAgot(p.id)}">
          ${p.foto?`<img class="pl-foto" src="${esc(safeUrl(p.foto))}" alt="${esc(nP(p))}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:""}<h3>${esc(nP(p))}</h3><div class="precio">${eur(precio(p.id))}${p.u&&LANG==="es"?`<small>${esc(p.u)}</small>`:""}</div><p class="desc">${esc(dP(p))}</p>
          <div class="alerg">${p.a.length?p.a.map(chipAl).join(""):`<span class="al" style="border-style:dashed;padding-left:7px">${T("sinAl")}</span>`}</div>
          ${(p.modelo||p.etq)?`<div class="pie-plato">${p.modelo?`<button class="ver3d" data-3d="${p.id}">${ico("cube")}${T("ver3d")}</button>`:""}${p.etq&&!p.modelo&&LANG==="es"?`<span class="etq">${p.etq}</span>`:""}</div>`:""}</article>`).join("")}</div></section>`).join("")}
      <p class="vacio" id="vacio" hidden>${T("vacio")}</p>
      <section class="leyenda" aria-labelledby="ley"><h2 id="ley">${T("alergenos")}</h2><ul>${Object.keys(ALERGENOS).map(k=>`<li><span class="al"><i style="background:${ALERGENOS[k].c}">${ALERGENOS[k].l}</i></span>${alN(k)}</li>`).join("")}</ul><p>${T("leyAl")}</p></section>
      <footer>${safeUrl(bar.google)?`<a class="btn" href="${esc(safeUrl(bar.google))}">${ico("star")}${T("opinar")}</a>`:""}<p class="firma">${esc(bar.nombre)} · ${esc(bar.ciudad)}</p><p style="font-size:15px;color:var(--tinta-3)">Carta de ejemplo: los platos y precios se sustituyen por los reales.</p></footer>
    </div>`;
    const inp=app.querySelector("#q"); if(document.activeElement!==inp) inp.value=q;
    if(!enganchados.has(inp)){ enganchados.add(inp); inp.addEventListener("input",()=>{ q=inp.value; filtrar(); }); }
    const fil=app.querySelector("#filtros"); if(!enganchados.has(fil)){ enganchados.add(fil); fil.addEventListener("click",e=>{ const b=e.target.closest(".chip"); if(!b) return; const on=b.getAttribute("aria-pressed")!=="true"; b.setAttribute("aria-pressed",on); on?quitados.add(b.dataset.k):quitados.delete(b.dataset.k); filtrar(); }); }
    filtrar(); activa(); if(y) window.scrollTo(0,y);
  }
  clic=e=>{
    const b3=e.target.closest("[data-3d]"); if(b3) return abrir3D(b3.dataset["3d"]);
    const d=e.target.closest("[data-ir]"); if(d){ const el=app.querySelector(`.plato[data-id="${d.dataset.ir}"]`); el&&el.scrollIntoView({behavior:"smooth",block:"center"}); el&&el.animate([{transform:"scale(1)"},{transform:"scale(1.03)"},{transform:"scale(1)"}],{duration:500}); return; }
    const a=e.target.closest("[data-scroll]"); if(a){ e.preventDefault(); document.getElementById(a.getAttribute("href").slice(1))?.scrollIntoView({behavior:"smooth"}); }
  };
  app.addEventListener("click",clic);
  onScroll=()=>requestAnimationFrame(activa); addEventListener("scroll",onScroll,{passive:true});
  return { titulo:`${T("verCarta")} · ${cfgBar().nombre}`, pintar,
    alCambiar(){ if(document.activeElement && document.activeElement.id==="q") return; pintar(); },
    salir(){ removeEventListener("scroll",onScroll); app.removeEventListener("click",clic); } };
}
function abrir3D(id){
  const p=P(id), v=document.getElementById("visor"), mv=document.getElementById("mv");
  document.getElementById("v-nombre").textContent=nP(p);
  document.getElementById("v-medida").textContent=p.medida?"Tamaño real · "+p.medida:"";
  mv.setAttribute("src",p.modelo); mv.setAttribute("alt","3D: "+nP(p));
  try{ v.showModal(); }catch(e){ v.setAttribute("open",""); }
}
document.getElementById("v-cerrar").addEventListener("click",()=>document.getElementById("visor").close());
document.getElementById("visor").addEventListener("click",e=>{ if(e.target.id==="visor") e.target.close(); });

/* =====================================================================
   VISTA: MESA (cliente)
   ===================================================================== */
function VMesa({n,tk}){
  const st={carrito:{},cat:cfgMenu().activo&&new Date().getHours()<17?"menu":(seccionesConPlatos()[0]||{}).id,hoja:null,msel:{},sugs:new Set(),bump:0};
  let modoP="todo", selP={}, nPers=2, pagandoP=false;
  // Cesta compartida: st.carrito es lo de este móvil; lo de los demás llega del servidor (carritos/<mesa>)
  let cmodo="todo", csel={}, cpers=2, rondaVista=-1, ultSubido="", tSub=null;
  const cestaDoc=()=>Store.get("carritos",n)||{};
  const partesViva=()=>{ const p=cestaDoc().partes; return p&&typeof p==="object"&&(((p.pagos||[]).length>0)||ahora()-(+p.t||0)<1200000)?p:null; };
  // Al abrir (rondaVista -1) se recupera lo de este móvil sin perder lo que ya tuviera; después, si cambia la ronda, manda el servidor
  function sincCesta(){ const c=Store.get("carritos",n); if(!c) return; const r=c.ronda||0; if(r!==rondaVista){ const mio={...((c.por||{})[DISP]||{})}, primera=rondaVista<0;
    st.carrito=primera?{...mio,...st.carrito}:mio; rondaVista=r; ultSubido=""; csel={}; if(primera&&JSON.stringify(st.carrito)!==JSON.stringify(mio)) setTimeout(subirCesta,0); } }
  const lineasCesta=()=>{ const out=[]; Object.entries(st.carrito).forEach(([k,q])=>{ if(q>0) out.push({de:DISP,k,q}); });
    Object.keys(cestaDoc().por||{}).filter(d=>d!==DISP).sort().forEach(d=>Object.entries(cestaDoc().por[d]||{}).forEach(([k,q])=>{ if(+q>0) out.push({de:d,k,q:+q}); })); return out; };
  const nombreMovil=d=>{ if(d===DISP) return T("tu"); const ds=Object.keys(cestaDoc().por||{}).filter(x=>x!==DISP).sort(); return T("movilN",ds.indexOf(d)+2); };
  function subirCesta(){ clearTimeout(tSub); tSub=setTimeout(async()=>{
    const mapa={}; Object.entries(st.carrito).forEach(([k,q])=>{ if(q>0) mapa[k]=q; }); const r0=Math.max(0,rondaVista), js=JSON.stringify(mapa)+"|"+r0; if(js===ultSubido) return; ultSubido=js;
    const r=await CestaMesa.set(n,tk,mapa,r0).catch(()=>null);
    if(r&&r.error==="bloqueado"){ toast(T("bloqueada")); st.carrito={...((r.por||{})[DISP]||{})}; ultSubido=""; pintar(); }
    else if(r&&(r.ronda||0)!==r0){ ultSubido=""; pintar(); } },300); }
  const selCesta=()=>{ const L=lineasCesta(); if(cmodo==="mio") return L.filter(l=>l.de===DISP); if(cmodo==="elegir") return L.map(l=>({...l,q:Math.min(l.q,csel[l.de+"|"+l.k]||0)})).filter(l=>l.q>0); return L; };
  const parteDiv=()=>{ const p=partesViva(); if(p){ const pg=r2((p.pagos||[]).reduce((a,x)=>a+(+x.importe||0),0)), resto=Math.max(0,r2(p.total-pg)), q=p.n-(p.pagos||[]).length; return {n:p.n,k:(p.pagos||[]).length,resto,parte:q<=1?resto:Math.min(resto,Math.ceil(resto*100/q)/100)}; }
    const tot=r2(tCarr()); return {n:cpers,k:0,resto:tot,parte:cpers<=1?tot:Math.min(tot,Math.ceil(tot*100/cpers)/100)}; };
  const importeCesta=()=>cmodo==="partes"||partesViva()?parteDiv().parte:r2(selCesta().reduce((a,l)=>a+item(l.k).p*l.q,0));
  const conMenu=L=>L.some(l=>l.k.startsWith("menu~")||l.k.startsWith("tmp-"));
  let nota="", forma=null, estrellas=0, coment="", ultimo={}, valorada=false, valido=null, llamadoT=0, cuentaPedida=null, sondeo=null, enviando=false, comprobando=false;
  // ¿El enlace es el de esta mesa? Con base de datos lo comprueba el servidor; si no, se compara aquí.
  async function comprobar(){
    if(Store.publico()){ if(comprobando) return; comprobando=true;
      try{ const r=await Remoto.mesa(n,tk); const antes=valido; valido=!!(r&&r.ok); if(antes!==valido) pintar(); }catch(e){ if(valido===null){ valido=false; pintar(); } }
      finally{ comprobando=false; } }
    else { valido = n<=mesasN() && (tk ? (tokenDe(n)===tk || (!(Store.get("nfc",n)||{}).manual && tk===tokenDemo(n))) : Store.personal()); }
  }
  // Pedidos de esta visita: desde que la mesa se ocupó o, si está libre, desde que se cobró por última vez
  const misPedidos=()=>{ const m=mesa(n), desde=m.abierta?(m.desde||0):(m.cerradaT||0); return Store.all("pedidos").filter(p=>p.mesa===n&&!p.llevar&&p.t>=desde).sort((a,b)=>a.t-b.t); };
  const llamado=()=>Store.publico()?ahora()-llamadoT<120000:Store.all("avisos").some(a=>a.mesa===n&&a.tipo==="llamada"&&!a.atendido);
  const cuentaPed=()=>cuentaDe(n)||cuentaPedida;
  const nCarr=()=>lineasCesta().reduce((a,l)=>a+l.q,0), tCarr=()=>lineasCesta().reduce((a,l)=>a+item(l.k).p*l.q,0);
  // Pagar con tarjeta desde la mesa (Stripe): solo con base de datos, con el enlace del cliente y sin menú del día
  const puedePagarCuenta=()=>Store.modo==="supa" && !!tk && cfgReglas().pagoOnline!==false;
  const parteAhora=()=>{ const m=mesa(n); return importeParte(m,modoP,modoP==="mio"?selMio(m):selP,nPers); };
  const puedePagar=()=>Store.modo==="supa" && !!tk && cfgReglas().pagoOnline!==false && importeCesta()>=0.5 && !conMenu(cmodo==="partes"||partesViva()?lineasCesta():selCesta());
  // Vuelta desde Stripe: ?pago=cs_… (pagado) o ?pago=cancel
  { const q=new URLSearchParams(location.search), pg=q.get("pago");
    if(pg){ q.delete("pago"); history.replaceState(null,"",location.pathname+(q.toString()?"?"+q.toString():"")+location.hash);
      if(pg==="cancel") setTimeout(()=>toast(T("pagoKo")),300);
      else if(/^cs_[A-Za-z0-9_]+$/.test(pg)){ setTimeout(()=>toast(T("pagoConf")),100);
        (async()=>{ for(let i=0;i<6;i++){ const r=await Remoto.pago({accion:"confirmar",sesion:pg}).catch(()=>null);
          if(r&&r.ok){ if(r.parte){ toast(r.completo?T("parteCompleta"):T("parteOk",eur(r.resto||0))); if(r.pedido){ Store.data.pedidos.set(r.pedido.id,r.pedido); Store.emit(); } setTimeout(()=>comprobar(),500); return; }
            if(r.cuenta){ toast(T(r.cerrada?"pagoTodoOk":"pagoParteOk")); setTimeout(()=>comprobar(),500); st.hoja=cfgReglas().valorar?"valorar":(safeUrl(cfgBar().google)?"google":null); estrellas=0; coment=""; setTimeout(()=>pintar(),700); return; }
            if(r.pedido){ Store.data.pedidos.set(r.pedido.id,r.pedido); Store.emit(); } toast(T("pagoOk")); setTimeout(()=>comprobar(),800); return; }
          if(r&&r.estado==="unpaid"){ toast(T("pagoKo")); return; } await new Promise(s=>setTimeout(s,1500)); } toast(T("pagoKo")); })(); } } }
  function pantallaSimple(titulo,texto,extra=""){
    app.innerHTML=`<div class="app-mesa"><div class="m-cuerpo" style="align-content:center;text-align:center">${logoHTML("login-logo")}
      <p class="m-hola">${titulo}</p><p class="m-texto">${texto}</p>${extra}<a class="btn ancho" href="#carta">${ico("menu")}${T("verCarta")}</a></div></div>`;
  }
  function pintar(){
    sincCesta();
    if(valido===null){ comprobar(); if(valido===null){ app.innerHTML=`<div class="app-mesa"><div class="m-cuerpo" style="align-content:center"><p class="vacio">${T("comprobando")}</p></div></div>`; return; } }
    if(!valido) return pantallaSimple(T("enlaceMal"),T("enlaceMalP"));
    if(cfgBar().activo===false) return pantallaSimple(T("pausado"),T("pausadoP"));
    const m=mesa(n), cam=quienAtiende(n), y=window.scrollY, b=cfgBar(), cuenta=cuentaPed();
    const cab=`<div class="m-cab"><div class="m-num"><div><small>${T("mesa")}</small>${n}</div></div><div style="flex:1;min-width:0"><div class="t">${esc(b.nombre)}</div><div class="s">${zonaDe(n)} · ${T("teAtiende")} ${esc(cam)}</div></div>${m.abierta&&m.consumo&&m.consumo.length?`<div style="text-align:right"><div class="s">${T("llevas")}</div><div style="font-family:var(--display);color:var(--rojo);font-size:18px">${eur(totalMesa(m))}</div></div>`:""}${idiomaHTML()}</div>
      ${!tk?`<p class="aviso-personal">Vista del personal: el cliente entra con el enlace secreto de la tarjeta.</p>`:""}`;
    const despedida=valorada&&!m.abierta&&!misPedidos().length?(safeUrl(b.google)?`<div class="google-cta"><p class="m-hola" style="text-align:center">${T("gracias")}</p><p class="m-texto">${T("graciasG")}</p><a class="btn rojo" href="${esc(safeUrl(b.google))}">${ico("star")}${T("irGoogle")}</a></div>`:`<p class="m-hola" style="text-align:center">${T("gracias")}</p>`):"";
    const peds=misPedidos(), E=T("estados"), vivos=peds.filter(p=>{ const e=estadoPedido(p); return e>=0&&e<2 || (e<0&&ahora()-((p.rechazado||{}).t||p.t)<120000); });
    app.innerHTML=`<div class="app-mesa">${cab}<div class="m-cuerpo">
      ${despedida}${cuenta?`<div class="estado-ped" style="background:#fff7dc"><h4><b>${ico("receipt")} ${T("cuentaPedida")} · ${cuenta==="tarjeta"?T("tarjeta"):T("efectivo")}</b><b>${eur(totalMesa(m))}</b></h4><span class="items">${cuenta==="tarjeta"?T("vieneDatafono",esc(cam)):T("vieneCambio",esc(cam))}</span></div>`:""}
      ${vivos.length?vivos.map(p=>{ const e=estadoPedido(p), i=peds.indexOf(p); return `<div class="estado-ped ${e<0?"rechazado":""}"><h4><b>${T("pedido")} ${i+1}${e<0?` · ${T("rechazado")}`:""}${p.pagado?` <span class="pg-chip">${T("pagado")}</span>`:""}</b><span class="reloj" data-desde="${p.t}">${mmss(ahora()-p.t)}</span></h4>
        <span class="items">${p.items.map(x=>`${x.q}× ${esc(item(x.id).nL||x.n)}`).join(" · ")}</span>
        ${e<0?`<span class="items">${T("rechazadoP")}</span>`:`<div class="pasos" aria-label="${E[e]}">${E.map((s,k)=>`<span class="${k<e?"on":k===e?"ahora":""}">${s}</span>`).join("")}</div>${e===0&&!p.pagado?`<span class="espera">${T("esperaConf")}</span>`:""}`}</div>`; }).join(""):(peds.length?"":`<p class="m-hola">${T("apetece")}</p><p class="m-texto">${T("apeteceP")}</p>`)}
      ${peds.some(p=>estadoPedido(p)>=0&&p.items.some(x=>x.dest==="barra"))?`<button class="btn amar" data-a="ronda">${ico("repeat")}${T("ronda")}</button>`:""}
      ${catsHTML(st.cat)}
      ${listaCarta(st.cat,st.carrito)}
    </div>
    <div class="m-pie">
      ${nCarr()?`<button class="btn rojo cesta ${st.bump?"bump":""}" data-a="cesta"><span><span class="n">${nCarr()}</span>${T("verPedido")}</span><span>${eur(tCarr())}</span></button>`:""}
      <div class="fila2"><button class="btn peq" data-a="llamar" ${llamado()?"disabled":""}>${ico("bell")}${llamado()?T("avisadoC"):T("llamar")}</button><button class="btn peq amar" data-a="hoja-cuenta" ${cuenta||!(m.consumo&&m.consumo.length)||pendienteMesa(m)<=0?"disabled":""}>${ico("receipt")}${T("pedirCuenta")}</button></div>
    </div>
    ${st.hoja==="cesta"?(()=>{ const L=lineasCesta(), pv=partesViva(), D=parteDiv(), imp=importeCesta(), online=puedePagar(), sel=selCesta(), grupos=[...new Set(L.map(l=>l.de))];
      return `<div class="hoja-fondo" data-cerrar><div class="hoja" role="dialog" aria-label="${T("pedidoMesa")}"><div class="asa"></div>
      <h3>${T("pedidoMesa")} · ${T("mesa").toLowerCase()} ${n}</h3><p class="cesta-viva"><i></i>${T("cestaViva")}</p>
      ${L.length?grupos.map(d=>`<p class="cesta-quien">${esc(nombreMovil(d))}</p>${L.filter(l=>l.de===d).map(l=>{ const it=item(l.k), mia=d===DISP&&!pv, kk=l.de+"|"+l.k;
        return `<div class="lin"><span class="q">${l.q}×</span><span>${esc(it.nL||it.n)}</span>${cmodo==="elegir"&&!pv?`<span class="cant"><button data-csel="${esc(kk)}" data-d="-1" aria-label="−">−</button><span>${Math.min(csel[kk]||0,l.q)}</span><button data-csel="${esc(kk)}" data-d="1" aria-label="+">+</button></span>`
          :mia?`<span class="cant"><button data-menos="${esc(l.k)}" aria-label="−">−</button><span>${eur(it.p*l.q)}</span><button data-mas="${esc(l.k)}" aria-label="+">+</button></span>`:`<span>${eur(it.p*l.q)}</span>`}</div>`; }).join("")}`).join("")
        :`<p class="mini-ayuda">${T("cestaVacia")}</p>`}
      <div class="total"><span>${T("total")}</span><span>${eur(tCarr())}</span></div>
      ${!pv?sugsHTML(st.carrito):""}
      ${pv?`<div class="partes-box"><b>${T("partesInfo",D.n,D.k)}</b><span>${T("quedanX",eur(D.resto))}</span><span style="font-size:13px">${T("partesP")}</span></div>
        <div class="tu-parte"><span>${T("tuParte")}</span><b>${eur(D.parte)}</b></div>
        ${online?`<button class="btn rojo pagar-b" data-a="pagar" ${enviando?"disabled":""}>${ico("card")}${enviando==="pago"?T("pagando"):T("pagarParteYa",eur(D.parte))}</button>`:""}
        ${!D.k?`<button class="btn peq" data-a="cancelar-partes">${T("cancelarDiv")}</button>`:""}`
      :L.length?`<p class="m-texto" style="font-size:16px;margin:4px 0 0">${T("comoPagais")}</p>
        <div class="div-op" role="group" aria-label="${T("comoPagais")}">${[["todo","opTodoYo"],["mio","opMio"],["elegir","opElegir"],["partes","opPartes"]].map(([k,t])=>`<button data-cmodo="${k}" aria-pressed="${cmodo===k}">${T(t)}</button>`).join("")}</div>
        ${cmodo==="mio"&&!sel.length?`<p class="mini-ayuda">${T("nadaMio")}</p>`:""}${cmodo==="elegir"&&!sel.length?`<p class="mini-ayuda">${T("eligeP")}</p>`:""}
        ${cmodo==="partes"?`<div class="personas"><span>${T("entre")}</span><span class="cant"><button data-cpers="-1" aria-label="−">−</button><span>${cpers}</span><button data-cpers="1" aria-label="+">+</button></span></div>`:""}
        <div class="tu-parte"><span>${cmodo==="todo"?T("totalPagar"):T("tuParte")}</span><b>${eur(imp)}</b></div>
        ${online?`<button class="btn rojo pagar-b" data-a="pagar" ${enviando?"disabled":""}>${ico("card")}${enviando==="pago"?T("pagando"):cmodo==="partes"?T("pagarParteYa",eur(imp)):T("pagarSel",eur(imp))}</button><p class="mini-ayuda">${T(cmodo==="todo"?"pagarYaP":cmodo==="partes"?"partesP":"pagoSelP")}</p>`
          :Store.modo==="supa"&&tk&&conMenu(cmodo==="partes"?L:sel)?`<p class="mini-ayuda">${T("menuFinal")}</p>`:""}
        <label style="font-size:15px">${T("nota")}<input class="nota-in" id="nota" maxlength="120" placeholder="${T("notaPh")}" value="${esc(nota)}"></label>
        <button class="btn ${online?"":"rojo"}" data-a="enviar" ${enviando?"disabled":""}>${online?T("enviarTodo"):T("enviar")}</button>`:""}
      <button class="btn peq" data-cerrar-b>${T("seguir")}</button></div></div>`; })():""}
    ${st.hoja==="menu"?menuHojaHTML(st.msel):""}
    ${st.hoja==="cuenta"?(()=>{ const pend=pendienteMesa(m), cons=m.consumo||[], mio=selMio(m), Pt=parteAhora(), online=puedePagarCuenta()&&Pt.importe>=0.5;
      return `<div class="hoja-fondo" data-cerrar><div class="hoja" role="dialog" aria-label="${T("laCuenta")}"><div class="asa"></div>
      <h3>${T("laCuenta")} · ${T("mesa").toLowerCase()} ${n}</h3><p class="mini-ayuda" style="text-align:left;margin:0">${T("compartida")}</p>
      ${cons.map((x,i)=>{ const pq=pqDe(x), libre=x.q-pq; return `<div class="lin ${libre<=0?"pagada":""}"><span class="q">${x.q}×</span><span>${esc(item(x.id).nL||x.n)}${x.de===DISP?` <span class="tuyo">${T("tuyo")}</span>`:""}${libre<=0?` <span class="pg-chip">${T("pagado")}</span>`:pq>0?` <span class="pg-chip">${T("pagadoUds",pq,x.q)}</span>`:""}</span>${modoP==="elegir"&&libre>0?`<span class="cant"><button data-psel="${i}" data-d="-1" aria-label="−">−</button><span>${Math.min(selP[i]||0,libre)}</span><button data-psel="${i}" data-d="1" aria-label="+">+</button></span>`:`<span>${eur(x.p*x.q)}</span>`}</div>`; }).join("")}
      <div class="total"><span>${T("total")}</span><span>${eur(totalMesa(m))}</span></div>
      ${pagadoMesa(m)?`<div class="lin"><span></span><span>${T("yaPagado")}</span><span>−${eur(pagadoMesa(m))}</span></div><div class="total"><span>${T("pendiente")}</span><span>${eur(pend)}</span></div>`:""}
      <p class="m-texto" style="font-size:16px;margin:4px 0 0">${T("quePagas")}</p>
      <div class="div-op" role="group" aria-label="${T("quePagas")}">${[["todo","opTodo"],["mio","opMio"],["elegir","opElegir"],["partes","opPartes"]].map(([k,t])=>`<button data-modo="${k}" aria-pressed="${modoP===k}">${T(t)}</button>`).join("")}</div>
      ${modoP==="mio"?`<p class="mini-ayuda">${Object.keys(mio).length?esc(linTxt(m,Pt.lin)):T("nadaMio")}</p>`:""}
      ${modoP==="elegir"&&!Pt.lin.length?`<p class="mini-ayuda">${T("eligeP")}</p>`:""}
      ${modoP==="partes"?`<div class="personas"><span>${T("entre")}</span><span class="cant"><button data-pers="-1" aria-label="−">−</button><span>${nPers}</span><button data-pers="1" aria-label="+">+</button></span></div>`:""}
      <div class="tu-parte"><span>${modoP==="todo"?T("totalPagar"):T("tuParte")}</span><b>${eur(Pt.importe)}</b></div>
      ${online?`<button class="btn rojo pagar-b" data-a="pagar-cuenta" ${pagandoP?"disabled":""}>${ico("card")}${pagandoP?T("pagando"):T("pagarYa",eur(Pt.importe))}</button><p class="mini-ayuda">${T(modoP==="todo"?"pagarTodoP":"pagarParteP")}</p>`
        :puedePagarCuenta()&&Pt.importe>0&&Pt.importe<0.5?`<p class="mini-ayuda">${T("minimo")}</p>`:""}
      <p class="m-texto" style="font-size:15px;margin:4px 0 0">${online?T("oCamarero"):T("comoPagar")}</p>
      <div class="pago-op"><button data-forma="tarjeta" aria-pressed="${forma==="tarjeta"}">${ico("card")}${T("tarjeta")}</button><button data-forma="efectivo" aria-pressed="${forma==="efectivo"}">${ico("cash")}${T("efectivo")}</button></div>
      <button class="btn ${online?"":"rojo"}" data-a="cuenta" ${forma&&Pt.importe>0?"":"disabled"}>${modoP==="todo"?T("pedirCuentaA",esc(cam)):T("pedirParteA",esc(cam))}</button><button class="btn peq" data-cerrar-b>${T("ahoraNo")}</button></div></div>`; })():""}
    ${st.hoja==="valorar"?`<div class="hoja-fondo"><div class="hoja" role="dialog" aria-label="${T("queTal")}"><div class="asa"></div>
      <h3>${T("queTal")}</h3><p class="m-texto">${T("queTalP")}</p>
      <div class="estrellas" role="group" aria-label="1–5">${[1,2,3,4,5].map(i=>`<button data-estrella="${i}" aria-pressed="${i<=estrellas}" aria-label="${i}">${STAR}</button>`).join("")}</div>
      <label style="font-size:15px">${T("comentario")}<input class="nota-in" id="coment" maxlength="200" value="${esc(coment)}"></label>
      <button class="btn rojo" data-a="valorar" ${estrellas?"":"disabled"}>${T("enviarOp")}</button><button class="btn peq" data-a="saltar">${T("saltar")}</button></div></div>`:""}
    ${st.hoja==="google"?`<div class="hoja-fondo" data-cerrar><div class="hoja" role="dialog"><div class="asa"></div><div class="google-cta"><p class="m-hola" style="text-align:center">${T("gracias")}</p><p class="m-texto">${T("graciasG")}</p><a class="btn rojo" href="${esc(safeUrl(b.google))}">${ico("star")}${T("irGoogle")}</a></div><button class="btn peq" data-cerrar-b>${T("ahoraNo")}</button></div></div>`:""}
    </div>`;
    st.bump=0; if(y) window.scrollTo(0,y);
  }
  async function clic(e){
    const t=e.target;
    if(t.closest("[data-cerrar-b]")||t.matches("[data-cerrar]")){ st.hoja=null; return pintar(); }
    const fx=t.closest("[data-estrella]"); if(fx){ estrellas=+fx.dataset.estrella; coment=app.querySelector("#coment")?.value||coment; return pintar(); }
    if(st.hoja==="cesta"){
      const cm=t.closest("[data-cmodo]"); if(cm){ cmodo=cm.dataset.cmodo; if(cmodo==="elegir"&&!Object.keys(csel).length) lineasCesta().filter(l=>l.de===DISP).forEach(l=>csel[l.de+"|"+l.k]=l.q); return pintar(); }
      const cs=t.closest("[data-csel]"); if(cs){ const kk=cs.dataset.csel, l=lineasCesta().find(x=>x.de+"|"+x.k===kk); if(l){ csel[kk]=Math.max(0,Math.min(l.q,Math.min(csel[kk]||0,l.q)+(+cs.dataset.d))); if(!csel[kk]) delete csel[kk]; } return pintar(); }
      const cp=t.closest("[data-cpers]"); if(cp){ cpers=Math.max(2,Math.min(20,cpers+(+cp.dataset.cpers))); return pintar(); }
    }
    if(st.hoja==="cuenta"){
      const md=t.closest("[data-modo]"); if(md){ modoP=md.dataset.modo; if(modoP==="elegir"&&!Object.keys(selP).length) selP={...selMio(mesa(n))}; return pintar(); }
      const ps=t.closest("[data-psel]"); if(ps){ const i=+ps.dataset.psel, x=(mesa(n).consumo||[])[i]; if(x){ const libre=x.q-pqDe(x); selP[i]=Math.max(0,Math.min(libre,(Math.min(selP[i]||0,libre))+(+ps.dataset.d))); if(!selP[i]) delete selP[i]; } return pintar(); }
      const pr=t.closest("[data-pers]"); if(pr){ nPers=Math.max(1,Math.min(20,nPers+(+pr.dataset.pers))); return pintar(); }
    }
    if(partesViva()&&t.closest("[data-mas],[data-menos],[data-sug],[data-add-menu]")){ toast(T("bloqueada")); return; }
    const r=clicCarrito(t,st); if(r==="pintar"){ subirCesta(); return pintar(); } if(r) return;
    const f=t.closest("[data-forma]"); if(f){ forma=f.dataset.forma; return pintar(); }
    const a=t.closest("[data-a]"); if(!a||a.disabled) return;
    const m=mesa(n), cam=quienAtiende(n);
    switch(a.dataset.a){
      case "llamar": if(await Acc.llamar(n,tk)){ llamadoT=ahora(); toast(T("tAvisado",cam)); } break;
      case "cesta": st.hoja="cesta"; cmodo="todo"; csel={}; break;
      case "cancelar-partes": { const r=await Remoto.pago({accion:"partes-cancelar",mesa:n,tk}).catch(()=>null); if(Store.publico()) await comprobar(); if(!(r&&r.ok)) toast(T("cuentaCambio")); break; }
      case "hoja-cuenta": st.hoja="cuenta"; forma=null; modoP="todo"; selP={}; pagandoP=false; nPers=(m.reparto&&m.reparto.quedan>=1)?m.reparto.quedan:2; break;
      case "pagar-cuenta": { const Pt=parteAhora(); if(!(Pt.importe>=0.5)){ toast(T("minimo")); return; }
        pagandoP=true; pintar();
        const r=await Remoto.pago({accion:"cuenta",mesa:n,tk,modo:modoP==="todo"?"todo":modoP==="partes"?"partes":"lineas",lin:Pt.lin,n:Pt.n||0,importe:Pt.importe,desde:m.desde,lang:LANG,path:location.pathname,disp:DISP}).catch(()=>null);
        if(r&&r.url){ location.href=r.url; return; }
        pagandoP=false; toast(r&&(r.error==="cambio"||r.error==="cerrada")?T("cuentaCambio"):T("pagoNoDisp")); if(Store.publico()) comprobar(); break; }
      case "ronda": { const ult=[...misPedidos()].reverse().find(p=>estadoPedido(p)>=0&&p.items.some(x=>x.dest==="barra")); if(!ult){ toast(T("tNoBebida")); return; } st.carrito={}; ult.items.filter(x=>x.dest==="barra"&&!agotado(x.id)).forEach(x=>st.carrito[x.id]=x.q); subirCesta(); st.hoja="cesta"; cmodo="todo"; csel={}; break; }
      case "pagar": { nota=(app.querySelector("#nota")?.value||"").trim(); const div=cmodo==="partes"||!!partesViva(), sel=selCesta(), imp=importeCesta();
        if(!div&&!sel.length){ toast(T("nadaSel")); return; } if(!(imp>=0.5)){ toast(T("minimo")); return; }
        enviando="pago"; pintar();
        // Primero se guarda lo de este móvil, para que el servidor vea la cesta tal cual
        { const mapa={}; Object.entries(st.carrito).forEach(([k,q])=>{ if(q>0) mapa[k]=q; }); clearTimeout(tSub); ultSubido=JSON.stringify(mapa)+"|"+Math.max(0,rondaVista); await CestaMesa.set(n,tk,mapa,Math.max(0,rondaVista)).catch(()=>null); }
        const r=div?await Remoto.pago({accion:"partes",mesa:n,tk,n:cpers,importe:imp,lang:LANG,path:location.pathname,disp:DISP}).catch(()=>null)
          :await Remoto.pago({accion:"crear",mesa:n,tk,items:sel.map(l=>({id:l.k,q:l.q,de:l.de})),cesta:1,nota,lang:LANG,path:location.pathname,disp:DISP}).catch(()=>null);
        if(r&&r.url){ location.href=r.url; return; }
        enviando=false; if(Store.publico()) comprobar();
        toast(r&&r.error==="agotado"?T("agotTemp")+(r.n?`: ${r.n}`:""):r&&r.error==="cambio"?T("cuentaCambio"):T("pagoNoDisp")); break; }
      case "enviar": nota=(app.querySelector("#nota")?.value||"").trim();
        enviando=true; pintar();
        { const L=lineasCesta(), ok=L.length&&!partesViva()?await Acc.pedirMesa(n,tk,L,nota,st.sugs):false; enviando=false;
          if(ok){ const quitar={}; L.forEach(l=>{ (quitar[l.de]=quitar[l.de]||{})[l.k]=(quitar[l.de][l.k]||0)+l.q; }); clearTimeout(tSub); await CestaMesa.quitar(n,tk,quitar).catch(()=>null);
            st.carrito={}; st.sugs=new Set(); nota=""; st.hoja=null; toast(T(cfgReglas().validar?"tEnviado":"tEnviadoDirecto")); pintar(); window.scrollTo({top:0,behavior:"smooth"}); if(Store.publico()) setTimeout(comprobar,600); return; } }
        break;
      case "cuenta": if(forma){ const Pt=parteAhora(), parte=modoP==="todo"?null:{importe:Pt.importe,lin:Pt.lin,n:Pt.n||0}; if(parte&&!(Pt.importe>0)) return;
        if(await Acc.cuenta(n,tk,forma,parte)){ if(parte){ toast(T("tParte",cam)); st.hoja=null; } else { cuentaPedida=forma; toast(T("tCuenta",cam)); st.hoja=cfgReglas().valorar?"valorar":null; estrellas=0; coment=""; } } } break;
      case "valorar": coment=(app.querySelector("#coment")?.value||"").trim(); await Acc.valorar(n,tk,estrellas,coment); valorada=true; st.hoja=safeUrl(cfgBar().google)?"google":null; break;
      case "saltar": st.hoja=null; break;
    }
    pintar();
  }
  app.addEventListener("click",clic);
  if(Store.publico()) sondeo=setInterval(()=>{ if(document.visibilityState==="visible") comprobar(); },2500);
  return { titulo:`${T("mesa")} ${n} · ${cfgBar().nombre}`, pintar,
    alCambiar(){
      if(!Store.publico() && valido!==null) comprobar();
      misPedidos().forEach(p=>{ const e=estadoPedido(p), u=ultimo[p.id];
        if(u!==undefined && e!==u){ if(e===1&&u===0) toast(T("tAceptado")); if(e===2) toast(T("tListo")); if(e===3) toast(T("tServido")); if(e<0) toast(T("tRechazado")); try{navigator.vibrate&&navigator.vibrate([80,40,80]);}catch(_){} }
        ultimo[p.id]=e; });
      if(!mesa(n).abierta) cuentaPedida=null;
      const ae=document.activeElement; if(ae && (ae.id==="nota"||ae.id==="coment")){ if(ae.id==="nota") nota=ae.value; else coment=ae.value; return; }
      pintar();
    },
    salir(){ app.removeEventListener("click",clic); clearInterval(sondeo); } };
}

/* =====================================================================
   VISTA: PEDIR PARA LLEVAR + SEGUIMIENTO + PANTALLA DE RECOGIDA
   ===================================================================== */
function horasRecogida(){ const out=[]; const d=new Date(); d.setSeconds(0,0); d.setMinutes(Math.ceil((d.getMinutes()+20)/15)*15); for(let i=0;i<16;i++){ out.push(hhmm(d)); d.setMinutes(d.getMinutes()+15); } return out; }
function VLlevar(){
  const st={carrito:{},cat:(seccionesConPlatos()[0]||{}).id,hoja:null,msel:{},sugs:new Set(),bump:0};
  let datos={nombre:"",tel:"",hora:"",nota:""}, enviando=false;
  const nCarr=()=>Object.values(st.carrito).reduce((a,b)=>a+b,0), tCarr=()=>Object.entries(st.carrito).reduce((a,[k,q])=>a+item(k).p*q,0);
  function pintar(){
    const y=window.scrollY, b=cfgBar();
    const cab=`<div class="m-cab"><div class="m-num" style="background:var(--amarillo);color:var(--tinta)">${ico("bag")}</div><div style="flex:1"><div class="t">${T("llT")}</div><div class="s">${esc(b.nombre)} · ${esc(b.ciudad)}</div></div>${idiomaHTML()}</div>`;
    if(!cfgReglas().llevar || b.activo===false){ app.innerHTML=`<div class="app-mesa">${cab}<div class="m-cuerpo"><p class="m-hola">${T("llevarOff")}</p><a class="btn" href="#carta">${ico("menu")}${T("verCarta")}</a></div></div>`; return; }
    app.innerHTML=`<div class="app-mesa">${cab}
      <div class="m-cuerpo"><p class="m-texto">${T("llP")}</p>${catsHTML(st.cat)}${listaCarta(st.cat,st.carrito)}<a class="btn peq" href="#carta" style="justify-self:start">${ico("back")}${T("verCarta")}</a></div>
      <div class="m-pie">${nCarr()?`<button class="btn rojo cesta ${st.bump?"bump":""}" data-a="cesta"><span><span class="n">${nCarr()}</span>${T("verPedido")}</span><span>${eur(tCarr())}</span></button>`:`<p class="m-texto" style="text-align:center;font-size:15px;margin:0">${T("pagaRecoger")}</p>`}</div>
      ${st.hoja==="cesta"?`<div class="hoja-fondo" data-cerrar><div class="hoja" role="dialog" aria-label="${T("tuPedido")}"><div class="asa"></div><h3>${T("tuPedido")}</h3>${cestaLineas(st.carrito)}${sugsHTML(st.carrito)}
        <div class="form-ll"><label>${T("nombre")}<input id="ll-nombre" autocomplete="given-name" value="${esc(datos.nombre)}" required></label>
        <label>${T("tel")}<input id="ll-tel" type="tel" autocomplete="tel" value="${esc(datos.tel)}"></label>
        <label>${T("hora")}<select id="ll-hora"><option value="${T("loAntes")}">${T("loAntes")}</option>${horasRecogida().map(h=>`<option ${datos.hora===h?"selected":""}>${h}</option>`).join("")}</select></label>
        <label>${T("nota")}<input id="ll-nota" maxlength="120" placeholder="${T("notaPh")}" value="${esc(datos.nota)}"></label>${consentHTML("ll-acepto",datos.acepto)}</div>
        <button class="btn rojo" data-a="pedir-ll" ${enviando?"disabled":""}>${T("hacerPedido")} · ${eur(tCarr())}</button><button class="btn peq" data-cerrar-b>${T("seguir")}</button></div></div>`:""}
      ${st.hoja==="menu"?menuHojaHTML(st.msel):""}
    </div>`;
    st.bump=0; if(y) window.scrollTo(0,y);
  }
  const leer=()=>{ const g=id=>app.querySelector(id)?.value??""; if(app.querySelector("#ll-nombre")) datos={nombre:g("#ll-nombre").trim(),tel:g("#ll-tel").trim(),hora:g("#ll-hora"),nota:g("#ll-nota").trim(),acepto:!!app.querySelector("#ll-acepto")?.checked}; };
  async function clic(e){
    const t=e.target;
    if(t.closest("[data-cerrar-b]")||t.matches("[data-cerrar]")){ leer(); st.hoja=null; return pintar(); }
    leer(); const r=clicCarrito(t,st); if(r==="pintar") return pintar(); if(r) return;
    const a=t.closest("[data-a]"); if(!a||a.disabled) return;
    if(a.dataset.a==="cesta"){ st.hoja="cesta"; return pintar(); }
    if(a.dataset.a==="pedir-ll"){ if(!datos.nombre){ toast(T("faltaNombre")); app.querySelector("#ll-nombre")?.focus(); return; }
      if(!datos.acepto){ toast(LG("Acepta la política de privacidad para hacer el pedido.","Accept the privacy policy to place the order.","Aceite a política de privacidade para fazer o pedido.")); app.querySelector("#ll-acepto")?.focus(); return; }
      enviando=true; pintar(); const ped=await Acc.pedirLlevar(datos,st.carrito,st.sugs); enviando=false;
      if(!ped) return pintar();
      try{ localStorage.setItem("metriax-ultimo-llevar",ped.id); }catch(_){} location.hash="pedido-"+ped.id; }
  }
  app.addEventListener("click",clic);
  return { titulo:`${T("llT")} · ${cfgBar().nombre}`, pintar, alCambiar(){ if(document.activeElement && app.contains(document.activeElement) && document.activeElement.matches("input,select")) return; leer(); pintar(); }, salir(){ app.removeEventListener("click",clic); } };
}
function VSeguir({id}){
  let ultimo=null, sondeo=null;
  const traer=()=>{ if(Store.publico()) Remoto.llevar(id).catch(()=>{}); };
  function pintar(){
    const p=Store.get("pedidos",id);
    if(!p){ app.innerHTML=`<div class="app-mesa"><div class="m-cuerpo"><p class="vacio">…</p><a class="btn" href="#llevar">${T("llevar")}</a></div></div>`; return; }
    const e=estadoPedido(p), E=T("estadosLl");
    app.innerHTML=`<div class="app-mesa"><div class="m-cab"><div class="m-num" style="background:var(--amarillo);color:var(--tinta)">${ico("bag")}</div><div style="flex:1"><div class="t">${T("llT")}</div><div class="s">${esc(p.nombre)} · ${esc(p.hora)}</div></div>${idiomaHTML()}</div>
      <div class="m-cuerpo">
        <p class="m-texto" style="text-align:center">${T("tuCodigo")}</p><div class="codigo">${esc(p.codigo)}</div>
        ${e<0?`<div class="estado-ped rechazado"><h4><b>${T("rechazado")}</b></h4><span class="items">${T("rechazadoP")}</span></div>`
          :`<div class="estado-ped"><h4><b>${E[e]}</b><span class="reloj" data-desde="${p.t}">${mmss(ahora()-p.t)}</span></h4><div class="pasos">${E.map((s,k)=>`<span class="${k<e?"on":k===e?"ahora":""}">${s}</span>`).join("")}</div>${e===0&&!p.pagado?`<span class="espera">${T("esperaConf")}</span>`:""}</div>`}
        <div class="estado-ped">${cestaLineas(Object.fromEntries(p.items.map(x=>[x.id,x.q])))}</div>
        <p class="m-texto" style="text-align:center">${T("pagaRecoger")}</p>
        ${safeUrl(cfgBar().google)?`<a class="btn" href="${esc(safeUrl(cfgBar().google))}">${ico("pin")}${T("llegar")}</a>`:""}
      </div></div>`;
  }
  traer(); if(Store.publico()) sondeo=setInterval(()=>{ if(document.visibilityState==="visible") traer(); },5000);
  return { titulo:`${T("llT")} · ${cfgBar().nombre}`, pintar,
    alCambiar(){ const p=Store.get("pedidos",id); if(p){ const e=estadoPedido(p); if(ultimo!==null && e!==ultimo){ if(e===1) toast(T("tAceptado")); if(e===2){ toast(T("estadosLl")[2]); try{navigator.vibrate&&navigator.vibrate([150,80,150]);}catch(_){} } if(e<0) toast(T("tRechazado")); } ultimo=e; } pintar(); },
    salir(){ clearInterval(sondeo); } };
}
function VRecogida(){
  function pintar(){
    const t0=inicioDia(); const ps=Store.all("pedidos").filter(p=>p.llevar && !p.recogido && p.t>=t0).sort((a,b)=>a.t-b.t);
    const listos=ps.filter(p=>estadoPedido(p)===2), prep=ps.filter(p=>estadoPedido(p)===1);
    app.innerHTML=`<div class="recogida">
      <div class="r-cab">${logoHTML("r-logo")}<h1>Pedidos para llevar · Take away</h1><span style="font-size:clamp(20px,2.4vw,30px);font-weight:800" id="hora">${hhmm(ahora())}</span></div>
      <div class="r-cols">
        <section class="r-col"><h2>Preparando · Preparing</h2><div class="r-codes">${prep.length?prep.map(p=>`<span>${esc(p.codigo)}<small>${esc(p.nombre)}</small></span>`).join(""):`<p class="vacio">—</p>`}</div></section>
        <section class="r-col listo"><h2>¡Listo! Pasa a recoger · Ready!</h2><div class="r-codes">${listos.length?listos.map(p=>`<span>${esc(p.codigo)}<small>${esc(p.nombre)}</small></span>`).join(""):`<p class="vacio">—</p>`}</div></section>
      </div>
      <div class="r-pie"><span>Pide para llevar desde la web: ${esc(baseURL())}#llevar</span>${modoBadge()}</div>
    </div>`;
  }
  let vistos=null;
  return { titulo:"Recogida · "+cfgBar().nombre, pintar,
    alCambiar(){ const l=new Set(Store.all("pedidos").filter(p=>p.llevar&&!p.recogido&&estadoPedido(p)===2).map(p=>p.id)); if(vistos && [...l].some(i=>!vistos.has(i))) pitido("cocina"); vistos=l; pintar(); },
    tic(){ const h=document.getElementById("hora"); if(h) h.textContent=hhmm(ahora()); } };
}

/* =====================================================================
   VISTA: CAMARERO
   ===================================================================== */
const TIPO = {llamada:{t:"Piden al camarero",i:"bell"}, cuenta:{t:"Pide la cuenta",i:"receipt"}, pedido:{t:"Pedido nuevo",i:"menu"}, validar:{t:"Pedido entrante: comprueba la mesa",i:"check"}, listo:{t:"Pedido listo: a servir",i:"chef"}, llevar:{t:"Pedido para llevar",i:"bag"}, pago:{t:"Han pagado online",i:"card"}};
const tipoTxt = a => a.tipo==="cuenta"&&a.parte ? "Quiere pagar su parte" : a.tipo==="validar"&&a.llevar ? "Para llevar: confirma el pedido" : a.llevar&&a.tipo==="listo" ? "Para llevar listo: entregar" : (TIPO[a.tipo]||TIPO.pedido).t;
// Botones para dar paso (o no) a un pedido entrante; los usan camarero, hoja de mesa y panel
const botonesValidar = pid => `<span class="val-bot"><button class="b-ui verde" data-aceptar="${pid}">${ico("check")}Aceptar</button><button class="b-ui claro" data-rechazar="${pid}">Rechazar</button></span>`;
async function clicValidar(t, quien){
  const ac=t.closest("[data-aceptar]"); if(ac){ const p=Store.get("pedidos",ac.dataset.aceptar); await Acc.aceptar(ac.dataset.aceptar,quien); toast(p?`${lugar(p)}: pedido aceptado. Ya está en cocina y barra.`:"Pedido aceptado."); return true; }
  const re=t.closest("[data-rechazar]"); if(re){ if(!re.dataset.seguro){ re.dataset.seguro=1; re.textContent="¿Seguro? Pulsa otra vez"; return true; } const p=Store.get("pedidos",re.dataset.rechazar); await Acc.rechazar(re.dataset.rechazar,quien); toast(p?`${lugar(p)}: pedido rechazado. El cliente lo ve en su móvil.`:"Pedido rechazado."); return true; }
  return false;
}
// Colores de la mesa: libre (verde) · por confirmar · ocupada · en cocina · pide la cuenta · aviso sin atender
function claseMesa(m){
  if(!m.abierta) return entrantes().some(p=>p.mesa===m.n&&!p.llevar)?"entrante":reservaProxima(m.n)?"libre reservada":"libre";
  if(avisosAbiertos().some(a=>a.mesa===m.n&&escalado(a))) return "alerta";
  if(entrantes().some(p=>p.mesa===m.n&&!p.llevar)) return "entrante";
  if(cuentaDe(m.n)) return "cuenta";
  if(Store.all("tickets").some(k=>k.mesa===m.n&&k.estado!=="listo")) return "cocina";
  return "abierta";
}
function VCamarero(){
  // Cada camarero entra con su cuenta (o su PIN en modo demo) y no puede hacerse pasar por otro
  const fijo=Store.modo==="supa"?Store.cam:Pin.camarero();
  let yo; try{ yo=fijo||localStorage.getItem("metriax-yo")||cams()[0].id; }catch(e){ yo=fijo||cams()[0].id; }
  if(!cams().some(c=>c.id===yo)) yo=cams()[0].id;
  let sub="avisos", hojaMesa=null, vistos=null;
  const mios=()=>Array.from({length:mesasN()},(_,i)=>i+1).filter(n=>camDe(n)===yo);
  const relevante=a=>true; // todos los camareros ven todos los avisos
  const misAvisos=()=>avisosAbiertos().filter(relevante).sort((a,b)=>(escalado(b)-escalado(a))||((b.tipo==="validar")-(a.tipo==="validar"))||((a.info?1:0)-(b.info?1:0))||a.t-b.t);
  function accionAviso(a){
    if(a.tipo==="validar"){ const p=Store.get("pedidos",a.pedido); return p&&!p.aceptado&&!p.rechazado?botonesValidar(p.id):`<button class="b-ui claro" data-ok="${a.id}">Visto</button>`; }
    if(a.tipo==="listo") return `<button class="b-ui verde" data-servir="${a.id}">${ico("check")}${a.llevar?"Entregado":"Servido"}</button>`;
    if(a.tipo==="llamada") return `<button class="b-ui rojo" data-ok="${a.id}">Yo me encargo</button>`;
    if(a.tipo==="cuenta"&&a.parte&&!a.cobrado) return `<button class="b-ui verde" data-parcial="${a.id}">${ico(a.forma==="tarjeta"?"card":"cash")}Cobrado ${eur(a.parte.importe)}</button><button class="b-ui claro" data-ok="${a.id}">Voy yo</button>`;
    return a.info?`<button class="b-ui claro" data-ok="${a.id}">Visto</button>`:`<button class="b-ui rojo" data-ok="${a.id}">Voy yo</button>`;
  }
  function pintar(){
    const av=misAvisos(), t=cfgTurno(), misM=mios(), y=window.scrollY, resPend=Store.all("reservas").filter(r=>r.estado==="pendiente").length;
    app.innerHTML=`<div class="app-cam">
      <div class="c-cab">
        <div class="c-fila"><h1>${esc(cfgBar().nombre)} <span>· sala</span></h1>${modoBadge()}</div>
        <div class="c-fila"><label class="oculto" for="yo">Soy</label><select class="c-sel" id="yo" ${fijo?"disabled":""}>${cams().map(c=>`<option value="${c.id}" ${c.id===yo?"selected":""}>${esc(c.n)}${t.activos[c.id]===false?" (libra)":""}</option>`).join("")}</select>
          <span style="font-size:13px;color:#cfc4b1;flex:1">Mesas ${misM.length?resumirMesas(misM):"—"}</span>
          <button class="sonido" data-sonido aria-pressed="${sonidoOn()}">${ico("speaker")}${sonidoOn()?"Sonido":"Sin sonido"}</button>${Store.sesion?`<button class="sonido" data-salir>Salir</button>`:Pin.activo()?`<button class="sonido" data-bloquear>${ico("lock")}Salir</button>`:""}</div>
        <button class="cx-abrir" data-tomar>${ico("menu")}Tomar comanda</button>
        <div class="seg" role="group" aria-label="Vista"><button data-sub="avisos" aria-pressed="${sub==="avisos"}">Avisos${av.length?`<span class="b">${av.length}</span>`:""}</button><button data-sub="mesas" aria-pressed="${sub==="mesas"}">Mis mesas</button><button data-sub="todas" aria-pressed="${sub==="todas"}">Sala</button><button data-sub="reservas" aria-pressed="${sub==="reservas"}">Reservas${resPend?`<span class="b">${resPend}</span>`:""}</button></div>
      </div>
      <div class="c-cuerpo">
        ${sub==="avisos"?(av.length?av.map(a=>{ const es=escalado(a), ajeno=a.mesa&&camDe(a.mesa)&&camDe(a.mesa)!==yo;
          return `<div class="aviso ${a.tipo} ${es?"escalado":""}">
            <div class="m ${a.llevar?"ll":""}">${a.llevar?esc(a.codigo):a.mesa}</div>
            <div class="q">${ico((TIPO[a.tipo]||TIPO.pedido).i)}${tipoTxt(a)}</div>
            <div class="det">${esc(a.det)}</div>
            <div class="acc">${accionAviso(a)}</div>
            <div class="pie"><span>${a.llevar?"Para llevar":zonaDe(a.mesa)}${ajeno?` · mesa de ${esc(nomCam(camDe(a.mesa)))}`:""}${a.tipo==="validar"&&!a.llevar?" · ¿hay clientes sentados?":""}</span><span>${es?`<span class="chip-esc">Sin atender · urgente</span> `:""}<span class="reloj" data-desde="${a.t}" data-pre="hace " data-am="${t.escala/2}" data-ro="${t.escala}">hace ${mmss(ahora()-a.t)}</span></span></div>
          </div>`; }).join(""):`<p class="vacio">Todo atendido. ¡Bien!</p><p style="text-align:center;font-size:13px;color:var(--tinta-3)">Si un aviso pasa ${t.escala} s sin respuesta, se marca como urgente.</p>`)
        :sub==="reservas"?reservasSalaHTML()
        :["Interior","Terraza"].map(z=>{ const ms=[]; for(let i=1;i<=mesasN();i++) if(zonaDe(i)===z&&(sub==="todas"||misM.includes(i))) ms.push(mesa(i)); if(!ms.length) return "";
          return `<p class="zona-t">${z}</p><div class="g-mesas">${ms.map(m=>{ const mia=!camDe(m.n)||camDe(m.n)===yo, cu=cuentaDe(m.n); return `<button class="mesa-b ${claseMesa(m)} ${mia?"":"ajena"}" data-mesa="${m.n}" aria-label="Mesa ${m.n}"><b>${m.n}</b><small>${m.abierta?(cu?`Cuenta · ${cu}`:`<span data-desde="${m.desde}">${mmss(ahora()-m.desde)}</span>`):reservaProxima(m.n)?`Reserva ${esc(reservaProxima(m.n).hora)}`:"Libre"}</small>${m.abierta?`<small>${pagadoMesa(m)?(pendienteMesa(m)>0?`${eur(pendienteMesa(m))} <i class="pg">· pagado ${eur(pagadoMesa(m))}</i>`:`<i class="pg">${ico("check")}Pagado</i>`):eur(totalMesa(m))}</small>`:""}${mia?(camDe(m.n)||!m.abierta?"":`<small>Sin camarero</small>`):`<small>${esc(nomCam(camDe(m.n)))}</small>`}</button>`; }).join("")}</div>`; }).join("")}
      </div>
      ${hojaMesa?hojaMesaHTML(hojaMesa,"cam"):""}
    </div>`;
    window.scrollTo(0,y);
  }
  async function clic(e){
    const t=e.target; activarAudio();
    if(t.closest("[data-cerrar-b]")||t.matches("[data-cerrar]")){ hojaMesa=null; return pintar(); }
    const s=t.closest("[data-sub]"); if(s){ sub=s.dataset.sub; return pintar(); }
    if(t.closest("[data-sonido]")){ try{ localStorage.setItem("lp-sonido",sonidoOn()?"0":"1"); }catch(_){} if(sonidoOn()) pitido(); return pintar(); }
    if(await clicValidar(t,yo)) return;
    if(await clicReserva(t,yo)) return;
    const ok=t.closest("[data-ok]"); if(ok){ const a=Store.get("avisos",ok.dataset.ok); await Acc.atender(ok.dataset.ok,yo); if(a&&!a.info&&a.tipo!=="validar") toast(a.tipo==="llamada"?`Te encargas de la mesa ${a.mesa}. Suma en tu ranking.`:`Vas a la mesa ${a.mesa}. Los demás ya no lo ven.`); return; }
    const sv=t.closest("[data-servir]"); if(sv){ const a=Store.get("avisos",sv.dataset.servir); await Acc.servir(sv.dataset.servir,yo); toast(a.llevar?`${a.codigo} entregado y cobrado.`:`Mesa ${a.mesa}: servido. El cliente lo ve en su móvil.`); return; }
    if(t.closest("[data-tomar]")) return Comanda.abrir(null,yo);
    const nm=t.closest("[data-nota-mesa]"); if(nm){ const n=+nm.dataset.notaMesa; hojaMesa=null; pintar(); return Comanda.abrir(n,yo); }
    const mb=t.closest("[data-mesa]"); if(mb){ hojaMesa=+mb.dataset.mesa; return pintar(); }
    if(await clicParcial(t,yo)) return pintar();
    const cm=t.closest("[data-cobrar]"); if(cm){ const n=+cm.dataset.cobrar, tot=totalMesa(mesa(n)); await Acc.cerrar(n,yo,cm.dataset.forma); toast(tot?`Mesa ${n}: cobrada (${eur(tot)}). Vuelve a estar libre.`:`Mesa ${n} libre.`); hojaMesa=null; return pintar(); }
  }
  function cambio(e){ if(e.target.id==="yo" && !fijo){ yo=e.target.value; try{ localStorage.setItem("metriax-yo",yo); }catch(_){} vistos=null; pintar(); } }
  app.addEventListener("click",clic); app.addEventListener("change",cambio);
  return { titulo:"Sala · "+cfgBar().nombre, pintar,
    alCambiar(){ const ids=new Set(misAvisos().map(a=>a.id));
      if(vistos){ const nuevos=[...ids].filter(i=>!vistos.has(i)); if(nuevos.length){ const urg=nuevos.some(i=>{ const a=Store.get("avisos",i); return a&&!a.info; }); pitido(nuevos.some(i=>{ const a=Store.get("avisos",i); return a&&a.tipo==="llamada"; })?"llamada":urg?"urgente":"aviso"); const a=Store.get("avisos",nuevos[0]); if(a) toast(`${a.llevar?a.codigo:"Mesa "+a.mesa}: ${tipoTxt(a).toLowerCase()}`); } }
      vistos=ids; pintar(); },
    tic(){ const hayLl=misAvisos().some(a=>a.tipo==="llamada"); if(hayLl){ if(this._rep&&ahora()-this._rep>20000){ pitido("llamada"); this._rep=ahora(); } else if(!this._rep) this._rep=ahora(); } else this._rep=0;
      const k=misAvisos().filter(escalado).map(a=>a.id).join(); if(k!==this._k){ if(this._k!==undefined && k.length>this._k.length) pitido("urgente"); this._k=k; vistos=new Set(misAvisos().map(a=>a.id)); pintar(); } },
    salir(){ app.removeEventListener("click",clic); app.removeEventListener("change",cambio); } };
}
// Cobro de una parte de la cuenta: la pide el cliente desde su móvil o la apunta el personal a mano
async function clicParcial(t, por){
  const pa=t.closest("[data-parcial]"); if(pa){ const a=Store.get("avisos",pa.dataset.parcial);
    if(a&&a.parte&&!a.cobrado){ const ok=await Acc.cobroParcial(a.mesa,a.parte.importe,a.forma||"efectivo",por,{lin:a.parte.lin,n:a.parte.n,aviso:a.id});
      toast(ok?`Mesa ${a.mesa}: cobrados ${eur(a.parte.importe)} ${a.forma==="tarjeta"?"con tarjeta":"en efectivo"}.${mesa(a.mesa).abierta?"":" Cuenta completa: mesa libre."}`:"Esa parte ya no está pendiente."); }
    return true; }
  const pm=t.closest("[data-parte-manual]"); if(pm){ const n=+pm.dataset.parteManual, inp=document.getElementById("parte-imp-"+n), v=r2(parseFloat(String(inp&&inp.value||"").replace(",",".")));
    if(!(v>0)){ toast("Escribe el importe que te han pagado."); return true; }
    const ok=await Acc.cobroParcial(n,v,pm.dataset.forma,por); toast(ok?`Mesa ${n}: apuntados ${eur(v)} ${pm.dataset.forma==="tarjeta"?"con tarjeta":"en efectivo"}.${mesa(n).abierta?` Quedan ${eur(pendienteMesa(mesa(n)))}.`:" Cuenta completa: mesa libre."}`:"No hay nada pendiente.");
    return true; }
  return false;
}
// Lo cobrado de una mesa, pago a pago
function pagosHTML(m){
  const pg=(m.consumo||[]).filter(x=>x.pg).reduce((a,x)=>a+x.p*x.q,0);
  return (pg?`<div class="lin"><span></span><span>Pagado al pedir (online)</span><span>−${eur(pg)}</span></div>`:"")
    + (m.pagos||[]).map(p=>`<div class="lin"><span></span><span>Pagado ${metodoTxt(p.metodo)}${p.lin&&p.lin.length?` · ${esc(linTxt(m,p.lin))}`:p.n>1?` · parte igual (entre ${p.n})`:""}</span><span>−${eur(p.importe)}</span></div>`).join("");
}
// Hoja de una mesa: pedidos por confirmar, lo consumido y cobrar (la mesa vuelve a estar libre)
function hojaMesaHTML(n,quien){
  const m=mesa(n), ent=porConfirmar().filter(p=>p.mesa===n&&!p.llevar), cu=cuentaDe(n), rp=reservaProxima(n), tot=totalMesa(m);
  return `<div class="hoja-fondo" data-cerrar><div class="hoja ui" role="dialog" aria-label="Mesa ${n}"><div class="asa"></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-family:var(--display);font-size:26px;color:var(--rojo);margin:0">Mesa ${n}</h3><span class="pill">${zonaDe(n)} · ${esc(nomCamMesa(n))}</span></div>
    ${rp?`<p class="pill ok" style="justify-self:start">${ico("calendar")} Reserva ${esc(rp.hora)} · ${esc(rp.nombre)} (${rp.personas})</p>`:""}
    ${ent.map(p=>`<div class="entrante-c"><b>Pedido por confirmar · hace <span data-desde="${p.t}">${mmss(ahora()-p.t)}</span></b><span>${p.items.map(x=>`${x.q}× ${esc(x.n)}`).join(", ")}${p.nota?` · «${esc(p.nota)}»`:""}</span>${botonesValidar(p.id)}</div>`).join("")}
    ${!m.abierta?`<p style="margin:0">Mesa libre. Los clientes pueden pedir con la tarjeta en cualquier momento; la mesa se ocupa sola cuando aceptas su primer pedido.</p>`
    :`${(m.consumo||[]).map(x=>{ const pq=pqDe(x); return `<div class="lin ${pq>=x.q?"pagada":""}"><span class="q">${x.q}×</span><span>${esc(x.n)}${pq>=x.q?` <span class="pg-chip">Pagado</span>`:pq>0?` <span class="pg-chip">${pq} de ${x.q} pagado</span>`:""}</span><span>${eur(x.p*x.q)}</span></div>`; }).join("")}
      <div class="total"><span>Total</span><span>${eur(tot)}</span></div>${pagadoMesa(m)?`${pagosHTML(m)}<div class="total"><span>Pendiente</span><span>${eur(pendienteMesa(m))}</span></div>`:""}${cu?`<p class="pill" style="justify-self:start">Ha pedido pagar ${cu==="tarjeta"?"con tarjeta":"en efectivo"}</p>`:""}
      ${Store.all("avisos").filter(a=>a.mesa===n&&a.tipo==="cuenta"&&a.parte&&!a.cobrado&&a.t>=(m.desde||0)).map(a=>`<div class="parte-pend"><span><b>Quiere pagar su parte ${a.forma==="tarjeta"?"con tarjeta":"en efectivo"}: ${eur(a.parte.importe)}</b><br>${esc((a.det||"").split(" · ").slice(2).join(" · "))}</span><button class="b-ui verde" data-parcial="${a.id}">${ico(a.forma==="tarjeta"?"card":"cash")}Cobrado</button></div>`).join("")}
      ${pendienteMesa(m)>0?`<details><summary style="cursor:pointer;font-weight:700;font-size:14px">Cobrar solo una parte (pagan por separado)</summary><div class="parte-man" style="margin-top:8px"><input id="parte-imp-${n}" inputmode="decimal" placeholder="Importe €" aria-label="Importe cobrado"><button class="b-ui verde" data-parte-manual="${n}" data-forma="tarjeta">${ico("card")}Tarjeta</button><button class="b-ui verde" data-parte-manual="${n}" data-forma="efectivo">${ico("cash")}Efectivo</button></div></details>
        <div class="pago-ui"><button class="b-ui verde" data-cobrar="${n}" data-forma="tarjeta">${ico("card")}${pagadoMesa(m)?`Resto (${eur(pendienteMesa(m))}) con tarjeta`:"Cobrado con tarjeta"}</button><button class="b-ui verde" data-cobrar="${n}" data-forma="efectivo">${ico("cash")}${pagadoMesa(m)?`Resto (${eur(pendienteMesa(m))}) en efectivo`:"Cobrado en efectivo"}</button></div>`
        :`<div class="pago-ui"><button class="b-ui verde" data-cobrar="${n}" data-forma="online">${ico("check")}Todo pagado · liberar mesa</button></div>`}
      <p style="margin:0;font-size:13px;color:var(--tinta-3)">Al cobrar, la mesa vuelve a verde: libre para que pidan otra vez o para nuevos clientes.</p>`}
    ${quien==="cam"?`<button class="b-ui rojo" data-nota-mesa="${n}">${ico("menu")}Tomar nota / añadir a esta mesa</button>`:""}
    ${quien==="panel"&&hashMesa(n)?`<a class="b-ui claro" href="${hashMesa(n)}">Ver lo que ve el cliente</a>`:""}<button class="b-ui claro" data-cerrar-b>Volver</button></div></div>`;
}
// Reservas para la app de sala: las que esperan respuesta y las de hoy
function reservasSalaHTML(){
  const pend=Store.all("reservas").filter(r=>r.estado==="pendiente").sort((a,b)=>(a.fecha+a.hora).localeCompare(b.fecha+b.hora)), hoy=reservasDe(fechaISO()).filter(r=>r.estado!=="pendiente");
  const fila=r=>`<div class="aviso reserva ${r.estado}"><div class="m">${r.personas}</div><div class="q">${ico("calendar")}${esc(r.nombre)} · ${r.fecha===fechaISO()?"hoy":esc(r.fecha)} ${esc(r.hora)}</div><div class="det">${esc(r.tel||"")}${r.mesa?` · mesa ${r.mesa}`:""}${r.nota?` · «${esc(r.nota)}»`:""}</div><div class="acc">${botonesReserva(r)}</div></div>`;
  return `${pend.length?`<p class="zona-t">Por confirmar</p>${pend.map(fila).join("")}`:""}<p class="zona-t">Hoy</p>${hoy.length?hoy.map(fila).join(""):`<p class="vacio">Sin reservas hoy.</p>`}`;
}
function botonesReserva(r){
  if(r.estado==="pendiente") return `<span class="val-bot"><button class="b-ui verde" data-res="${r.id}" data-est="confirmada">${ico("check")}Confirmar</button><button class="b-ui claro" data-res="${r.id}" data-est="rechazada">Rechazar</button></span>`;
  if(r.estado==="confirmada") return `<span class="val-bot"><button class="b-ui" data-res="${r.id}" data-est="sentada">Han llegado</button><button class="b-ui claro" data-res="${r.id}" data-est="noshow">No vino</button></span>`;
  const [c,t]=ESTADOS_RES[r.estado]||["",r.estado]; return `<span class="pill ${c}">${t}</span>`;
}
async function clicReserva(t, quien){
  const b=t.closest("[data-res]"); if(!b) return false;
  const r=Store.get("reservas",b.dataset.res), est=b.dataset.est; if(!r) return true;
  if(est==="rechazada" && !b.dataset.seguro){ b.dataset.seguro=1; b.textContent="¿Seguro?"; return true; }
  await Acc.reserva(r.id,{estado:est},quien);
  toast({confirmada:`Reserva de ${r.nombre} confirmada. Lo ve en su móvil.`,rechazada:`Reserva de ${r.nombre} rechazada.`,sentada:`${r.nombre}: ya están en el local.`,noshow:`${r.nombre}: marcada como no presentada.`,cancelada:"Reserva cancelada."}[est]||"Reserva actualizada.");
  return true;
}
function resumirMesas(ns){ ns=[...ns].sort((a,b)=>a-b); const out=[]; let i=0; while(i<ns.length){ let j=i; while(j+1<ns.length&&ns[j+1]===ns[j]+1) j++; out.push(j>i?`${ns[i]}–${ns[j]}`:`${ns[i]}`); i=j+1; } return out.join(", "); }

/* =====================================================================
   VISTA: COCINA / BARRA
   ===================================================================== */
// Barra de fichaje de cocina y barra: entrada, cronómetro, pausa y salida de cada camarero
function fichajeHTML(yo,fijo,seguro){
  const f=fichajeAbierto(yo), p=enPausa(f), otros=Store.all("fichajes").filter(x=>!x.fin&&x.cam!==yo);
  return `<div class="fich"><span class="fich-t">${ico("users")}Fichaje</span>
    <select class="c-sel" id="yo-f" aria-label="Quién ficha" ${fijo?"disabled":""}>${cams().map(c=>`<option value="${c.id}" ${c.id===yo?"selected":""}>${esc(c.n)}</option>`).join("")}</select>
    ${f?`<span class="fich-c"><small>Trabajado</small>${cron(f)}</span>${p?`<span class="fich-c pausa"><small>Pausa actual</small>${cronPausaAct(f)}</span>`:""}<span class="fich-c"><small>Total pausas</small>${cronPausa(f)}</span><span class="pill ${p?"aviso":"ok"}">${p?"En pausa":"Trabajando"}</span><span class="peq-f">entró a las ${hhmm(f.ini)}</span>
      <button class="b-ui amar" data-fich="${p?"volver":"pausa"}">${p?"Volver de la pausa":"Pausa"}</button><button class="b-ui claro" data-fich="salida">${seguro?"¿Seguro? Pulsa otra vez":"Salida"}</button>`
    :`<span class="peq-f">Sin fichar</span><button class="b-ui verde" data-fich="entrada">${ico("check")}Entrada</button>`}
    <a class="peq-f" href="#registro-jornada" target="_blank" rel="noopener">Información sobre el registro de jornada</a>
    ${otros.length?`<span class="peq-f">También fichados: ${otros.map(x=>esc(nomCam(x.cam))+(enPausa(x)?" (pausa)":"")).join(", ")}</span>`:""}</div>`;
}
// Fichaje con usuario y contraseña propios (#fichar): pantalla aparte, sin paneles ni pedidos. Cada persona ficha solo lo suyo.
// Con base de datos usa una conexión temporal que no toca la sesión de la tablet (cocina/barra siguen abiertas).
function VFichar(){
  const supa=Store.modo==="supa" && !!window.supabase;
  let quien=null, f=null, error="", enviando=false, fallos=0, bloqueo=0, seguro=false, cierre=0, aviso="", sb2=null;
  const nombre=()=>quien?nomCam(quien):"";
  async function leer(){
    if(!supa) return fichajeAbierto(quien)||null;
    const {data,error:e}=await sb2.from("docs").select("data").eq("tenant",TENANT).eq("col","fichajes").order("updated_at",{ascending:false}).limit(80);
    if(e) throw e; return (data||[]).map(r=>r.data).find(x=>x&&x.cam===quien&&!x.fin)||null;
  }
  async function aplicar(a){
    const t=ahora();
    if(!supa){ await Acc.fichar(quien,a); f=fichajeAbierto(quien)||Store.all("fichajes").filter(x=>x.cam===quien).sort((x,y)=>y.ini-x.ini)[0]||null; return; }
    let nuevo=f?{...f,pausas:(f.pausas||[]).map(x=>({...x}))}:null;
    if(a==="entrada"){ if(f) return; nuevo={id:nid(),cam:quien,ini:t,pausas:[],fin:null}; }
    else if(!nuevo) return;
    else if(a==="pausa"){ if(!enPausa(nuevo)) nuevo.pausas.push({a:t}); }
    else { nuevo.pausas.forEach(x=>{ if(!x.b) x.b=t; }); if(a==="salida") nuevo.fin=t; }
    const {error:e}=await sb2.from("docs").upsert({tenant:TENANT,col:"fichajes",id:nuevo.id,data:nuevo,updated_at:new Date().toISOString()});
    if(e) throw e; f=nuevo;
  }
  async function terminar(msg){
    try{ if(sb2) await sb2.auth.signOut(); }catch(_){} sb2=null; quien=null; f=null; seguro=false; cierre=0; error=""; aviso=msg||""; pintar();
  }
  function pintar(){
    if(!quien){
      const sel=cams();
      app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:420px;margin:0 auto;width:100%;align-content:center;text-align:center">
        ${logoHTML("login-logo")}<p class="m-hola">Fichar entrada y salida</p>
        <p class="m-texto">${supa?"Escribe tu usuario y tu contraseña.":"Elige tu nombre y escribe tu PIN."} Solo verás tu propio fichaje.</p>
        ${aviso?`<p role="status" style="margin:0;color:var(--ok,#2b7a3d);font-size:16px">${esc(aviso)}</p>`:""}
        <form id="f-fichar" class="form-ll" autocomplete="off" style="text-align:left">
          ${supa?`<label>Usuario o correo<input id="fc-u" autocomplete="username" autocapitalize="none" required></label><label>Contraseña<input id="fc-p" type="password" autocomplete="current-password" required></label>`
                :`<label>Quién eres<select id="fc-c">${sel.map(c=>`<option value="${c.id}">${esc(c.n)}</option>`).join("")}</select></label><label>PIN<input id="fc-p" type="password" inputmode="numeric" maxlength="12" autocomplete="off"></label>`}
          ${error?`<p role="alert" style="margin:0;color:var(--critico);font-size:16px">${esc(error)}</p>`:""}
          <button class="btn rojo" type="submit" ${enviando||ahora()<bloqueo?"disabled":""}>${enviando?"Comprobando…":ahora()<bloqueo?"Espera un momento":"Continuar"}</button></form>
        <a class="peq-f" href="#registro-jornada" target="_blank" rel="noopener">Información sobre el registro de jornada</a></div></div>`;
      app.querySelector(supa?"#fc-u":"#fc-p")?.focus(); return;
    }
    const p=enPausa(f), cerrada=!!(f&&f.fin);
    app.innerHTML=`<div class="app-mesa" style="justify-content:center"><div class="m-cuerpo" style="max-width:460px;margin:0 auto;width:100%;align-content:center;text-align:center">
      ${logoHTML("login-logo")}<p class="m-hola">Hola, ${esc(nombre())}</p>
      ${!f?`<p class="m-texto">Aún no has fichado hoy.</p><button class="btn rojo" data-fa="entrada">${ico("check")}Fichar entrada</button>`
        :cerrada?`<p class="m-texto">Jornada cerrada. Trabajado: <b>${hms(trabajadoMs(f))}</b> · pausas: ${hms(pausadoMs(f,f.fin))}. ¡Buen descanso!</p>`
        :`<p class="m-texto">Entraste a las ${hhmm(f.ini)}. ${p?"Estás en pausa: el cronómetro de trabajo está parado.":"Cronómetro en marcha."}</p>
          <div class="fich" style="justify-content:center"><span class="fich-c"><small>Trabajado</small>${cron(f)}</span>${p?`<span class="fich-c pausa"><small>Pausa actual</small>${cronPausaAct(f)}</span>`:""}<span class="fich-c"><small>Total pausas</small>${cronPausa(f)}</span></div>
          <button class="btn amar" data-fa="${p?"volver":"pausa"}">${p?"Volver de la pausa":"Pausa"}</button>
          <button class="btn rojo" data-fa="salida">${seguro?"¿Seguro? Pulsa otra vez para fichar la salida":"Fichar salida"}</button>`}
      ${aviso?`<p role="status" style="margin:0;font-size:16px">${esc(aviso)}</p>`:""}
      ${error?`<p role="alert" style="margin:0;color:var(--critico);font-size:16px">${esc(error)}</p>`:""}
      <button class="btn peq" data-terminar>Terminar y cerrar</button>
      <p class="m-texto" style="font-size:13px">La pantalla se cierra sola unos segundos después de fichar.</p></div></div>`;
  }
  async function enviar(e){
    if(e.target.id!=="f-fichar") return; e.preventDefault(); if(ahora()<bloqueo||enviando) return;
    const pass=app.querySelector("#fc-p").value; error=""; aviso=""; enviando=true;
    try{
      if(supa){
        const u=app.querySelector("#fc-u").value.trim(); pintar(); app.querySelector("#fc-u").value=u;
        sb2=window.supabase.createClient(SUPA_URL,SUPA_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:"metriax-fichar"}});
        const {error:er}=await sb2.auth.signInWithPassword({email:correoLocal(u),password:claveSupa(pass)});
        if(er) throw new Error(/invalid/i.test(er.message)?"Usuario o contraseña incorrectos.":er.message);
        const {data}=await sb2.rpc("mi_ficha",{p_tenant:TENANT});
        if(!data||!data.rol) throw new Error("Esta cuenta no pertenece a este restaurante.");
        if(!data.cam||!cams().some(c=>c.id===data.cam)) throw new Error("Tu usuario no tiene un camarero asociado. Pídeselo al dueño (Equipo y accesos).");
        quien=data.cam; f=await leer();
      } else {
        const id=app.querySelector("#fc-c").value, guardado=(Pin.cfg().camareros||{})[id];
        if(guardado && guardado!==await Pin.hash(pass)) throw new Error("PIN incorrecto.");
        quien=id; f=await leer();
      }
      fallos=0; seguro=false; cierre=ahora()+60000;
    }catch(er){ fallos++; if(fallos>=5){ bloqueo=ahora()+60000; fallos=0; er=new Error("Demasiados intentos. Espera un minuto."); }
      error=er.message||"No se ha podido entrar."; try{ if(sb2) await sb2.auth.signOut(); }catch(_){} sb2=null; quien=null; }
    enviando=false; pintar();
  }
  async function clic(e){
    if(e.target.closest("[data-terminar]")) return terminar();
    const b=e.target.closest("[data-fa]"); if(!b||enviando) return; const a=b.dataset.fa;
    if(a==="salida" && !seguro){ seguro=true; cierre=ahora()+60000; return pintar(); }
    enviando=true; error="";
    try{ await aplicar(a); seguro=false;
      aviso={entrada:`Entrada fichada a las ${hhmm(ahora())}.`,pausa:"En pausa: el cronómetro de trabajo está parado.",volver:"De vuelta: el cronómetro sigue.",salida:"Salida fichada."}[a];
      cierre=ahora()+15000;
    }catch(er){ error="No se ha podido guardar el fichaje. Revisa la conexión e inténtalo otra vez."; }
    enviando=false; pintar();
  }
  app.addEventListener("submit",enviar); app.addEventListener("click",clic);
  return { titulo:"Fichar · "+cfgBar().nombre, pintar, alCambiar(){},
    tic(){ if(quien&&cierre&&ahora()>cierre) terminar(f&&f.fin?"Salida fichada. Hasta pronto.":"Sesión cerrada. Para seguir, vuelve a entrar."); else if(!quien&&bloqueo&&ahora()>bloqueo){ bloqueo=0; pintar(); } },
    salir(){ app.removeEventListener("submit",enviar); app.removeEventListener("click",clic); try{ if(sb2) sb2.auth.signOut(); }catch(_){} } };
}
// Tomar nota: comanda manual del personal (camarero o barra). Va directa a cocina y barra, ya aceptada, a nombre de quien la toma.
const Comanda = {
  // Comanda rápida del camarero: Rápido (lo más pedido) · Bebidas · Comida. Un toque = una unidad.
  abrir(n,por){ this.por=por; this.n=n||null; this.car={}; this.nota=""; this.tab="rapido"; this.sub={}; this.q=""; this.cesta=false; this.enviando=false; this.pop=this.popularidad(); this.pintar(); },
  cerrar(){ this.n=null; this.car={}; this.nota=""; this.enviando=false; this.cesta=false; if(this.el){ this.el.remove(); this.el=null; } document.body.classList.remove("cx-abierta"); },
  // Lo que más se pide (últimos 30 días): sale de los pedidos y de las cuentas cobradas
  popularidad(){ const desde=ahora()-30*864e5, m={};
    Store.all("pedidos").filter(p=>p.t>=desde&&!p.rechazado).forEach(p=>(p.items||[]).forEach(x=>{ m[x.id]=(m[x.id]||0)+(+x.q||0); }));
    if(!Object.keys(m).length) Store.all("cuentas").filter(c=>c.t>=desde).forEach(c=>(c.items||[]).forEach(x=>{ if(x.id) m[x.id]=(m[x.id]||0)+(+x.q||1); }));
    return m; },
  orden(lista){ const pop=this.pop||{}; return lista.map((p,i)=>[p,i]).sort((a,b)=>(agotado(a[0].id)-agotado(b[0].id))||((pop[b[0].id]||0)-(pop[a[0].id]||0))||(a[1]-b[1])).map(x=>x[0]); },
  grupos(){ const ss=seccionesConPlatos(); return { bebidas:ss.filter(s=>(s.dest||"cocina")==="barra"), comida:ss.filter(s=>(s.dest||"cocina")!=="barra") }; },
  rapidos(){ const c=carta().filter(p=>!agotado(p.id)), pop=this.pop||{};
    let L=c.filter(p=>pop[p.id]>0).sort((a,b)=>pop[b.id]-pop[a.id]);
    if(L.length<12) L=L.concat(c.filter(p=>!L.includes(p)&&p.top)); if(L.length<12) L=L.concat(c.filter(p=>!L.includes(p)));
    // mezcla bebidas y comida: las dos cosas que más se piden de cada tipo, arriba
    return L.slice(0,12); },
  total(){ return Object.entries(this.car).reduce((a,[k,q])=>a+precio(k)*q,0); },
  cuenta(){ return Object.values(this.car).reduce((a,b)=>a+b,0); },
  porDest(){ const r={cocina:0,barra:0}; Object.entries(this.car).forEach(([k,q])=>{ const it=carta().find(p=>p.id===k); r[it&&it.dest==="barra"?"barra":"cocina"]+=q; }); return r; },
  tile(p){ const q=this.car[p.id]||0, ag=agotado(p.id), pop=(this.pop||{})[p.id]||0;
    return `<div class="cx-t ${q?"on":""} ${ag?"ag":""}"><button class="cx-add" data-x-add="${esc(p.id)}" ${ag?"disabled":""} aria-label="Añadir ${esc(p.n)}"><b>${esc(p.n)}</b><span>${ag?"Agotado":eur(p.p)}</span>${q?`<i class="cx-q">${q}</i>`:""}</button>${q?`<button class="cx-menos" data-x-menos="${esc(p.id)}" aria-label="Quitar uno de ${esc(p.n)}">−</button>`:""}</div>`; },
  cuerpo(){
    if(this.q){ const q=norm(this.q); const L=this.orden(carta().filter(p=>norm(p.n+" "+(p.d||"")).includes(q)));
      return `<div class="cx-grid">${L.map(p=>this.tile(p)).join("")||`<p class="cx-vacio">Nada con «${esc(this.q)}»</p>`}</div>`; }
    if(this.tab==="rapido"){ const L=this.rapidos(), hay=Object.keys(this.pop||{}).length;
      return `<p class="cx-tit">${hay?"Lo que más se pide aquí":"Lo más destacado de la carta"}</p><div class="cx-grid">${L.map(p=>this.tile(p)).join("")}</div>`; }
    const ss=this.grupos()[this.tab]||[]; if(!ss.length) return `<p class="cx-vacio">No hay nada en esta parte de la carta.</p>`;
    const cur=ss.some(s=>s.id===this.sub[this.tab])?this.sub[this.tab]:ss[0].id; this.sub[this.tab]=cur;
    const L=this.orden(carta().filter(p=>p.sec===cur));
    return `<div class="cx-secs">${ss.map(s=>`<button data-x-sec="${esc(s.id)}" aria-pressed="${s.id===cur}">${esc(s.n)}</button>`).join("")}</div><div class="cx-grid">${L.map(p=>this.tile(p)).join("")}</div>`;
  },
  pie(){ const c=this.cuenta(), d=this.porDest();
    if(this.cesta){ const L=Object.entries(this.car).filter(([,q])=>q>0);
      return `<div class="cx-cesta"><div class="cx-cesta-cab"><b>Comanda · Mesa ${this.n}</b><button class="cx-link" data-x-cesta>Seguir añadiendo</button></div>
        <ul>${L.map(([k,q])=>{ const it=carta().find(p=>p.id===k)||{n:k,p:0}; return `<li><span class="n">${esc(it.n)}</span><span class="cx-ctr"><button data-x-menos="${esc(k)}" aria-label="Quitar uno">−</button><b>${q}</b><button data-x-add="${esc(k)}" aria-label="Añadir uno">+</button></span><span class="p">${eur(it.p*q)}</span></li>`; }).join("")||`<li class="cx-vacio">Todavía no hay nada.</li>`}</ul>
        <textarea id="cx-nota" rows="2" maxlength="200" placeholder="Anotaciones: sin cebolla, poco hecho, para compartir…">${esc(this.nota)}</textarea></div>`
        +`<button class="cx-env" data-x-enviar ${c?"":"disabled"}>${c?`Enviar · ${eur(this.total())}<small>${[d.cocina?`${d.cocina} a cocina`:"",d.barra?`${d.barra} a barra`:""].filter(Boolean).join(" · ")}</small>`:"Añade algo para enviar"}</button>`; }
    return `<div class="cx-barra"><button class="cx-ver" data-x-cesta ${c?"":"disabled"}><i>${c}</i><span>${c?"Ver comanda":"Comanda vacía"}</span><b>${eur(this.total())}</b></button><button class="cx-env cx-env-p" data-x-enviar ${c?"":"disabled"}>Enviar</button></div>`; },
  pintar(){
    if(!this.el){ const d=document.createElement("div"); d.id="comanda-ui"; Morph.activar(d); d.addEventListener("click",e=>this.clic(e)); d.addEventListener("input",e=>this.entrada(e)); document.body.appendChild(d); this.el=d; document.body.classList.add("cx-abierta"); }
    const yo=this.por;
    if(!this.n){ const todas=Array.from({length:mesasN()},(_,i)=>mesa(i+1)), mias=todas.filter(m=>camDe(m.n)===yo), resto=todas.filter(m=>camDe(m.n)!==yo);
      const b=m=>`<button data-x-mesa="${m.n}" class="${m.abierta?"oc":""}"><b>${m.n}</b><small>${m.abierta?(camDe(m.n)&&camDe(m.n)!==yo?esc(nomCam(camDe(m.n))):"ocupada"):"libre"}</small></button>`;
      this.el.innerHTML=`<div class="cx" role="dialog" aria-label="Tomar comanda"><div class="cx-cab"><div><small>Tomar comanda</small><h3>¿Qué mesa?</h3></div><button class="cx-x" data-x-cerrar aria-label="Cerrar">✕</button></div>
        <div class="cx-scroll">${mias.length?`<p class="cx-tit">Tus mesas</p><div class="cx-mesas">${mias.map(b).join("")}</div>`:""}<p class="cx-tit">${mias.length?"Resto de la sala":"Sala"}</p><div class="cx-mesas">${resto.map(b).join("")}</div></div></div>`; return; }
    const g=this.grupos(), tabs=[["rapido","Rápido"],...(g.bebidas.length?[["bebidas","Bebidas"]]:[]),...(g.comida.length?[["comida","Comida"]]:[])];
    const scrollY=(this.el.querySelector(".cx-scroll")||{}).scrollTop||0, mismo=this._ult===this.tab+"|"+(this.sub[this.tab]||"")+"|"+this.q;
    this.el.innerHTML=`<div class="cx" role="dialog" aria-label="Comanda de la mesa ${this.n}">
      <div class="cx-cab"><div><small>${esc(zonaDe(this.n))} · ${esc(nomCam(yo)||"Barra")}</small><h3>Mesa ${this.n} <button class="cx-link" data-x-cambiar>Cambiar</button></h3></div><button class="cx-x" data-x-cerrar aria-label="Cerrar">✕</button></div>
      <div class="cx-tabs" role="tablist">${tabs.map(([k,t])=>`<button role="tab" data-x-tab="${k}" aria-selected="${!this.q&&this.tab===k}">${t}</button>`).join("")}<label class="cx-bus"><span class="oculto">Buscar</span><input type="search" id="cx-bus" placeholder="Buscar…" value="${esc(this.q)}" autocomplete="off"></label></div>
      <div class="cx-scroll">${this.cuerpo()}</div>
      <div class="cx-pie" id="cx-pie">${this.pie()}</div></div>`;
    if(mismo){ const sc=this.el.querySelector(".cx-scroll"); if(sc) sc.scrollTop=scrollY; }
    this._ult=this.tab+"|"+(this.sub[this.tab]||"")+"|"+this.q;
  },
  refrescar(){ // sin repintar todo: mantiene el scroll y la búsqueda
    const sc=this.el.querySelector(".cx-scroll"); if(sc) sc.innerHTML=this.cuerpo(); const pie=this.el.querySelector("#cx-pie"); if(pie) pie.innerHTML=this.pie(); },
  entrada(e){
    if(e.target.id==="cx-nota"){ this.nota=e.target.value; return; }
    if(e.target.id==="cx-bus"){ this.q=e.target.value.trim(); const sc=this.el.querySelector(".cx-scroll"); if(sc) sc.innerHTML=this.cuerpo();
      this.el.querySelectorAll("[data-x-tab]").forEach(b=>b.setAttribute("aria-selected",String(!this.q&&b.dataset.xTab===this.tab))); } },
  async clic(e){
    const t=e.target;
    if(t.closest("[data-x-cerrar]")){ if(this.cuenta()&&!confirm("Hay productos sin enviar. ¿Cerrar y descartarlos?")) return; return this.cerrar(); }
    const mb=t.closest("[data-x-mesa]"); if(mb){ this.n=+mb.dataset.xMesa; return this.pintar(); }
    if(t.closest("[data-x-cambiar]")){ this.n=null; this.cesta=false; return this.pintar(); }
    const tb=t.closest("[data-x-tab]"); if(tb){ this.tab=tb.dataset.xTab; this.q=""; this.cesta=false; return this.pintar(); }
    const sc=t.closest("[data-x-sec]"); if(sc){ this.sub[this.tab]=sc.dataset.xSec; return this.pintar(); }
    const ad=t.closest("[data-x-add]"); if(ad){ const id=ad.dataset.xAdd; if(agotado(id)) return; this.car[id]=Math.min(30,(this.car[id]||0)+1); try{ navigator.vibrate&&navigator.vibrate(8); }catch(_){} return this.refrescar(); }
    const me=t.closest("[data-x-menos]"); if(me){ const id=me.dataset.xMenos; this.car[id]=Math.max(0,(this.car[id]||0)-1); if(!this.car[id]) delete this.car[id]; if(!this.cuenta()) this.cesta=false; return this.refrescar(); }
    if(t.closest("[data-x-cesta]")){ const nota=this.el.querySelector("#cx-nota"); if(nota) this.nota=nota.value; this.cesta=!this.cesta&&this.cuenta()>0; return this.refrescar(); }
    if(t.closest("[data-x-enviar]")){ if(this.enviando||!this.cuenta()) return; this.enviando=true;
      const n=this.n, c=this.cuenta(), nota=(this.el.querySelector("#cx-nota")||{}).value??this.nota;
      try{ const ok=await Acc.comanda(n,{...this.car},String(nota||"").trim(),this.por); if(!ok) throw 0; toast(`Mesa ${n}: ${c} ${c===1?"producto enviado":"productos enviados"} a cocina y barra.`); this.cerrar(); }
      catch(err){ this.enviando=false; toast("No se ha podido enviar la comanda. Inténtalo otra vez."); } } }
};
// Si un camarero con la sesión iniciada acerca su móvil a la tarjeta de una mesa, puede tomar la comanda de esa mesa
const AtajoMesa = {
  quitar(){ const b=document.getElementById("cx-atajo"); if(b) b.remove(); },
  poner(n){ this.quitar(); if(!(Store.modo==="supa"&&Store.sesion&&Store.rol)) return;
    const b=document.createElement("button"); b.id="cx-atajo"; b.type="button"; b.innerHTML=`${ico("menu")}Tomar comanda · Mesa ${n}`;
    b.addEventListener("click",()=>Comanda.abrir(+n,Store.cam||"personal")); document.body.appendChild(b); }
};
function VKds({dest}){
  let vistos=null, seguroSalida=false;
  const fijoF=Store.modo==="supa"?Store.cam:Pin.camarero();
  let yoF; try{ yoF=fijoF||localStorage.getItem("metriax-yo")||cams()[0].id; }catch(e){ yoF=fijoF||cams()[0].id; }
  if(!cams().some(c=>c.id===yoF)) yoF=cams()[0].id;
  // Barra: avisos de las mesas (llamar al camarero, pedir la cuenta) y cobro de mesas, igual que en Camarero
  let vistosA=null;
  const quienB=fijoF||"barra";
  const avisosB=()=>dest==="barra"&&Store.personal()?avisosAbiertos().filter(a=>a.mesa&&!a.llevar&&["llamada","cuenta"].includes(a.tipo)).sort((a,b)=>a.t-b.t):[];
  const mesasCobro=()=>dest==="barra"&&Store.personal()?Array.from({length:mesasN()},(_,i)=>mesa(i+1)).filter(m=>m.abierta&&(cuentaDe(m.n)||(pagadoMesa(m)>0&&pendienteMesa(m)<=0))):[];
  const avHTML=()=>{ const av=avisosB(); if(!av.length) return "";
    return `<div class="k-ent" style="margin:0 0 14px;padding:12px;border:2px solid #4a90d9;border-radius:14px;background:rgba(74,144,217,.12)"><h2 style="margin:0 0 8px;font-size:15px">${ico("bell")} Avisos de mesa · ${av.length}</h2>
      ${av.map(a=>`<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(255,255,255,.12)"><div><b>Mesa ${a.mesa}</b> · ${esc(tipoTxt(a))} · hace <span data-desde="${a.t}">${mmss(ahora()-a.t)}</span>${a.det?`<br><span>${esc(a.det)}</span>`:""}</div><button class="b-ui verde" data-av="${a.id}">Yo me encargo</button></div>`).join("")}</div>`; };
  const cobHTML=()=>{ const ms=mesasCobro(); if(!ms.length) return "";
    return `<div class="k-ent" style="margin:0 0 14px;padding:12px;border:2px solid #3fa66b;border-radius:14px;background:rgba(63,166,107,.12)"><h2 style="margin:0 0 8px;font-size:15px">${ico("receipt")} Mesas por cobrar o liberar · ${ms.length}</h2>
      ${ms.map(m=>{ const pend=pendienteMesa(m), pide=cuentaDe(m.n); return `<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(255,255,255,.12)"><div><b>Mesa ${m.n}</b> · ${pend>0?`${eur(pend)} por cobrar${pide?` · pide pagar con ${pide==="tarjeta"?"tarjeta":"efectivo"}`:""}`:`<span>Ya pagado online</span>`}</div>
        <span class="val-bot">${pend>0?`<button class="b-ui verde" data-cobrar="${m.n}" data-forma="tarjeta">Cobrado con tarjeta</button><button class="b-ui verde" data-cobrar="${m.n}" data-forma="efectivo">Cobrado en efectivo</button>`:`<button class="b-ui verde" data-cobrar="${m.n}" data-forma="online">Todo pagado · liberar mesa</button>`}</span></div>`; }).join("")}</div>`; };
  // Pedidos por aceptar: también se aceptan o rechazan desde aquí
  let vistosE=null;
  const entHTML=()=>{ const es=Store.personal()?entrantes():[]; if(!es.length) return "";
    return `<div class="k-ent" style="margin:0 0 14px;padding:12px;border:2px solid #e0a32e;border-radius:14px;background:rgba(224,163,46,.12)"><h2 style="margin:0 0 8px;font-size:15px">${ico("check")} Pedidos por aceptar · ${es.length}</h2>
      ${es.map(p=>`<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(255,255,255,.12)"><div><b>${lugar(p)}</b> · hace <span data-desde="${p.t}">${mmss(ahora()-p.t)}</span><br><span>${p.items.map(x=>`${x.q}× ${esc(x.n)}`).join(", ")}${p.nota?` · «${esc(p.nota)}»`:""}</span></div>${botonesValidar(p.id)}</div>`).join("")}</div>`; };
  const tks=()=>Store.all("tickets").filter(k=>k.dest===dest&&k.estado!=="listo").sort((a,b)=>(b.pagado?1:0)-(a.pagado?1:0)||a.t-b.t);
  const kImp="mx-imprimir-"+TENANT+"-"+dest, imprimirOn=()=>{ try{ return localStorage.getItem(kImp)==="1"; }catch(_){ return false; } };
  const impresos=()=>{ try{ return new Set(JSON.parse(localStorage.getItem(kImp+"-hechos")||"[]")); }catch(_){ return new Set(); } };
  const marcarImpreso=id=>{ try{ const s=[...impresos(),id].slice(-200); localStorage.setItem(kImp+"-hechos",JSON.stringify(s)); }catch(_){} };
  // Ticket de 80 mm: se imprime en la impresora predeterminada del dispositivo
  function imprimir(k){
    const b=cfgBar(), h=new Date(k.t).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
    const html=`<!doctype html><html><head><meta charset="utf-8"><style>@page{size:80mm auto;margin:3mm}body{font:13px/1.35 monospace;width:72mm;margin:0;color:#000}h1{font-size:16px;margin:0 0 2px;text-align:center}.c{text-align:center}.g{font-size:20px;font-weight:700;text-align:center;margin:6px 0}hr{border:0;border-top:1px dashed #000}li{list-style:none;font-size:15px;margin:3px 0}ul{padding:0;margin:4px 0}</style></head><body>
      <h1>${esc(b.nombre)}</h1><div class="c">${dest==="cocina"?"COCINA":"BARRA"} · ${h}</div><div class="g">${k.llevar?esc(k.codigo):"MESA "+k.mesa}</div>${k.pagado?`<div class="c">** PAGADO **</div>`:""}<hr>
      <ul>${k.items.map(x=>`<li>${x.q} x ${esc(x.n)}</li>`).join("")}</ul>${k.nota?`<hr><div>Nota: ${esc(k.nota)}</div>`:""}<hr><div class="c">${esc(k.id)}</div></body></html>`;
    const f=document.createElement("iframe"); f.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0"; document.body.appendChild(f);
    f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(()=>{ try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(_){} setTimeout(()=>f.remove(),4000); },250);
    marcarImpreso(k.id);
  }
  const tk=k=>{ const min=(ahora()-k.t)/60000; return `<div class="ticket ${min>=10?"ro":min>=5?"am":""} ${k.pagado?"pg":""}" data-tk="${k.id}">
    <div class="tc"><b>${k.llevar?`${ico("bag")} ${esc(k.codigo)}`:`Mesa ${k.mesa}`}${k.pagado?`<span class="k-pg">· pagado</span>`:""}</b><span class="reloj" data-desde="${k.t}">${mmss(ahora()-k.t)}</span></div>
    ${k.llevar?`<div class="nota" style="background:#ffe1e1">Para llevar · ${esc(k.nombre)} · recoge ${esc(k.hora)}</div>`:""}
    <ul>${k.items.map(x=>`<li><span class="q">${x.q}×</span>${esc(x.n)}</li>`).join("")}</ul>${k.nota?`<div class="nota">Nota: ${esc(k.nota)}</div>`:""}
    <div class="meta">${k.llevar?"Barra":zonaDe(k.mesa)+(camDe(k.mesa)?" · "+esc(nomCam(camDe(k.mesa))):"")}${k.inicioT?` · empezado hace ${mmss(ahora()-k.inicioT)}`:""}</div>
    ${k.estado==="nuevo"?`<button class="b-ui amar" data-emp="${k.id}">Empezar</button>`:`<button class="b-ui verde" data-listo="${k.id}">${ico("check")}¡Listo!</button>`}<button class="k-imp" data-imp="${k.id}" title="Imprimir ticket">Imprimir</button></div>`; };
  function pintar(){
    const ts=tks(), nu=ts.filter(k=>k.estado==="nuevo"), pr=ts.filter(k=>k.estado!=="nuevo");
    const hechos=Store.all("tickets").filter(k=>k.dest===dest&&k.listoT&&k.t>=inicioDia()), media=hechos.length?hechos.reduce((a,k)=>a+(k.listoT-k.t),0)/hechos.length:null;
    app.innerHTML=`<div class="kds"><div class="k-cab"><h1>${dest==="cocina"?"COCINA":"BARRA"} <span>· ${esc(cfgBar().nombre)}</span></h1>
      <div class="k-res"><span class="pill">${ts.length} en marcha</span><span class="pill">${hechos.length} hechos hoy</span>${media?`<span class="pill">media ${mmss(media)}</span>`:""}</div>
      <div style="display:flex;gap:10px;align-items:center">${modoBadge()}${dest==="barra"?`<button class="sonido" data-comanda>${ico("menu")}Tomar nota</button>`:""}<button class="sonido" data-sonido aria-pressed="${sonidoOn()}">${ico("speaker")}${sonidoOn()?"Sonido":"Sin sonido"}</button><button class="sonido" data-imprimir aria-pressed="${imprimirOn()}" title="Imprime solo los pedidos pagados al llegar">${ico("receipt")}${imprimirOn()?"Imprime pagados":"Sin imprimir"}</button><span class="hora" id="hora">${hhmm(ahora())}</span></div></div>
      <div class="fich"><a class="b-ui claro" href="#fichar" target="_blank" rel="noopener">${ico("users")}Fichar entrada, pausa o salida</a><span class="peq-f">Con tu usuario y contraseña, en otra pantalla</span></div>
      ${entHTML()}${avHTML()}${cobHTML()}
      <div class="k-cols"><section class="k-col"><h2><span>Nuevos</span><span>${nu.length}</span></h2>${nu.length?`<div class="k-grid">${nu.map(tk).join("")}</div>`:`<p class="vacio" style="color:#8f8577">Nada nuevo</p>`}</section>
      <section class="k-col"><h2><span>Preparando</span><span>${pr.length}</span></h2>${pr.length?`<div class="k-grid">${pr.map(tk).join("")}</div>`:`<p class="vacio" style="color:#8f8577">Nada en marcha</p>`}</section></div></div>`;
  }
  async function clic(e){
    activarAudio();
    if(await clicValidar(e.target,quienB)) return;
    if(e.target.closest("[data-comanda]")) return Comanda.abrir(null,quienB);
    const av=e.target.closest("[data-av]"); if(av){ const a=Store.get("avisos",av.dataset.av); await Acc.atender(av.dataset.av,quienB); toast(a&&a.tipo==="cuenta"?`Mesa ${a.mesa}: te encargas de la cuenta.`:`Te encargas de la mesa ${a?a.mesa:""}.`); return; }
    if(await clicParcial(e.target,quienB)) return;
    const cb=e.target.closest("[data-cobrar]"); if(cb){ if(!cb.dataset.seg){ cb.dataset.seg=1; cb.textContent="¿Seguro? Pulsa otra vez"; return; } const n=+cb.dataset.cobrar, tot=totalMesa(mesa(n)); await Acc.cerrar(n,quienB,cb.dataset.forma); toast(tot?`Mesa ${n}: cobrada (${eur(tot)}). Vuelve a estar libre.`:`Mesa ${n} libre.`); return; }
    const fi=e.target.closest("[data-fich]");
    if(fi){ const a=fi.dataset.fich;
      if(a==="salida" && !seguroSalida){ seguroSalida=true; return pintar(); }
      seguroSalida=false; await Acc.fichar(yoF,a);
      toast({entrada:`Entrada fichada a las ${hhmm(ahora())}. El cronómetro está en marcha.`,pausa:"En pausa: el cronómetro se ha parado.",volver:"De vuelta: el cronómetro sigue.",salida:"Salida fichada. ¡Buen descanso!"}[a]); return; }
    if(seguroSalida){ seguroSalida=false; pintar(); }
    if(e.target.closest("[data-sonido]")){ try{ localStorage.setItem("lp-sonido",sonidoOn()?"0":"1"); }catch(_){} if(sonidoOn()) pitido("cocina"); return pintar(); }
    if(e.target.closest("[data-imprimir]")){ try{ localStorage.setItem(kImp,imprimirOn()?"0":"1"); if(imprimirOn()){ const ya=impresos(); tks().forEach(k=>{ if(!ya.has(k.id)) marcarImpreso(k.id); }); } }catch(_){} toast(imprimirOn()?"Se imprimirán solos los pedidos pagados que lleguen.":"Impresión automática apagada."); return pintar(); }
    const im=e.target.closest("[data-imp]"); if(im){ const k=Store.get("tickets",im.dataset.imp); if(k) imprimir(k); return; }
    const em=e.target.closest("[data-emp]"); if(em) return Acc.ticket(em.dataset.emp,"preparando");
    const li=e.target.closest("[data-listo]"); if(li){ const k=Store.get("tickets",li.dataset.listo); await Acc.ticket(li.dataset.listo,"listo"); toast(`${lugar(k)} listo. Avisado ${k.llevar?"en barra":camDe(k.mesa)?nomCam(camDe(k.mesa)):"el personal de sala"}.`); }
  }
  function cambioF(e){ if(e.target.id==="yo-f" && !fijoF){ yoF=e.target.value; try{ localStorage.setItem("metriax-yo",yoF); }catch(_){} seguroSalida=false; pintar(); } }
  app.addEventListener("click",clic); app.addEventListener("change",cambioF);
  return { titulo:(dest==="cocina"?"Cocina":"Barra")+" · "+cfgBar().nombre, pintar,
    alCambiar(){ const ids=new Set(tks().map(k=>k.id)); if(vistos && [...ids].some(i=>!vistos.has(i))) pitido("cocina");
      const ia=new Set(avisosB().map(a=>a.id)); if(vistosA && [...ia].some(i=>!vistosA.has(i))) pitido("llamada"); vistosA=ia;
      const ie=new Set((Store.personal()?entrantes():[]).map(p=>p.id)); if(vistosE && [...ie].some(i=>!vistosE.has(i))) pitido("urgente"); vistosE=ie;
      if(vistos && imprimirOn()){ const ya=impresos(); tks().filter(k=>k.pagado&&!vistos.has(k.id)&&!ya.has(k.id)).forEach(imprimir); }
      vistos=ids; pintar(); },
    tic(){ const h=document.getElementById("hora"); if(h) h.textContent=hhmm(ahora()); app.querySelectorAll(".ticket").forEach(el=>{ const k=Store.get("tickets",el.dataset.tk); if(!k) return; const m=(ahora()-k.t)/60000; el.classList.toggle("am",m>=5&&m<10); el.classList.toggle("ro",m>=10); }); },
    salir(){ app.removeEventListener("click",clic); app.removeEventListener("change",cambioF); } };
}

/* =====================================================================
   VISTA: PANEL
   ===================================================================== */
let panelTab="sala";
// Ejemplo de 30 días para enseñar el panel con datos (usa los platos y camareros de este restaurante)
const EJEMPLO={fact:29410.5,ped:2514,mesas:1003,cocina:654,horas:[91,246,401,342,118,41,63,99,176,371,402,165],
  get top(){ const q=[2946,783,742,655,597,494,433,350]; return carta().slice(0,8).map((p,i)=>[p.n,q[i]]).sort((a,b)=>b[1]-a[1]); },
  get cam(){ return cams().map((c,i)=>[c.n,[41,35,28,22,17][i%5]]); },
  pago:[66,34], dias:[598,551,603,688,1104,1890,1420], sugU:312, sugE:1286, nota:4.5, notas:771, llevar:184};
function VPanel(){
  let pideAdmin=null, errAdmin="", admAntes=Acceso.admin();
  let perRend=0, modoRes="hoy", buscar="", hoja=null, periodoInf=7, editPlato=null, equipo=null, cargandoEquipo=false;
  const tip=cont=>{ let t=cont.querySelector(".tip"); if(!t){ t=document.createElement("div"); t.className="tip"; cont.appendChild(t);} cont.querySelectorAll(".barra").forEach(b=>{ b.addEventListener("pointerenter",()=>{ const r=b.getBoundingClientRect(), c=cont.getBoundingClientRect(); t.textContent=b.dataset.tip; t.style.left=(r.left-c.left+r.width/2)+"px"; t.style.top=(r.top-c.top)+"px"; t.style.display="block"; }); b.addEventListener("pointerleave",()=>t.style.display="none"); }); };
  function barrasV(etq,vals,{fmt=v=>v.toLocaleString("es-ES"),destacar=[],tipf}={}){
    const W=640,H=220,pl=44,pr=8,pt=16,pb=26, mx=Math.max(1,...vals)*1.12, raw=mx/4, mag=10**Math.floor(Math.log10(raw||1)), stp=[1,2,2.5,5,10].map(k=>k*mag).find(k=>k>=raw)||1;
    const paso=(W-pl-pr)/vals.length, bw=Math.min(38,paso-4), y=v=>pt+(H-pt-pb)*(1-v/mx);
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img">`;
    [0,1,2,3,4].map(k=>k*stp).filter(v=>v<=mx).forEach(v=>s+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="#ece3d1"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${fmt(v)}</text>`);
    vals.forEach((v,i)=>{ const x=pl+paso*i+(paso-bw)/2, top=y(v), h=H-pb-top, r=Math.min(4,h);
      if(v>0) s+=`<path class="barra" data-tip="${tipf?tipf(i,v):etq[i]+": "+fmt(v)}" d="M${x},${H-pb} V${top+r} q0,-${r} ${r},-${r} h${bw-2*r} q${r},0 ${r},${r} V${H-pb} Z" style="fill:${destacar.includes(i)?"var(--rojo)":"var(--rojo-claro)"}"/>`;
      if(destacar.includes(i)&&v>0) s+=`<text class="val" x="${x+bw/2}" y="${top-5}" text-anchor="middle">${fmt(v)}</text>`;
      s+=`<text x="${x+bw/2}" y="${H-8}" text-anchor="middle">${etq[i]}</text>`; });
    return s+`<line x1="${pl}" x2="${W-pr}" y1="${H-pb}" y2="${H-pb}" stroke="#1f1b17" stroke-width="1.5"/></svg>`;
  }
  function barrasH(filas,{fmt=v=>v.toLocaleString("es-ES"),objetivo=null,max=null,color=null}={}){
    if(!filas.length) return `<div class="vacio-ui">Sin datos todavía</div>`;
    const W=640,f=32,pl=200,pr=70,H=filas.length*f+(objetivo?24:6), m=max||Math.max(...filas.map(x=>x[1]))*1.05||1, x=v=>pl+(W-pl-pr)*(v/m);
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img">`;
    filas.forEach(([n,v],i)=>{ const yy=i*f+6, w=Math.max(0,x(v)-pl), r=Math.min(4,w), col=color?color(v):"var(--rojo)", nm=n.length>28?n.slice(0,27)+"…":n;
      s+=`<text x="${pl-10}" y="${yy+14}" text-anchor="end" style="fill:#1f1b17;font-size:14px">${esc(nm)}</text>`;
      if(v>0) s+=`<path class="barra" data-tip="${esc(n)}: ${fmt(v)}" d="M${pl},${yy} h${w-r} q${r},0 ${r},${r} v${18-2*r} q0,${r} -${r},${r} h-${w-r} Z" style="fill:${col}"/>`;
      s+=`<text class="val" x="${x(v)+6}" y="${yy+14}">${fmt(v)}</text>`; });
    if(objetivo){ const ox=x(objetivo); s+=`<line x1="${ox}" x2="${ox}" y1="0" y2="${H-18}" stroke="#1f1b17" stroke-width="2" stroke-dasharray="5 4"/><text x="${ox}" y="${H-3}" text-anchor="middle">objetivo ${fmt(objetivo)}</text>`; }
    return s+`</svg>`;
  }
  const estrellasTxt=v=>"★★★★★".slice(0,Math.round(v))+"☆☆☆☆☆".slice(0,5-Math.round(v));

  function sala(){
    const r=resumen(0), N=mesasN(), nLl=Store.all("atenciones").filter(a=>a.t>=inicioDia()&&a.tipo!=="mesa").length, llPend=avisosAbiertos().filter(a=>a.tipo==="llamada").length;
    const ll=Store.all("pedidos").filter(p=>p.llevar&&!p.recogido&&!p.rechazado&&p.t>=inicioDia()), ent=entrantes();
    return `<div class="p-cab"><div><h1>Sala en vivo</h1><p>Las ${N} mesas ahora mismo. Se ocupan solas al aceptar el primer pedido; toca una para ver su cuenta o cobrarla.</p></div>${modoBadge()}</div>
      <div class="kpis">
        <div class="card kpi"><small>Mesas ocupadas</small><strong>${r.abiertas.length}<span style="font-size:18px;color:var(--tinta-3)"> / ${N}</span></strong><span class="d">${eur(r.abiertas.reduce((a,m)=>a+totalMesa(m),0))} en mesa</span></div>
        <div class="card kpi"><small>Pedidos hoy</small><strong>${r.pedidos.length}</strong><span class="d">${r.llevar.length} para llevar · ${r.menus} menús</span></div>
        <div class="card kpi"><small>Cobrado hoy</small><strong>${eur0(r.fact)}</strong><span class="d">${r.cuentas.length} cuentas</span></div>
        <div class="card kpi"><small>Llamadas atendidas</small><strong>${nLl}</strong><span class="d">${llPend?`${llPend} esperando camarero`:"ninguna esperando"}</span></div>
        <div class="card kpi"><small>Avisos pendientes</small><strong style="color:${r.pendientes?"var(--critico)":"inherit"}">${r.pendientes}</strong><span class="d">sin atender ahora</span></div>
      </div>
      ${salaExtra()}${ll.length?`<div class="card" style="margin-bottom:14px"><h2>${ico("bag")} Para llevar en curso</h2><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">${ll.map(p=>`<span class="pill ${estadoPedido(p)===2?"ok":"aviso"}" style="font-size:14px"><b>${esc(p.codigo)}</b> ${esc(p.nombre)} · ${esc(p.hora)} · ${["por confirmar","preparando","listo"][estadoPedido(p)]}</span>`).join("")}</div></div>`:""}
      ${ent.length?`<div class="card ent-card" style="margin-bottom:14px"><h2>${ico("check")} Pedidos por confirmar</h2><p class="ayuda">Comprueba que hay gente en la mesa antes de aceptarlo. Al aceptarlo llega a cocina y barra.</p><div class="ent-lista">${ent.map(p=>`<div class="entrante-c"><b>${esc(lugar(p))}${p.llevar?` · ${esc(p.nombre)}`:""} · hace <span data-desde="${p.t}">${mmss(ahora()-p.t)}</span></b><span>${p.items.map(x=>`${x.q}× ${esc(x.n)}`).join(", ")}${p.nota?` · «${esc(p.nota)}»`:""}</span>${botonesValidar(p.id)}</div>`).join("")}</div></div>`:""}
      <div class="card"><div class="ley-sala"><span><i style="background:var(--ok)"></i>Libre</span><span><i style="background:var(--entrante)"></i>Pedido por confirmar</span><span><i style="background:var(--m-ocupada)"></i>Ocupada</span><span><i style="background:var(--aviso)"></i>Pedido en cocina/barra</span><span><i style="background:var(--m-cuenta)"></i>Pide la cuenta</span><span><i style="background:var(--critico)"></i>Aviso sin atender</span></div>
        ${["Interior","Terraza"].map(z=>{ const ms=Array.from({length:N},(_,i)=>mesa(i+1)).filter(m=>zonaDe(m.n)===z); if(!ms.length) return ""; return `<p class="zona-t">${z}</p><div class="sala">${ms.map(m=>{ const c=cams().find(x=>x.id===camDe(m.n));
          return `<button class="mesa-b ${claseMesa(m)}" data-pm="${m.n}"><b>${m.n}</b><small>${m.abierta?(cuentaDe(m.n)?`Cuenta · ${cuentaDe(m.n)}`:`<span data-desde="${m.desde}">${mmss(ahora()-m.desde)}</span>`):"Libre"}</small>${m.abierta?`<small>${pagadoMesa(m)?(pendienteMesa(m)>0?`${eur(pendienteMesa(m))} <i class="pg">· pagado ${eur(pagadoMesa(m))}</i>`:`<i class="pg">${ico("check")}Pagado</i>`):eur(totalMesa(m))}</small>`:""}${c?`<span class="cam" style="color:${c.color}">${esc(c.n)}</span>`:""}</button>`; }).join("")}</div>`; }).join("")}</div>`;
  }
  function resumenV(){
    const r=resumen(0), ej=modoRes==="ejemplo";
    const horas=ej?EJEMPLO.horas:r.horas, picos=[...horas.keys()].sort((a,b)=>horas[b]-horas[a]).slice(0,2).filter(i=>horas[i]>0);
    const top=ej?EJEMPLO.top:Object.entries(r.unidades).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const cam=ej?EJEMPLO.cam.slice().sort((a,b)=>b[1]-a[1]):ranking(0).filter(x=>x.mesas>0).map(x=>[x.c.n+(x.nota!=null?" · ★"+notaTxt(x):""),x.mesas]);
    const pt=r.pago.tarjeta+r.pago.efectivo, pago=ej?EJEMPLO.pago:(pt?[Math.round(r.pago.tarjeta/pt*100),100-Math.round(r.pago.tarjeta/pt*100)]:null);
    const fact=ej?EJEMPLO.fact:r.fact, ped=ej?EJEMPLO.ped:r.pedidos.length, nc=ej?EJEMPLO.mesas:r.cuentas.length;
    const coc=ej?EJEMPLO.cocina:(r.cocinaMedia!=null?r.cocinaMedia/1000:null);
    const nota=ej?EJEMPLO.nota:r.notaMedia, nNotas=ej?EJEMPLO.notas:r.vals.length;
    const comentarios=Store.all("valoraciones").filter(v=>v.comentario).sort((a,b)=>b.t-a.t).slice(0,5);
    return `<div class="p-cab"><div><h1>Resumen</h1><p>${ej?"Ejemplo de un mes completo, para enseñar cómo se verá con datos.":"Datos reales de hoy, desde las 5:00."}</p></div>
      <div class="seg-claro" role="group"><button data-rm="hoy" aria-pressed="${!ej}">Hoy (real)</button><button data-rm="ejemplo" aria-pressed="${ej}">Ejemplo 30 días</button></div></div>
      ${!ej&&!r.pedidos.length?`<div class="vacio-ui" style="margin-bottom:14px">Hoy todavía no hay pedidos. Abre una mesa y haz un pedido de prueba: aparecerá aquí al momento.</div>`:""}
      <div class="kpis">
        <div class="card kpi"><small>Facturación</small><strong>${eur0(fact)}</strong><span class="d">${nc} cuentas · ${ej?EJEMPLO.llevar:r.llevar.length} para llevar</span></div>
        <div class="card kpi"><small>Pedidos desde la mesa</small><strong>${ped.toLocaleString("es-ES")}</strong></div>
        <div class="card kpi"><small>Ticket medio</small><strong>${nc?eur(fact/nc):"—"}</strong></div>
        <div class="card kpi"><small>Llamadas atendidas</small><strong>${cam.reduce((a,c)=>a+c[1],0)}</strong><span class="d">por los camareros</span></div>
        <div class="card kpi"><small>Tiempo en cocina</small><strong>${coc!=null?mmss(coc*1000):"—"}</strong></div>
        <div class="card kpi"><small>Vendido por sugerencias</small><strong>${eur0(ej?EJEMPLO.sugE:r.sugE)}</strong><span class="d">${ej?EJEMPLO.sugU:r.sugU} uds. sugeridas al pedir</span></div>
        <div class="card kpi"><small>Valoración en la mesa</small><strong>${nota!=null?nota.toLocaleString("es-ES",{maximumFractionDigits:1}):"—"}<span style="font-size:18px;color:#c58a00"> ★</span></strong><span class="d">${nNotas} opiniones</span></div>
      </div>
      <div class="rej">
        <div class="card c8"><h2>Pedidos por hora</h2><p class="ayuda">${picos.length?`Horas punta: ${picos.map(i=>(12+i)+":00").join(" y ")}`:"Sin pedidos todavía"}</p><div class="graf">${barrasV(Array.from({length:12},(_,i)=>(12+i)+"h"),horas,{destacar:picos,tipf:(i,v)=>`${12+i}:00 – ${12+i}:59 · ${v} pedidos`})}</div></div>
        <div class="card c4"><h2>Cómo pagan</h2><p class="ayuda">Cuentas pedidas desde la mesa</p>${pago?`<div style="display:flex;gap:14px;font-size:14px;margin-bottom:6px"><span><i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#d8262f;margin-right:5px"></i>Tarjeta</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#3e7cb1;margin-right:5px"></i>Efectivo</span></div><div style="display:flex;height:34px;border-radius:8px;overflow:hidden;gap:2px">${pago[0]?`<div style="flex:${pago[0]};background:#d8262f;color:#fff;display:flex;align-items:center;padding:0 10px;font-weight:800">${pago[0]} %</div>`:""}${pago[1]?`<div style="flex:${pago[1]};background:#3e7cb1;color:#fff;display:flex;align-items:center;padding:0 10px;font-weight:800">${pago[1]} %</div>`:""}</div>`:`<div class="vacio-ui">Sin cuentas todavía</div>`}
          <h2 style="margin-top:16px">Lo que dicen en la mesa</h2>${comentarios.length?`<ul class="opiniones">${comentarios.map(v=>`<li><span class="st">${estrellasTxt(v.estrellas)}</span><span>${esc(v.comentario)}</span><span style="font-size:12px;color:var(--tinta-3)">Mesa ${v.mesa} · ${hhmm(v.t)}${v.lang&&v.lang!=="es"?" · "+v.lang.toUpperCase():""}</span></li>`).join("")}</ul>`:`<div class="vacio-ui">Aún sin comentarios</div>`}</div>
        <div class="card c6"><h2>Ranking de camareros</h2><p class="ayuda">Mesas que ha cogido cada uno hoy y, si las hay, la media de estrellas de sus mesas.</p><div class="graf">${cam.length?barrasH(cam,{max:Math.max(...cam.map(c=>c[1]))*1.1}):`<div class="vacio-ui">Aún sin mesas cogidas</div>`}</div></div>
        <div class="card c6"><h2>Lo que más se pide</h2><p class="ayuda">Unidades</p><div class="graf">${barrasH(top)}</div></div>
        ${ej?`<div class="card c12"><h2>Facturación media por día de la semana</h2><p class="ayuda">Sábado y domingo, resaltados</p><div class="graf">${barrasV(["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],EJEMPLO.dias,{fmt:v=>eur0(v),destacar:[5,6]})}</div></div>`:""}
      </div>`;
  }
  function textoInforme(dias){
    const r=resumen(dias-1), bar=cfgBar(), hist=((Store.get("config","historial")||{}).dias||[]).slice(-dias);
    const factH=hist.reduce((a,d)=>a+(d.fact||0),0), pedH=hist.reduce((a,d)=>a+(d.pedidos||0),0);
    const fact=Math.max(r.fact,factH), ped=Math.max(r.pedidos.length,pedH);
    const top=Object.entries(r.unidades).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const picos=[...r.horas.keys()].sort((a,b)=>r.horas[b]-r.horas[a]).slice(0,2).filter(i=>r.horas[i]>0);
    const agot=Object.entries(cfgCarta().agotados).filter(([,v])=>v).map(([id])=>P(id)?.n).filter(Boolean);
    const L=[];
    L.push(`📊 *${bar.nombre}* · informe de los últimos ${dias} días`); L.push("");
    L.push(`💶 Facturación: ${eur0(fact)} (${r.cuentas.length} cuentas${r.llevar.length?`, ${r.llevar.length} para llevar`:""})`);
    L.push(`🧾 Pedidos desde la mesa: ${ped}${r.cuentas.length?` · ticket medio ${eur(r.fact/r.cuentas.length)}`:""}`);
    if(r.menus) L.push(`🍽️ Menús del día: ${r.menus}`);
    { const rk=ranking(dias-1).filter(x=>x.mesas>0||x.n>0); L.push(`🏆 Camareros (mesas · nota · llamadas): ${rk.length?rk.map(x=>`${x.c.n} ${x.mesas}${x.nota!=null?" · ★"+notaTxt(x):""} · ${x.n}`).join(" | "):"sin datos"}`); }
    L.push(`👨‍🍳 Tiempo medio en cocina: ${r.cocinaMedia!=null?mmss(r.cocinaMedia):"sin datos"}`);
    if(r.sugU) L.push(`💡 Vendido gracias a sugerencias: ${eur0(r.sugE)} (${r.sugU} uds.)`);
    if(r.notaMedia!=null) L.push(`⭐ Valoración en la mesa: ${r.notaMedia.toLocaleString("es-ES",{maximumFractionDigits:1})}/5 (${r.vals.length} opiniones)`);
    if(picos.length) L.push(`📈 Horas punta: ${picos.map(i=>(12+i)+":00").join(" y ")}`);
    if(top.length){ L.push(""); L.push("🏆 Lo más pedido:"); top.forEach(([n,q],i)=>L.push(`  ${i+1}. ${n} · ${q}`)); }
    if(agot.length){ L.push(""); L.push(`❗ Agotados ahora mismo: ${agot.join(", ")}`); }
    const malas=r.vals.filter(v=>v.estrellas<=2&&v.comentario).slice(0,3); if(malas.length){ L.push(""); L.push("👂 Para revisar:"); malas.forEach(v=>L.push(`  · Mesa ${v.mesa}: «${v.comentario}»`)); }
    L.push(""); L.push(`Generado por ${PLATAFORMA}.`);
    return L.join("\n");
  }
  function informe(){
    const bar={...cfgBar(),...cfgPrivado()}, txt=textoInforme(periodoInf), tel=(bar.telefono||"").replace(/\D/g,""), wa=`https://wa.me/${tel?(tel.length===9?"34"+tel:tel):""}?text=${encodeURIComponent(txt)}`;
    return `<div class="p-cab"><div><h1>Informe para el dueño</h1><p>El resumen listo para mandar por WhatsApp o correo. En la versión final se envía solo cada lunes a las 9:00.</p></div>
      <div class="seg-claro" role="group"><button data-inf="1" aria-pressed="${periodoInf===1}">Hoy</button><button data-inf="7" aria-pressed="${periodoInf===7}">7 días</button><button data-inf="30" aria-pressed="${periodoInf===30}">30 días</button></div></div>
      <div class="rej"><div class="card c8"><textarea class="informe" id="inf" readonly aria-label="Texto del informe">${esc(txt)}</textarea></div>
      <div class="card c4"><h2>Enviar</h2><p class="ayuda">${tel?`Al ${esc(bar.telefono)} (cámbialo en Marca y ajustes).`:"Pon el móvil del dueño en Marca y ajustes para enviárselo directo."}</p>
        <div style="display:grid;gap:8px"><a class="b-ui verde" href="${wa}">${ico("chat")}Enviar por WhatsApp</a>
        <a class="b-ui claro" href="mailto:${esc(bar.email||"")}?subject=${encodeURIComponent("Informe "+bar.nombre)}&body=${encodeURIComponent(txt)}">${ico("mail")}Abrir en el correo</a>
        <button class="b-ui claro" data-copiar-inf>${ico("copy")}Copiar el texto</button></div>
        <p class="ayuda" style="margin-top:12px">Si el correo no se abre desde aquí, usa «Copiar el texto».</p></div></div>`;
  }
  function cartaV(){
    const q=norm(buscar), c=cfgCarta(), todos=carta();
    return `<div class="p-cab"><div><h1>Carta</h1><p>Lo que cambies sale al momento en la carta web, en las mesas y en para llevar.</p></div><input class="campo" id="bc" type="search" placeholder="Buscar plato…" value="${esc(buscar)}" aria-label="Buscar plato"></div>
      <div class="tabla-wrap"><table class="datos"><thead><tr><th>Plato</th><th>Va a</th><th style="text-align:right">Precio</th><th style="text-align:right">Coste · margen</th><th>Alérgenos</th><th>3D</th><th>Disponible hoy</th><th></th></tr></thead><tbody>
      ${c.secciones.map(s=>{ const ps=todos.filter(p=>p.sec===s.id&&(!q||norm(p.n).includes(q))); if(q&&!ps.length) return "";
        return `<tr class="sec"><td colspan="8">${esc(s.n)} <span class="sec-meta">· ${s.dest==="barra"?"barra":"cocina"} · ${ps.length} ${ps.length===1?"plato":"platos"}</span></td></tr>`+(ps.length?ps.map(p=>`<tr class="${agotado(p.id)?"agot":""}"><td><b>${esc(p.n)}</b>${p.top?` <span class="pill" style="font-size:11px">destacado</span>`:""}</td><td>${p.dest==="cocina"?"Cocina":"Barra"}</td>
          <td style="text-align:right;white-space:nowrap"><input class="campo precio-in" type="number" min="0" step="0.1" value="${p.p}" data-precio="${p.id}" aria-label="Precio de ${esc(p.n)}"> €</td>
          <td style="text-align:right;font-size:13px;white-space:nowrap">${(()=>{ const c=costePlato(p); return c>0?`${eur(c)}${p.receta&&p.receta.length?" ·receta":""}<br><span class="pill ${p.p&&(p.p-c)/p.p>=.65?"ok":p.p&&(p.p-c)/p.p>=.4?"aviso":"critico"}">${p.p?Math.round((p.p-c)/p.p*100):0} %</span>`:`<span style="color:var(--tinta-3)">sin coste</span>`; })()}</td>
          <td style="font-size:13px">${p.a.length?p.a.map(k=>ALERGENOS[k]?ALERGENOS[k].n:k).join(", "):"—"}</td><td>${p.modelo?`<span class="pill ok">${ico("check")} 3D</span>`:`<span style="font-size:13px;color:var(--tinta-3)">—</span>`}</td>
          <td><label class="interr"><input type="checkbox" data-disp="${p.id}" ${cfgCarta().agotados[p.id]?"":"checked"}><span class="pista"></span>${cfgCarta().agotados[p.id]?"Agotado":sinStock(p)?"Sin stock":"Sí"}</label></td>
          <td style="white-space:nowrap"><button class="b-ui claro peq-ui" data-edit-plato="${p.id}">Editar</button> <button class="b-ui claro peq-ui" data-quitar-plato="${p.id}">Quitar</button></td></tr>`).join(""):`<tr><td colspan="8" style="color:var(--tinta-3)">Sin platos todavía. Los clientes no ven la sección hasta que tenga alguno.</td></tr>`); }).join("")}
      </tbody></table></div>
      <div class="rej" style="margin-top:14px">
        <div class="card c6"><h2>Añadir plato</h2><p class="ayuda">Aparece al momento. Las traducciones al inglés y al portugués se añaden al editarlo.</p>
          <form class="form-aj" id="f-plato"><label>Nombre<input id="np-n" required maxlength="60"></label><label>Precio (€)<input id="np-p" type="number" min="0" step="0.1" required></label>
          <label style="grid-column:1/-1">Descripción<input id="np-d" maxlength="140"></label>
          <label>Sección<select id="np-s">${c.secciones.map(s=>`<option value="${s.id}">${esc(s.n)}</option>`).join("")}</select></label>
          <div style="grid-column:1/-1;display:grid;gap:6px"><span class="et">Alérgenos</span><div class="al-sel">${Object.entries(ALERGENOS).map(([k,a])=>`<label><input type="checkbox" value="${k}">${a.n}</label>`).join("")}</div></div>
          <div><button class="b-ui rojo" type="submit">Añadir a la carta</button></div></form></div>
        <div class="card c6"><h2>Pegar una carta</h2><p class="ayuda">Para preparar una demo en minutos. Una línea por plato: <code>Sección | Plato | Precio | Descripción</code>. Las secciones que no existan se crean solas (las de bebida van a barra).</p>
          <form class="form-aj" id="f-import" style="grid-template-columns:1fr"><label>Carta<textarea id="imp-txt" placeholder="Entrantes | Croquetas de jamón | 8,50 | 6 unidades&#10;Bebidas | Caña | 2"></textarea></label>
          <label class="check-l"><input type="checkbox" id="imp-sust"> Sustituir toda la carta actual (si no, se añade a la que hay)</label>
          <div><button class="b-ui rojo" type="submit">Importar</button></div></form></div>
        <div class="card c12"><h2>Secciones</h2><p class="ayuda">El destino decide qué pantalla recibe esos platos: cocina o barra. Los cambios se guardan al salir de cada campo.</p>
          <div class="secs-ed">${c.secciones.map((s,i)=>`<div class="sec-ed" data-sid="${s.id}"><input class="campo" data-sec-campo="n" value="${esc(s.n)}" maxlength="40" aria-label="Nombre de la sección"><input class="campo" data-sec-campo="nota" value="${esc(s.nota||"")}" maxlength="80" placeholder="Frase corta (opcional)" aria-label="Frase de la sección">
            <select class="campo" data-sec-campo="dest" aria-label="Destino de ${esc(s.n)}"><option value="cocina" ${s.dest!=="barra"?"selected":""}>Cocina</option><option value="barra" ${s.dest==="barra"?"selected":""}>Barra</option></select>
            <span class="acc-fila"><button class="b-ui claro peq-ui" data-sec-mover="${i}" data-dir="-1" ${i?"":"disabled"} aria-label="Subir ${esc(s.n)}">↑</button><button class="b-ui claro peq-ui" data-sec-mover="${i}" data-dir="1" ${i<c.secciones.length-1?"":"disabled"} aria-label="Bajar ${esc(s.n)}">↓</button><button class="b-ui claro peq-ui" data-quitar-sec="${s.id}">Quitar</button></span></div>`).join("")}</div>
          <form id="f-sec" class="acc-fila" style="margin-top:12px"><input class="campo" id="ns-n" placeholder="Nueva sección" maxlength="40" required aria-label="Nombre de la nueva sección"><select class="campo" id="ns-d" aria-label="Destino"><option value="cocina">Cocina</option><option value="barra">Barra</option></select><button class="b-ui" type="submit">Añadir sección</button></form></div>
      </div>
      ${editPlato?hojaPlato(editPlato):""}`;
  }
  function filaReceta(r={}){ return `<div class="rec-fila"><select class="campo" data-rec-a aria-label="Ingrediente">${optArt(r.a)}</select><input class="campo precio-in" type="number" min="0" step="any" data-rec-q value="${r.q??""}" aria-label="Cantidad"><span class="ud">${r.a&&ART(r.a)?ART(r.a).ud:""}</span><button type="button" class="b-ui claro peq-ui" data-quitar-rec aria-label="Quitar ingrediente">×</button></div>`; }
  function hojaPlato(id){
    const p=cfgCarta().platos.find(x=>x.id===id); if(!p){ editPlato=null; return ""; }
    return `<div class="hoja-fondo" data-cerrar><div class="hoja ui hoja-ancha" role="dialog" aria-label="Editar ${esc(p.n)}"><div class="asa"></div><h3 style="font-family:var(--display);color:var(--rojo);margin:0;font-size:24px">Editar plato</h3>
      <form class="form-aj" id="f-edit-plato">
        <label>Nombre<input id="ep-n" value="${esc(p.n)}" maxlength="60" required></label>
        <label>Precio (€)<input id="ep-p" type="number" min="0" step="0.1" value="${+p.p||0}" required></label>
        <label style="grid-column:1/-1">Descripción<input id="ep-d" value="${esc(p.d||"")}" maxlength="140"></label>
        <label>Sección<select id="ep-s">${secciones().map(s=>`<option value="${s.id}" ${s.id===p.sec?"selected":""}>${esc(s.n)}</option>`).join("")}</select></label>
        <label>Unidad (opcional)<input id="ep-u" value="${esc(p.u||"")}" maxlength="20" placeholder="ración, 6 uds…"></label>
        <label>Foto (enlace a la imagen)<input id="ep-foto" value="${esc(p.foto||"")}" maxlength="400" placeholder="https://…/plato.jpg"></label>
        <label>Etiqueta (opcional)<input id="ep-etq" value="${esc(p.etq||"")}" maxlength="30" placeholder="¡Nuevo!"></label>
        <label class="check-l"><input type="checkbox" id="ep-top" ${p.top?"checked":""}> Destacado en «Lo que más se pide»</label>
        <div style="grid-column:1/-1;display:grid;gap:6px"><span class="et">Alérgenos</span><div class="al-sel">${Object.entries(ALERGENOS).map(([k,a])=>`<label><input type="checkbox" value="${k}" ${(p.a||[]).includes(k)?"checked":""}>${a.n}</label>`).join("")}</div></div>
        <label>Coste (€) si no tiene receta<input id="ep-coste" type="number" min="0" step="0.01" value="${+p.coste||""}" placeholder="0,00"></label>
        <div style="grid-column:1/-1;display:grid;gap:6px"><span class="et">Receta (escandallo): lo que gasta del inventario cada unidad vendida</span>
          <div id="ep-receta" class="receta">${(p.receta||[]).map(r=>filaReceta(r)).join("")}</div>
          <div class="acc-fila"><button type="button" class="b-ui claro peq-ui" data-add-rec>+ Ingrediente</button><span class="ayuda" style="margin:0">${articulos().length?`Coste con receta: <b>${eur(costePlato(p))}</b> · margen ${p.p?Math.round((p.p-costePlato(p))/p.p*100):0} %`:"Crea antes los artículos en Inventario."}</span></div></div>
        <label>Nombre en inglés<input id="ep-en-n" value="${esc(p.en&&p.en[0]||"")}" maxlength="60"></label><label>Descripción en inglés<input id="ep-en-d" value="${esc(p.en&&p.en[1]||"")}" maxlength="140"></label>
        <label>Nombre en portugués<input id="ep-pt-n" value="${esc(p.pt&&p.pt[0]||"")}" maxlength="60"></label><label>Descripción en portugués<input id="ep-pt-d" value="${esc(p.pt&&p.pt[1]||"")}" maxlength="140"></label>
        <div class="acc-fila" style="grid-column:1/-1"><button class="b-ui rojo" type="submit">${ico("check")}Guardar</button><button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div>
      </form></div></div>`;
  }
  function menuV(){
    const m=cfgMenu();
    return `<div class="p-cab"><div><h1>Menú del día</h1><p>Cámbialo cada mañana: sale arriba en la carta web y como primera sección en las mesas.</p></div>
      <label class="interr"><input type="checkbox" id="mn-activo" ${m.activo?"checked":""}><span class="pista"></span>${m.activo?"Se está mostrando":"Oculto"}</label></div>
      <div class="card"><form class="form-aj" id="f-menu">
        <label>Precio (€)<input id="mn-precio" type="number" min="0" step="0.5" value="${m.precio}"></label>
        <label>Cuándo<input id="mn-cuando" value="${esc(m.cuando)}" maxlength="60"></label>
        <label style="grid-column:1/-1">Incluye<input id="mn-incluye" value="${esc(m.incluye)}" maxlength="140"></label>
        <label>Primeros (uno por línea)<textarea id="mn-1">${esc(m.primeros.join("\n"))}</textarea></label>
        <label>Segundos (uno por línea)<textarea id="mn-2">${esc(m.segundos.join("\n"))}</textarea></label>
        <label>Postres (uno por línea)<textarea id="mn-3">${esc(m.postres.join("\n"))}</textarea></label>
        <div style="grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap"><button class="b-ui rojo" type="submit">${ico("check")}Publicar menú de hoy</button><a class="b-ui claro" href="#carta">Ver cómo queda en la carta</a></div>
      </form></div>`;
  }
  function rendimientoBase(){
    const per=[[0,"Hoy"],[6,"7 días"],[29,"30 días"],[364,"1 año"]], t0=inicioDia(perRend), rk=ranking(perRend), total=rk.reduce((a,x)=>a+x.n,0), totalM=rk.reduce((a,x)=>a+x.mesas,0);
    const fs=Store.all("fichajes").filter(f=>f.ini>=t0).sort((a,b)=>b.ini-a.ini), medalla=["🥇","🥈","🥉"];
    const resu=cams().map(c=>{ const m=fs.filter(f=>f.cam===c.id), dias=new Set(m.map(diaFich)).size, trab=m.reduce((a,f)=>a+trabajadoMs(f),0), pau=m.reduce((a,f)=>a+pausadoMs(f,f.fin||ahora()),0), prev=dias*jornadaDe(c.id)*3600000;
      return {c,n:m.length,dias,trab,pau,prev,dif:trab-prev}; });
    const fila=f=>{ const c=cams().find(x=>x.id===f.cam), abierto=!f.fin;
      return `<tr><td><b>${esc(c?c.n:f.cam)}</b></td><td>${new Date(f.ini).toLocaleDateString("es-ES",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</td><td>${hhmm(f.ini)}</td><td>${abierto?`<span class="pill ${enPausa(f)?"aviso":"ok"}">${enPausa(f)?"en pausa":"fichado"}</span>`:hhmm(f.fin)}</td><td>${(f.pausas||[]).length}</td><td>${abierto&&enPausa(f)?cronPausa(f):horasTxt(pausadoMs(f,f.fin||ahora()))}</td><td>${abierto?cron(f):horasTxt(trabajadoMs(f))}</td><td>${abierto?`<button class="b-ui claro peq-ui" data-fich-cerrar="${f.id}">Cerrar fichaje</button>`:""}</td></tr>`; };
    return `<div class="p-cab"><div><h1>Camareros</h1><p>Ranking de mesas, valoración media, registro de jornada y balance de horas.</p></div>
      <div class="seg-claro" role="group">${per.map(([d,n])=>`<button data-perr="${d}" aria-pressed="${perRend===d}">${n}</button>`).join("")}</div></div>
      <div class="card" style="margin-bottom:14px"><h2>Balance de horas</h2><p class="ayuda">Horas trabajadas (sin pausas) menos las que tocaban: la jornada diaria de cada uno por los días que ha fichado. <span class="pos">Verde</span> = horas de más · <span class="neg">rojo</span> = horas de menos.</p>
        <div class="tabla-wrap" style="border:0"><table><thead><tr><th>Camarero</th><th>Días</th><th>Jornada diaria (h)</th><th>Previstas</th><th>Trabajadas</th><th>Pausas</th><th>Balance</th></tr></thead><tbody>${resu.map(x=>`<tr><td><i class="dot" style="background:${x.c.color}"></i> <b>${esc(x.c.n)}</b></td><td>${x.dias}</td><td><input type="number" min="0" max="24" step="0.25" value="${jornadaDe(x.c.id)}" data-jornada="${x.c.id}" style="width:80px" aria-label="Jornada diaria de ${esc(x.c.n)}"></td><td>${x.n?horasTxt(x.prev):"—"}</td><td>${x.n?horasTxt(x.trab):"—"}</td><td>${x.n?horasTxt(x.pau):"—"}</td><td>${x.n?`<span class="${x.dif>=0?"pos":"neg"}">${difTxt(x.dif)}</span>`:"—"}</td></tr>`).join("")}</tbody></table></div></div>
      <div class="rej"><div class="card c6"><h2>Ranking de camareros</h2><p class="ayuda">${totalM?`${totalM} ${totalM===1?"mesa cogida":"mesas cogidas"} · ${total} llamadas atendidas.`:"Aún no hay mesas cogidas en este periodo."} La nota es la media (1–5) de las valoraciones que dejan los clientes de sus mesas.</p>
        <div class="tabla-wrap" style="border:0"><table><thead><tr><th>#</th><th>Camarero</th><th>Mesas</th><th>Valoración</th><th>Llamadas</th></tr></thead><tbody>${rk.map((x,i)=>`<tr><td>${x.mesas&&i<3?medalla[i]:i+1}</td><td><i class="dot" style="background:${x.c.color}"></i> <b>${esc(x.c.n)}</b></td><td><b>${x.mesas}</b></td><td>${x.nota==null?"—":`<b>${notaTxt(x)}</b> <span style="color:#c58a00">★</span> <small>(${x.nVal})</small>`}</td><td>${x.n}</td></tr>`).join("")}</tbody></table></div></div>
        <div class="card c6"><h2>Registro de jornada</h2><p class="ayuda">Obligatorio por ley: se conserva 4 años y no se borra con «Borrar datos de prueba». Descárgalo para una inspección o para la gestoría.</p><button class="b-ui" data-csv>Descargar registro (CSV)</button></div></div>
      <div class="card" style="margin-top:14px"><h2>Entradas y salidas</h2>${fs.length?`<div class="tabla-wrap" style="border:0"><table><thead><tr><th>Camarero</th><th>Día</th><th>Entrada</th><th>Salida</th><th>Pausas</th><th>Tiempo en pausa</th><th>Trabajado</th><th></th></tr></thead><tbody>${fs.slice(0,300).map(fila).join("")}</tbody></table></div>`:`<div class="vacio-ui">Nadie ha fichado en este periodo. Se ficha en el panel de cocina o de barra.</div>`}</div>`;
  }
  function turnoV(){
    const t=cfgTurno(), N=mesasN();
    return `<div class="p-cab"><div><h1>Turno</h1><p>Las mesas no están asignadas: cualquier camarero puede atender cualquier mesa. Quien la coge con «Yo me encargo» (o al aceptar su pedido) queda como su camarero y el cliente ve su nombre. Si en tu local cada uno lleva sus mesas, se organizan entre vosotros.</p></div></div>
      <div class="camareros">${cams().map(c=>{ const ms=Array.from({length:N},(_,i)=>i+1).filter(n=>camDe(n)===c.id); const act=t.activos[c.id]!==false;
        return `<div class="card cam-c"><div class="nom"><span><i class="dot" style="background:${c.color}"></i>${esc(c.n)}</span><label class="interr"><input type="checkbox" data-activo="${c.id}" ${act?"checked":""}><span class="pista"></span>${act?"En turno":"Libra"}</label></div><span style="font-size:14px;color:var(--tinta-2)">${act?(ms.length?`Ahora lleva ${ms.length} ${ms.length===1?"mesa":"mesas"}: ${resumirMesas(ms)}`:"Sin mesas ahora"):"Hoy no trabaja"}</span></div>`; }).join("")}</div>
      <div class="card"><h2>Avisos sin atender</h2><p class="ayuda">Para que ninguna mesa se quede esperando.</p><label style="display:flex;flex-wrap:wrap;gap:8px;align-items:center" for="escala">Si nadie contesta en <input class="campo" id="escala" type="number" min="15" max="300" step="15" value="${t.escala}" style="width:80px;text-align:right"> segundos, el aviso se marca como urgente.</label></div>`;
  }
  function nfcV(){
    const N=mesasN(), faltan=Array.from({length:N},(_,i)=>i+1).filter(n=>!tokenDe(n)).length, r=cfgReglas();
    return `<div class="p-cab"><div><h1>Tarjetas NFC</h1><p>Cada mesa tiene su enlace con un código secreto. Grábalo en la tarjeta NFC de la mesa (o imprímelo como código QR).</p></div><div class="acc-fila"><button class="b-ui" data-copiar-todo>${ico("copy")}Copiar todos</button>${faltan?`<button class="b-ui rojo" data-gen-nfc>Crear los ${faltan} que faltan</button>`:""}</div></div>
      <div class="rej" style="margin-bottom:14px">
        <div class="card c6"><h2>Así nadie pide desde fuera del local</h2><ol class="lista-num">
          <li>El enlace lleva un código secreto: no se adivina cambiando el número de mesa.</li>
          <li>${r.validar?"Cada pedido entra «por confirmar»: sala comprueba que hay gente en la mesa antes de que llegue a cocina.":"El primer pedido de una mesa libre siempre lo confirma sala; los siguientes van directos (Reglas › Confirmar cada pedido está apagado)."}</li>
          <li>Límite de pedidos por minuto en cada mesa y precios recalculados con la carta al aceptar: nadie puede pedir en masa ni cambiar precios.</li>
          <li>Si alguien se ha llevado o copiado una tarjeta, cambia su enlace: el antiguo deja de funcionar al momento.</li></ol></div>
        <div class="card c6"><h2>Cómo grabarlas con el móvil</h2><ol class="lista-num"><li>Instala una app para escribir NFC (por ejemplo NFC Tools).</li><li>Elige <b>Escribir › Añadir registro › URL</b> y pega el enlace de la mesa.</li><li>Acerca la tarjeta a la parte trasera del móvil hasta que confirme.</li><li>Pruébala: al acercar un móvil debe abrirse su mesa.</li></ol></div>
      </div>
      <ul class="nfc-lista">${Array.from({length:N},(_,i)=>i+1).map(n=>{ const u=enlaceMesa(n); return `<li><b>${n}</b><div style="min-width:0"><code>${u?esc(u):"Sin enlace todavía"}</code><span style="font-size:12px;color:var(--tinta-3)">${zonaDe(n)} · ${esc(nomCam(camDe(n)))}</span></div><span class="acc-fila">${u?`<a class="b-ui claro peq-ui" href="${hashMesa(n)}">Probar</a><button class="b-ui claro peq-ui" data-copiar="${n}" aria-label="Copiar el enlace de la mesa ${n}">${ico("copy")}</button><button class="b-ui claro peq-ui" data-regen="${n}">Cambiar</button>`:""}</span></li>`; }).join("")}</ul>
      <div class="card" style="margin-top:14px"><h2>Cambiar todos los enlaces</h2><p class="ayuda">Las tarjetas actuales dejarán de funcionar y habrá que grabarlas de nuevo. Úsalo al dar de alta un local con tarjetas recicladas.</p><button class="b-ui claro" data-regen-todos>Cambiar todos los enlaces</button></div>`;
  }
  function ajustesV(){
    const b=cfgBar(), pr=cfgPrivado();
    return `<div class="p-cab"><div><h1>Marca y ajustes</h1><p>Todo lo que cambia de un restaurante a otro. Se aplica al momento en todas las pantallas.</p></div></div>
      <form class="card" id="f-legal"><h2>Datos legales del titular</h2><p class="ayuda">Salen en el aviso legal y en la política de privacidad que ven los clientes (pie de las pantallas). Pon los del negocio que figura en la factura.</p>
        <div class="form-aj">
          <label>Razón social o nombre y apellidos<input id="lg-razon" value="${esc(cfgLegal().razon)}" maxlength="100"></label>
          <label>NIF / CIF<input id="lg-nif" value="${esc(cfgLegal().nif)}" maxlength="20"></label>
          <label>Domicilio<input id="lg-dom" value="${esc(cfgLegal().domicilio)}" maxlength="140"></label>
          <label>Correo para derechos de privacidad<input id="lg-email" type="email" value="${esc(cfgLegal().email)}" maxlength="80"></label>
          <label>Teléfono<input id="lg-tel" value="${esc(cfgLegal().telefono)}" maxlength="30"></label>
        </div><button class="b-ui" type="submit">Guardar datos legales</button> ${!cfgLegal().razon||!cfgLegal().nif||!cfgLegal().domicilio||!cfgLegal().email?`<span class="pill aviso">Faltan datos obligatorios</span>`:`<span class="pill ok">Completos</span>`}
        <p class="ayuda" style="margin-top:8px"><a href="#aviso-legal" target="_blank">Aviso legal</a> · <a href="#privacidad" target="_blank">Privacidad</a> · <a href="#cookies" target="_blank">Cookies</a> · <a href="#registro-jornada" target="_blank">Registro de jornada</a></p></form>
      <form class="card" id="f-bar"><h2>Identidad</h2><p class="ayuda">Nombre, logo, colores y estilo de la carta y de las mesas.</p>
        <div class="form-aj">
          <label>Nombre del restaurante<input id="aj-nombre" value="${esc(b.nombre)}" maxlength="40" required></label>
          <label>Ciudad<input id="aj-ciudad" value="${esc(b.ciudad)}" maxlength="40"></label>
          <label style="grid-column:1/-1">Frase de bienvenida<input id="aj-eslogan" value="${esc(b.eslogan||"")}" maxlength="80"></label>
          <label>Color principal<input id="aj-color" type="color" value="${hexOk(b.color)?b.color:BAR_DEF.color}"></label>
          <label>Color de acento<input id="aj-color2" type="color" value="${hexOk(b.color2)?b.color2:BAR_DEF.color2}"></label>
          <label>Estilo<select id="aj-estilo">${Object.entries(ESTILOS).map(([k,v])=>`<option value="${k}" ${b.estilo===k?"selected":""}>${v}</option>`).join("")}</select></label>
          <div class="logo-ed" style="grid-column:1/-1"><div class="logo-prev">${logoHTML("")}</div><label class="b-ui claro" for="aj-logo" style="cursor:pointer">${b.logo?"Cambiar logo":"Subir logo"}</label><input id="aj-logo" type="file" accept="image/*" class="oculto">${b.logo?`<button type="button" class="b-ui claro" data-quitar-logo>Quitar logo</button>`:""}<span class="ayuda" style="margin:0">PNG o JPG, mejor con fondo transparente. Se reduce solo.</span></div>
          <label style="grid-column:1/-1">Enlace de reseñas de Google (opcional)<input id="aj-google" value="${esc(b.google||"")}" placeholder="https://g.page/r/…"></label>
        </div>
        <h2 style="margin-top:18px">Sala</h2>
        <div class="form-aj">
          <label>Número de mesas<input id="aj-mesas" type="number" min="1" max="99" value="${b.mesas}"></label>
          <label>Interior hasta la mesa<input id="aj-int" type="number" min="0" max="99" value="${b.interiorHasta}"></label>
          <div style="grid-column:1/-1"><h2 style="margin:6px 0">Camareros</h2><div style="display:grid;gap:8px" id="aj-cams">${b.camareros.map(c=>`<div class="cam-edit" data-cid="${c.id}"><input type="color" value="${c.color}" aria-label="Color de ${esc(c.n)}"><input value="${esc(c.n)}" maxlength="20" aria-label="Nombre del camarero"><button type="button" class="b-ui claro" data-quitar-cam="${c.id}" ${b.camareros.length<2?"disabled":""}>Quitar</button></div>`).join("")}</div>
          <button type="button" class="b-ui claro" data-add-cam style="margin-top:8px">+ Añadir camarero</button></div>
        </div>
        <h2 style="margin-top:18px">Contacto del dueño</h2><p class="ayuda">Solo lo ve el personal. Sirve para mandar el informe.</p>
        <div class="form-aj">
          <label>Móvil<input id="aj-tel" type="tel" value="${esc(pr.telefono)}" placeholder="600 000 000"></label>
          <label>Correo<input id="aj-email" type="email" value="${esc(pr.email)}"></label>
        </div>
        <div style="margin-top:16px"><button class="b-ui rojo" type="submit">${ico("check")}Guardar ajustes</button></div>
      </form>`;
  }
  function reglasV(){
    const r=cfgReglas(), m=cfgMenu();
    const fila=(k,t,d)=>`<div class="regla"><div><b>${t}</b><p>${d}</p></div><label class="interr"><input type="checkbox" data-regla="${k}" ${r[k]?"checked":""}><span class="pista"></span>${r[k]?"Sí":"No"}</label></div>`;
    return `<div class="p-cab"><div><h1>Reglas del restaurante</h1><p>Cómo funciona este local. Se aplica al momento en todas las pantallas.</p></div></div>
      <div class="card reglas">
        ${fila("validar","Confirmar cada pedido antes de cocina","El pedido del cliente entra «por confirmar». Sala comprueba que hay gente en la mesa y lo acepta o lo rechaza. Si lo apagas, solo se confirma el primer pedido de cada mesa libre; los siguientes van directos a cocina y barra.")}
        ${fila("llevar","Pedidos para llevar","Los clientes pueden pedir desde la web y recoger con un código.")}
        ${fila("valorar","Pedir valoración con la cuenta","Estrellas y comentario al pedir la cuenta. Aparecen en el resumen.")}
        ${fila("sugerir","Venta sugerida","Al pedir, propone bebida, algo para picar o postre según lo que lleve el cliente.")}
        ${fila("agotarSinStock","Agotar solo lo que no tiene stock","Si falta algún ingrediente de su receta en el inventario, el plato sale como agotado en la carta y en las mesas.")}
      </div>
      <div class="card" style="margin-top:14px"><h2>Otras reglas</h2><p class="ayuda" style="margin:0">El menú del día se activa en su pestaña (ahora ${m.activo?"se muestra":"está oculto"}). El tiempo para que un aviso salte a todos los camareros está en Turno y mesas (${cfgTurno().escala} s).</p></div>`;
  }
  async function cargarEquipo(){ cargandoEquipo=true; try{ const {data,error}=await Store.sb.rpc("equipo",{p_tenant:TENANT}); if(error) throw error; equipo=data||[]; }catch(e){ equipo=[]; toast("No se ha podido cargar el equipo."); } cargandoEquipo=false; pintar(true); }
  function soporteV(){
    const msgs=Store.all("chat").sort((a,b)=>a.t-b.t);
    return `<div class="p-cab"><div><h1>Soporte ${PLATAFORMA}</h1><p>Escríbenos aquí cualquier duda o problema. Te respondemos en este mismo chat, en directo.</p></div></div>
      <div class="card chat-card">${chatHTML(msgs,"bar")}<form class="chat-in" id="f-chat"><input class="campo" id="chat-txt" maxlength="600" placeholder="Escribe tu mensaje…" autocomplete="off" aria-label="Mensaje para soporte"><button class="b-ui rojo" type="submit">Enviar</button></form></div>`;
  }
  // ===== Pestañas de negocio del panel: pedidos, reservas, economía y caja, inventario, compras, equipo, cuenta =====
  let fPed="todos", qPed="", diaRes=fechaISO(), perEco="hoy", ordEco="q", catInv="", qInv="", hojaNeg=null, perInv="7";
  const pillE = (c,t) => `<span class="pill ${c}">${esc(t)}</span>`;
  const optArt = sel => `<option value="">Elige artículo…</option>${articulos().map(a=>`<option value="${a.id}" ${a.id===sel?"selected":""}>${esc(a.n)} (${a.ud})</option>`).join("")}`;
  // --- Pedidos ---
  function pedidosV(){
    const q=norm(qPed), ps=Store.all("pedidos").filter(p=>p.t>=inicioDia()||!["servido","rechazado"].includes(estadoTxt(p)))
      .filter(p=>fPed==="todos"||estadoTxt(p)===fPed).filter(p=>!q||norm(lugar(p)+" "+(p.nombre||"")+" "+p.items.map(x=>x.n).join(" ")).includes(q)).sort((a,b)=>b.t-a.t);
    const cuenta=k=>Store.all("pedidos").filter(p=>p.t>=inicioDia()&&estadoTxt(p)===k).length;
    const F=[["todos","Todos"],["confirmar","Por confirmar"],["cocina","En cocina/barra"],["listo","Listos"],["servido","Servidos"],["rechazado","Rechazados"]];
    return `<div class="p-cab"><div><h1>Pedidos</h1><p>Todo lo que se ha pedido hoy (y lo que sigue en marcha), en vivo.</p></div><input class="campo" id="q-ped" type="search" placeholder="Buscar mesa, cliente o plato…" value="${esc(qPed)}" aria-label="Buscar pedido"></div>
      <div class="seg-claro" role="group" style="margin-bottom:12px;flex-wrap:wrap">${F.map(([k,t])=>`<button data-fped="${k}" aria-pressed="${fPed===k}">${t}${k!=="todos"?` · ${cuenta(k)}`:""}</button>`).join("")}</div>
      <div class="tabla-wrap"><table class="datos"><thead><tr><th>Hora</th><th>Dónde</th><th>Pedido</th><th style="text-align:right">Total</th><th>Estado</th><th>Tiempos</th><th></th></tr></thead><tbody>
      ${ps.map(p=>{ const e=estadoTxt(p), tot=p.items.reduce((s,x)=>s+x.p*x.q,0), espera=p.aceptado?p.aceptado.t-p.t:null, coc=p.listoT&&p.aceptado?p.listoT-p.aceptado.t:null;
        return `<tr><td>${hhmm(p.t)}</td><td><b>${esc(lugar(p))}</b>${p.llevar?`<br><small>${esc(p.nombre)} · ${esc(p.hora)}</small>`:""}</td><td style="max-width:340px">${p.items.map(x=>`${x.q}× ${esc(x.n)}`).join(", ")}${p.nota?`<br><small>«${esc(p.nota)}»</small>`:""}</td><td style="text-align:right">${eur(tot)}</td>
          <td>${pillE(...{confirmar:["aviso","Por confirmar"],cocina:["","En cocina/barra"],listo:["ok","Listo"],servido:["ok","Servido"],rechazado:["critico","Rechazado"]}[e])}${p.aceptado&&p.aceptado.por?`<br><small>${esc(p.aceptado.por==="auto"?"automático":nomCam(p.aceptado.por)===p.aceptado.por?p.aceptado.por:nomCam(p.aceptado.por))}</small>`:""}</td>
          <td><small>${espera!=null?`confirmado en ${mmss(espera)}`:e==="confirmar"?`esperando <span data-desde="${p.t}">${mmss(ahora()-p.t)}</span>`:""}${coc!=null?`<br>cocina ${mmss(coc)}`:""}</small></td><td>${e==="confirmar"?botonesValidar(p.id):""}</td></tr>`; }).join("")||`<tr><td colspan="7" style="color:var(--tinta-3)">No hay pedidos con este filtro.</td></tr>`}
      </tbody></table></div>`;
  }
  function estadoTxt(p){ const e=estadoPedido(p); return e<0?"rechazado":e===0?"confirmar":e===1?"cocina":e===2?"listo":"servido"; }
  // --- Reservas ---
  function reservasV(){
    const c=cfgReservas(), rs=reservasDe(diaRes), activas=rs.filter(r=>["pendiente","confirmada","sentada"].includes(r.estado)), pend=Store.all("reservas").filter(r=>r.estado==="pendiente").sort((a,b)=>(a.fecha+a.hora).localeCompare(b.fecha+b.hora)), oc=ocupacion(diaRes);
    const fila=r=>`<tr><td><b>${esc(r.hora)}</b></td><td><b>${esc(r.nombre)}</b><br><small>${esc(r.tel||"")}${r.email?` · ${esc(r.email)}`:""}</small></td><td style="text-align:right">${r.personas}</td>
      <td><select class="campo" data-res-mesa="${r.id}" aria-label="Mesa de ${esc(r.nombre)}"><option value="">—</option>${Array.from({length:mesasN()},(_,i)=>i+1).map(n=>`<option ${+r.mesa===n?"selected":""}>${n}</option>`).join("")}</select></td>
      <td>${r.origen==="web"?"Web":"Teléfono"}${r.nota?`<br><small>«${esc(r.nota)}»</small>`:""}</td><td>${pillE(...(ESTADOS_RES[r.estado]||["",r.estado]))}</td><td>${botonesReserva(r)}${["pendiente","confirmada"].includes(r.estado)?` <button class="b-ui claro peq-ui" data-res="${r.id}" data-est="cancelada">Cancelar</button>`:""}</td></tr>`;
    return `<div class="p-cab"><div><h1>Reservas</h1><p>Las que llegan por la web y las que apuntas por teléfono, en tiempo real. El cliente ve la respuesta en su móvil.</p></div><a class="b-ui claro" href="#reservar" target="_blank" rel="noopener">${ico("calendar")}Ver la página de reservas</a></div>
      ${pend.length?`<div class="card ent-card" style="margin-bottom:14px"><h2>Esperando respuesta · ${pend.length}</h2><div class="tabla-wrap" style="border:0"><table class="datos" style="min-width:0"><tbody>${pend.map(r=>`<tr><td><b>${r.fecha===fechaISO()?"Hoy":esc(fechaLarga(r.fecha))}</b> ${esc(r.hora)}</td><td>${esc(r.nombre)} · ${esc(r.tel||"")}</td><td>${r.personas} pers.</td><td>${botonesReserva(r)}</td></tr>`).join("")}</tbody></table></div></div>`:""}
      <div class="dia-sel"><button class="b-ui claro peq-ui" data-dia="-1" aria-label="Día anterior">‹</button><input class="campo" type="date" id="dia-res" value="${diaRes}"><button class="b-ui claro peq-ui" data-dia="1" aria-label="Día siguiente">›</button><button class="b-ui claro peq-ui" data-dia="0">Hoy</button>
        <span class="pill">${activas.length} reservas · ${activas.reduce((s,r)=>s+(+r.personas||0),0)} personas</span></div>
      <div class="ocupa">${horasReserva().map(h=>{ const n=+oc[h]||0, p=Math.min(100,Math.round(n/(+c.aforo||1)*100)); return `<div title="${h}: ${n} de ${c.aforo} personas"><span style="height:${p}%" class="${p>=100?"lleno":p>=75?"casi":""}"></span><small>${h}</small></div>`; }).join("")}</div>
      <div class="tabla-wrap" style="margin-bottom:14px"><table class="datos"><thead><tr><th>Hora</th><th>Cliente</th><th style="text-align:right">Pers.</th><th>Mesa</th><th>Origen</th><th>Estado</th><th></th></tr></thead><tbody>${rs.map(fila).join("")||`<tr><td colspan="7" style="color:var(--tinta-3)">Sin reservas este día.</td></tr>`}</tbody></table></div>
      <div class="rej">
        <form class="card c6" id="f-res-tel"><h2>Nueva reserva por teléfono</h2><p class="ayuda">Queda confirmada al momento.</p><div class="form-aj">
          <label>Nombre<input id="rt-nombre" maxlength="60" required></label><label>Teléfono<input id="rt-tel" type="tel" maxlength="20" required></label>
          <label>Día<input id="rt-fecha" type="date" value="${diaRes}" required></label><label>Hora<input id="rt-hora" type="time" value="${horasReserva()[0]||"21:00"}" required></label>
          <label>Personas<input id="rt-personas" type="number" min="1" max="60" value="2" required></label><label>Mesa (opcional)<select id="rt-mesa"><option value="">—</option>${Array.from({length:mesasN()},(_,i)=>i+1).map(n=>`<option>${n}</option>`).join("")}</select></label>
          <label style="grid-column:1/-1">Nota<input id="rt-nota" maxlength="140"></label><div><button class="b-ui rojo" type="submit">Apuntar reserva</button></div></div></form>
        <form class="card c6" id="f-res-cfg"><h2>Cómo se reserva por la web</h2><div class="form-aj">
          <label class="check-l" style="grid-column:1/-1"><input type="checkbox" id="rc-activo" ${c.activo?"checked":""}> Aceptar reservas por la web</label>
          <label style="grid-column:1/-1">Horario (franjas separadas por comas)<input id="rc-franjas" value="${esc(c.franjas)}" placeholder="13:00-16:00, 20:00-23:30"></label>
          <label>Cada (minutos)<input id="rc-paso" type="number" min="10" max="120" step="5" value="${c.paso}"></label><label>Aforo por hora (personas)<input id="rc-aforo" type="number" min="1" max="500" value="${c.aforo}"></label>
          <label>Máximo por reserva<input id="rc-max" type="number" min="1" max="30" value="${c.maxPersonas}"></label><label>Con cuántos días de antelación<input id="rc-ant" type="number" min="1" max="120" value="${c.antelacion}"></label>
          <label class="check-l" style="grid-column:1/-1"><input type="checkbox" id="rc-auto" ${c.auto?"checked":""}> Confirmar solas las que quepan en el aforo</label>
          <div><button class="b-ui rojo" type="submit">Guardar</button></div></div></form>
      </div>`;
  }
  // --- Economía y caja ---
  function economiaV(){
    const e=economia(perEco), orden={q:(a,b)=>b.q-a.q,ing:(a,b)=>b.ing-a.ing,ben:(a,b)=>b.ben-a.ben,margen:(a,b)=>b.margen-a.margen}[ordEco], lista=e.lista.slice().sort(orden);
    const vend=e.lista.slice().sort((a,b)=>b.q-a.q), enMesa=Store.all("mesas").filter(m=>m.abierta).reduce((s,m)=>s+totalMesa(m),0);
    const diasK=Object.keys(e.dias).sort(), pct=v=>(v*100).toLocaleString("es-ES",{maximumFractionDigits:0})+" %";
    return `<div class="p-cab"><div><h1>Economía y caja</h1><p>Lo cobrado, lo que cuesta y lo que deja cada producto. Los datos salen de las cuentas cobradas.</p></div>
      <div class="seg-claro" role="group">${Object.entries(PERIODOS).map(([k,t])=>`<button data-per="${k}" aria-pressed="${perEco===k}">${t}</button>`).join("")}</div></div>
      <div class="kpis">
        <div class="card kpi"><small>Facturación</small><strong>${eur(e.fact)}</strong><span class="d">${e.cuentas.length} cuentas${perEco==="hoy"&&enMesa?` · ${eur(enMesa)} aún en mesa`:""}</span></div>
        <div class="card kpi"><small>Coste de producto</small><strong>${eur(e.coste)}</strong><span class="d">${e.fact?pct(e.coste/e.fact)+" de las ventas":"—"}</span></div>
        <div class="card kpi"><small>Beneficio bruto</small><strong style="color:${e.ben>=0?"var(--ok)":"var(--critico)"}">${eur(e.ben)}</strong><span class="d">margen ${e.fact?pct(e.ben/e.fact):"—"}</span></div>
        <div class="card kpi"><small>Ticket medio</small><strong>${e.cuentas.length?eur(e.ticket):"—"}</strong></div>
        <div class="card kpi"><small>Unidades vendidas</small><strong>${e.lista.reduce((s,x)=>s+x.q,0)}</strong><span class="d">${e.lista.length} productos distintos</span></div>
      </div>
      ${e.sinCoste.length?`<div class="aviso-ui">${ico("euro")} Sin coste: ${e.sinCoste.slice(0,6).map(esc).join(", ")}${e.sinCoste.length>6?"…":""}. Pon su coste o su receta en Carta › Editar para ver el beneficio real.</div>`:""}
      <div class="rej">
        <div class="card c8"><h2>Caja</h2><p class="ayuda">${PERIODOS[perEco]}: por forma de pago.</p>
          <div class="pagos">${Object.entries(e.pagos).map(([f,v])=>`<div><small>${esc(f)}</small><b>${eur(v)}</b></div>`).join("")||`<p class="ayuda">Todavía no hay cuentas cobradas.</p>`}</div>
          ${diasK.length>1?`<div class="graf" style="margin-top:12px">${barrasV(diasK.map(d=>d.slice(8)+"/"+d.slice(5,7)),diasK.map(d=>Math.round(e.dias[d])),{fmt:v=>eur0(v),tipf:(i,v)=>`${diasK[i]} · ${eur0(v)}`})}</div>`:""}</div>
        <div class="card c4"><h2>Cierre de caja</h2><p class="ayuda">El parte con todo lo que ha salido, listo para mandar o guardar.</p>
          <div class="acc-fila"><button class="b-ui" data-copiar-caja>${ico("copy")}Copiar el parte</button>${`<a class="b-ui claro" href="https://wa.me/${(cfgPrivado().telefono||"").replace(/\D/g,"").replace(/^(\d{9})$/,"34$1")}?text=${encodeURIComponent(textoCaja(perEco))}" target="_blank" rel="noopener">${ico("chat")}WhatsApp</a>`}</div>
          ${perEco==="hoy"?`<button class="b-ui rojo" data-cerrar-dia style="margin-top:10px;width:100%">Cerrar la caja de hoy</button><p class="ayuda" style="margin:6px 0 0">Guarda el día en el historial y archiva lo terminado.</p>`:""}</div>
        <div class="card c12"><h2>Productos que han salido</h2><p class="ayuda">${PERIODOS[perEco]} · toca una columna para ordenar.</p>
          <div class="tabla-wrap" style="border:0"><table class="datos"><thead><tr><th>Producto</th>${[["q","Unidades"],["ing","Ingresos"],["","Coste"],["ben","Beneficio"],["margen","Margen"]].map(([k,t])=>`<th style="text-align:right">${k?`<button class="th-ord" data-ord="${k}" aria-pressed="${ordEco===k}">${t}${ordEco===k?" ↓":""}</button>`:t}</th>`).join("")}</tr></thead><tbody>
          ${lista.map(x=>`<tr><td><b>${esc(x.n)}</b> <small style="color:var(--tinta-3)">${x.dest==="barra"?"barra":"cocina"}</small></td><td style="text-align:right"><b>${x.q}</b></td><td style="text-align:right">${eur(x.ing)}</td><td style="text-align:right">${x.coste?eur(x.coste):"—"}</td><td style="text-align:right">${x.coste?eur(x.ben):"—"}</td><td style="text-align:right">${x.coste?`<span class="pill ${x.margen>=.65?"ok":x.margen>=.4?"aviso":"critico"}">${pct(x.margen)}</span>`:"—"}</td></tr>`).join("")||`<tr><td colspan="6" style="color:var(--tinta-3)">Sin ventas en este periodo.</td></tr>`}
          </tbody></table></div></div>
        <div class="card c6"><h2>Lo que más sale</h2>${vend.length?`<div class="graf">${barrasH(vend.slice(0,8).map(x=>[x.n,x.q]))}</div>`:`<p class="ayuda">Sin ventas.</p>`}</div>
        <div class="card c6"><h2>Lo que menos sale</h2><p class="ayuda">Candidatos a revisar en la carta.</p>
          ${vend.length>3?`<ul class="opiniones">${vend.slice(-5).reverse().map(x=>`<li><b>${esc(x.n)}</b><span>${x.q} uds · ${eur(x.ing)}</span></li>`).join("")}</ul>`:""}
          ${e.noVendidos.length?`<p class="ayuda" style="margin-top:10px"><b>Sin vender:</b> ${e.noVendidos.slice(0,12).map(p=>esc(p.n)).join(", ")}${e.noVendidos.length>12?"…":""}</p>`:""}</div>
      </div>`;
  }
  // --- Inventario ---
  function inventarioV(){
    const s=stocks(), arts=articulos(), q=norm(qInv), cats=[...new Set(arts.map(a=>a.cat||"Sin categoría"))].sort(), al=alertasStock();
    const lista=arts.filter(a=>(!catInv||(a.cat||"Sin categoría")===catInv)&&(!q||norm(a.n).includes(q)));
    const valor=arts.reduce((t,a)=>t+Math.max(0,s[a.id]||0)*(+a.coste||0),0), [d0]=rango(perInv==="1"?"hoy":perInv==="30"?"d30":"d7");
    const movs=Store.all("movimientos").filter(m=>m.t>=d0).sort((a,b)=>b.t-a.t);
    return `<div class="p-cab"><div><h1>Inventario</h1><p>Stock en vivo: baja solo con cada pedido aceptado (según la receta de cada plato) y sube al recibir compras.</p></div>
      <div class="acc-fila"><button class="b-ui" data-hneg="recuento">${ico("list")}Hacer recuento</button><button class="b-ui rojo" data-hneg="articulo">+ Artículo</button></div></div>
      <div class="kpis">
        <div class="card kpi"><small>Artículos</small><strong>${arts.length}</strong></div>
        <div class="card kpi"><small>Valor del stock</small><strong>${eur0(valor)}</strong><span class="d">a precio de coste</span></div>
        <div class="card kpi"><small>Bajo el stock de seguridad</small><strong style="color:${al.some(x=>x.e!=="exceso")?"var(--critico)":"inherit"}">${al.filter(x=>x.e!=="exceso").length}</strong></div>
        <div class="card kpi"><small>Por encima del máximo</small><strong>${al.filter(x=>x.e==="exceso").length}</strong></div>
      </div>
      ${al.length?`<div class="card ent-card" style="margin-bottom:14px"><h2>Avisos de stock</h2><ul class="alertas">${al.map(({a,e})=>`<li class="${e==="exceso"?"":"critico"}"><b>${esc(a.n)}: ${e==="agotado"?"agotado":e==="bajo"?"ha llegado al stock de seguridad":"por encima del máximo"}</b><span class="h">Hay ${fmtQ(s[a.id],a.ud)} · seguridad ${fmtQ(a.min,a.ud)}${+a.max?` · máximo ${fmtQ(a.max,a.ud)}`:""}${a.prov&&Store.get("proveedores",a.prov)?` · ${esc(Store.get("proveedores",a.prov).n)}`:""}</span></li>`).join("")}</ul></div>`:""}
      ${!arts.length?`<div class="vacio-ui" style="margin-bottom:14px">Aún no hay artículos. Añade lo que compras (barriles, refrescos, carne, pan…), haz un recuento inicial y pon la receta a cada plato en Carta › Editar.<br><button class="b-ui rojo" data-ejemplo-inv style="margin-top:10px">Cargar un inventario de ejemplo</button></div>`:""}
      <div class="acc-fila" style="margin-bottom:10px"><input class="campo" id="q-inv" type="search" placeholder="Buscar artículo…" value="${esc(qInv)}" aria-label="Buscar artículo"><select class="campo" id="cat-inv" aria-label="Categoría"><option value="">Todas las categorías</option>${cats.map(c=>`<option ${c===catInv?"selected":""}>${esc(c)}</option>`).join("")}</select></div>
      <div class="tabla-wrap" style="margin-bottom:14px"><table class="datos"><thead><tr><th>Artículo</th><th>Proveedor</th><th style="text-align:right">Stock</th><th style="text-align:right">Seguridad</th><th style="text-align:right">Máximo</th><th style="text-align:right">Consumo/día</th><th style="text-align:right">Cubre</th><th style="text-align:right">Coste</th><th>Estado</th><th></th></tr></thead><tbody>
      ${lista.map(a=>{ const st=s[a.id], md=mediaDiaria(a.id), e=estadoStock(a), [c,t]=ESTADO_STOCK[e]; return `<tr><td><b>${esc(a.n)}</b><br><small>${esc(a.cat||"Sin categoría")}${a.formato?` · ${esc(a.formato)}`:""}</small></td><td>${esc((Store.get("proveedores",a.prov)||{}).n||"—")}</td>
        <td style="text-align:right"><b>${st===undefined?"—":fmtQ(st,a.ud)}</b></td><td style="text-align:right">${fmtQ(a.min,a.ud)}</td><td style="text-align:right">${+a.max?fmtQ(a.max,a.ud):"—"}</td><td style="text-align:right">${md?fmtQ(md,a.ud):"—"}</td><td style="text-align:right">${md&&st>0?Math.floor(st/md)+" días":"—"}</td>
        <td style="text-align:right">${eur(+a.coste||0)}/${a.ud}</td><td>${c==="—"?`<small>${t}</small>`:pillE(c,t)}</td><td style="white-space:nowrap"><button class="b-ui claro peq-ui" data-hneg="mov" data-art="${a.id}" title="Entrada, merma o ajuste">± Stock</button> <button class="b-ui claro peq-ui" data-hneg="articulo" data-art="${a.id}">Editar</button></td></tr>`; }).join("")||(arts.length?`<tr><td colspan="10" style="color:var(--tinta-3)">Ningún artículo con este filtro.</td></tr>`:"")}
      </tbody></table></div>
      <div class="card"><div class="p-cab" style="margin:0 0 8px"><div><h2>Movimientos y consumo</h2><p class="ayuda" style="margin:0">Según cómo trabajes con tus proveedores: por día, semana o mes.</p></div>
        <div class="seg-claro" role="group">${[["1","Hoy"],["7","Semana"],["30","Mes"]].map(([k,t])=>`<button data-perinv="${k}" aria-pressed="${perInv===k}">${t}</button>`).join("")}</div></div>
        ${arts.length?`<div class="tabla-wrap" style="margin-bottom:12px"><table class="datos" style="min-width:520px"><thead><tr><th>Artículo</th><th style="text-align:right">Consumido</th><th style="text-align:right">Entradas</th><th style="text-align:right">Coste consumido</th></tr></thead><tbody>
          ${arts.map(a=>({a,c:consumo(a.id,d0),en:entradas(a.id,d0)})).filter(x=>x.c||x.en).sort((x,y)=>y.c*(+y.a.coste||0)-x.c*(+x.a.coste||0)).map(x=>`<tr><td>${esc(x.a.n)}</td><td style="text-align:right">${fmtQ(x.c,x.a.ud)}</td><td style="text-align:right">${x.en?fmtQ(x.en,x.a.ud):"—"}</td><td style="text-align:right">${eur(x.c*(+x.a.coste||0))}</td></tr>`).join("")||`<tr><td colspan="4" style="color:var(--tinta-3)">Sin movimientos en este periodo.</td></tr>`}</tbody></table></div>`:""}
        <ul class="movs">${movs.slice(0,40).map(m=>`<li><span class="pill ${m.tipo==="venta"?"":m.tipo==="compra"?"ok":m.tipo==="merma"?"critico":"aviso"}">${{venta:"Venta",compra:"Entrada",merma:"Merma",ajuste:"Ajuste",recuento:"Recuento"}[m.tipo]||m.tipo}</span><span>${(m.lineas||[]).slice(0,4).map(l=>{ const a=ART(l.a); return a?`${esc(a.n)} ${m.tipo==="recuento"?"= ":(+l.q>0?"+":"")}${fmtQ(l.q,a.ud)}`:""; }).filter(Boolean).join(" · ")}${(m.lineas||[]).length>4?" …":""}${m.ref?` · ${esc(m.ref)}`:""}${m.nota?` · ${esc(m.nota)}`:""}</span><small>${new Date(m.t).toLocaleString("es-ES",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</small></li>`).join("")||`<li class="ayuda">Sin movimientos.</li>`}</ul></div>`;
  }
  // --- Compras y proveedores ---
  function comprasV(){
    const provs=Store.all("proveedores").sort((a,b)=>a.n.localeCompare(b.n)), cs=Store.all("compras").sort((a,b)=>b.t-a.t);
    const EST={borrador:["aviso","Borrador"],enviado:["","Enviado"],recibido:["ok","Recibido"],cancelado:["critico","Cancelado"]};
    return `<div class="p-cab"><div><h1>Compras y proveedores</h1><p>Cada proveedor con su ritmo (diario, semanal, quincenal o mensual) y su pedido sugerido según tu stock y lo que gastas.</p></div><button class="b-ui rojo" data-hneg="proveedor">+ Proveedor</button></div>
      ${provs.length?`<div class="provs">${provs.map(p=>{ const sg=sugerencia(p), falta=sg.filter(x=>x.q>0), prox=proximoPedido(p);
        return `<div class="card"><div class="p-cab" style="margin:0 0 6px"><div><h2>${esc(p.n)}</h2><p class="ayuda" style="margin:0">${FRECUENCIAS[p.frec]||"—"}${p.frec==="semanal"?` · los ${DIAS[+p.dia||1]}`:""} · entrega en ${+p.plazo||1} día(s)${prox?` · próximo pedido: <b>${prox.getTime()===inicioDia()?"hoy":prox.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"short"})}</b>`:""}</p></div><button class="b-ui claro peq-ui" data-hneg="proveedor" data-prov="${p.id}">Editar</button></div>
          ${sg.length?`<table class="datos" style="min-width:0"><thead><tr><th>Artículo</th><th style="text-align:right">Stock</th><th style="text-align:right">Gasto previsto</th><th style="text-align:right">Pedir</th></tr></thead><tbody>${sg.map(x=>`<tr><td>${esc(x.a.n)}</td><td style="text-align:right">${fmtQ(x.st,x.a.ud)}</td><td style="text-align:right">${fmtQ(x.prev,x.a.ud)}</td><td style="text-align:right"><input class="campo precio-in" type="number" min="0" step="any" value="${x.q}" data-sug="${p.id}" data-art="${x.a.id}" aria-label="Cantidad de ${esc(x.a.n)}"></td></tr>`).join("")}</tbody></table>
          <div class="acc-fila" style="margin-top:8px"><button class="b-ui rojo" data-crear-compra="${p.id}" ${falta.length?"":"disabled"}>Crear pedido${falta.length?` (${falta.length})`:""}</button></div>`:`<p class="ayuda">Asigna artículos a este proveedor en Inventario › Editar.</p>`}</div>`; }).join("")}</div>`
      :`<div class="vacio-ui" style="margin-bottom:14px">Añade tus proveedores para recibir el pedido sugerido de cada uno.</div>`}
      <div class="card" style="margin-top:14px"><h2>Pedidos a proveedores</h2>
        <div class="tabla-wrap" style="border:0"><table class="datos"><thead><tr><th>Fecha</th><th>Proveedor</th><th>Artículos</th><th style="text-align:right">Total</th><th>Estado</th><th></th></tr></thead><tbody>
        ${cs.map(c=>{ const p=Store.get("proveedores",c.prov)||{n:"—"}, tot=c.total||(c.lineas||[]).reduce((s,l)=>s+(+l.q||0)*(+l.coste||0),0); return `<tr><td>${new Date(c.t).toLocaleDateString("es-ES")}</td><td><b>${esc(p.n)}</b></td><td style="max-width:360px">${(c.lineas||[]).map(l=>{ const a=ART(l.a); return a?`${fmtQ(l.q,a.ud)} ${esc(a.n)}`:""; }).filter(Boolean).join(", ")}</td><td style="text-align:right">${eur(tot)}</td><td>${pillE(...(EST[c.estado]||["",c.estado]))}</td>
          <td style="white-space:nowrap">${c.estado==="borrador"||c.estado==="enviado"?`${c.estado==="borrador"?`<button class="b-ui claro peq-ui" data-enviar-compra="${c.id}">Enviar</button> `:""}<button class="b-ui verde peq-ui" data-hneg="recibir" data-compra="${c.id}">Recibir</button> <button class="b-ui claro peq-ui" data-cancelar-compra="${c.id}">Cancelar</button>`:""}</td></tr>`; }).join("")||`<tr><td colspan="6" style="color:var(--tinta-3)">Aún no hay pedidos.</td></tr>`}
        </tbody></table></div></div>`;
  }
  function textoCompra(c){ const p=Store.get("proveedores",c.prov)||{}; return `Hola${p.n?" "+p.n:""}, pedido de ${cfgBar().nombre}:\n${(c.lineas||[]).map(l=>{ const a=ART(l.a); return a?`- ${fmtQ(l.q,a.ud)} ${a.n}${a.formato?` (${a.formato})`:""}`:""; }).filter(Boolean).join("\n")}\nGracias.`; }
  // --- Equipo y accesos ---
  function equipoV(){
    if(Store.modo!=="supa"){ const c=Pin.cfg(), activo=Pin.activo();
      return `<div class="p-cab"><div><h1>Equipo y accesos</h1><p>Cada persona entra con su propio PIN y solo a sus pantallas. Nadie puede hacerse pasar por otro camarero.</p></div>${activo?`<button class="b-ui claro" data-bloquear>${ico("lock")}Bloquear este dispositivo</button>`:""}</div>
        <form class="card" id="f-acceso" style="margin-bottom:14px" autocomplete="off"><h2>Acceso del local y administración</h2>
          <p class="ayuda">El usuario y la contraseña del local los usa todo el equipo para abrir el panel en modo servicio. La clave de administración solo la sabe el encargado o el dueño. Deja vacío lo que no quieras cambiar.</p>
          <div class="pins">
            <label><span>${ico("users")} Usuario del local</span><input id="ac-u" value="${esc(Acceso.usuario())}" autocapitalize="none" maxlength="30"></label>
            <label><span>${ico("lock")} Nueva contraseña del local</span><input id="ac-p" type="password" maxlength="40" placeholder="••••" autocomplete="new-password"></label>
            <label><span>${ico("lock")} Nueva clave de administración</span><input id="ac-a" type="password" inputmode="numeric" maxlength="12" placeholder="••••" autocomplete="new-password"></label>
          </div>
          <div class="acc-fila" style="margin-top:12px"><button class="b-ui rojo" type="submit">Guardar accesos</button></div></form>
        <div class="aviso-ui">${ico("lock")} ${activo?"Los PIN están activos en este navegador.":"Los PIN se activan al poner el del dueño."} En modo demo protegen las pantallas de este navegador; con la base de datos conectada, cada persona tiene su cuenta con correo y contraseña.</div>
        <form class="card" id="f-pins"><h2>PIN personales</h2><p class="ayuda">De 4 a 12 cifras. Déjalo vacío para no cambiarlo.</p>
          <div class="pins">
            <label><span>${ico("lock")} Dueño <small>${c.dueno?"(puesto)":"(sin PIN)"}</small></span><input type="password" inputmode="numeric" maxlength="12" data-pin="dueno" placeholder="${c.dueno?"••••":"Nuevo PIN"}" autocomplete="new-password"></label>
            <label><span>${ico("chef")} Cocina y barra <small>${c.cocina?"(puesto)":"(sin PIN)"}</small></span><input type="password" inputmode="numeric" maxlength="12" data-pin="cocina" placeholder="${c.cocina?"••••":"Nuevo PIN"}" autocomplete="new-password"></label>
            ${cams().map(x=>`<label><span><i class="dot" style="background:${x.color}"></i> ${esc(x.n)} <small>${(c.camareros||{})[x.id]?"(puesto)":"(sin PIN)"}</small></span><input type="password" inputmode="numeric" maxlength="12" data-pin="cam:${x.id}" placeholder="${(c.camareros||{})[x.id]?"••••":"Nuevo PIN"}" autocomplete="new-password"></label>`).join("")}
          </div>
          <div class="acc-fila" style="margin-top:12px"><button class="b-ui rojo" type="submit">Guardar PIN</button>${activo?`<button type="button" class="b-ui claro" data-quitar-pins>Quitar todos los PIN</button>`:""}</div></form>`; }
    if(equipo===null && !cargandoEquipo) cargarEquipo();
    return `<div class="p-cab"><div><h1>Equipo y accesos</h1><p>Cada persona con su cuenta, su contraseña y su rol. Un camarero solo puede actuar como él mismo.</p></div></div>
      <div class="rej"><div class="card c7"><h2>Personas con acceso</h2>${equipo===null?`<p class="ayuda">Cargando…</p>`:equipo.length?`<table class="datos" style="min-width:0"><thead><tr><th>Correo</th><th>Rol</th><th>Es</th><th></th></tr></thead><tbody>${equipo.map(x=>`<tr><td>${esc(x.email)}</td><td>${ROLES[x.rol]||esc(x.rol)}</td><td>${x.cam?esc(nomCam(x.cam)):"—"}</td><td><button class="b-ui claro peq-ui" data-quitar-miembro="${esc(x.email)}">Quitar</button></td></tr>`).join("")}</tbody></table>`:`<p class="ayuda">Nadie todavía.</p>`}</div>
      <form class="card c5" id="f-crear-usuario"><h2>Crear cuenta</h2><p class="ayuda">Usuario corto (por ejemplo <b>ana</b>) y contraseña de 8 o más caracteres con letras y números. Con eso entra a fichar y en su pantalla de Sala o Cocina. Elige abajo qué camarero es. También vale un correo.</p><div class="form-aj" style="grid-template-columns:1fr">
        <label>Usuario o correo<input id="cu-email" type="text" required autocomplete="off" autocapitalize="none" placeholder="ana"></label>
        <label>Contraseña inicial<span class="acc-fila"><input id="cu-pass" type="text" minlength="8" required autocomplete="off" style="flex:1"><button type="button" class="b-ui claro peq-ui" data-gen-pass>Generar</button></span></label>
        <label>Rol<select id="cu-rol"><option value="sala">Sala (camarero)</option><option value="cocina">Cocina y barra</option><option value="dueno">Dueño (todo)</option></select></label>
        <label>Es el camarero<select id="cu-cam"><option value="">—</option>${cams().map(c=>`<option value="${c.id}">${esc(c.n)}</option>`).join("")}</select></label>
        <div><button class="b-ui rojo" type="submit">Crear cuenta</button></div></div></form></div>`;
  }
  // --- Mi cuenta ---
  function cuentaV(){
    if(Store.modo!=="supa") return `<div class="p-cab"><div><h1>Mi cuenta</h1><p>En modo demo no hay cuentas: usa los PIN de Equipo y accesos.</p></div></div>${Pin.activo()?`<button class="b-ui" data-bloquear>${ico("lock")}Bloquear este dispositivo</button>`:""}`;
    return `<div class="p-cab"><div><h1>Mi cuenta</h1><p>${esc(Store.sesion?.user?.email||"")} · ${ROLES[Store.rol]||""}</p></div></div>
      <form class="card" id="f-pass" style="max-width:520px"><h2>Cambiar contraseña</h2><p class="ayuda">10 caracteres o más, con letras y números. No la compartas con nadie.</p><div class="form-aj" style="grid-template-columns:1fr">
        <label>Nueva contraseña<input id="np1" type="password" minlength="10" required autocomplete="new-password"></label><label>Repítela<input id="np2" type="password" minlength="10" required autocomplete="new-password"></label>
        <div class="acc-fila"><button class="b-ui rojo" type="submit">Cambiar</button><button type="button" class="b-ui claro" data-salir>Cerrar sesión</button></div></div></form>`;
  }
  // --- Hojas (ventanas) de artículo, movimiento, recuento, proveedor y recepción ---
  function hojaNegHTML(){
    if(!hojaNeg) return ""; const h=hojaNeg, provs=Store.all("proveedores").sort((a,b)=>a.n.localeCompare(b.n));
    let cuerpo="";
    if(h.t==="articulo"){ const a=h.id?ART(h.id):{n:"",cat:"",ud:"ud",coste:"",min:"",max:"",prov:"",formato:"",fmt:1};
      cuerpo=`<h3>${h.id?"Editar artículo":"Nuevo artículo"}</h3><form class="form-aj" id="f-art">
        <label>Nombre<input id="ar-n" value="${esc(a.n)}" maxlength="60" required placeholder="Barril de cerveza 30 l"></label><label>Categoría<input id="ar-cat" value="${esc(a.cat||"")}" maxlength="30" list="cats-inv" placeholder="Bebidas"><datalist id="cats-inv">${[...new Set(articulos().map(x=>x.cat).filter(Boolean))].map(c=>`<option value="${esc(c)}">`).join("")}</datalist></label>
        <label>Se cuenta en<select id="ar-ud">${Object.entries(UNIDADES).map(([k,v])=>`<option value="${k}" ${a.ud===k?"selected":""}>${v}</option>`).join("")}</select></label><label>Coste por unidad (€)<input id="ar-coste" type="number" min="0" step="0.001" value="${a.coste}"></label>
        <label>Stock de seguridad<input id="ar-min" type="number" min="0" step="any" value="${a.min}"></label><label>Máximo (opcional)<input id="ar-max" type="number" min="0" step="any" value="${a.max||""}"></label>
        <label>Proveedor<select id="ar-prov"><option value="">—</option>${provs.map(p=>`<option value="${p.id}" ${p.id===a.prov?"selected":""}>${esc(p.n)}</option>`).join("")}</select></label>
        <label>Se compra en (opcional)<input id="ar-formato" value="${esc(a.formato||"")}" maxlength="40" placeholder="caja de 24"></label><label>Unidades por formato<input id="ar-fmt" type="number" min="1" step="any" value="${a.fmt||1}"></label>
        ${h.id?"":`<label>Stock actual (recuento inicial)<input id="ar-stock" type="number" min="0" step="any" placeholder="opcional"></label>`}
        <div class="acc-fila" style="grid-column:1/-1"><button class="b-ui rojo" type="submit">Guardar</button>${h.id?`<button type="button" class="b-ui claro" data-quitar-art="${h.id}">Quitar artículo</button>`:""}<button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div></form>`; }
    if(h.t==="mov"){ const a=ART(h.id);
      cuerpo=`<h3>${esc(a?a.n:"Movimiento")}</h3><p class="ayuda">Hay ${fmtQ(stocks()[h.id],a&&a.ud)}.</p><form class="form-aj" id="f-mov">
        <label>Qué ha pasado<select id="mv-tipo"><option value="compra">Entrada (ha llegado género)</option><option value="merma">Merma (roto, caducado, invitación)</option><option value="ajuste">Ajuste (+ o −)</option></select></label>
        <label>Cantidad (${a?a.ud:""})<input id="mv-q" type="number" step="any" required></label><label style="grid-column:1/-1">Nota<input id="mv-nota" maxlength="100"></label>
        <div class="acc-fila" style="grid-column:1/-1"><button class="b-ui rojo" type="submit">Registrar</button><button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div></form>`; }
    if(h.t==="recuento"){ const s=stocks();
      cuerpo=`<h3>Recuento</h3><p class="ayuda">Escribe lo que hay de verdad. Lo que dejes vacío no cambia. Sirve para cuadrar el stock cada día, semana o mes.</p><form id="f-recuento"><div class="tabla-wrap" style="max-height:52vh;overflow:auto"><table class="datos" style="min-width:0"><thead><tr><th>Artículo</th><th style="text-align:right">Según el sistema</th><th style="text-align:right">Hay</th></tr></thead><tbody>
        ${articulos().map(a=>`<tr><td>${esc(a.n)}</td><td style="text-align:right">${s[a.id]===undefined?"—":fmtQ(s[a.id],a.ud)}</td><td style="text-align:right"><input class="campo precio-in" type="number" min="0" step="any" data-rec="${a.id}" aria-label="Recuento de ${esc(a.n)}"> ${a.ud}</td></tr>`).join("")}</tbody></table></div>
        <div class="acc-fila" style="margin-top:10px"><button class="b-ui rojo" type="submit">Guardar recuento</button><button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div></form>`; }
    if(h.t==="proveedor"){ const p=h.id?Store.get("proveedores",h.id):{n:"",tel:"",email:"",frec:"semanal",dia:1,plazo:1,nota:""};
      cuerpo=`<h3>${h.id?"Editar proveedor":"Nuevo proveedor"}</h3><form class="form-aj" id="f-prov">
        <label>Nombre<input id="pv-n" value="${esc(p.n)}" maxlength="50" required></label><label>Teléfono / WhatsApp<input id="pv-tel" type="tel" value="${esc(p.tel||"")}" maxlength="20"></label><label>Correo<input id="pv-email" type="email" value="${esc(p.email||"")}" maxlength="80"></label>
        <label>Le pido<select id="pv-frec">${Object.entries(FRECUENCIAS).map(([k,v])=>`<option value="${k}" ${p.frec===k?"selected":""}>${v}</option>`).join("")}</select></label>
        <label>Día (si es semanal)<select id="pv-dia">${DIAS.map((d,i)=>`<option value="${i}" ${+p.dia===i?"selected":""}>${d}</option>`).join("")}</select></label><label>Tarda en entregar (días)<input id="pv-plazo" type="number" min="0" max="30" value="${+p.plazo||1}"></label>
        <label style="grid-column:1/-1">Nota<input id="pv-nota" value="${esc(p.nota||"")}" maxlength="140" placeholder="Pedido mínimo, horario de reparto…"></label>
        <div class="acc-fila" style="grid-column:1/-1"><button class="b-ui rojo" type="submit">Guardar</button>${h.id?`<button type="button" class="b-ui claro" data-quitar-prov="${h.id}">Quitar proveedor</button>`:""}<button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div></form>`; }
    if(h.t==="recibir"){ const c=Store.get("compras",h.id);
      cuerpo=`<h3>Recibir pedido</h3><p class="ayuda">Corrige lo que haya llegado de verdad y su precio. Sube el stock al guardar.</p><form id="f-recibir"><table class="datos" style="min-width:0"><thead><tr><th>Artículo</th><th style="text-align:right">Ha llegado</th><th style="text-align:right">Precio/ud</th></tr></thead><tbody>
        ${(c.lineas||[]).map(l=>{ const a=ART(l.a); return a?`<tr><td>${esc(a.n)}</td><td style="text-align:right"><input class="campo precio-in" type="number" min="0" step="any" value="${l.q}" data-rq="${l.a}"> ${a.ud}</td><td style="text-align:right"><input class="campo precio-in" type="number" min="0" step="0.001" value="${l.coste}" data-rc="${l.a}"> €</td></tr>`:""; }).join("")}</tbody></table>
        <label class="check-l" style="display:flex;gap:8px;margin:10px 0"><input type="checkbox" id="rc-coste" checked> Actualizar el coste de los artículos con estos precios</label>
        <div class="acc-fila"><button class="b-ui verde" type="submit">${ico("check")}Recibido: subir stock</button><button type="button" class="b-ui claro" data-cerrar-b>Cancelar</button></div></form>`; }
    return `<div class="hoja-fondo" data-cerrar><div class="hoja ui hoja-ancha hoja-neg" role="dialog"><div class="asa"></div>${cuerpo}</div></div>`;
  }
  async function cargarEjemploInv(){
    const pid=nid(), pid2=nid()+"b", pid3=nid()+"c";
    await Store.set("proveedores",pid,{id:pid,n:"Alimentos de Palencia (carnes y lechazo)",tel:"",email:"",frec:"semanal",dia:2,plazo:2});
    await Store.set("proveedores",pid2,{id:pid2,n:"Pescados y mariscos del Cantábrico",tel:"",email:"",frec:"diaria",dia:1,plazo:1});
    await Store.set("proveedores",pid3,{id:pid3,n:"Bodegas y bebidas",tel:"",email:"",frec:"semanal",dia:4,plazo:2});
    const A=[["caracol","Caracol limpio","Frescos","kg",9,4,20,pid,"saco 5 kg",5,10],["lechazo","Lechazo churro IGP (cuarto)","Carnes","ud",34,4,16,pid,"pieza",1,8],["ternera","Ternera palentina (lomo)","Carnes","kg",19,5,25,pid,"",1,12],
      ["jamon","Jamón ibérico de bellota","Embutidos","kg",48,1,6,pid,"pieza",1,3],["bacalao","Morro de bacalao","Pescados","kg",16,2,10,pid2,"",1,5],["gamba","Gamba de Huelva","Mariscos","kg",38,1,6,pid2,"caja 2 kg",2,3],
      ["patata","Patata","Verduras","kg",.9,10,50,pid,"saco 10 kg",10,25],["huevo","Huevos de corral","Frescos","ud",.3,30,180,pid,"bandeja de 30",30,90],
      ["cerveza-barril","Cerveza de barril","Bebidas","l",1.6,10,60,pid3,"barril 30 l",30,45],["ribera","Ribera del Duero crianza (botella)","Vinos","ud",11,6,36,pid3,"caja de 6",6,18]];
    for(const [id,n,cat,ud,coste,min,max,prov,formato,fmt] of A) await Store.set("articulos",id,{id,n,cat,ud,coste,min,max,prov,formato,fmt,activo:true});
    await Acc.movimiento("recuento",A.map(x=>({a:x[0],q:x[10]})),"Recuento inicial","","encargado");
    const R={caracoles:[["caracol",.25]],lechazo:[["lechazo",1]],paletilla:[["lechazo",.5]],entrecot:[["ternera",.35],["patata",.2]],solomillo:[["ternera",.3],["patata",.2]],jamon80:[["jamon",.08]],jamon150:[["jamon",.15]],bacalao:[["bacalao",.3],["patata",.2]],gambas:[["gamba",.25]],ajillo:[["gamba",.2]],huevoroto:[["huevo",2],["patata",.25],["jamon",.04]],cana:[["cerveza-barril",.25]],raulcalvo:[["ribera",1]]};
    const c=cfgCarta(); await Acc.carta({platos:c.platos.map(p=>R[p.id]?{...p,receta:R[p.id].map(([a,q])=>({a,q}))}:p)});
    toast("Inventario de ejemplo cargado: 10 artículos, 3 proveedores y recetas en 13 platos.");
  }
  // Clics, cambios y formularios de estas pestañas (devuelven true si los han atendido)
  async function clicNeg(t){
    const fp=t.closest("[data-fped]"); if(fp){ fPed=fp.dataset.fped; return pintar(true),true; }
    const pr=t.closest("[data-per]"); if(pr){ perEco=pr.dataset.per; return pintar(true),true; }
    const od=t.closest("[data-ord]"); if(od){ ordEco=od.dataset.ord; return pintar(true),true; }
    const pi=t.closest("[data-perinv]"); if(pi){ perInv=pi.dataset.perinv; return pintar(true),true; }
    const dd=t.closest("[data-dia]"); if(dd){ const d=+dd.dataset.dia; if(!d) diaRes=fechaISO(); else { const x=new Date(diaRes+"T12:00:00"); x.setDate(x.getDate()+d); diaRes=x.toLocaleDateString("sv-SE"); } return pintar(true),true; }
    if(await clicReserva(t,"encargado")) return true;
    if(t.closest("[data-copiar-caja]")){ try{ await navigator.clipboard.writeText(textoCaja(perEco)); toast("Parte de caja copiado."); }catch(_){ toast("No se ha podido copiar."); } return true; }
    const hn=t.closest("[data-hneg]"); if(hn){ hojaNeg={t:hn.dataset.hneg,id:hn.dataset.art||hn.dataset.prov||hn.dataset.compra||null}; return pintar(true),true; }
    if(t.closest("[data-ejemplo-inv]")){ await cargarEjemploInv(); return pintar(true),true; }
    const qa=t.closest("[data-quitar-art]"); if(qa){ if(!qa.dataset.seguro){ qa.dataset.seguro=1; qa.textContent="¿Seguro?"; return true; } const a=ART(qa.dataset.quitarArt); await Store.set("articulos",a.id,{...a,activo:false}); hojaNeg=null; toast(`${a.n} quitado del inventario.`); return pintar(true),true; }
    const qv=t.closest("[data-quitar-prov]"); if(qv){ if(!qv.dataset.seguro){ qv.dataset.seguro=1; qv.textContent="¿Seguro?"; return true; } await Store.del("proveedores",qv.dataset.quitarProv); hojaNeg=null; toast("Proveedor quitado."); return pintar(true),true; }
    const cc=t.closest("[data-crear-compra]"); if(cc){ const pid=cc.dataset.crearCompra, lineas=[...app.querySelectorAll(`[data-sug="${pid}"]`)].map(i=>({a:i.dataset.art,q:+i.value,coste:+(ART(i.dataset.art)||{}).coste||0})).filter(l=>l.q>0);
      if(!lineas.length) return toast("Pon alguna cantidad."),true; const id=nid(); await Store.set("compras",id,{id,prov:pid,t:ahora(),estado:"borrador",lineas,total:lineas.reduce((s,l)=>s+l.q*l.coste,0)}); toast("Pedido creado. Envíalo al proveedor desde la lista."); return pintar(true),true; }
    const ec=t.closest("[data-enviar-compra]"); if(ec){ const c=Store.get("compras",ec.dataset.enviarCompra), p=Store.get("proveedores",c.prov)||{}, txt=textoCompra(c), tel=(p.tel||"").replace(/\D/g,"");
      try{ await navigator.clipboard.writeText(txt); }catch(_){}
      await Store.set("compras",c.id,{...c,estado:"enviado",enviadoT:ahora()});
      if(tel) window.open(`https://wa.me/${tel.length===9?"34"+tel:tel}?text=${encodeURIComponent(txt)}`,"_blank","noopener"); toast(tel?"Pedido copiado y abierto en WhatsApp.":"Pedido copiado: pégalo en tu mensaje o correo al proveedor."); return pintar(true),true; }
    const xc=t.closest("[data-cancelar-compra]"); if(xc){ if(!xc.dataset.seguro){ xc.dataset.seguro=1; xc.textContent="¿Seguro?"; return true; } const c=Store.get("compras",xc.dataset.cancelarCompra); await Store.set("compras",c.id,{...c,estado:"cancelado"}); return pintar(true),true; }
    if(t.closest("[data-quitar-pins]")){ await Store.set("config","seguridad",{}); Pin.salir(); toast("PIN quitados: las pantallas quedan abiertas en este navegador."); return pintar(true),true; }
    if(t.closest("[data-gen-pass]")){ const i=app.querySelector("#cu-pass"); if(i) i.value=tokenNuevo().slice(0,6)+"-"+tokenNuevo().slice(0,5)+(Math.floor(Math.random()*90)+10); return true; }
    return false;
  }
  async function cambioNeg(t){
    if(t.id==="dia-res"&&t.value){ diaRes=t.value; return pintar(true),true; }
    if(t.id==="cat-inv"){ catInv=t.value; return pintar(true),true; }
    if(t.dataset.resMesa){ const r=Store.get("reservas",t.dataset.resMesa); await Acc.reserva(r.id,{mesa:t.value?+t.value:null},"encargado"); toast(t.value?`${r.nombre}: mesa ${t.value}.`:"Mesa quitada de la reserva."); t.blur(); return pintar(true),true; }
    return false;
  }
  async function enviarNeg(f){
    const v=id=>f.querySelector(id)?.value??"", num=id=>parseFloat(String(v(id)).replace(",","."));
    if(f.id==="f-res-tel"){ const d={nombre:v("#rt-nombre").trim(),tel:v("#rt-tel").trim(),fecha:v("#rt-fecha"),hora:v("#rt-hora"),personas:+v("#rt-personas")||2,mesa:v("#rt-mesa"),nota:v("#rt-nota").trim()};
      if(!d.nombre||!d.fecha||!d.hora) return toast("Pon nombre, día y hora."),true; await Acc.reservar(d,"telefono","encargado"); diaRes=d.fecha; toast(`Reserva de ${d.nombre} apuntada: ${d.fecha} a las ${d.hora}.`); return pintar(true),true; }
    if(f.id==="f-res-cfg"){ await Store.set("config","reservas",{...cfgReservas(),activo:f.querySelector("#rc-activo").checked,auto:f.querySelector("#rc-auto").checked,franjas:v("#rc-franjas").trim()||RESERVAS_DEF.franjas,paso:Math.max(10,+v("#rc-paso")||30),aforo:Math.max(1,+v("#rc-aforo")||40),maxPersonas:Math.max(1,+v("#rc-max")||10),antelacion:Math.max(1,+v("#rc-ant")||30)});
      if(!horasReserva().length) toast("El horario no tiene un formato válido. Ejemplo: 13:00-16:00, 20:00-23:30"); else toast("Reservas guardadas."); return pintar(true),true; }
    if(f.id==="f-art"){ const n=v("#ar-n").trim(); if(!n) return true; const id=hojaNeg.id||slugDe(n).slice(0,24)+"-"+nid().slice(-4), prev=hojaNeg.id?ART(id):{};
      await Store.set("articulos",id,{...prev,id,n,cat:v("#ar-cat").trim(),ud:v("#ar-ud"),coste:Math.max(0,num("#ar-coste")||0),min:Math.max(0,num("#ar-min")||0),max:Math.max(0,num("#ar-max")||0),prov:v("#ar-prov"),formato:v("#ar-formato").trim(),fmt:Math.max(1,num("#ar-fmt")||1),activo:true});
      const ini=num("#ar-stock"); if(!hojaNeg.id && ini>=0) await Acc.movimiento("recuento",[{a:id,q:ini}],"Recuento inicial","","encargado");
      hojaNeg=null; toast(`${n} guardado.`); return pintar(true),true; }
    if(f.id==="f-mov"){ const tipo=v("#mv-tipo"); let q=num("#mv-q"); if(!q) return toast("Pon una cantidad."),true; if(tipo==="merma") q=-Math.abs(q); if(tipo==="compra") q=Math.abs(q);
      await Acc.movimiento(tipo,[{a:hojaNeg.id,q}],v("#mv-nota").trim(),"","encargado"); hojaNeg=null; toast("Movimiento registrado."); return pintar(true),true; }
    if(f.id==="f-recuento"){ const lineas=[...f.querySelectorAll("[data-rec]")].filter(i=>i.value!=="").map(i=>({a:i.dataset.rec,q:Math.max(0,parseFloat(i.value.replace(",","."))||0)}));
      if(!lineas.length) return toast("No has escrito ninguna cantidad."),true; await Acc.movimiento("recuento",lineas,"Recuento","","encargado"); hojaNeg=null; toast(`Recuento guardado (${lineas.length} artículos).`); return pintar(true),true; }
    if(f.id==="f-prov"){ const n=v("#pv-n").trim(); if(!n) return true; const id=hojaNeg.id||nid();
      await Store.set("proveedores",id,{id,n,tel:v("#pv-tel").trim(),email:v("#pv-email").trim(),frec:v("#pv-frec"),dia:+v("#pv-dia"),plazo:Math.max(0,+v("#pv-plazo")||0),nota:v("#pv-nota").trim()}); hojaNeg=null; toast(`${n} guardado.`); return pintar(true),true; }
    if(f.id==="f-recibir"){ const lineas=[...f.querySelectorAll("[data-rq]")].map(i=>({a:i.dataset.rq,q:Math.max(0,parseFloat(i.value)||0),coste:Math.max(0,parseFloat(f.querySelector(`[data-rc="${i.dataset.rq}"]`).value)||0)})).filter(l=>l.q>0);
      await Acc.recibirCompra(hojaNeg.id,lineas,f.querySelector("#rc-coste").checked,"encargado"); hojaNeg=null; toast("Pedido recibido: stock actualizado."); return pintar(true),true; }
    if(f.id==="f-pins"){ const c={...Pin.cfg()}, cams_={...(c.camareros||{})}; let n=0, mal=false;
      for(const i of f.querySelectorAll("[data-pin]")){ const p=i.value.trim(); if(!p) continue; if(!/^\d{4,12}$/.test(p)){ mal=true; continue; } const h=await Pin.hash(p), k=i.dataset.pin;
        if(k==="dueno") c.dueno=h; else if(k==="cocina") c.cocina=h; else cams_[k.slice(4)]=h; n++; }
      if(mal) return toast("Los PIN son de 4 a 12 cifras."),true;
      const hs=[c.dueno,c.cocina,...Object.values(cams_)].filter(Boolean); if(new Set(hs).size!==hs.length) return toast("Cada persona necesita un PIN distinto."),true;
      if(!c.dueno && n) return toast("Pon primero el PIN del dueño."),true;
      await Store.set("config","seguridad",{...c,camareros:cams_}); if(c.dueno && !Pin.sesion()) Pin.entrar("dueno"); toast(n?`${n} PIN guardado${n>1?"s":""}.`:"Nada que cambiar."); return pintar(true),true; }
    if(f.id==="f-crear-usuario"){ const u=v("#cu-email").trim(), pw=v("#cu-pass");
      if(!u.includes("@") && !/^[a-z0-9._-]{2,30}$/i.test(u)) return toast("El usuario: de 2 a 30 letras o números, sin espacios."),true;
      if(!(pw.length>=8&&/[a-z]/i.test(pw)&&/\d/.test(pw))) return toast("La contraseña: 8 o más caracteres, con letras y números."),true;
      if(pw.length>=10 && !(/[a-z]/i.test(pw)&&/\d/.test(pw))) return toast("Si es larga, que tenga letras y números."),true;
      const body={tenant:TENANT,email:correoLocal(u),password:claveSupa(pw),rol:v("#cu-rol"),cam:v("#cu-cam")};
      try{ const {data,error}=await Store.sb.functions.invoke("crear-usuario",{body}); if(error||!data||!data.ok) throw (data&&data.error)||error;
        toast(`Cuenta creada: entra con «${u}» y su contraseña.`); equipo=null; f.reset(); }
      catch(err){ const m={ya_existe:"Ese usuario ya tiene cuenta: asígnale el rol desde el panel maestro.",contraseña_debil:"Contraseña demasiado débil.",sin_permiso:"Solo el dueño puede crear cuentas."}[err]; toast(m||"No se ha podido crear. ¿Está publicada la función crear-usuario en Supabase?"); }
      return pintar(true),true; }
    if(f.id==="f-pass"){ const a=v("#np1"), b=v("#np2"); if(a!==b) return toast("Las dos contraseñas no coinciden."),true; if(!(a.length>=10&&/[a-z]/i.test(a)&&/\d/.test(a))) return toast("Usa 10+ caracteres con letras y números."),true;
      const {error}=await Store.sb.auth.updateUser({password:a}); toast(error?"No se ha podido cambiar: "+error.message:"Contraseña cambiada."); f.reset(); return true; }
    return false;
  }
  const quienDe = e => e ? String(e).replace(/\.[a-z0-9-]+@metriax\.app$/,"").replace(/@.*/,"") : "Cliente";
  function controlHTML(){
    const cab=`<div class="card" style="margin-top:14px"><h2>Control de movimientos</h2><p class="ayuda">Registro que escribe la propia base de datos: ni camareros ni barra pueden cambiarlo ni borrarlo. Sirve para detectar cuentas bajadas, pedidos anulados después de aceptarlos o cobros raros.</p>`;
    if(Store.modo!=="supa") return cab+`<p class="vacio">Disponible con la base de datos real (no en el modo demo).</p></div>`;
    if(!AUDIT.filas) return cab+`<button class="b-ui" data-audit>Ver los últimos movimientos</button> ${AUDIT.estado?`<span class="peq-f">${esc(AUDIT.estado)}</span>`:""}</div>`;
    const sumC=d=>((d&&d.consumo)||[]).reduce((a,x)=>a+(+x.p||0)*(+x.q||0),0), sumI=d=>((d&&d.items)||[]).reduce((a,x)=>a+(+x.p||0)*(+x.q||0),0), al=[], por={};
    AUDIT.filas.forEach(f=>{ const a=f.antes, d=f.despues, q=quienDe(f.email), cuando=new Date(f.t).toLocaleString("es-ES",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}), m=(txt)=>al.push({cuando,q,txt});
      if(f.col==="pedidos"&&a&&d&&a.aceptado&&d.rechazado&&!a.rechazado) m(`Anuló un pedido ya aceptado (${a.llevar?"para llevar":"mesa "+a.mesa}, ${eur(sumI(a))})`);
      if(f.col==="pedidos"&&a&&d&&sumI(d)<sumI(a)-0.001) m(`Bajó el importe de un pedido de ${eur(sumI(a))} a ${eur(sumI(d))}`);
      if(f.col==="mesas"&&a&&d&&a.abierta&&d.abierta&&sumC(d)<sumC(a)-0.001) m(`Bajó la cuenta de la mesa ${d.n||f.doc_id}: de ${eur(sumC(a))} a ${eur(sumC(d))}`);
      if(f.col==="cuentas"&&f.op==="INSERT"&&d){ const p=quienDe(f.email); por[p]=por[p]||{n:0,t:0,ef:0}; por[p].n++; por[p].t+=+d.total||0; por[p].ef+=+((d.pagos||{}).efectivo)||0; if(d.forma==="sin indicar") m(`Cobró la mesa ${d.mesa} sin indicar la forma de pago`); }
      if(f.col==="cuentas"&&f.op!=="INSERT") m(f.op==="DELETE"?"Borró un cobro":"Modificó un cobro ya registrado");
      if(f.op==="DELETE"&&["pedidos","mesas","tickets","fichajes"].includes(f.col)) m(`Borró un registro de ${f.col}`);
      if(f.col==="fichajes"&&a&&d&&a.ini!==d.ini) m("Cambió una hora de entrada del registro de jornada"); });
    const pp=Object.entries(por).sort((x,y)=>y[1].t-x[1].t);
    return cab+`<p class="ayuda">Últimos ${AUDIT.filas.length} movimientos revisados.</p>
      ${al.length?`<div class="tabla-wrap" style="border:0"><table><thead><tr><th>Cuándo</th><th>Quién</th><th>Qué ha pasado</th></tr></thead><tbody>${al.map(x=>`<tr><td>${x.cuando}</td><td><b>${esc(x.q)}</b></td><td>${esc(x.txt)}</td></tr>`).join("")}</tbody></table></div>`:`<p><span class="pill ok">Nada raro</span> No se ha detectado ninguna anulación, rebaja ni cobro sospechoso.</p>`}
      ${pp.length?`<h3 style="margin:14px 0 6px;font-size:16px">Cobros por persona</h3><div class="tabla-wrap" style="border:0"><table><thead><tr><th>Quién</th><th>Cobros</th><th>Importe</th><th>En efectivo</th></tr></thead><tbody>${pp.map(([p,v])=>`<tr><td><b>${esc(p)}</b></td><td>${v.n}</td><td>${eur(v.t)}</td><td>${eur(v.ef)}</td></tr>`).join("")}</tbody></table></div>`:""}
      <button class="b-ui claro" data-audit style="margin-top:10px">Actualizar</button></div>`;
  }
  function rendimientoV(){ return rendimientoBase()+(Acceso.admin()?controlHTML():""); }
  function temporalV(){
    const its=cfgTemp(), hoy=fechaISO();
    const est=t=>t.activo===false?["aviso","Pausado"]:t.hasta&&t.hasta<hoy?["critico","Caducado"]:t.desde&&t.desde>hoy?["aviso","Programado"]:t.agot?["critico","Agotado"]:["ok","En la carta"];
    const rango=t=>!t.desde&&!t.hasta?"Hasta que lo quites":`${t.desde?fmtD(t.desde):"hoy"} → ${t.hasta?fmtD(t.hasta):"sin fin"}`;
    return `<div class="p-cab"><div><h1>Fuera de carta</h1><p>Platos o bebidas del día, de la semana o por tiempo limitado. Salen a los clientes en su propio apartado de la carta y desaparecen solos cuando acaba la fecha.</p></div></div>
      <form class="card" id="f-temp" style="margin-bottom:14px"><h2>Añadir algo fuera de carta</h2>
        <div class="form-aj">
          <label>Nombre<input id="tp-n" maxlength="80" required></label>
          <label>Descripción (opcional)<input id="tp-d" maxlength="160"></label>
          <label>Precio (€)<input id="tp-p" inputmode="decimal" required></label>
          <label>Se prepara en<select id="tp-dest"><option value="cocina">Cocina</option><option value="barra">Barra</option></select></label>
          <label>Durante<select id="tp-dur"><option value="hoy">Solo hoy</option><option value="semana">Esta semana (hasta el domingo)</option><option value="7">Los próximos 7 días</option><option value="fechas">Elegir fechas</option><option value="sin">Hasta que lo quite</option></select></label>
          <label>Desde (si eliges fechas)<input id="tp-desde" type="date"></label>
          <label>Hasta (si eliges fechas)<input id="tp-hasta" type="date"></label>
        </div><button class="b-ui" type="submit">Añadir a la carta</button></form>
      <div class="card"><h2>Ahora y próximos</h2>${its.length?`<ul class="agot-lista">${its.slice().sort((a,b)=>(b.desde||"").localeCompare(a.desde||"")).map(t=>{ const [c,e]=est(t); return `<li><span><b>${esc(t.n)}</b> · ${eur(+t.p||0)} · ${t.dest==="barra"?"barra":"cocina"}<br><small style="color:var(--tinta-3)">${rango(t)}${t.d?" · "+esc(t.d):""}</small></span><span class="agot-fila"><span class="pill ${c}">${e}</span><button class="b-ui claro" data-tmp="agot:${t.id}">${t.agot?"Hay otra vez":"Agotado"}</button><button class="b-ui claro" data-tmp="pausa:${t.id}">${t.activo===false?"Reanudar":"Pausar"}</button><button class="b-ui claro" data-tmp="del:${t.id}">Quitar</button></span></li>`; }).join("")}</ul>`:`<p class="vacio">Aún no hay nada fuera de carta.</p>`}</div>`;
  }
  function agotadosV(){
    const c=carta(), ag=cfgCarta().agotados||{};
    return `<div class="p-cab"><div><h1>Agotados</h1><p>Marca lo que se ha acabado: desaparece de las mesas al momento. Vuelve a activarlo cuando haya.</p></div></div>
      <div class="aviso-ui">${ico("box")} <b>Quedan</b>: unidades que puedes servir hoy. Bajan solas con cada pedido aceptado o pagado; al llegar a 0 sale «Agotado temporalmente» y no se puede pedir. Déjalo vacío para no llevar la cuenta.</div>
      ${secciones().map(s=>{ const ps=c.filter(p=>p.sec===s.id); if(!ps.length) return ""; return `<div class="card" style="margin-bottom:12px"><h2>${esc(s.n)}</h2><ul class="agot-lista">${ps.map(p=>`<li><span>${esc(p.n)}</span><span class="agot-fila"><label style="font-size:13px;color:var(--tinta-3)">Quedan <input class="exist-in" type="number" min="0" max="9999" inputmode="numeric" data-exist="${p.id}" value="${existDe(p.id)??""}" placeholder="—"></label><label class="interr"><input type="checkbox" data-disp="${p.id}" ${ag[p.id]?"":"checked"}><span class="pista"></span>${ag[p.id]?"Agotado":sinExist(p.id)?"Agotado temp.":sinStock(p)?"Sin stock":"Disponible"}</label></span></li>`).join("")}</ul></div>`; }).join("")}`;
  }
  function hojaAdminHTML(){
    if(!pideAdmin) return "";
    const supa=Store.modo==="supa";
    return `<div class="hoja-fondo" data-adm-fondo><div class="hoja hoja-adm" role="dialog" aria-label="Administración"><div class="asa"></div>
      <h3>${ico("lock")} Administración</h3>
      <p style="margin:0;font-size:15px;color:var(--tinta-2)">Caja, informes, inventario, compras, carta y ajustes. Solo para el encargado o el dueño.</p>
      <form id="f-admin" class="form-ll" autocomplete="off">
        ${supa?`<label>Correo del dueño o encargado<input id="adm-email" type="email" autocomplete="username" required></label><label>Contraseña<input id="adm-clave" type="password" autocomplete="current-password" required></label>`
             :`<label>Clave de administración<input id="adm-clave" type="password" inputmode="numeric" autocomplete="off" maxlength="20" required></label>`}
        ${errAdmin?`<p role="alert" style="margin:0;color:var(--critico);font-size:15px">${esc(errAdmin)}</p>`:""}
        <button class="btn rojo" type="submit">Entrar en administración</button></form>
      <button class="btn peq" data-adm-cancelar>Cancelar</button></div></div>`;
  }
  // Tarjetas extra de la sala en vivo: avisos de stock y reservas de hoy
  function salaExtra(){
    const al=alertasStock().filter(x=>x.e!=="exceso"), hoy=reservasDe(fechaISO()).filter(r=>["pendiente","confirmada"].includes(r.estado)), s=stocks();
    if(!al.length && !hoy.length) return "";
    return `<div class="rej" style="margin-bottom:14px">${hoy.length?`<div class="card ${al.length?"c6":"c12"}"><h2>${ico("calendar")} Reservas de hoy</h2><ul class="opiniones">${hoy.map(r=>`<li><b>${esc(r.hora)} · ${esc(r.nombre)} (${r.personas})${r.mesa?` · mesa ${r.mesa}`:""}</b><span>${ESTADOS_RES[r.estado][1]}${r.nota?` · «${esc(r.nota)}»`:""}</span></li>`).join("")}</ul></div>`:""}
      ${al.length?`<div class="card ${hoy.length?"c6":"c12"} ent-card"><h2>${ico("box")} Stock bajo</h2><ul class="opiniones">${al.slice(0,6).map(({a,e})=>`<li><b>${esc(a.n)}</b><span>${e==="agotado"?"Agotado":`Quedan ${fmtQ(s[a.id],a.ud)} (seguridad ${fmtQ(a.min,a.ud)})`}</span></li>`).join("")}</ul><button class="b-ui claro peq-ui" data-tab="inventario" style="margin-top:8px">Ver inventario</button></div>`:""}</div>`;
  }
  function pintar(forzar){
    const ae=document.activeElement, escribiendo=ae&&ae.id==="chat-txt"?ae.value:null;
    if(!forzar && escribiendo===null && ae && app.contains(ae) && ae.matches("input:not([type=checkbox]),textarea,select")) return;
    const sinLeer=Store.all("chat").filter(m=>m.de==="soporte"&&!m.leido).length, ent=entrantes().length;
    const resPend=Store.all("reservas").filter(r=>r.estado==="pendiente").length, alStock=alertasStock().filter(x=>x.e!=="exceso").length;
    const adm=Acceso.admin(); admAntes=adm;
    if(!adm && !SERVICIO_TABS.includes(panelTab)) panelTab="sala";
    const nAgot=Object.values(cfgCarta().agotados||{}).filter(Boolean).length;
    const grupos=[["Servicio",[["sala","Sala en vivo","live",ent],["pedidos","Pedidos","receipt"],["reservas","Reservas","calendar",resPend],["agotados","Agotados","plate",nAgot],["temporal","Fuera de carta","chef",cfgTemp().filter(tempVigente).length],["turno","Turno","users"]]],
      ...(adm?[["Negocio",[["economia","Economía y caja","euro"],["inventario","Inventario","box",alStock],["compras","Compras y proveedores","truck"],["resumen","Resumen","chart"],["rendimiento","Camareros","users"],["informe","Informe","mail"]]],
      ["Configuración",[["carta","Carta","menu"],["menu","Menú del día","plate"],["nfc","Tarjetas NFC","nfc"],["ajustes","Marca y ajustes","gear"],["reglas","Reglas","check"],["equipo","Equipo y accesos","lock"]]],
      ["Ayuda",[["soporte","Soporte","chat",sinLeer],...(Store.modo==="supa"?[["cuenta","Mi cuenta","door"]]:[])]]]:[])];
    const cuerpo={sala,agotados:agotadosV,temporal:temporalV,pedidos:pedidosV,reservas:reservasV,economia:economiaV,inventario:inventarioV,compras:comprasV,resumen:resumenV,rendimiento:rendimientoV,informe,carta:cartaV,menu:menuV,turno:turnoV,nfc:nfcV,ajustes:ajustesV,reglas:reglasV,equipo:equipoV,soporte:soporteV,cuenta:cuentaV}[panelTab]();
    app.innerHTML=`<div class="panel"><aside class="p-side"><div class="marca"><b>${esc(cfgBar().nombre)}</b><span>${adm?"panel · administración":"panel · servicio"}</span></div>
      ${adm?`<div class="adm-on"><span>${ico("lock")} Administración abierta</span><button data-admin-cerrar>Cerrar</button></div>`:""}
      <nav aria-label="Secciones del panel">${grupos.map(([g,ts])=>`<span class="grupo">${g}</span>${ts.map(([k,t,i,b])=>`<button data-tab="${k}" aria-current="${panelTab===k?"page":"false"}">${ico(i)}${t}${b?`<span class="b">${b}</span>`:""}</button>`).join("")}`).join("")}</nav>
      ${adm?"":`<button class="adm-btn" data-admin-abrir>${ico("lock")} Administración</button>`}
      <div class="abajo"><a href="#inicio">← Todas las pantallas</a>${adm&&(Store.modo!=="supa"||Store.rol==="super")?`<a href="#admin">Panel maestro ${PLATAFORMA}</a>`:""}${Store.sesion?`<button class="b-ui claro" data-salir style="font-size:13px">Cerrar sesión (${esc(Store.sesion.user.email)})</button>`:`<button class="b-ui claro" data-salir-local style="font-size:13px">${ico("door")}Salir del local</button>`}${adm?`<button class="b-ui claro" data-cerrar-dia style="font-size:13px">Cerrar el día</button><button class="b-ui claro" data-reiniciar style="font-size:13px">Borrar datos de prueba</button>`:""}<span>Funciona con ${PLATAFORMA}</span></div></aside>
      <main class="p-main">${cuerpo}</main>${hoja?hojaMesaHTML(hoja,"panel"):""}${hojaNegHTML()}${hojaAdminHTML()}</div>`;
    if(pideAdmin) app.querySelector(Store.modo==="supa"?"#adm-email":"#adm-clave")?.focus();
    app.querySelectorAll(".graf").forEach(tip);
    for(const [sel,set] of [["#q-ped",x=>qPed=x],["#q-inv",x=>qInv=x]]){ const i=app.querySelector(sel); if(i) i.addEventListener("input",()=>{ set(i.value); const pos=i.selectionStart; pintar(true); const n=app.querySelector(sel); n.focus(); n.setSelectionRange(pos,pos); }); }
    const bc=app.querySelector("#bc"); if(bc) bc.addEventListener("input",()=>{ buscar=bc.value; const pos=bc.selectionStart; pintar(true); const n=app.querySelector("#bc"); n.focus(); n.setSelectionRange(pos,pos); });
    if(escribiendo!==null){ const i=app.querySelector("#chat-txt"); if(i){ i.value=escribiendo; i.focus(); } }
    if(panelTab==="soporte"){ const l=app.querySelector("#chat-lista"); if(l) l.scrollTop=l.scrollHeight;
      Store.all("chat").filter(m=>m.de==="soporte"&&!m.leido).forEach(m=>Store.set("chat",m.id,{...m,leido:true})); }
  }
  async function clic(e){
    const t=e.target;
    Acceso.tocar();
    if(t.closest("[data-admin-abrir]")){ pideAdmin={tab:null}; errAdmin=""; return pintar(true); }
    if(t.closest("[data-adm-cancelar]")||t.matches("[data-adm-fondo]")){ pideAdmin=null; errAdmin=""; return pintar(true); }
    if(t.closest("[data-admin-cerrar]")){
      if(Store.modo==="supa"){ await Store.sb.auth.signOut(); toast("Administración cerrada. Vuelve a entrar con el usuario del local."); return; }
      Acceso.cerrarAdmin(); panelTab="sala"; toast("Administración cerrada."); return pintar(true); }
    if(t.closest("[data-salir-local]")){ Acceso.salir(); toast("Sesión del local cerrada en este dispositivo."); return reiniciarVista(); }
    { const tb=t.closest("[data-tab]"); if(tb && !SERVICIO_TABS.includes(tb.dataset.tab) && !Acceso.admin()){ pideAdmin={tab:tb.dataset.tab}; errAdmin=""; return pintar(true); } }
    if(t.closest("[data-cerrar-b]")||t.matches("[data-cerrar]")){ hoja=null; editPlato=null; hojaNeg=null; return pintar(true); }
    if(await clicValidar(t,"encargado")) return;
    if(await clicNeg(t)) return;
    if(t.closest("[data-add-rec]")){ app.querySelector("#ep-receta").insertAdjacentHTML("beforeend",filaReceta()); return; }
    const qr=t.closest("[data-quitar-rec]"); if(qr){ qr.closest(".rec-fila").remove(); return; }
    const tb=t.closest("[data-tab]"); if(tb){ panelTab=tb.dataset.tab; hoja=null; editPlato=null; hojaNeg=null; if(panelTab==="equipo") equipo=null; pintar(true); return window.scrollTo(0,0); }
    const rm=t.closest("[data-rm]"); if(rm){ modoRes=rm.dataset.rm; return pintar(true); }
    if(t.closest("[data-csv]")){ const q=v=>`"${String(v).replace(/"/g,'""')}"`, fsAll=Store.all("fichajes").sort((a,b)=>a.ini-b.ini), min=ms=>Math.round(ms/60000);
      const L=[["camarero","fecha","entrada","salida","pausas","minutos_en_pausa","minutos_trabajados"].join(";"),...fsAll.map(f=>[q(nomCam(f.cam)),new Date(f.ini).toLocaleDateString("es-ES"),hhmm(f.ini),f.fin?hhmm(f.fin):"sin salida",(f.pausas||[]).length,min(pausadoMs(f,f.fin||ahora())),min(trabajadoMs(f))].join(";"))];
      const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+L.join("\n")],{type:"text/csv;charset=utf-8"})); a.download="registro-jornada-"+TENANT+"-"+new Date().toISOString().slice(0,10)+".csv"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); return; }
    const pr=t.closest("[data-perr]"); if(pr){ perRend=+pr.dataset.perr; return pintar(true); }
    const fc=t.closest("[data-fich-cerrar]"); if(fc){ const f=Store.get("fichajes",fc.dataset.fichCerrar); if(f&&!f.fin){ const tt=ahora(); await Store.set("fichajes",f.id,{...f,pausas:(f.pausas||[]).map(x=>x.b?x:{...x,b:tt}),fin:tt}); toast("Fichaje cerrado."); } return pintar(true); }
    const inf=t.closest("[data-inf]"); if(inf){ periodoInf=+inf.dataset.inf; return pintar(true); }
    const pm=t.closest("[data-pm]"); if(pm){ hoja=+pm.dataset.pm; return pintar(true); }
    if(await clicParcial(t,"encargado")) return pintar(true);
    const cm=t.closest("[data-cobrar]"); if(cm){ const n=+cm.dataset.cobrar, tot=totalMesa(mesa(n)); await Acc.cerrar(n,"encargado",cm.dataset.forma); hoja=null; toast(tot?`Mesa ${n}: cobrada (${eur(tot)}). Vuelve a estar libre.`:`Mesa ${n} libre.`); return pintar(true); }
    const cp=t.closest("[data-copiar]"); if(cp){ try{ await navigator.clipboard.writeText(enlaceMesa(+cp.dataset.copiar)); toast(`Enlace de la mesa ${cp.dataset.copiar} copiado.`); }catch(_){ toast("No se ha podido copiar. Mantén pulsado el enlace para copiarlo."); } return; }
    if(t.closest("[data-copiar-todo]")){ try{ await navigator.clipboard.writeText(Array.from({length:mesasN()},(_,i)=>`Mesa ${i+1}: ${enlaceMesa(i+1)||"(sin enlace)"}`).join("\n")); toast("Todos los enlaces copiados."); }catch(_){ toast("No se ha podido copiar."); } return; }
    if(t.closest("[data-gen-nfc]")){ await Acc.enlaces(false); toast("Enlaces creados. Ya puedes grabar las tarjetas."); return pintar(true); }
    const rg=t.closest("[data-regen]"); if(rg){ if(!rg.dataset.seguro){ rg.dataset.seguro=1; rg.textContent="¿Seguro?"; return; } const n=+rg.dataset.regen; await Store.set("nfc",n,{n,token:tokenNuevo(),manual:true}); toast(`Mesa ${n}: enlace nuevo. Graba otra vez su tarjeta; la anterior ya no sirve.`); return pintar(true); }
    const rt=t.closest("[data-regen-todos]"); if(rt){ if(!rt.dataset.seguro){ rt.dataset.seguro=1; rt.textContent="Pulsa otra vez: todas las tarjetas dejarán de servir"; return; } await Acc.enlaces(true); toast("Todos los enlaces cambiados. Graba de nuevo las tarjetas."); return pintar(true); }
    if(t.closest("[data-copiar-inf]")){ try{ await navigator.clipboard.writeText(app.querySelector("#inf").value); toast("Informe copiado. Pégalo en WhatsApp o en un correo."); }catch(_){ app.querySelector("#inf").select(); toast("Selecciona el texto y cópialo."); } return; }
    const ep=t.closest("[data-edit-plato]"); if(ep){ editPlato=ep.dataset.editPlato; return pintar(true); }
    const qp=t.closest("[data-quitar-plato]"); if(qp){ if(!qp.dataset.seguro){ qp.dataset.seguro=1; qp.textContent="¿Seguro?"; return; } const c=cfgCarta(); await Acc.carta({platos:c.platos.filter(x=>x.id!==qp.dataset.quitarPlato)}); toast("Plato quitado de la carta."); return pintar(true); }
    const qs=t.closest("[data-quitar-sec]"); if(qs){ const id=qs.dataset.quitarSec, c=cfgCarta(); if(c.platos.some(p=>p.sec===id)) return toast("Esta sección tiene platos: muévelos a otra sección o quítalos antes."); if(c.secciones.length<2) return toast("Tiene que quedar al menos una sección."); await Acc.carta({secciones:c.secciones.filter(s=>s.id!==id)}); toast("Sección quitada."); return pintar(true); }
    const sm=t.closest("[data-sec-mover]"); if(sm){ const i=+sm.dataset.secMover, j=i+(+sm.dataset.dir), s=[...cfgCarta().secciones]; if(j<0||j>=s.length) return; [s[i],s[j]]=[s[j],s[i]]; await Acc.carta({secciones:s}); return pintar(true); }
    if(t.closest("[data-quitar-logo]")){ await Acc.bar({logo:""}); toast("Logo quitado: se muestra el nombre."); return pintar(true); }
    if(t.closest("[data-audit]")){ AUDIT.estado="Cargando…"; pintar(true);
      try{ const {data,error}=await Store.sb.from("auditoria").select("t,col,doc_id,op,email,antes,despues").eq("tenant",TENANT).order("t",{ascending:false}).limit(400); if(error) throw error; AUDIT.filas=data||[]; AUDIT.estado=""; }
      catch(e){ AUDIT.filas=null; AUDIT.estado="No se ha podido cargar (solo lo ve el dueño)."; }
      return pintar(true); }
    const tg=t.closest("[data-tmp]"); if(tg){ const [acc,id]=tg.dataset.tmp.split(":"); let its=cfgTemp().map(x=>({...x}));
      if(acc==="del"){ if(!tg.dataset.seg){ tg.dataset.seg=1; tg.textContent="¿Seguro?"; return; } its=its.filter(x=>x.id!==id); }
      else its=its.map(x=>x.id!==id?x:acc==="agot"?{...x,agot:!x.agot}:{...x,activo:x.activo===false});
      await Acc.temporal(its); return pintar(true); }
    const qm=t.closest("[data-quitar-miembro]"); if(qm){ if(!qm.dataset.seguro){ qm.dataset.seguro=1; qm.textContent="¿Seguro?"; return; } try{ const {error}=await Store.sb.rpc("asignar_miembro",{p_tenant:TENANT,p_email:qm.dataset.quitarMiembro,p_rol:null}); if(error) throw error; toast("Acceso quitado."); }catch(_){ toast("No se ha podido quitar."); } equipo=null; return pintar(true); }
    if(t.closest("[data-add-cam]")){ const cont=app.querySelector("#aj-cams"), k=cont.children.length, colores=["#2f7d32","#7b3fa0","#d07a00","#227c8a","#b0306a"];
      cont.insertAdjacentHTML("beforeend",`<div class="cam-edit" data-cid="c${nid().slice(-5)}"><input type="color" value="${colores[k%colores.length]}" aria-label="Color"><input value="" placeholder="Nombre" maxlength="20" aria-label="Nombre del camarero"><button type="button" class="b-ui claro" data-quitar-cam>Quitar</button></div>`);
      cont.lastElementChild.querySelector("input:not([type=color])").focus(); toast("Escribe el nombre y pulsa «Guardar ajustes»."); return; }
    const qc=t.closest("[data-quitar-cam]"); if(qc){ const cont=app.querySelector("#aj-cams"); if(cont.children.length<2) return toast("Tiene que quedar al menos un camarero."); qc.closest(".cam-edit").remove(); toast("Pulsa «Guardar ajustes» para aplicarlo. Sus mesas pasarán a los demás."); return; }
    const cd=t.closest("[data-cerrar-dia]"); if(cd){ if(!cd.dataset.seguro){ cd.dataset.seguro=1; cd.textContent="Pulsa otra vez para confirmar"; return; } await Acc.cerrarDia(); toast("Día cerrado: resumen guardado y lo terminado, archivado."); return pintar(true); }
    const rs=t.closest("[data-reiniciar]"); if(rs){ if(!rs.dataset.seguro){ rs.dataset.seguro=1; rs.textContent="Pulsa otra vez: se borra la actividad"; return; } await Acc.reiniciar(); toast("Datos de prueba borrados. La marca, la carta y las tarjetas se mantienen."); return pintar(true); }
  }
  async function cambio(e){
    const t=e.target;
    if(await cambioNeg(t)) return;
    if(t.dataset.jornada){ const h=Math.max(0,Math.min(24,parseFloat(String(t.value).replace(",","."))||0)); await Acc.jornada(t.dataset.jornada,h); toast(`Jornada de ${nomCam(t.dataset.jornada)}: ${h} h al día.`); return pintar(true); }
    if(t.matches("[data-rec-a]")){ const u=t.closest(".rec-fila").querySelector(".ud"); u.textContent=(ART(t.value)||{}).ud||""; return; }
    if(t.dataset.exist!==undefined){ const id=t.dataset.exist, v=String(t.value).trim(), ex={...cfgExist()};
      if(v===""){ delete ex[id]; } else { const q=Math.max(0,Math.min(9999,parseInt(v)||0)); ex[id]=q; }
      await Store.set("config","existencias",ex); toast(v===""?`${P(id).n}: sin límite.`:+ex[id]===0?`${P(id).n}: agotado temporalmente.`:`${P(id).n}: quedan ${ex[id]}.`); t.blur(); return pintar(true); }
    if(t.dataset.disp){ const id=t.dataset.disp; await Acc.carta({agotados:{[id]:!t.checked}}); toast(t.checked?`${P(id).n} vuelve a la carta.`:`${P(id).n} agotado: desaparece de las mesas al momento.`); return pintar(true); }
    if(t.dataset.precio){ const id=t.dataset.precio, v=Math.round(parseFloat(String(t.value).replace(",","."))*100)/100; if(v>=0){ await Acc.plato(id,{p:v}); toast(`${P(id).n}: ${eur(v)}. Ya está en la carta.`); } else { t.value=precio(id); toast("Pon un precio válido."); } t.blur(); return pintar(true); }
    if(t.dataset.activo){ const activos={...cfgTurno().activos,[t.dataset.activo]:t.checked}; await Acc.turno({activos}); toast(`${nomCam(t.dataset.activo)} ${t.checked?"entra en turno.":"libra hoy."}`); return pintar(true); }
    if(t.id==="escala"){ const v=Math.min(300,Math.max(15,+t.value||60)); await Acc.turno({escala:v}); toast(`Hecho: si nadie contesta en ${v} s, el aviso se marca como urgente.`); t.blur(); return pintar(true); }
    if(t.id==="mn-activo"){ await Acc.menu({activo:t.checked}); toast(t.checked?"Menú del día visible en la carta y las mesas.":"Menú del día oculto."); return pintar(true); }
    if(t.dataset.regla){ const k=t.dataset.regla; await Acc.reglas({[k]:t.checked}); toast({validar:t.checked?"Los pedidos esperarán a que sala los confirme.":"Los pedidos irán directos a cocina y barra.",llevar:t.checked?"Pedidos para llevar activados.":"Pedidos para llevar desactivados.",valorar:t.checked?"Se pedirá valoración con la cuenta.":"Ya no se pide valoración.",sugerir:t.checked?"Venta sugerida activada.":"Venta sugerida desactivada."}[k]); return pintar(true); }
    if(t.dataset.secCampo){ const sid=t.closest("[data-sid]").dataset.sid, k=t.dataset.secCampo, v=t.value.trim(), c=cfgCarta();
      if(k==="n"&&!v){ t.value=secDe(sid).n; return toast("La sección necesita un nombre."); }
      await Acc.carta({secciones:c.secciones.map(s=>s.id!==sid?s:k==="dest"?{...s,dest:v,icono:ICONO_DEST[v]}:{...s,[k]:v,en:null,pt:null})}); toast("Sección guardada."); t.blur(); return pintar(true); }
    if(t.id==="aj-logo"){ const f=t.files&&t.files[0]; if(!f) return;
      try{ const u=await leerLogo(f); if(u.length>450000) return toast("El logo es demasiado pesado. Prueba con una imagen más sencilla."); await Acc.bar({logo:u}); toast("Logo actualizado en todas las pantallas."); }
      catch(_){ toast("No se ha podido leer la imagen. Usa un PNG o un JPG."); } return pintar(true); }
  }
  async function enviar(e){
    e.preventDefault(); const f=e.target, v=id=>f.querySelector(id)?.value??"";
    if(f.id==="f-admin"){
      const destino=pideAdmin&&pideAdmin.tab;
      if(Store.modo==="supa"){
        const {error}=await Store.sb.auth.signInWithPassword({email:v("#adm-email").trim(),password:v("#adm-clave")});
        if(error){ errAdmin="Correo o contraseña incorrectos."; return pintar(true); }
        await leerRol(); if(!["dueno","super"].includes(Store.rol)){ errAdmin="Esa cuenta no es de dueño ni encargado de este restaurante."; await Store.sb.auth.signOut(); return; }
        if(Store.recargar) await Store.recargar().catch(()=>{});
      } else {
        if(!(await Acceso.comprobarAdmin(v("#adm-clave")))){ errAdmin="Clave incorrecta."; pintar(true); const i=app.querySelector("#adm-clave"); if(i){ i.value=""; i.focus(); } return; }
        Acceso.abrirAdmin();
      }
      pideAdmin=null; errAdmin=""; if(destino) panelTab=destino; toast("Administración abierta. Se cierra sola tras 15 minutos sin uso."); return pintar(true); }
    if(f.id==="f-acceso"){
      const c={...(Store.get("config","seguridad")||{})}, u=v("#ac-u").trim().toLowerCase(), p=v("#ac-p"), a=v("#ac-a");
      if(!/^[a-z0-9._-]{3,30}$/.test(u)) return toast("El usuario: de 3 a 30 letras o números, sin espacios.");
      if(p && p.length<4) return toast("La contraseña del local necesita al menos 4 caracteres.");
      if(a && !/^\d{4,12}$/.test(a)) return toast("La clave de administración: de 4 a 12 cifras.");
      if(!p && u!==Acceso.usuario()) return toast("Para cambiar el usuario, escribe también la contraseña.");
      if(p) c.local={usuario:u,hash:await Acceso.hLocal(u,p)};
      if(a) c.admin=await Acceso.hAdmin(a);
      if(!p && !a) return toast("Nada que cambiar.");
      await Store.set("config","seguridad",c); f.reset(); toast("Accesos guardados."); return pintar(true); }
    if(await enviarNeg(f)) return;
    if(f.id==="f-menu"){ const lineas=s=>s.split("\n").map(x=>x.trim()).filter(Boolean);
      const m={precio:Math.max(0,parseFloat(v("#mn-precio"))||0),cuando:v("#mn-cuando").trim(),incluye:v("#mn-incluye").trim(),primeros:lineas(v("#mn-1")),segundos:lineas(v("#mn-2")),postres:lineas(v("#mn-3"))};
      if(!m.primeros.length||!m.segundos.length||!m.postres.length) return toast("Pon al menos un primero, un segundo y un postre.");
      await Acc.menu(m); document.activeElement?.blur(); toast("Menú del día publicado. Ya sale en la carta y en las mesas."); return pintar(true); }
    if(f.id==="f-plato"){ const n=v("#np-n").trim(), p=parseFloat(String(v("#np-p")).replace(",",".")); if(!n||!(p>=0)) return toast("Pon nombre y precio.");
      const c=cfgCarta(), a=[...f.querySelectorAll(".al-sel input:checked")].map(x=>x.value);
      await Acc.carta({platos:[...c.platos,{id:"x"+nid().slice(-7),sec:v("#np-s"),n,d:v("#np-d").trim(),p:Math.round(p*100)/100,a,u:"",etq:"",top:false,modelo:"",medida:""}]});
      document.activeElement?.blur(); toast(`${n} añadido a la carta.`); return pintar(true); }
    if(f.id==="f-edit-plato"){ const n=v("#ep-n").trim(), p=parseFloat(String(v("#ep-p")).replace(",",".")); if(!n||!(p>=0)) return toast("Pon nombre y precio.");
      const a=[...f.querySelectorAll(".al-sel input:checked")].map(x=>x.value), tr=(x,y)=>v(x).trim()?[v(x).trim(),v(y).trim()]:null;
      const receta=[...f.querySelectorAll(".rec-fila")].map(r=>({a:r.querySelector("[data-rec-a]").value,q:parseFloat(String(r.querySelector("[data-rec-q]").value).replace(",","."))})).filter(r=>r.a&&r.q>0);
      await Acc.plato(editPlato,{n,d:v("#ep-d").trim(),sec:v("#ep-s"),p:Math.round(p*100)/100,a,etq:v("#ep-etq").trim(),u:v("#ep-u").trim(),foto:safeUrl(v("#ep-foto").trim())||"",top:f.querySelector("#ep-top").checked,en:tr("#ep-en-n","#ep-en-d"),pt:tr("#ep-pt-n","#ep-pt-d"),coste:Math.max(0,parseFloat(String(v("#ep-coste")).replace(",","."))||0),receta});
      editPlato=null; document.activeElement?.blur(); toast(`${n} guardado.`); return pintar(true); }
    if(f.id==="f-sec"){ const n=v("#ns-n").trim(), d=v("#ns-d"), c=cfgCarta(); if(!n) return;
      await Acc.carta({secciones:[...c.secciones,{id:"s"+nid().slice(-7),n,nota:"",dest:d,icono:ICONO_DEST[d]}]}); toast(`Sección «${n}» añadida. Aparecerá en la carta cuando tenga platos.`); return pintar(true); }
    if(f.id==="f-import"){ const txt=v("#imp-txt"), sust=f.querySelector("#imp-sust").checked, c=cfgCarta(); if(!txt.trim()) return toast("Pega primero la carta.");
      const r=importarCarta(txt, sust?{secciones:[],platos:[]}:c); if(!r.n) return toast("No se ha reconocido ningún plato. Usa el formato Sección | Plato | Precio.");
      await Acc.carta({secciones:r.secciones,platos:r.platos}); document.activeElement?.blur();
      toast(`${r.n} ${r.n===1?"plato importado":"platos importados"}${r.malas.length?`. Revisa las líneas ${r.malas.join(", ")}`:""}.`); return pintar(true); }
    if(f.id==="f-temp"){ const n=v("#tp-n").trim(), p=parseFloat(String(v("#tp-p")).replace(",",".")); if(!n||!(p>0)) return toast("Pon nombre y precio.");
      const dur=v("#tp-dur"), hoy=fechaISO(), dow=new Date().getDay(); let desde=hoy, hasta=null;
      if(dur==="hoy") hasta=hoy; else if(dur==="semana") hasta=fechaISO(dow===0?0:7-dow); else if(dur==="7") hasta=fechaISO(6);
      else if(dur==="fechas"){ desde=v("#tp-desde")||hoy; hasta=v("#tp-hasta")||null; if(!hasta) return toast("Elige hasta qué día."); if(hasta<desde) return toast("La fecha final no puede ser anterior a la inicial."); }
      await Acc.temporal([...cfgTemp(),{id:"tmp-"+nid().slice(-8),n,d:v("#tp-d").trim(),p:Math.round(p*100)/100,dest:v("#tp-dest"),desde,hasta,activo:true,agot:false}]);
      document.activeElement?.blur(); toast(`${n} ya sale en la carta${hasta?" hasta el "+fmtD(hasta):""}.`); return pintar(true); }
    if(f.id==="f-legal"){ await Acc.legal({razon:v("#lg-razon").trim(),nif:v("#lg-nif").trim().toUpperCase(),domicilio:v("#lg-dom").trim(),email:v("#lg-email").trim(),telefono:v("#lg-tel").trim()}); document.activeElement?.blur(); toast("Datos legales guardados. Ya salen en las páginas legales."); return pintar(true); }
    if(f.id==="f-bar"){ const camareros=[...f.querySelectorAll(".cam-edit")].map(r=>({id:r.dataset.cid,color:r.querySelector("input[type=color]").value,n:r.querySelector("input:not([type=color])").value.trim()||"Camarero"}));
      const mesas=Math.max(1,Math.min(99,parseInt(v("#aj-mesas"))||20));
      await Acc.bar({nombre:v("#aj-nombre").trim()||cfgBar().nombre,ciudad:v("#aj-ciudad").trim(),eslogan:v("#aj-eslogan").trim(),color:v("#aj-color"),color2:v("#aj-color2"),estilo:v("#aj-estilo"),mesas,interiorHasta:Math.max(0,Math.min(mesas,parseInt(v("#aj-int"))||0)),google:v("#aj-google").trim(),camareros});
      await Acc.privado({telefono:v("#aj-tel").trim(),email:v("#aj-email").trim()});
      await Acc.enlaces(false);
      document.activeElement?.blur(); toast("Ajustes guardados. Se aplican al momento en todas las pantallas."); return pintar(true); }
    if(f.id==="f-chat"){ const txt=v("#chat-txt").trim(); if(!txt) return; await Acc.chat(txt,"bar",Store.sesion?.user?.email||cfgBar().nombre); f.reset(); pintar(true); app.querySelector("#chat-txt")?.focus(); return; }
    if(f.id==="f-equipo"){ const email=v("#eq-email").trim(), rol=v("#eq-rol");
      try{ const {data,error}=await Store.sb.rpc("asignar_miembro",{p_tenant:TENANT,p_email:email,p_rol:rol}); if(error) throw error;
        if(data==="no_existe") return toast("No hay ninguna cuenta con ese correo. Pide a soporte que la cree.");
        toast(`${email} ya tiene acceso como ${ROLES[rol]}.`); equipo=null; return pintar(true); }catch(_){ toast("No se ha podido dar acceso."); } }
  }
  app.addEventListener("click",clic); app.addEventListener("change",cambio); app.addEventListener("submit",enviar);
  return { titulo:"Panel · "+cfgBar().nombre, pintar:()=>pintar(), salir(){ app.removeEventListener("click",clic); app.removeEventListener("change",cambio); app.removeEventListener("submit",enviar); },
    tic(){ if(admAntes && !Acceso.admin()){ admAntes=false; pideAdmin=null; toast("Administración cerrada por inactividad."); return pintar(true); }
      if(panelTab==="sala"&&!hoja){ const n=avisosAbiertos().filter(escalado).length; if(this._s!==undefined && this._s!==n) pintar(); this._s=n; } } };
}

/* =====================================================================
   VISTA: PANEL MAESTRO (super-admin de la plataforma)
   Todos los restaurantes en un sitio: crear demos y clientes, entrar en
   su panel para editar o ayudar, pausar el servicio y chat de soporte.
   ===================================================================== */
const ROLES = {dueno:"Dueño", sala:"Sala", cocina:"Cocina y barra", super:"Super-admin"};
function chatHTML(msgs, yo){
  return `<div class="chat" id="chat-lista">${msgs.length?msgs.map(m=>`<div class="msg ${m.de===yo?"yo":""}"><span>${esc(m.texto)}</span><small>${m.de==="soporte"?`${PLATAFORMA} soporte`:esc(m.autor||"Restaurante")} · ${new Date(m.t).toLocaleString("es-ES",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</small></div>`).join(""):`<p class="vacio-ui">Aún no hay mensajes.</p>`}</div>`;
}
// Datos de todos los restaurantes: base de datos (super-admin) o los guardados en este navegador
const Maestro = {
  async lista(){
    if(Store.modo==="supa"){ const {data,error}=await Store.sb.rpc("panel_maestro"); if(error) throw error; return (data||[]).map(r=>({...r,ultima:r.ultima?new Date(r.ultima).getTime():0})); }
    const reg=Local.registro(), hoy=inicioDia();
    return reg.map(r=>{ const o=Local.leerDe(r.slug), v=c=>Object.values(o[c]||{}), bar=(o.config||{}).bar||{};
      return {...r, nombre:bar.nombre||r.nombre, activo:bar.activo!==false&&r.activo!==false,
        mesas_abiertas:v("mesas").filter(m=>m.abierta).length, pedidos_hoy:v("pedidos").filter(p=>p.t>=hoy).length,
        entrantes:v("pedidos").filter(p=>!p.aceptado&&!p.rechazado&&!p.servido&&!p.recogido).length,
        ultima:Math.max(0,...v("pedidos").map(p=>p.t),...v("chat").map(c=>c.t),...v("mesas").map(m=>m.desde||m.cerradaT||0)),
        chat_sin_leer:v("chat").filter(c=>c.de==="bar"&&!c.leido).length}; });
  },
  async escribir(t,c,id,data){
    if(Store.modo==="supa"){
      if(data===null){ const {error}=await Store.sb.from("docs").delete().eq("tenant",t).eq("col",c).eq("id",String(id)); if(error) throw error; }
      else { const {error}=await Store.sb.from("docs").upsert({tenant:t,col:c,id:String(id),data,updated_at:new Date().toISOString()}); if(error) throw error; }
      if(t===TENANT){ if(data===null) Store.data[c].delete(String(id)); else Store.data[c].set(String(id),data); Store.emit(); }
      return;
    }
    Local.escribirDoc(t,c,id,data);
  },
  async leer(t,c){
    if(Store.modo==="supa"){ const {data,error}=await Store.sb.from("docs").select("id,data").eq("tenant",t).eq("col",c); if(error) throw error; return Object.fromEntries((data||[]).map(r=>[r.id,r.data])); }
    return Local.leerDe(t)[c]||{};
  },
  // Crea un restaurante nuevo: marca, carta (ejemplo, vacía, pegada o copiada de otro), reglas y enlaces NFC
  async crear({slug,nombre,ciudad,color,mesas,origen,texto,copiarDe}){
    let carta={secciones:SECCIONES_DEF,platos:PLATOS_DEF,agotados:{}}, menu=null, reglas={...REGLAS_DEF}, barBase={};
    if(origen==="vacia") carta={secciones:[{id:"comida",n:"Comida",nota:"",dest:"cocina",icono:"sarten"},{id:"bebidas",n:"Bebidas",nota:"",dest:"barra",icono:"copa"}],platos:[],agotados:{}};
    if(origen==="pegada"){ const r=importarCarta(texto||"",{secciones:[],platos:[]}); if(!r.n) throw new Error("carta"); carta={secciones:r.secciones,platos:r.platos,agotados:{}}; }
    if(origen==="copia" && copiarDe){ const cf=await this.leer(copiarDe,"config"); if(cf.carta) carta={...cf.carta,agotados:{}}; if(cf.menu) menu=cf.menu; if(cf.reglas) reglas=cf.reglas; if(cf.bar) barBase={estilo:cf.bar.estilo,color2:cf.bar.color2,eslogan:cf.bar.eslogan,camareros:cf.bar.camareros}; }
    if(Store.modo==="supa"){ const {error}=await Store.sb.from("restaurantes").insert({slug,nombre}); if(error) throw error; }
    else { const reg=Local.registro(); if(reg.some(r=>r.slug===slug)) throw new Error("existe"); reg.push({slug,nombre,activo:true,plan:"demo",notas:"",creado:ahora()}); Local.guardarRegistro(reg); }
    await this.escribir(slug,"config","bar",{...BAR_DEF,...barBase,nombre,ciudad,color,mesas,interiorHasta:Math.ceil(mesas*.6),logo:"",activo:true});
    await this.escribir(slug,"config","carta",carta);
    await this.escribir(slug,"config","reglas",reglas);
    await this.escribir(slug,"config","menu",menu||{...MENU_DEF,activo:origen==="ejemplo"});
    for(let n=1;n<=mesas;n++) await this.escribir(slug,"nfc",n,{n,token:tokenNuevo()});
  },
  async estado(slug,estado,nota){
    const activo=estado==="activo"||estado==="aviso";
    if(Store.modo==="supa"){ const {error}=await Store.sb.rpc("cambiar_estado",{p_slug:slug,p_estado:estado,p_nota:nota||""}); if(error) throw error; }
    else Local.guardarRegistro(Local.registro().map(r=>r.slug===slug?{...r,activo,estado}:r));
    const bar=(await this.leer(slug,"config")).bar||{...BAR_DEF}; await this.escribir(slug,"config","bar",{...bar,activo});
  },
  async activar(slug,activo){
    if(Store.modo==="supa"){ const {error}=await Store.sb.from("restaurantes").update({activo}).eq("slug",slug); if(error) throw error; }
    else Local.guardarRegistro(Local.registro().map(r=>r.slug===slug?{...r,activo}:r));
    const bar=(await this.leer(slug,"config")).bar||{...BAR_DEF}; await this.escribir(slug,"config","bar",{...bar,activo});
  },
  async notas(slug,cambios){
    if(Store.modo==="supa"){ const {error}=await Store.sb.from("restaurantes").update(cambios).eq("slug",slug); if(error) throw error; }
    else Local.guardarRegistro(Local.registro().map(r=>r.slug===slug?{...r,...cambios}:r));
  },
  async chat(slug){ return Object.values(await this.leer(slug,"chat")).sort((a,b)=>a.t-b.t); },
  async responder(slug,texto,autor){ const id=nid(); await this.escribir(slug,"chat",id,{id,de:"soporte",autor,texto,t:ahora(),leido:false}); },
  async leidos(slug,msgs){ for(const m of msgs.filter(m=>m.de==="bar"&&!m.leido)) await this.escribir(slug,"chat",m.id,{...m,leido:true}); }
};
// Asegura que el restaurante actual figure en el registro local (modo demo)
function registrarLocal(){
  if(Store.modo!=="local") return; const reg=Local.registro();
  if(!reg.some(r=>r.slug===TENANT)){ reg.push({slug:TENANT,nombre:cfgBar().nombre,activo:true,plan:"demo",notas:"",creado:ahora()}); Local.guardarRegistro(reg); }
}
function VAdmin(){
  let tab="restaurantes", lista=null, cargando=false, sel=null, msgs=[], equipo=null, creado=null, canal=null, ultimaCarga=0;
  // Avisos: solicitudes de visita que llegan desde el formulario de la web
  let sols=null, solCarga=0, solAbierta=null; const fil={q:"",ciudad:"",estado:"",periodo:""};
  const EST_SOL={nueva:["critico","Nueva"],contactada:["aviso","Contactada"],visita:["azul","Visita quedada"],cliente:["ok","Cliente"],descartada:["","Descartada"]};
  async function cargarSols(){ solCarga=ahora();
    if(Store.modo!=="supa"){ if(!sols) sols=[{id:"d1",creado:new Date(ahora()-36e5).toISOString(),nombre:"Lucía Gómez",local:"Bar El Puente",ciudad:"Almendralejo",mesas:14,telefono:"600 111 222",email:"",mensaje:"Tenemos terraza en verano.",estado:"nueva",notas:""},{id:"d2",creado:new Date(ahora()-3*864e5).toISOString(),nombre:"Pedro Ruiz",local:"Taberna La Plaza",ciudad:"Mérida",mesas:20,telefono:"",email:"pedro@ejemplo.es",mensaje:"",estado:"contactada",notas:"Llamar el lunes"}]; return; }
    const {data,error}=await Store.sb.from("solicitudes").select("*").order("creado",{ascending:false}).limit(2000); if(!error) sols=data||[]; }
  const normT=x=>String(x||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
  function solsFiltradas(){ const q=normT(fil.q), lim={"7":7,"30":30,"90":90}[fil.periodo]; return (sols||[]).filter(x=>(!fil.estado||x.estado===fil.estado)&&(!fil.ciudad||normT(x.ciudad)===fil.ciudad)&&(!lim||new Date(x.creado).getTime()>ahora()-lim*864e5)&&(!q||normT([x.nombre,x.local,x.ciudad,x.telefono,x.email,x.mensaje,x.notas].join(" ")).includes(q))); }
  function avisosV(){
    if(!sols){ if(ahora()-solCarga>3000) cargarSols().then(()=>pintar(true)); return `<p class="vacio-ui">Cargando avisos…</p>`; }
    const ciudades=[...new Map(sols.filter(x=>x.ciudad).map(x=>[normT(x.ciudad),x.ciudad.trim()])).entries()].sort((a,b)=>a[1].localeCompare(b[1],"es"));
    const L=solsFiltradas(), nuevas=sols.filter(x=>x.estado==="nueva").length, mes=sols.filter(x=>new Date(x.creado).getTime()>ahora()-30*864e5).length;
    const fecha=t=>new Date(t).toLocaleDateString("es-ES",{day:"numeric",month:"short"})+" · "+new Date(t).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
    const opt=(v,t,cur)=>`<option value="${esc(v)}" ${cur===v?"selected":""}>${esc(t)}</option>`;
    return `<div class="p-cab"><div><h1>Avisos</h1><p>Solicitudes de visita que llegan desde el formulario de la web.</p></div><button class="b-ui claro" data-sol-csv>Exportar a Excel (CSV)</button></div>
      <div class="kpis">
        <div class="card kpi"><small>Nuevas</small><strong style="color:${nuevas?"var(--critico)":"inherit"}">${nuevas}</strong><span class="d">sin atender</span></div>
        <div class="card kpi"><small>Últimos 30 días</small><strong>${mes}</strong><span class="d">solicitudes</span></div>
        <div class="card kpi"><small>Total</small><strong>${sols.length}</strong><span class="d">desde el inicio</span></div>
        <div class="card kpi"><small>Ciudades</small><strong>${ciudades.length}</strong><span class="d">distintas</span></div>
      </div>
      <div class="card sol-filtros">
        <label>Buscar<input class="campo" id="sf-q" value="${esc(fil.q)}" placeholder="Nombre, local, teléfono, correo…" autocomplete="off"></label>
        <label>Ciudad / localidad<select class="campo" id="sf-ciudad">${opt("","Todas",fil.ciudad)}${ciudades.map(([k,n])=>opt(k,n,fil.ciudad)).join("")}</select></label>
        <label>Estado<select class="campo" id="sf-estado">${opt("","Todos",fil.estado)}${Object.entries(EST_SOL).map(([k,[,n]])=>opt(k,n,fil.estado)).join("")}</select></label>
        <label>Fecha<select class="campo" id="sf-periodo">${opt("","Siempre",fil.periodo)}${opt("7","Últimos 7 días",fil.periodo)}${opt("30","Últimos 30 días",fil.periodo)}${opt("90","Últimos 90 días",fil.periodo)}</select></label>
        ${fil.q||fil.ciudad||fil.estado||fil.periodo?`<button class="b-ui claro peq-ui" data-sol-limpiar>Quitar filtros</button>`:""}
      </div>
      <p class="ayuda" style="margin:10px 2px">${L.length} de ${sols.length} solicitudes</p>
      <div class="tabla-wrap"><table class="datos"><thead><tr><th>Fecha</th><th>Local</th><th>Contacto</th><th>Ciudad</th><th style="text-align:right">Mesas</th><th>Estado</th><th></th></tr></thead><tbody>
      ${L.map(x=>`<tr${x.estado==="nueva"?' class="sol-nueva"':""}><td style="white-space:nowrap">${fecha(x.creado)}</td><td><b>${esc(x.local)}</b></td>
        <td>${esc(x.nombre)}${x.telefono?`<br><a href="tel:${esc(x.telefono.replace(/\s/g,""))}">${esc(x.telefono)}</a>`:""}${x.email?`<br><a href="mailto:${esc(x.email)}">${esc(x.email)}</a>`:""}</td>
        <td>${esc(x.ciudad||"—")}</td><td style="text-align:right">${x.mesas??"—"}</td>
        <td><select class="campo peq-sel" data-sol-estado="${esc(x.id)}" aria-label="Estado de ${esc(x.local)}">${Object.entries(EST_SOL).map(([k,[,n]])=>opt(k,n,x.estado)).join("")}</select></td>
        <td><button class="b-ui claro peq-ui" data-sol-ver="${esc(x.id)}">${solAbierta===x.id?"Cerrar":"Ver"}</button></td></tr>
        ${solAbierta===x.id?`<tr class="sol-det"><td colspan="7"><div class="sol-det-in"><div><small>Mensaje</small><p>${x.mensaje?esc(x.mensaje):"<i>Sin mensaje</i>"}</p></div>
          <form class="sol-notas" data-sol-notas="${esc(x.id)}"><label><small>Notas internas</small><textarea class="campo" name="notas" maxlength="2000" placeholder="Llamado el martes, quedamos el jueves…">${esc(x.notas||"")}</textarea></label><div class="acc-fila"><button class="b-ui" type="submit">Guardar notas</button><button class="b-ui claro" type="button" data-sol-borrar="${esc(x.id)}">Borrar solicitud</button></div></form></div></td></tr>`:""}`).join("")||`<tr><td colspan="7" class="vacio-ui">${sols.length?"Ninguna solicitud con estos filtros.":"Todavía no ha llegado ninguna solicitud desde la web."}</td></tr>`}
      </tbody></table></div>`;
  }
  async function guardarSol(id,cambios){
    if(Store.modo==="supa"){ const {error}=await Store.sb.from("solicitudes").update({...cambios,actualizado:new Date().toISOString()}).eq("id",id); if(error) throw error; }
    sols=sols.map(x=>x.id===id?{...x,...cambios}:x);
  }
  function csvSols(){ const q=v=>`"${String(v??"").replace(/"/g,'""')}"`; const L=solsFiltradas();
    const filas=[["fecha","local","nombre","telefono","correo","ciudad","mesas","estado","mensaje","notas"].join(";"),...L.map(x=>[new Date(x.creado).toLocaleString("es-ES"),x.local,x.nombre,x.telefono,x.email,x.ciudad,x.mesas,EST_SOL[x.estado]?.[1]||x.estado,x.mensaje,x.notas].map(q).join(";"))];
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+filas.join("\n")],{type:"text/csv;charset=utf-8"})); a.download="avisos-metriiax.csv"; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); }
  const enlace=(slug,h)=>location.href.split("#")[0].split("?")[0]+"?r="+slug+h;
  async function cargar(){
    if(cargando) return; cargando=true;
    try{ lista=await Maestro.lista(); ultimaCarga=ahora(); if(sel){ msgs=await Maestro.chat(sel); await Maestro.leidos(sel,msgs); } }
    catch(e){ console.warn(e); lista=lista||[]; toast("No se han podido cargar los restaurantes."); }
    cargando=false; pintar(true);
  }
  const hace = t => { if(!t) return "—"; const m=Math.round((ahora()-t)/60000); return m<1?"ahora":m<60?`hace ${m} min`:m<1440?`hace ${Math.round(m/60)} h`:`hace ${Math.round(m/1440)} d`; };
  function restaurantesV(){
    if(!lista) return `<p class="vacio-ui">Cargando restaurantes…</p>`;
    const act=lista.filter(r=>r.activo), ped=lista.reduce((a,r)=>a+(+r.pedidos_hoy||0),0), ent=lista.reduce((a,r)=>a+(+r.entrantes||0),0), chat=lista.reduce((a,r)=>a+(+r.chat_sin_leer||0),0);
    return `<div class="p-cab"><div><h1>Restaurantes</h1><p>Todos los clientes y demos de ${PLATAFORMA}. Entra en cualquiera para editarlo o ayudar.</p></div><button class="b-ui rojo" data-atab="nuevo">+ Nuevo restaurante</button></div>
      <div class="kpis">
        <div class="card kpi"><small>Activos</small><strong>${act.length}<span style="font-size:18px;color:var(--tinta-3)"> / ${lista.length}</span></strong></div>
        <div class="card kpi"><small>Pedidos hoy</small><strong>${ped}</strong><span class="d">entre todos</span></div>
        <div class="card kpi"><small>Por confirmar</small><strong style="color:${ent?"var(--critico)":"inherit"}">${ent}</strong><span class="d">pedidos esperando a sala</span></div>
        <div class="card kpi"><small>Soporte</small><strong style="color:${chat?"var(--critico)":"inherit"}">${chat}</strong><span class="d">mensajes sin leer</span></div>
      </div>
      <div class="tabla-wrap"><table class="datos"><thead><tr><th>Restaurante</th><th>Estado</th><th>Plan</th><th style="text-align:right">Mesas abiertas</th><th style="text-align:right">Pedidos hoy</th><th>Actividad</th><th>Acciones</th></tr></thead><tbody>
      ${lista.map(r=>`<tr><td><b>${esc(r.nombre)}</b><br><code style="font-size:12px;color:var(--tinta-3)">${esc(r.slug)}</code>${r.slug===TENANT?` <span class="pill" style="font-size:11px">este</span>`:""}</td>
        <td>${estadoPill(r)}</td><td>${esc(r.plan||"demo")}</td>
        <td style="text-align:right">${+r.mesas_abiertas||0}</td><td style="text-align:right">${+r.pedidos_hoy||0}${+r.entrantes?` <span class="pill aviso" style="font-size:11px">${r.entrantes} por confirmar</span>`:""}</td><td>${hace(r.ultima)}</td>
        <td><div class="acc-fila"><a class="b-ui peq-ui" href="${esc(enlace(r.slug,"#panel"))}">Panel</a><a class="b-ui claro peq-ui" href="${esc(enlace(r.slug,"#carta"))}">Carta</a><a class="b-ui claro peq-ui" href="${esc(enlace(r.slug,"#camarero"))}">Sala</a>
          <button class="b-ui claro peq-ui" data-chat="${esc(r.slug)}">Chat${+r.chat_sin_leer?` <span class="b">${r.chat_sin_leer}</span>`:""}</button><button class="b-ui claro peq-ui" data-ficha="${esc(r.slug)}">Ficha</button></div></td></tr>`).join("")||`<tr><td colspan="7">No hay restaurantes todavía.</td></tr>`}
      </tbody></table></div>
      ${Store.modo!=="supa"?`<p class="ayuda" style="margin-top:10px">Modo demo: estos restaurantes viven en este navegador. Con la base de datos conectada verás todos tus clientes reales.</p>`:""}`;
  }
  function estadoDe(r){ return r.estado||(r.activo?"activo":"suspendido"); }
  function estadoPill(r){ const e=estadoDe(r); const m={activo:["ok","Activo"],aviso:["aviso","Aviso de pago"],suspendido:["critico","Suspendido"],baja:["critico","De baja"]}[e]||["ok",e]; return `<span class="pill ${m[0]}">${m[1]}</span>`; }
  function fichaV(){
    const r=(lista||[]).find(x=>x.slug===sel); if(!r) return `<p class="vacio-ui">Elige un restaurante.</p>`;
    if(Store.modo==="supa" && equipo===null){ equipo=[]; Store.sb.rpc("equipo",{p_tenant:sel}).then(({data})=>{ equipo=data||[]; pintar(true); }); }
    return `<div class="p-cab"><div><h1>${esc(r.nombre)}</h1><p><code>${esc(r.slug)}</code> · ${estadoPill(r)}${r.estado_desde?` <small style="color:var(--tinta-3)">desde ${new Date(r.estado_desde).toLocaleDateString("es-ES")}</small>`:""}</p></div><button class="b-ui claro" data-atab="restaurantes">${ico("back")}Volver</button></div>
      <div class="rej">
        <div class="card c6"><h2>Entrar a ayudar</h2><p class="ayuda">Tienes acceso completo: lo que cambies se aplica al momento en su local.</p>
          <div class="acc-fila"><a class="b-ui" href="${esc(enlace(r.slug,"#panel"))}">Panel del dueño</a><a class="b-ui claro" href="${esc(enlace(r.slug,"#camarero"))}">Sala</a><a class="b-ui claro" href="${esc(enlace(r.slug,"#cocina"))}">Cocina</a><a class="b-ui claro" href="${esc(enlace(r.slug,"#barra"))}">Barra</a><a class="b-ui claro" href="${esc(enlace(r.slug,"#carta"))}">Carta pública</a></div></div>
        <div class="card c6"><h2>Estado del cliente</h2>
          <p class="ayuda"><b>Activo</b>: todo funciona. <b>Aviso de pago</b>: sigue funcionando y queda marcado como pendiente de pago. <b>Suspendido</b> (impago): corte total, ni el personal entra ni los clientes pueden pedir; se reactiva cuando quieras. <b>De baja</b> (no renueva): igual que suspendido, pero marcado como cliente perdido. Sus datos se conservan.</p>
          <label style="display:grid;gap:4px;margin:8px 0;font-size:14px;font-weight:600">Motivo (queda anotado)<input id="fi-motivo" maxlength="200" placeholder="por ejemplo: impago de noviembre"></label>
          <div class="acc-fila">${[["activo","Activo","verde"],["aviso","Aviso de pago","claro"],["suspendido","Suspender","claro"],["baja","Dar de baja","claro"]].map(([k,t,c])=>`<button class="b-ui ${estadoDe(r)===k?"":c}" data-estado="${k}" data-slug="${esc(r.slug)}" aria-pressed="${estadoDe(r)===k}" ${estadoDe(r)===k?"disabled":""}>${t}</button>`).join("")}</div></div>
        <form class="card c6" id="f-ficha"><h2>Ficha interna</h2><div class="form-aj" style="grid-template-columns:1fr"><label>Plan<select id="fi-plan">${["demo","prueba","basico","pro"].map(p=>`<option ${r.plan===p?"selected":""}>${p}</option>`).join("")}</select></label><label>Notas<textarea id="fi-notas" maxlength="1000">${esc(r.notas||"")}</textarea></label><div><button class="b-ui rojo" type="submit">Guardar</button></div></div></form>
        <div class="card c6"><h2>Equipo</h2>${Store.modo!=="supa"?`<p class="ayuda">En modo demo no hay cuentas. Con la base de datos conectada, aquí das acceso al dueño y al personal.</p>`
          :`${equipo&&equipo.length?`<ul class="opiniones">${equipo.map(x=>`<li><b>${esc(x.email)}</b><span>${ROLES[x.rol]||x.rol}</span></li>`).join("")}</ul>`:`<p class="ayuda">Nadie con acceso todavía.</p>`}
          <form class="form-aj" id="f-eq-admin" style="margin-top:10px"><label>Correo<input id="ea-email" type="email" required></label><label>Rol<select id="ea-rol"><option value="dueno">Dueño</option><option value="sala">Sala</option><option value="cocina">Cocina y barra</option><option value="">Quitar acceso</option></select></label><div><button class="b-ui rojo" type="submit">Aplicar</button></div></form>
          <p class="ayuda" style="margin-top:8px">La cuenta se crea antes en Supabase › Authentication › Users.</p>`}</div>
      </div>`;
  }
  function nuevoV(){
    const otros=(lista||[]);
    return `<div class="p-cab"><div><h1>Nuevo restaurante</h1><p>Prepara una demo para una reunión o da de alta a un cliente. Después lo terminas de personalizar desde su panel.</p></div></div>
      ${creado?`<div class="card" style="margin-bottom:14px;border-color:var(--ok)"><h2>${ico("check")} ${esc(creado.nombre)} está listo</h2><p class="ayuda">Ya tiene carta, reglas y ${creado.mesas} enlaces NFC.</p><div class="acc-fila"><a class="b-ui" href="${esc(enlace(creado.slug,"#panel"))}">Abrir su panel</a><a class="b-ui claro" href="${esc(enlace(creado.slug,"#carta"))}">Ver su carta</a><a class="b-ui claro" href="${esc(enlace(creado.slug,"#inicio"))}">Todas sus pantallas</a></div></div>`:""}
      <form class="card" id="f-nuevo"><div class="form-aj">
        <label>Nombre del restaurante<input id="nr-nombre" maxlength="40" required placeholder="Casa Pepe"></label>
        <label>Identificador (va en el enlace)<input id="nr-slug" maxlength="40" placeholder="casa-pepe"></label>
        <label>Ciudad<input id="nr-ciudad" maxlength="40"></label>
        <label>Color principal<input id="nr-color" type="color" value="${BAR_DEF.color}"></label>
        <label>Número de mesas<input id="nr-mesas" type="number" min="1" max="99" value="12"></label>
        <fieldset class="origen" style="grid-column:1/-1"><legend>Carta</legend>
          <label><input type="radio" name="nr-origen" value="ejemplo" checked> Carta de ejemplo</label>
          <label><input type="radio" name="nr-origen" value="pegada"> Pegar su carta</label>
          <label><input type="radio" name="nr-origen" value="copia" ${otros.length?"":"disabled"}> Copiar de otro restaurante <select id="nr-copia">${otros.map(r=>`<option value="${esc(r.slug)}">${esc(r.nombre)}</option>`).join("")}</select></label>
          <label><input type="radio" name="nr-origen" value="vacia"> Vacía</label></fieldset>
        <label style="grid-column:1/-1">Su carta (si eliges «Pegar su carta»): una línea por plato, «Sección | Plato | Precio | Descripción»<textarea id="nr-texto" placeholder="Entrantes | Croquetas | 8,50&#10;Bebidas | Caña | 2"></textarea></label>
        <div><button class="b-ui rojo" type="submit">Crear restaurante</button></div>
      </div></form>`;
  }
  function soporteV(){
    const conChat=(lista||[]).slice().sort((a,b)=>(+b.chat_sin_leer||0)-(+a.chat_sin_leer||0)||(b.ultima||0)-(a.ultima||0));
    const r=(lista||[]).find(x=>x.slug===sel);
    return `<div class="p-cab"><div><h1>Soporte</h1><p>Chat en vivo con el panel de cada restaurante.</p></div></div>
      <div class="soporte"><ul class="sop-lista">${conChat.map(x=>`<li><button data-chat="${esc(x.slug)}" aria-current="${x.slug===sel}"><b>${esc(x.nombre)}</b>${+x.chat_sin_leer?`<span class="b">${x.chat_sin_leer}</span>`:""}</button></li>`).join("")||`<li class="vacio-ui">Sin restaurantes</li>`}</ul>
      <div class="card chat-card">${r?`<h2>${esc(r.nombre)} <a class="b-ui claro peq-ui" href="${esc(enlace(r.slug,"#panel"))}" style="float:right">Entrar en su panel</a></h2>${chatHTML(msgs,"soporte")}<form class="chat-in" id="f-resp"><input class="campo" id="resp-txt" maxlength="600" placeholder="Responder…" autocomplete="off" aria-label="Respuesta"><button class="b-ui rojo" type="submit">Enviar</button></form>`:`<p class="vacio-ui">Elige un restaurante para ver su conversación.</p>`}</div></div>`;
  }
  function pintar(forzar){
    const ae=document.activeElement, escribiendo=ae&&ae.id==="resp-txt"?ae.value:null;
    if(!forzar && escribiendo===null && ae && app.contains(ae) && ae.matches("input:not([type=checkbox]):not([type=radio]),textarea,select")) return;
    const sinLeer=(lista||[]).reduce((a,r)=>a+(+r.chat_sin_leer||0),0);
    const nuevasSol=(sols||[]).filter(x=>x.estado==="nueva").length;
    const tabs=[["restaurantes","Restaurantes","chart"],["avisos","Avisos","bell",nuevasSol],["nuevo","Nuevo restaurante","door"],["soporte","Soporte","chat",sinLeer]];
    const cuerpo={restaurantes:restaurantesV,avisos:avisosV,nuevo:nuevoV,soporte:soporteV,ficha:fichaV}[tab]();
    const foco=ae&&ae.id&&ae.id.startsWith("sf-")?{id:ae.id,pos:ae.selectionStart}:null;
    app.innerHTML=`<div class="panel admin"><aside class="p-side"><div class="marca"><b>${PLATAFORMA}</b><span>panel maestro</span></div>
      <nav aria-label="Secciones del panel maestro">${tabs.map(([k,t,i,b])=>`<button data-atab="${k}" aria-current="${tab===k||(k==="restaurantes"&&tab==="ficha")?"page":"false"}">${ico(i)}${t}${b?`<span class="b">${b}</span>`:""}</button>`).join("")}</nav>
      <div class="abajo"><a href="#inicio">← Pantallas de ${esc(TENANT)}</a>${Store.sesion?`<button class="b-ui claro" data-salir style="font-size:13px">Cerrar sesión (${esc(Store.sesion.user.email)})</button>`:""}<span>${modoBadge()}</span></div></aside>
      <main class="p-main">${cuerpo}</main></div>`;
    const l=app.querySelector("#chat-lista"); if(l) l.scrollTop=l.scrollHeight;
    if(foco){ const i=app.querySelector("#"+foco.id); if(i){ i.focus(); try{ if(foco.pos!=null) i.setSelectionRange(foco.pos,foco.pos); }catch(_){} } }
    if(escribiendo!==null){ const i=app.querySelector("#resp-txt"); if(i){ i.value=escribiendo; i.focus(); } }
  }
  async function abrirChat(slug){ sel=slug; tab="soporte"; msgs=await Maestro.chat(slug).catch(()=>[]); pintar(true); await Maestro.leidos(slug,msgs).catch(()=>{}); lista=await Maestro.lista().catch(()=>lista); pintar(); }
  async function clic(e){
    const t=e.target;
    const tb=t.closest("[data-atab]"); if(tb){ tab=tb.dataset.atab; if(tab!=="nuevo") creado=null; pintar(true); return window.scrollTo(0,0); }
    const ch=t.closest("[data-chat]"); if(ch) return abrirChat(ch.dataset.chat);
    const sv=t.closest("[data-sol-ver]"); if(sv){ solAbierta=solAbierta===sv.dataset.solVer?null:sv.dataset.solVer; return pintar(true); }
    if(t.closest("[data-sol-limpiar]")){ fil.q=fil.ciudad=fil.estado=fil.periodo=""; return pintar(true); }
    if(t.closest("[data-sol-csv]")) return csvSols();
    const sb=t.closest("[data-sol-borrar]"); if(sb){ if(!confirm("¿Borrar esta solicitud para siempre?")) return; try{ if(Store.modo==="supa"){ const {error}=await Store.sb.from("solicitudes").delete().eq("id",sb.dataset.solBorrar); if(error) throw error; } sols=sols.filter(x=>x.id!==sb.dataset.solBorrar); solAbierta=null; toast("Solicitud borrada."); }catch(_){ toast("No se ha podido borrar."); } return pintar(true); }
    const fi=t.closest("[data-ficha]"); if(fi){ sel=fi.dataset.ficha; equipo=null; tab="ficha"; return pintar(true); }
    const es=t.closest("[data-estado]"); if(es){ const k=es.dataset.estado, nom={activo:"activo",aviso:"aviso de pago",suspendido:"suspendido",baja:"de baja"}[k];
      if((k==="suspendido"||k==="baja") && !confirm(`¿Seguro? ${es.dataset.slug} quedará ${nom}: su personal no podrá entrar y los clientes no podrán pedir.`)) return;
      try{ await Maestro.estado(es.dataset.slug,k,(app.querySelector("#fi-motivo")||{}).value||""); toast(`Estado cambiado: ${nom}.`); }catch(_){ toast("No se ha podido cambiar el estado."); } return cargar(); }
    const ac=t.closest("[data-activar]"); if(ac){ try{ await Maestro.activar(ac.dataset.activar,ac.dataset.valor==="1"); toast(ac.dataset.valor==="1"?"Servicio reactivado.":"Servicio pausado: no se aceptan pedidos."); }catch(_){ toast("No se ha podido cambiar."); } return cargar(); }
  }
  async function cambioSol(e){ const t=e.target;
    if(t.id&&t.id.startsWith("sf-")){ fil[t.id.slice(3)]=t.id==="sf-q"?t.value:t.value; return pintar(true); }
    if(t.dataset.solEstado){ try{ await guardarSol(t.dataset.solEstado,{estado:t.value}); toast("Estado guardado."); }catch(_){ toast("No se ha podido guardar."); } return pintar(true); } }
  function cambio(e){ if(e.target.id==="nr-nombre"){ const s=app.querySelector("#nr-slug"); if(s && !s.dataset.tocado) s.value=slugDe(e.target.value); } if(e.target.id==="nr-slug") e.target.dataset.tocado=1; }
  async function enviar(e){
    e.preventDefault(); const f=e.target, v=id=>f.querySelector(id)?.value??"";
    if(f.id==="f-nuevo"){
      const nombre=v("#nr-nombre").trim(), slug=slugDe(v("#nr-slug")||nombre), mesas=Math.max(1,Math.min(99,parseInt(v("#nr-mesas"))||12)), origen=(f.querySelector("[name=nr-origen]:checked")||{}).value||"ejemplo";
      if(!nombre||slug.length<2) return toast("Pon un nombre (y un identificador de al menos 2 letras).");
      if((lista||[]).some(r=>r.slug===slug)) return toast(`Ya existe un restaurante con el identificador «${slug}».`);
      try{ await Maestro.crear({slug,nombre,ciudad:v("#nr-ciudad").trim(),color:v("#nr-color"),mesas,origen,texto:v("#nr-texto"),copiarDe:v("#nr-copia")}); creado={slug,nombre,mesas}; toast(`${nombre} creado.`); f.reset(); }
      catch(err){ toast(err&&err.message==="carta"?"No se ha reconocido ningún plato en la carta pegada.":"No se ha podido crear el restaurante."); }
      return cargar();
    }
    if(f.dataset.solNotas){ try{ await guardarSol(f.dataset.solNotas,{notas:f.querySelector("[name=notas]").value.trim()||null}); toast("Notas guardadas."); }catch(_){ toast("No se han podido guardar."); } return pintar(true); }
    if(f.id==="f-resp"){ const txt=v("#resp-txt").trim(); if(!txt||!sel) return; try{ await Maestro.responder(sel,txt,Store.sesion?.user?.email||"Soporte"); f.reset(); msgs=await Maestro.chat(sel); pintar(true); app.querySelector("#resp-txt")?.focus(); }catch(_){ toast("No se ha podido enviar."); } return; }
    if(f.id==="f-ficha"){ try{ await Maestro.notas(sel,{plan:v("#fi-plan"),notas:v("#fi-notas")}); toast("Ficha guardada."); }catch(_){ toast("No se ha podido guardar."); } return cargar(); }
    if(f.id==="f-eq-admin"){ try{ const {data,error}=await Store.sb.rpc("asignar_miembro",{p_tenant:sel,p_email:v("#ea-email").trim(),p_rol:v("#ea-rol")||null}); if(error) throw error; toast(data==="no_existe"?"No hay ninguna cuenta con ese correo: créala en Supabase › Authentication.":data==="quitado"?"Acceso quitado.":"Acceso actualizado."); equipo=null; pintar(true); }catch(_){ toast("No se ha podido aplicar."); } }
  }
  const cambioSel=e=>{ if(e.target.matches("select")) cambioSol(e); }, entradaSol=e=>{ if(e.target.id==="sf-q") cambioSol(e); };
  app.addEventListener("click",clic); app.addEventListener("input",cambio); app.addEventListener("input",entradaSol); app.addEventListener("change",cambioSel); app.addEventListener("submit",enviar);
  // En vivo: con base de datos escucha los chats de todos; en modo demo, los cambios de otras pestañas
  if(Store.modo==="supa"){ canal=Store.sb.channel("maestro").on("postgres_changes",{event:"*",schema:"public",table:"docs",filter:"col=eq.chat"},()=>cargar()).subscribe(); }
  registrarLocal(); cargar(); cargarSols().then(()=>pintar());
  return { titulo:`Panel maestro · ${PLATAFORMA}`, pintar:()=>pintar(),
    alCambiar(){ if(ahora()-ultimaCarga>800) cargar(); },
    tic(){ if(ahora()-ultimaCarga>(Store.modo==="supa"?20000:3000)) cargar(); if(ahora()-solCarga>30000) cargarSols().then(()=>pintar()); },
    salir(){ app.removeEventListener("input",entradaSol); app.removeEventListener("change",cambioSel); app.removeEventListener("click",clic); app.removeEventListener("input",cambio); app.removeEventListener("submit",enviar); if(canal) Store.sb.removeChannel(canal); } };
}

/* ===================================================================== */
aplicarMarca();
// Modo demo: el restaurante arranca con sus enlaces NFC y aparece en el panel maestro
if(SUPA_URL.startsWith("__")){ Acc.enlacesDemo(); registrarLocal(); ir(); }
// Con base de datos: pantalla de carga neutra hasta tener los datos reales del restaurante.
// Así no asoman, ni medio segundo, los datos de ejemplo (de otro local) mientras conecta.
else app.innerHTML=`<div class="arranque" role="status" aria-label="Cargando"><i></i></div>`;
conectarDB();
