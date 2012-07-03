/*
 * ext-consola.js
 *
 * GPLv3+ 
 *
 * Copyright(c) 2011/2012 Ernesto Bazzano
 *
 */

/* Dependencies:


*/


//localStorage["timeline.js.data.Global"] = [];
var var_animacion = {};
var code = "";


svgEditor.addExtension("btn_timeline", function(s) {
	// variables 

	//--------------- timeline ----------------
	$('<link rel="stylesheet" href="extensions/timeline/timeline.css" type="text/css"/>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/timeline.js"></script>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/timeline-gui.js"></script>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/RequestAnimationFrame.js"></script>').appendTo('head');

	var anim_primera_vez = true;

	
	//---------------ejecutador de buffer----------------
	return {
		name: "btn_timeline",
		svgicons: "extensions/ext-timeline-icon.xml",
		buttons: [{
			id: "btn_timeline",
			type: "context",
			panel: "editor_panel",
			title: "Show/Hide Timeline",
			events: {
				
				'click': function() { 
				

						if (!$('#btn_timeline').hasClass('push_button_pressed')) {
						
							// activa la linea de tiempo
							
							$('#btn_timeline').addClass('push_button_pressed');
							//-------------
							for(var o in svgCanvas.getSelectedElems()) {
								// ID del objeto 
								id = svgCanvas.getSelectedElems()[o].id;
								// lo agrega a la matriz de elmentos
								
								trace (" id = " + id + " ... var_animacion ? "+(! var_animacion ['#'+id]));
								
								if ( ! var_animacion ['#'+id] ) {
									var_animacion["#"+id]  = {element: $("#"+id)};
								
								
								attributos = document.getElementById(id).attributes;
								
								a = [];	// 
							
								for(var i in attributos) {
									if (typeof attributos[i] == 'object') {
										numero = Number(attributos[i].value);
										if (numero) {
											a[attributos[i].name] = attributos[i].value ;
										}
									}
								}
								if (a) anim("#"+id, var_animacion["#"+id]).to(a, 0);
							
																//if ( ! var_animacion ['#'+id] ) {
																} else {
									// ya existe el objteo en var_animacion
									
								alert ('que hacemo!');
								trace ( code );
								eval(code);
									
								}
								
							}
							if(anim_primera_vez){
								Timeline.getGlobalInstance().loop(-1);
								//anim_primera_vez = false;
							}


							//desbichador(" var_animacion "+ desbichador_ver({p: var_animacion}));
							
							
							draw();
							
						} else {
							
							// desactiva la linea de tiempo
							
															
									var mi_linea = Timeline.getGlobalInstance();
									
									for(var i=0; i<mi_linea.tracks.length; i++) {
										var track = mi_linea.tracks[i];
										if (track.type == "object") continue;
										if (track.anims.length == 0) continue;
										code += 'anim("' + track.parent.name + '",$("' + track.parent.name + '"))';
									
									// HAY QUE TOCAR ACAAAAAAA !!!!!!!!!
									// está duplicando el track del objeto SVG, hay que hacer que solo arme el track y luego los subtracks.
										
										for(var j=0; j<track.anims.length; j++) {
											var anim2 = track.anims[j];   
											code += '.to(';
											if (anim2.delay) 
												code += anim2.delay + ',';
											code += '{' + '"' + anim2.propertyName + '"' + ':' + anim2.endValue + '}';      
											code += ',' + (anim2.endTime - anim2.startTime);                          
											if (anim2.easing != Timeline.Easing.Linear.EaseNone) 
												code += ', Timeline.Easing.' + Timeline.easingFunctionToString(anim2.easing);
											code += ')';
											//code += '.to(' + anim.delay + ',{' + '"' + anim.propertyName + '"' + ':' + anim.endValue + '} ')';
										}
										
										//code += ';\n';
										code += ';';
									}
									trace(code);
									//
									
							
							$('#btn_timeline').removeClass('push_button_pressed');

							//Timeline.getGlobalInstance().stop();
              //Timeline.currentInstance = null;

              Timeline.globalInstance = false;
              
							clearInterval ( timeline_interval );
							
							//$("#timeline").delay(200).detach();
							$("#timeline").detach();
							//$("#timeline").delay(400).detach();
              $("#keyEditDialog").detach();
						}
						

						
						
					} // click
				} // events
			}]
		}// return
}); // addExtension

function draw() {

	
	
	for(var o in var_animacion) {
		// objeto a poner en la linea de tiempo
		var attributos = document.getElementById(o.slice(1)).attributes;
		for(var i in attributos) {
			if (typeof attributos[i] == 'object') {
				// crea una linea de tiempo con los atributos del objeto
				a = {};
				a[attributos[i].name] = var_animacion[o][attributos[i].name];
				if (typeof var_animacion[o][attributos[i].name] == 'number') $(o).attr(a);
			}
		}
	}
	requestAnimationFrame(draw, this);
}

