var Family = require('../models/family');

module. exports = {
  
  get : (req, res) => {
    
    if(req.params.id){
      Family.findOne({_id : req.params.id}, (err, family)=>{
       res.send(family); 
      });
  }
  else{
      Family.find({}, (err, family)=>{
       res.send(family);
  });
}
    
},
  
  create : (req, res) => {
    var newFamily = new Family(req.body);
    
    newFamily.save((err, family)=>{
      if(err) {
        return res.send(err);
      }
      
      res.send(family);
      
    });
  }
}