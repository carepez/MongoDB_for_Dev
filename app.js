var express = require('express'),
	app = express(),
	cons = require('consolidate');

app.engine('html',cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views")

app.get('/', function (req, res) {
	res.render('hello', { 'name': 'Andrés'});
});

app.get('*', function (req, res) {
	res.send("Page not found", 404);
});

app.listen(8000);
console.log("Express server started on port 8000");