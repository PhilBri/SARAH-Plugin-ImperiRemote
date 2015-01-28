/*_______________________________________________________
|                 ImperiRemote v0.4                      |
|                                                        |
| Authors : Arnaud Peter & Phil Bri ( 01/2015 )          |
| Description :                                          |
|    Imperihome Plugin for SARAH project                 |
|    (See http://encausse.wordpress.com/s-a-r-a-h/)      |
|________________________________________________________|
*/

exports.action = function ( data , callback , config , SARAH ) {

	var	cfg 	= config.modules.ImperiRemote,
		Cmd 	= data.cmd.split('¤'),
		request = require( 'request' ),
		options = {	
			uri 	: 'http://' + cfg.IP + ':' + cfg.Port + '/api/rest/' + Cmd.shift(),
			method 	: 'GET'
		},
		query	= require ( 'querystring' ).parse ( Cmd.shift() + '=' + Cmd );

	options.qs = query;

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
