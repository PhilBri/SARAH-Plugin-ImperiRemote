/*_______________________________________________________
|                 ImperiRemote v0.5                      |
|                                                        |
| Authors : Arnaud Peter & Phil Bri ( 01/2015 )          |
| Description :                                          |
|    Imperihome Plugin for SARAH project                 |
|    (See http://encausse.wordpress.com/s-a-r-a-h/)      |
|________________________________________________________|
*/

function write_XML_Pages ( config, cb ) {
    var fs		= require ( 'fs' ),
    	file	= __dirname + "\\ImperiRemote.xml",
    	xml		= fs.readFileSync ( file, 'utf8' ),
    	cfg_xml	= '',
    	str		= '',
    	tab		= '\r\t\t\t\t';

	for ( var key in config )
	{
		var value = config[key];
		if ( !key.indexOf( 'pageIdx' ) && value ) {
        	cfg_xml
				+= tab + '<item>' + value.split('|').shift().trim()
        		+  tab + '\t<tag>'
        		+  tab + '\t\tout.action.cmd="dashboard/gotopage¤' + key + '";'
        		+  tab + '\t\tout.action.ttsAction="' + value.split('|').pop().trim() + '";'
        		+  tab + '\t</tag>'
        		+  tab + '</item>';
        	str += value.split('|').shift().trim()+ '|';
		}
	}
	xml	= xml.replace ( /§[^§]+§/gm, "§ -->\n" + cfg_xml + "<!-- §" );
	fs.writeFileSync 	( file, xml, 'utf8' );
	if ( cb ) cb ( str.slice( 0, str.length -1 ) );
}

exports.init = function ( SARAH ) { 
	var config 	= SARAH.ConfigManager.getConfig().modules.ImperiRemote;
	write_XML_Pages ( config, function ( cb ){
		exports.pages = cb.split('|');
	});
	console.log ( 'ImperiRemote => Ecriture du xml OK' );
}

exports.action = function ( data , callback , config , SARAH ) {
	var	cfg 	= config.modules.ImperiRemote,
		Cmd	= data.cmd.split('¤').pop(),
		request = require( 'request' ),
		options = {	
			uri 	: 'http://' + cfg.IP + ':' + cfg.Port + '/api/rest/' + data.cmd.split('¤').shift(),
			method 	: 'GET',
			qs : eval( require ( 'querystring' ).parse ( /pageIdx/.exec( Cmd ) + '=' + /\d+/.exec( Cmd )))
		};

	if ( !cfg.IP || !cfg.Port ) {
		console.log ( "\nImperiRemote [Erreur] => IP ou Port non paramétré !" );
		return callback ({ 'tts' : 'Erreur de configuration de l\'I P ou du port' });
	}

	request( options, function ( error, response, body ) {
		if ( !error && response.statusCode == 200 ) console.log( '\nImperiRemote [OK] => Retour = ' + body )
		else {
			console.log ( "\nImperiRemote [Erreur] => Retour = " + error.message );
			data.ttsAction = 'Erreur dans la requète';
		}
	});
	callback ({ 'tts' : data.ttsAction });
}
