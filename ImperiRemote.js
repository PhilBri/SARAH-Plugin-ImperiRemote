/*_______________________________________________________
|                 ImperiRemote v0.1                      |
|                                                        |
| Authors : Arnaud Peter & Phil Bri ( 01/2015 )          |
| Description :                                          |
|    Imperihome Plugin for SARAH project                 |
|    (See http://encausse.wordpress.com/s-a-r-a-h/)      |
|________________________________________________________|
*/

exports.action = function ( data , callback , config , SARAH ) {

	var	cfg = config.modules.ImperiRemote;

	if ( !cfg.IP || !cfg.Port) {
		console.log ("\nImperiRemote [Erreur] => IP ou Port non paramétré !");
		return callback ({ 'tts' : 'Erreur de configuration de l\'I P ou du port' });
	}

	var http = require( 'http' );
	var options = {
    	host: cfg.IP,
    	port: cfg.Port,
    	path: '/api/rest/dashboard/gotopage?' + data.cmd
  	};

  	//console.log ( options );

	var req = http.get ( options, function ( response ) {
		console.log('\nSTATUS: ' + res.statusCode);
		console.log('\HEADERS: ' + JSON.stringify(res.headers));


  		var res_data = '';

  		response.on ( 'data', function ( chunk ) {
    		res_data += chunk;
  		});

  		response.on ( 'end', function () {
  			console.log ( '\nImperiRemote [OK] => Retour : ' + res_data );
  			//callback ({ 'tts' : data.ttsAction });
  		});
	});

	req.on( 'error', function ( e ) {
		return console.log ( "ImperiRemote => Erreur : " + e.message );
	});
}
