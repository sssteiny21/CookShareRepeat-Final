var mongoose = require('mongoose');

//Defining my family schema
var familySchema = mongoose.Schema({
  name : String,
  state : String,
  country : String,



});

var family = this;

//Exporting my module
module.exports = mongoose.model('Family', familySchema);
