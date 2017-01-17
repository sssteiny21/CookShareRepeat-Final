var User = require('./models/user');

module.exports = {   //all routes need to be in object we will export to our route handlers
  
  create: (req, res) =>{
    
    var newUser = new User(req.body);  //it's fine to pass in req.body however you can literally pass name, email etc, but as long as req.body matches your user object it's fine
    
    newUser.save((err, user)=>{
      if(err) {
        return res.send(err);
      }
      
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
      .select('-firstName')
      .exec((err, users)=>{
      if(err) {
        return res.send(err);
      }
      res.send(users);
    });
  }
    
}
  
  
}