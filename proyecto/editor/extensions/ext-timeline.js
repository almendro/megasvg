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



localStorage["timeline.js.data.Global"] = [];
var var_animacion = {};

svgEditor.addExtension("btn_timeline", function(s) {
	// variables 

	//--------------- timeline ----------------
	$('<link rel="stylesheet" href="extensions/timeline/timeline.css" type="text/css"/>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/timeline.js"></script>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/timeline-gui.js"></script>').appendTo('head');
	$('<script type="text/javascript" src="extensions/timeline/RequestAnimationFrame.js"></script>').appendTo('head');

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
							$('#btn_timeline').addClass('push_button_pressed');
							//-------------
							for(var o in svgCanvas.getSelectedElems()) {
								// ID del objeto 
								id = svgCanvas.getSelectedElems()[o].id;
								// lo agrega a la matriz de elmentos
								var_animacion["#"+id]  = {element: $("#"+id)};
								attributos = document.getElementById(id).attributes;
								a = [];
								for(var i in attributos) {
									if (typeof attributos[i] == 'object') {
										numero = Number(attributos[i].value);
										if (numero) {
											a[attributos[i].name] = attributos[i].value ;
										}
									}
								}
							a	if (a) anim("#"+id, var_animacion["#"+id]).to(a, 0);
							}
							Timeline.getGlobalInstance().loop(-1);
							draw();
						} else {
							$('#btn_timeline').removeClass('push_button_pressed');
							Timeline.getGlobalInstance().stop();
							/* 
                                                        Timeline.currentInstance = null;
							Timeline.globalInstance = false; 
                                                        */
						}
					}
				}
			}]
		}
});

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
