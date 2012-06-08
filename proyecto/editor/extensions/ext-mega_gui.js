/*
 * ext-mega-gui.js
 *
 * GPLv3+ 
 *
 * Sobre el Trabajo de Martin Ochoa
 * Copyright(c) 2012 Ernesto Bazzano
 *
 */

/* Dependencies:
	extensions/mega_gui/estilos.css
*/


svgEditor.addExtension("btn_mega_gui", function(s) {
	$('<link rel="stylesheet" type="text/css" href="extensions/mega_gui/estilos.css" />').appendTo('head');
	return {
		name: "btn_mega_gui",
		svgicons: "extensions/ext-mega_gui-icon.xml",
		buttons: [{
			id: "btn_mega_gui",
			type: "context",
			panel: "editor_panel",
			title: "Activar/Desactivar MEGA GUI []",
			events: {
				'click': function() { 
						if (!$('#btn_mega_gui').hasClass('push_button_pressed')) {
							// activa la mega-gui
							$('#btn_mega_gui').addClass('push_button_pressed');
							$('body').attr('id','mega_gui');
						} else {
							$('#btn_mega_gui').removeClass('push_button_pressed');
							$('body').attr('id','');
						}
					}
				}
			}]
		}
});
