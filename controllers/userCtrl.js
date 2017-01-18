var User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    errors = {
      general: {
        status: 500,
        message: 'backend error'
      },
      login: {
        status: 403,
        message: 'Invalid username or password'
      }
    };

module.exports = {   //all routes need to be in object we will export to our route handlers
  logout: (req, res) => {
    req.session.reset(); //clears the cookie session
    res.redirect('home.html');
  },
  
  login: (req, res) => {  //this is the submission/login request for your users entering your site
    //console.info('auth.login.signin', req.body);
    
    User.findOne({
      email: req.body.email.toLowerCase
    }, (err, user) => {
            if( err) {
                console.error('MongoDB error:'.red, err);
                return res.status(500).json(errors.general);
            }
            if( !user || !user.password ) {
                // forbidden
                console.warn('No user or user.password found!'.yellow, user);
                res.status(450).json(errors.login);
            } else {
                console.info('auth.login.user', user);
                // at this point, user.password is hashed!
                bcrypt.compare(req.body.password, user.password, (bcryptErr, matched) => {  //this is the bcrypt compare method to check the password against the user body
                    // matched will be === true || false
                    if( bcryptErr ) {
                        console.error('MongoDB error:'.red, bcryptErr);
                        res.status(500).json(errors.general);
                    } else if ( !matched ) {
                        // forbidden, bad password
                        console.warn('Password did not match!'.yellow);
                        res.status(403).json(errors.login);
                    } else {
                        req.session.uid = user._id; // this is what keeps our user session on the backend!
                        res.send({ message: 'Login success' }); // send a success message
                    }
                });
            }
        });
  },
  
  create: (req, res) =>{  //creating a new user
    
    req.body.email = req.body.email.toLowerCase();
    var newUser = new User(req.body);  //it's fine to pass in req.body however you can literally pass name, email etc, but as long as req.body matches your user object it's fine
    
    newUser.save((err, user)=>{
      if(err) {
        return res.send(err);
      }      
      req.session.userID = user._id;
      res.send(user);  //this sends teh document we just saved above in tthe database
    });
  },
  
  get : (req, res) =>{
    //this function is to Get One User
    // route is /api/user/(user _id)
    if(req.params.id){
      User.findOne({_id : 
     req.params.id}).populate('family').exec((err, user)=>{  //you can find by an attribute, this one is simply finding by the _id
        if(err){
          return res.send(err)
        }
        if(user){
          res.send(user)
        }
        else{
          res.send({noUser : 'No user found here'});  
        }
        
      });
  }
    //this function below is to get many Users
    // route is /api/users
  else{
    var query = {};
    //loop over the req.query object and pass the key: value pairs onto query object.  req.query is an object containing a property for each query string in the route.  If there is no query string, it is an empty object
    for(var param in req.query){
      query[param] = req.query[param];
    }
    
    User
      .find(query)
      .populate('family', 'name')
      .select('firstName')
      .exec((err, users)=>{
      if(err) {
        return res.send(err);
      }
      res.send(users);
    });
  }
    
},
}