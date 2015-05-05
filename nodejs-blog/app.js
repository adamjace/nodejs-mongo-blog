var express = require('express')
  , app = express() 
  , cons = require('consolidate') 
  , MongoClient = require('mongodb').MongoClient 
  , routes = require('./routes');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware 
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');
});
