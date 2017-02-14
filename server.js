'use strict';

var koa = require('koa');
var monk = require('monk');
var serve = require('koa-static');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var routes = require('./server/routes');
var view = require('./server/views/jsonresponseview'); 
var config = require('./config/config');
var fs = require('fs');
var https = require('https');
    
var app = koa();
app.use(gzip());
app.use(serve('app'));
app.use(serve('dist'));
app.use(bodyParser());
var db = monk(config.dbConnectionString); 

app.use(function*(next) {
    this.db = db;
    this.type = 'application/json';
    console.log('%s - %s', this.method, this.url);
    yield next;
});

app.use(function *(next){
    try{
        yield next; 
    } catch (err) { //executed only when an error occurs & no other middleware responds to the request
        // view.onError(this, 'application failed to respond', 22);
        //delegate the error back to application
        // this.app.emit('error', err, this);
        this.throw('error occurred in application: %s', err);
    }
});

routes.configure(app);

// app.listen(config.port || 3000);
// console.log('http server started listening on port %s', config.port || 3000);

var sslOptions = {
	key: fs.readFileSync(config.ssl.keyPath),
	cert: fs.readFileSync(config.ssl.certPath)
};

var server = https.createServer(sslOptions, app.callback());

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('donorEmit', function (data) {
    // received data from here
    console.log('got changed data from UI');

    // emit data from here
    console.log('send changed data to UI');
    socket.broadcast.emit('donorReceive', data);
  });
});

server.listen(config.securePort || 3001);
console.log('https server started listening on port %s', config.securePort || 3001);





