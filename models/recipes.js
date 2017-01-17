var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  name        : String,
  creator     : String,
  email       : String,
  ingredients : {type : Array, default : []},
  directions  : String,
});

module.exports = mongoose.model('Recipes', recipeSchema);