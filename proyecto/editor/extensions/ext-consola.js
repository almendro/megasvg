/*
 * ext-consola.js
 *
 * GPLv3+ 
 *
 * Copyright(c) 2011 Ernesto Bazzano
 *
 */

// Dependencies:
// 0) ??? no se si los siguientes son dependencias o no
// 1) units.js
// 2) everything else

svgEditor.addExtension("consola", function(s) {
	// variables 
	var consola_bckp_svg
	var consola_fn
	// crea la consola
	var consola_entrada = document.createElement("textarea");
	consola_entrada.id = "consola_entrada";
	document.body.appendChild(consola_entrada);
	// oculta la consola
	$('#consola_entrada').css({
		position: "absolute",
		bottom: "2px",
		left:"5%",
		width: "90%",
		height: "50%",
		background: "#000",
		"z-index": 1000,
		border: 0,
		"border-radius": "6px",
		opacity: .65,
		display: "none",
		padding: "8px",
		color: "#fff"});
	//---------------ejecutador de buffer----------------
	consola_correr = function () {
		try {
			// (new Function("window", "document", consola_entrada.value)).call(function () { });
			 var newImage = svgCanvas.addSvgElementFromJson({
				"element": "script",
				"attr": {
					"id": "programa",
					"type": "text/ecmascript"
				}
			});
			$("#programa").append(consola_entrada.value);
		} catch (e) {
			alert( "error:'" + e.message + "'" || "error: '" + e + "'");
			consola_reproduccion_stop();
		}
	}
	//---------------ejecutador de buffer----------------
	return {
		name: "consola",
		svgicons: "extensions/ext-consola-icon.xml",
		buttons: [{
			id: "consola",
			type: "context",
			panel: "editor_panel",
			title: "Show/Hide Consola",
			events: {
				'click': function() {
						var gr = !$('#consola').hasClass('push_button_pressed');
						if (gr) {
							consola_reproduccion_stop();
							consola_fn = null;
							$('#consola_entrada').show();
							$('#consola').addClass('push_button_pressed');
							
						} else {
							// ocultar consola
							$('#consola_entrada').hide();
							$('#consola').removeClass('push_button_pressed');
						}
					}
				}
			},{
			id: "consola_reproduccion",
			type: "context",
			panel: "editor_panel",
			title: "Reproducir script",
			events: {
				 'click': function() {
					var gr = !$('#consola_reproduccion').hasClass('push_button_pressed');
					if (gr) {
						// interval
						consola_corre_bckp = svgCanvas.getSvgString();
						consola_correr();
						consola_corre_id = "";
						$('#consola_reproduccion').addClass('push_button_pressed');
						$('#consola_entrada').hide();
						$('#consola').removeClass('push_button_pressed');
					} else {
						consola_reproduccion_stop();
					}
				}
			}
		},{
			id: "consola_volcar_estado",
			type: "context",
			panel: "editor_panel",
			title: "Volcar estado",
			events: {
				'click': function() {
					consola_corre_bckp = svgCanvas.getSvgString();
				}
			}
		}]
	};
});

var consola_corre_id			//ID del interval
var consola_corre_bckp = false;		//backp del SVG
var iniciar
function consola_reproduccion_stop(retaurar) {
	if (consola_corre_bckp) svgCanvas.setSvgString(consola_corre_bckp);
	consola_corre_bckp = false;
	$('#consola_reproduccion').removeClass('push_button_pressed');
}
