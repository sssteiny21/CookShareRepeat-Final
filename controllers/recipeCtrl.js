var Recipe = require('./models/recipes');

module.exports = {
  get : (req, res) => {
    
    if (req.params.id){
      //this will get one
      Recipe.findOne({_id : req.params.id}, (err, recipe)=>{  //_id and req.params.id are two separate objects you can compare
        res.send(recipe);        
      });
    }
    else{
      //this gets many recipes
      Recipe.find({}, (err, recipe) =>{
        res.send(recipe);
      });
    }
  },
  
  create : (req, res) =>{
    var newRecipe = new Recipe(req.body);
    
    newRecipe.save((err, recipe)=>{
      if(err) {
        return res.send(err);
      }
      
      res.send(recipe);
    })
  }
}