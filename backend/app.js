var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var  cors = require('cors');

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  key: 'userId',
  secret: 'Arviyansh@121212',
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: 60 * 60 * 24
  }
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const passport = require('passport');


const config = require("config");
const mongoose = require("mongoose");

//const usersRoute = require("./routes/auth.routes");


var app = express();
app.use(cors({
  origin: ["http://localhost:3002"],
  methods: ["GET","POST"],
  credentials: true
}));
const port = 3001

/*app.get('/', (req, res) => {
  res.send('Hello World!')
}) */


if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/PNRD", { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));



app.use('/theme', express.static(__dirname + '/node_modules/admin-lte/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);


app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})