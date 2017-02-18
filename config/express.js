var config                      =   require('./config');
var http                        =   require('http');
var path                        =   require('path');
var socketio                    =   require('socket.io');
var express                     =   require('express');
var morgan                      =   require('morgan');
var compress                    =   require('compression');
var bodyParser                  =   require('body-parser');
var methodOverride              =   require('method-override');
var session                     =   require('express-session');
var MongoStore                  =   require('connect-mongo')(session);
var flash                       =   require('connect-flash');
var passport                    =   require('passport');
var multer                      =   require('multer');
var upload                      =   multer({dest: path.join(__dirname,'public/upload/temp')});

module.exports                  =   function(dbInstance) {

    var app                     =   express();
    var server                  =   http.createServer(app);
    var io                      =   socketio.listen(server);

    app.use(upload.any());
    app.use(express.static('./public'));
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
   var mongoStore              =   new MongoStore({
        mongooseConnection: dbInstance.connection
    });

    app.use(
        session({
            saveUninitialized: true,
            resave: true,
            secret: config.sessionSecret,
            store: mongoStore
        })
    );
    
    app.set('views', './app/views');    
    var handlebars  =   require('express-handlebars').create({
        defaultLayout:'home',
        layoutsDir:'./app/views/layouts/',
        helpers: {//for section
            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
            static: function(name) {
                return require('./lib/static.js').map(name);
            }
        }
    });    
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/home.server.routes.js')(app);
    require('../app/routes/ad.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);

    require('./socketio')(server, io, mongoStore);

    //return app;
    return server;
};