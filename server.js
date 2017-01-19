require('colors');
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan')('dev'),
    routes = require('./routes'),
    //logger = require('logger'),
    PORT = process.env.PORT || 1414,
    app = express(),

    mongoose = require('mongoose').connect('mongodb://localhost/CookingFinal',
   (mongooseErr) => {
      if(mongooseErr) {
        console.error('#ERROR#'.red,'Could not initialize mongoose!', mongooseErr);
      } else {
        console.info('Mongoose initialized!'.green.bold);
      }
    }),

    sessions = require('client-sessions')({
      cookieName : "userAuth",
      secret : "steiny",
      requestKey : "session",
      cookie : {
        httpOnly : true
      }
    }),
      //encrypted cookies
    routes = require('./routes'),
    PORT = process.env.PORT || 1414,
    app = express();


// Connect to DB
mongoose.connect("mongodb://localhost/recipes", (err)=>{
  if(err){
    return console.log("DB failed to connect");
  }
  console.log("☃☃ DB Connected ☃☃".green.bold);
});

// Middleware
app.use(
  //logger,
  sessions,
  morgan,
  express.static('public'),
  bodyParser.json(),
  bodyParser.urlencoded({extended : true}),
  (req, res, next) =>{
    console.log('SESSION : ', '${req.session.uid}');
    next();
  }
 );

// Routes
routes(app);

// Listen
app.listen(PORT, (err)=>{
  if(err){
    return console.log(`Our Server DIED ☃`.red.bold);
  }
  console.log(`☃☃ Server running on ${PORT} ☃☃`.green.bold);
});
