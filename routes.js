var Auth = require('./controllers/auth'),
    express = require('express'),
    Families = require('./controllers/familyCtrl'),  //grab your controllers 
    Users    = require('./controllers/userCtrl'),
    Recipes  = require('./controllers/recipeCtrl'),
    User = require('./models/users'),
    Middleware = require('./middleware');

module.exports = (app) =>{
  
  // create your routes
  /// identify where to direct angular routing
  app.get('/', (req, res)=>{
   res.sendFile('index.html', {root : './public/html'});
  });
  
  app.get('/api/me', (req, res)=>{
    //this sends down their ID
    User.findOne({_id : req.session.userID}, (err, user) =>{
      res.send(user) //this sends down their object
    })
    
  })
 
  //  Authentication routes
  app.get('/logout', Auth.logout);        // logout route + redirect
  app.get('./logout', (req, res)=>{
    req.session.reset(); //this destroys user session
    res.redirect('/')
  });
  
  app.post('/login', Auth.login);         // login form submission
  app.post('/register', Auth.register);   // register form submission

  app.get('/dashboard.html', Auth.session);  //dashoboard for each user
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




    