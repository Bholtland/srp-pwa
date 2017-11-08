var webPush = require("web-push");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     	: 'mysql1327int.cp.hostnet.nl',
  user     	: 'u211941_berendh',
  password 	: 'StilleAap1',
  database	: 'db211941_pushtest'
});

var FCM_API_KEY="AAAAnSWOMYE:APA91bFXmZRGVIEyQiI_oZoOnxLltAqNks2off0X5cvaRpunv0YnW2CKxw91bq5sArtZ_RTtw_7QesitvnN3J7wi8pOkfoGZhmFwKG5xEXiXz_zAhxQb5-XwnJVZhKKgweULfpp8V2Gq";

var message = {
	title: "Test message",
	body: "This is a test message from Berend's SRP PWA", 
	badge: "https://cs-prelanders.s3.amazonaws.com/assets/images/png/push-badge-1.png",
	icon: "https://cs-prelanders.s3.amazonaws.com/assets/images/png/push-img-1.png",
	vibrate: [200,100,200,100,200,100,200]			
}

webPush.setGCMAPIKey(FCM_API_KEY);

connection.query("SELECT * FROM subscribers", function (error, results, fields) {
	for(var i = 0; i < results.length; i++) {
		var r = results[i];
		s = JSON.parse(r.subObject);

		var keyExists = typeof(s.keys) == 'undefined' ? false : true;

		if (keyExists){
			webPush.sendNotification(s.endpoint, {
			    userPublicKey: s.keys.p256dh,
			    userAuth: s.keys.auth,
			    
			    payload: JSON.stringify(message);

			}).then(function (value) {
				console.log('done  '+value);			    
			}).catch(function (err) {
			    // console.log(err);
			    var errMsg = err.statusCode;

			    if (errMsg == 410) {
			    	connection.query('DELETE FROM subscribers WHERE id='+r.id, function(error, results, fields){
			    		console.log('should be removed')
			    		if(error){
			    			console.log(error);
			    		}
			    	});
			    }
			});
		}

		else {
			console.log('false endpoint found');
		}
	}

  if (error) throw error;
  
});



