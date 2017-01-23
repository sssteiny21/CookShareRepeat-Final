var User = require('../models/userauth'),
    Family = require('../models/family'),
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
    res.redirect('/');
  },

  login: (req, res) => {  //this is the submission/login request for your users entering your site
    //console.info('auth.login.signin', req.body);
    console.info('auth.login.payload:', req.body);

    User.findOne({
      email: req.body.email
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
                        res.send(user); // send a success message
                    }
                });
            }
        });
  },
  /*session: (req, res, next) => {
      if( req.session.uid ) {
          console.info('User is logged in, proceeding to dashboard...'.green);
          next();
      } else {
          console.warn('User is not logged in!'.yellow)
          res.redirect('/home.html');
      }
  },*/

  create: (req, res) =>{  //creating a new user
    // First, find the family we need to assign the user to

            Family.findOne({name : req.body.family}, (err, fam)=>{
                if (fam){
                    // we found a family!
                    req.body.family = fam._id // reassign the id to the family property on the object that will become our new user

                    // Regular user creation flow!
                    var newUser = new User(req.body)
                    newUser.save((err, user)=>{
                        res.send(doc);
                    })
                }
                else{
                    // no family :(

                    // So let's make one!
                    var newFam = new Family({
                        name : req.body.family // what the user typed into the form
                    })

                    newFam.save((err, fam)=>{
                        req.body.family = fam._id
                        // Regular user creation flow!
                        var newUser = new User(req.body)
                        newUser.save((err, user)=>{
                            res.send(user); //this sends the document we just saved to the database
                        })
                    })

                }
            })

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
      //.select('firstName')
      .exec((err, users)=>{
      if(err) {
        return res.send(err);
      }
      res.send(users);
    });
  }

},
}
