paper.rect(0, 0, 640,400).attr({fill: "#000"});
bg = paper.image("bgt.png",0,"-10%","110%","100%");

// carga las luces
c01 = paper.image("./luces/c01t.png",0,"-10%","110%","100%");
c02 = paper.image("./luces/c02t.png",0,"-10%","110%","100%");
c03 = paper.image("./luces/c03t.png",0,"-10%","110%","100%");

// genera el loop de las luces
function cloop1 () { c01.animate({opacity:"0.0"}, 300, "elastic", function () {c01.animate({opacity:"1.0"},300, "elastic", function(){cloop1();})}); }
function cloop2 () { c02.animate({opacity:"0.0"}, 200, "elastic", function () {c02.animate({opacity:"1.0"},300, "elastic", function(){cloop2();})}); }
function cloop3() { c03.animate({opacity:"0.0"}, 300, "elastic", function () {c03.animate({opacity:"1.0"}, 200, "elastic", function(){cloop3();})}); }

cloop1(); cloop2(); cloop3(); //inicia las luces

Raphael.el.red = function (planilla) {
  tiempo = 0;
  this.n = 0;
  this.planilla = planilla;
	
for (i=0; i < planilla.length; i += 2) {

  this.animate({}, tiempo, function () { 
    this.attr({src: this.planilla[this.n]}); 
    this.n += 2;
  });

 tiempo += planilla[i+1];

 }

};


tipos=paper.image("./tipos/t00t.png","62%","43%","18%","25%"); // carga el primer cuadro del sheet
// anima la secuencia sheet

//tipos.red(["./tipos/t00.png",1000, "./tipos/t01.png", 80, "./tipos/t02.png", 120, "./tipos/t03.png", 80, "./tipos/t04.png", 80, "./tipos/t05.png", 80, "./tipos/t06.png", 80]);


tipos.animate({}, 3000, function (){  
tipos.attr({src:"./tipos/t01t.png"}); tipos.animate({}, 1000, function (){ 
tipos.attr({src:"./tipos/t00t.png"}); tipos.animate({}, 2000, function (){ 
tipos.attr({src:"./tipos/t01t.png"}); tipos.animate({}, 600, function (){ 
tipos.attr({src:"./tipos/t02t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t03t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t04t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t05t.png"}); tipos.animate({}, 1000, function (){ 
tipos.attr({src:"./tipos/t06t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t07t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t08t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t09t.png"}); tipos.animate({}, 80, function (){ 
tipos.attr({src:"./tipos/t10t.png"}); });});}); }); }); }); }); }); }); }); }); });



//sheet(obj, {"t00", 3000, "t01", 800,"t02",80}); //concepto de como hacer una funcion de planilla para raphaelJS

// generacion de planos
pl07=paper.image("./planos/pl07t.png",0,0,"120%","100%");
pl06=paper.image("./planos/pl06t.png",0,0,"120%","100%");
pl05=paper.image("./planos/pl05t.png",0,0,"120%","100%");
pl04=paper.image("./planos/pl04t.png",0,0,"120%","100%");
pl03=paper.image("./planos/pl03t.png",0,0,"120%","100%");
pl02=paper.image("./planos/pl02t.png",0,0,"120%","100%");
pl01=paper.image("./planos/pl01t.png",0,0,"120%","100%");


// animacion de los planos
pl01.animate({x: -120}, 20000);
pl02.animate({x: -100}, 20000);
pl03.animate({x: -80}, 20000);
pl04.animate({x: -60}, 20000);
pl05.animate({x: -40}, 20000);
pl06.animate({x: -20}, 20000);
pl07.animate({x: -10}, 20000);

bg.animate({x:0}, 25000, function () {cloop1=''; cloop2=''; cloop3='';} );


texto="";
for (nodo in paper.canvas) texto +=" "+nodo;
paper.text(320, 75, texto);

