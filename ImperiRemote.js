/*_______________________________________________________
|                 ImperiRemote v0.3                      |
|                                                        |
| Authors : Arnaud Peter & Phil Bri ( 01/2015 )          |
| Description :                                          |
|    Imperihome Plugin for SARAH project                 |
|    (See http://encausse.wordpress.com/s-a-r-a-h/)      |
|________________________________________________________|
*/

exports.action = function ( data , callback , config , SARAH ) {

	var	cfg = config.modules.ImperiRemote,
		request = require( 'request' );

	if ( !cfg.IP || !cfg.Port ) {
		console.log ( "\nImperiRemote [Erreur] => IP ou Port non paramétré !" );
		return callback ({ 'tts' : 'Erreur de configuration de l\'I P ou du port' });
	}

	var options = {
    	url: 'http://' + cfg.IP + ':' + cfg.Port + '/api/rest/dashboard/gotopage',
    	method: 'GET',
    	qs: { 'pageIdx' : data.cmd }
	}

	request( options, function ( error, response, body ) {
    	if ( !error && response.statusCode == 200 ) {
        	console.log( '\nImperiRemote [OK] => Retour = ' + body )
  			callback ({ 'tts' : data.ttsAction });
    	} else {
			console.log ( "\nImperiRemote [Erreur] => Retour = " + error.message );
			callback ({ 'tts' : 'Erreur dans la requète' });
    	}
	});
}
