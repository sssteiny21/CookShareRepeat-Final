var Recipe = require('../models/recipes');

module.exports = {

  get : (req, res) => {

    if (req.params.id){
      //this will get one
      Recipe.findOne({_id : req.params.id}).poulate('family').exec((err, recipe)=>{  //_id and req.params.id are two separate objects you can compare
        if(err){
          return res.send(err)
        }
        if(recipe){
          return res.send(recipe)
        }
        else{
          res.send({badrecipe: 'No Recipe Found here'});
        }

      });
    }
    else{
      var query = {};
      //this gets many recipes
      if (req.query.creator){
        query.creator = req.query.creator
      }
      Recipe.find(query, (err, recipe) =>{
        res.send(recipe);
      });
    }
  },

  create : (req, res) =>{
    req.body.creator = req.session.uid
    var newRecipe = new Recipe(req.body);

    newRecipe.save((err, recipe)=>{
      if(err) {
        return res.send(err);
      }

      res.send(recipe);
    })
  }
}
