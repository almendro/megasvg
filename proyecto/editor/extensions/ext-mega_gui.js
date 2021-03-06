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
	
	
	
	// En la primera versión se agregaba un ID al body para que las reglas de los estilos de mega_gui sobreescribieran los que viene por defecto.
	// Pero si alguien a futuro hace algo parecido o se empieza a usar el ID del body para otra cosa esto puede traer problemas.
	// En esta versión se opta por crear un elemento que envuelva todo los que está dentro de body, conservando el ID para no tener que reformular el CSS.

	jQuery('body').wrapInner('<div id="mega_gui" class="mega_gui_envolvente" />');
	
	$mega_gui = jQuery('#mega_gui'); // con esto lo referenciamos por única vez, de manera tal que si le quitamos el ID al objeto lo podamos seguir manipulando.
	
	$mega_gui.attr('id',' ');
	


	// --- --- --- ELEMENTOS DE INTERFAZ --- --- ---
	
	var $rules = jQuery('#rulers');

	var $tools_top = jQuery('#tools_top');
	var tools_top = {
		height: $tools_top.height(),
		width: $tools_top.width(),
		position: $tools_top.position(),
		abierta: false,
	};	
	
	// --- --- --- EVENTOS DE TECLADO --- --- ---
	
	// doblekey intercepta que se haya pulsado dos veces una tecla y ejecuta una acción.

	var doblekey_ultima = null, 	// timeStamp de la ultima vez que se presionó una tecla
			doblekey_diferencia = 0,  // diferencia de tiempo
			doblekey_tecla = null, 		// ultima tecla presionada
			doblekey_tecla_actual;	  // tecla actual

	
	jQuery('html').keyup(function(e) {
		
		console.log("html keyup "+e.which);
		
		doblekey_tecla_actual = e.which;

		// comprobamos si ya se habia pulsado antes la misma tecla
		if ( doblekey_ultima!=null && doblekey_tecla == doblekey_tecla_actual ) {
		
			// calculamos la diferencia tomando el timeStamp del evento, ver la variable (e) en la llamada a la function (esto lo genera jQuery automaticamente)
			doblekey_diferencia = e.timeStamp - doblekey_ultima;
			console.log('doblekey_diferencia '+doblekey_diferencia);
			
			// umbral de activacion para el doblekey
			if ( doblekey_diferencia > 100 && doblekey_diferencia < 400 ){
			
			
				// activaciones del teclado que funcionan en todo momento
				
				switch (doblekey_tecla_actual)
				{
				
					case 77: // M
						jQuery('#btn_mega_gui').click(); // activa o desactiva MEGAGUI
					break;
					
					case 82: // R - muestra/oculta las reglas
						
						if($rules.css('visibility')=='visible'){
							$rules.css('visibility','hidden');
						} else {
							$rules.css('visibility','visible');
						}
						
					break;

				}// switch
				
				// activaciones del teclado que sólo funcionan si MEGA_GUI está ACTIVADO
				
				if ( $mega_gui.attr('id') == 'mega_gui' ) {

					switch (doblekey_tecla_actual)
					{
					
						case 16: // SHIFT - abre o cierra el menu en circular
						 if (jQuery('#tools_top').hasClass('circle_menu')) {
								jQuery('#tools_top .item_primero').click();
							}
						break;
					
						case 32: // SPACEBAR - muestra oculta la barra superior de menu
						
							if ( tools_top.abierta ) {
								tools_top.abierta = false;
								$tools_top.stop().animate({
									top: '-70px'
								},
								{
									duration: 'slow',
									easing: 'swing',
									//queue: false,
									complete: function(){
										$tools_top.attr('style',' '); // limpiamos los estilos en linea para que funcione el CSS
									}
								});
							} else {
								tools_top.abierta = true;
								$tools_top.stop().animate({
									top: '0px'
								},
								{
									duration: 'fast',
									easing: 'swing',
									//queue: false,
									complete: function(){
										//$tools_top.attr('style',' ');
									}
								});
							}// <<< else
							
						break; // <<< case 32
						
					}// switch				
				
				}
				else
				{
					// aca pueden ir las activaciones del teclado que sólo funcionan si MEGA_GUI está DESACTIVADO
					/*
					switch (doblekey_tecla_actual)
					{
					}
					*/
				}
				
			} // if dif > 100 < 400
			
		}// if doblekey_ultima
		
		// capturamos la pulsación actual
		doblekey_ultima = e.timeStamp;
		doblekey_tecla = doblekey_tecla_actual;
		
		console.log ("doblekey_tecla "+doblekey_tecla);
		
	}); // html.keyup
	

	// --- --- --- MENU CIRCULAR --- --- ---
	
	// Es necesario crear un botón que sirva para activar el menú circular. Luego hay que cambiarlo por otra cosa. El class 'item_primero' es obligadorio, el plugin circleMenu lo busca.
	
	//jQuery('#tools_top').prepend('<div class="item_primero"><a href="#">[M]</a></div>');


	
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
							
							$mega_gui.attr('id','mega_gui');
							
							
							// --- --- --- --- --- ---
							
							// *** MENU CIRCULAR ***
							
							// Al principio todas los grupos de botones tiene que tener un posicionamiento absoluto y un z-index bajo para que la div.item_primero esté por encima de todo. Luego hay que agregar a los botones (push_button y tool_button) el class 'item' para que el plugin circleMenu los identifique. En este punto está tomando a todos, tanto los visible como los no visible. Habrá que buscar alguna solución para aprovechar bien el espacio.
							
							// El elemento que funciona como menú circular tiene que tener el class 'circle_menu' ya que se utiliza para permutar el estado si mega_gui está activado o no. Y de esta manera el plugin de circleMenu sabe si debe actualizar el aspecto o no. Atención, falta deshabilitar el botón de 'item_primero' cuando se desactiva mega_gui ya que puede ocacionar problemas. Seguramente al ocultaro esto se soluciona.
							
							// Al desactivar mega_gui también hay que limpiar estilos que se agregar a los elementos con el atributo 'style' y de esta manera restaurar el aspecto original del css. Se utiliza un 'setTimeout' porque hay que esperar un momento. Esto se puede solucionar si se revisan los timeout del plugin circleMenu.
							
							// --- --- --- --- --- ---
							
							/*
							jQuery('#tools_top > div').css({
								'position':'absolute',
								'z-index': '1'
							});
							*/
							//jQuery('#tools_top .push_button, #tools_top .tool_button').addClass('item');
							/*
							jQuery('#tools_top').addClass('circle_menu').circleMenu({
								circle_radius: 190,
								item_diameter: 32,
		            direction:'full', 
		            trigger:'click',
                speed: 200,
		            delay: 200,
		            step_out: 20,
		            step_in: -20,
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
			        */
		
						} 
						else // desactivar mega_gui
						{
						
							jQuery('#btn_mega_gui').removeClass('push_button_pressed');
							
							jQuery('#tools_top').attr('style',' '); // eliminamos los estilos del menu circular
							jQuery('#tools_top').removeClass('circle_menu');
							
							setTimeout(function(){
							jQuery('#tools_top .item').attr('style',' '); // eliminamos los estilos del menu circular
							
							jQuery('#tools_top > div').attr('style',' '); // eliminamos los estilos del menu circular
							jQuery('#tools_top .push_button, #tool_top .tool_button').removeClass('item');
							},250);
							
							
							$mega_gui.attr('id','');
							
						}
						
					}// <<< click
				}// <<< events
			}]// <<< buttons
		}// <<< return
});// <<< svgEditor.addExtension
