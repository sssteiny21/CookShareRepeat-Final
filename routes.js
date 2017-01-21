var Auth = require('./controllers/userCtrl'),
    express = require('express'),
    Families = require('./controllers/familyCtrl'),  //grab your controllers
    Users    = require('./controllers/userCtrl'),
    Recipes  = require('./controllers/recipeCtrl'),
    api   = require('./controllers/api.js'),
    User = require('./models/userauth');

    //Middleware = require('./middleware');

module.exports = (app) =>{

  // create your routes

  /// identify where to direct angular routing
  app.get('/', (req, res)=>{
   res.sendFile('index.html', {root : './public/html'});
  });

  app.get('/api/me', (req, res)=>{
    //this sends down their ID
    User.findOne({_id : req.session.uid}, (err, user) =>{
      res.send(user) //this sends down their object
  })
})

    //API ROUTE
    app.get('/api/search', api.recipe)


    //authentication routes

    app.get('/logout', Auth.logout);        // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.create);   // register form submission

    // app.get('/home.html', Auth.session);
    app.use(express.static('public'));



     // User Routes
  app.get('/api/users', Users.get); // Get Many
  app.get('/api/users/:id', Users.get); // Get One
  app.post('/api/users', Users.create); //creates a user

  // Family Routes
  app.get('/api/families', Families.get); // Get Many
  app.get('/api/families/:id', Families.get); // Get One
  app.post('/api/families', Families.create); //creates a family

  //Recipe Routes
  app.get('/api/recipes', Recipes.get); // Get Many
  app.get('/api/recipes/:id', Recipes.get); // Get One
  app.post('/api/recipes', Recipes.create); //creates a recipe


  /*app.get('*', (req, res)=>{                //You can also use req.session.userId but you still need to res.send it down
   res.sendFile('index.html', {root : './public/html'}); */

 }
