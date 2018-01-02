const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

// view engine setup
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("partnerInCrime"));
app.use(helmet());
app.use(compression());
app.use(session({
    name: "NodeSID",
    secret: "partnerInCrime",
    resave: false,
    saveUninitialized: true
}));
//app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));

// Headers
app.use((req, res, next)=>{
    res.append("X-UA-Compatible", "IE=edge,chrome=1");
    next();
});

app.use(express.static(path.join(__dirname, '../dist')));

//API
app.use((req, res, next)=>{
    res.append("Expires", "Tue, 03 Jul 2001 06:00:00 GMT");
    res.append("Last-Modified", new Date().toUTCString());
    res.append("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
    next();
});
app.use('/api',require("./api"));



// Catch 404 and forward to error handler
app.use((req, res, next)=>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Error handler
app.use((err, req, res, next)=>{
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        status: err.status,
        stack: err.stack
    });
});




// Create server
http
    .listen(app.get('port'),()=>{
        console.log( 'Express server listening on port ' + app.get('port') );
    });