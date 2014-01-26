var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/weather',function(err,db){
	if(err) {
		throw err;
	} else {
		console.log("Connected to database!");
	}

	var options = {
		sort : [['State', 1],['Temperature', -1]]
	};

	var collection = db.collection('data');

	collection.find({},options,function (err, docs) {
		if (err) {
			console.log("An error ocurred on find");
			db.close();
		} else {
			console.log("Query executed successfuly");

			var curr_state = null;

			docs.each(function (err, item) {
				if ((item !== null) && (curr_state !== item.State)){
					curr_state = item.State;
					var doc = item;
					//console.log(doc.State + ' - ' + doc.Temperature);
					doc['month_high'] = true;
					collection.save(doc, function (err,saved) {
						if (err) {
							console.log("Error savind a document");
						} else {
							console.log("Document updated successfuly:" + doc.State + " - " + doc.Temperature);
						}
					});
				}
			});

			/*docs.toArray(function (err, array) {
				console.log(array.length);
			});*/
		}
	});
});
