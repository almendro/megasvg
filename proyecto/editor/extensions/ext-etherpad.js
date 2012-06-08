/*
 * ext-etherpad.js
 *
 * GPLv3+ 
 *
 * Copyright(c) 2012 Ernesto Bazzano
 *
 *
 * Dependencies:
	Lite-Etherpad
	este programa no esta terminado
*/

svgEditor.addExtension("btn_etherpad", function(s) {
	$('<script type="text/javascript" src="extensions/etherpad/etherpad.js"></script>').appendTo('head');
	$('<div id="salida" ></div>').appendTo('body');
	$('#salida').css({
		position: "absolute",
		bottom: "2px",
		left:"5%",
		width: "90%",
		height: "50%",
		background: "#fff",
		"z-index": 1000,
		border: 0,
		display: "none",
		opacity: .95,
		padding: "0",
		color: "#fff"});
	return {
		name: "btn_etherpad",
		svgicons: "extensions/ext-timeline-icon.xml",
		buttons: [{
			id: "btn_etherpad",
			type: "context",
			panel: "editor_panel",
			title: "Activar/Desactivar Etherpad []",
			events: {
				'click': function() { 
						if (!$('#btn_etherpad').hasClass('push_button_pressed')) {
							$('#btn_etherpad').addClass('push_button_pressed');
							//'host' : 'http://diablo.local:9001',
							$('#salida').pad({
								'host' : 'https://pad.riseup.net/',
								'padId': 'codigo',
								'width': '100%',
								'height': '100%',
								'showChat':false,
								'useMonospaceFont':'true',
								'showLineNumbers':'true'
							});
							$('#salida').show();
							// $('#consola_entrada').hide();
							//'padId':'doc!dibujo.svg'
							/* poner un interval que vea tome el texto
							y lo vuelque a #consola_entrada */
						} else {
							$('#btn_etherpad').removeClass('push_button_pressed');
							$('#salida').hide();
						}
					}
				}
			}]
	}
});
