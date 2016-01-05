//http://www.sitepoint.com/creating-restful-apis-express-4/
var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks');
var path = require('path');
var app = express(); //Create the Express app

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '../client')));
app.use('/partials', express.static(path.join(__dirname, '../client/partials')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

app.use('/api', tasks); //tasks route middleware

app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});