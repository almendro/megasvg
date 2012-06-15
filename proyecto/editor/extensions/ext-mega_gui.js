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

	var url_extension = "extensions/mega_gui/";
	
	jQuery('<link rel="stylesheet" type="text/css" href="'+url_extension+'estilos.css" />').appendTo('head');
	jQuery('<link rel="stylesheet" type="text/css" href="'+url_extension+'circleMenu.css" />').appendTo('head');
	jQuery('<script type="text/javascript" src="'+url_extension+'jQuery.circleMenu.js"></script>').appendTo('head');
	
	jQuery('html').keyup(function(e) {
		//alert('');
	});
	
	// Es necesario crear un botón que sirva para activar el menú circular. Luego hay que cambiarlo por otra cosa. El class 'item_primero' es obligadorio, el plugin circleMenu lo busca.
	
	jQuery('#tools_top').prepend('<div class="item_primero"><a href="#">[M]</a></div>');

	
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
						if (!jQuery('#btn_mega_gui').hasClass('push_button_pressed')) {
							// activa la mega-gui
							jQuery('#btn_mega_gui').addClass('push_button_pressed');
							jQuery('body').attr('id','mega_gui');
							
							
							// Al principio todas los grupos de botones tiene que tener un posicionamiento absoluto y un z-index bajo para que la div.item_primero esté por encima de todo. Luego hay que agregar a los botones (push_button y tool_button) el class 'item' para que el plugin circleMenu los identifique. En este punto está tomando a todos, tanto los visible como los no visible. Habrá que buscar alguna solución para aprovechar bien el espacio.
							
							// El elemento que funciona como menú circular tiene que tener el class 'circle_menu' ya que se utiliza para permutar el estado si mega_gui está activado o no. Y de esta manera el plugin de circleMenu sabe si debe actualizar el aspecto o no. Atención, falta deshabilitar el botón de 'item_primero' cuando se desactiva mega_gui ya que puede ocacionar problemas. Seguramente al ocultaro esto se soluciona.
							
							// Al desactivar mega_gui también hay que limpiar estilos que se agregar a los elementos con el atributo 'style' y de esta manera restaurar el aspecto original del css. Se utiliza un 'setTimeout' porque hay que esperar un momento. Esto se puede solucionar si se revisan los timeout del plugin circleMenu.
							
							'
							jQuery('#tools_top > div').css({
								'position':'absolute',
								'z-index': '1'
							});
							
							jQuery('#tools_top .push_button, #tools_top .tool_button').addClass('item');
							
							jQuery('#tools_top').addClass('circle_menu').circleMenu({
								circle_radius: 190,
								item_diameter: 32,
		            direction:'full', 
		            trigger:'click',
		            div: true,
		            item_primero: 'item_primero',
		            open: function(){
		            	//console.log('menu opened');
		            },
		            close: function(){
		            	//console.log('menu closed');
		            },
		            init: function(){
		            	//console.log('menu initialized');
		            },
		            select: function(evt,index){
		            	//console.log(evt,index)
		            }
			        }).on('circleMenu-open',function(){
		            //console.log('menu opened 2');
			        });
			        
		
						} else {
						
							jQuery('#btn_mega_gui').removeClass('push_button_pressed');
							
							jQuery('#tools_top').attr('style',' '); // eliminamos los estilos del menu circular
							jQuery('#tools_top').removeClass('circle_menu');
							
							setTimeout(function(){
							jQuery('#tools_top .item').attr('style',' '); // eliminamos los estilos del menu circular
							
							jQuery('#tools_top > div').attr('style',' '); // eliminamos los estilos del menu circular
							jQuery('#tools_top .push_button, #tool_top .tool_button').removeClass('item');
							},250);
							jQuery('body').attr('id','');
						}
					}
				}
			}]
		}
});
