
module.exports.port = 80;

module.exports.securePort = 443;

module.exports.dbConnectionString = "localhost/angular2"

module.exports.corsOptions = {
    origin : '*',
    allowMethods : 'POST,GET,PUT,DELETE,OPTIONS',
    exposeHeaders : 'WWW-Authenticate, Server-Authorization',
    allowHeaders : 'x_radio_partnerid, x_radio_auth, Cache-Control, ragma, Origin, Authorization, Content-Type, X-Requested-With',
    // maxAge : '',
}


module.exports.securePort = 3001;

module.exports.ssl = {
	keyPath: 'key.pem',
	certPath: 'key-cert.pem'
};