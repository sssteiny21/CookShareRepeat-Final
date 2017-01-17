var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  firstName : String,
  lastName  : String,
  email     : {type : String, required : true, unique : true},
  pwd       : {type : String, required : true},
  state     : String,
  country   :String,
  family    : {
    type : mongoose.Schema.ObjectId,
    ref  : "Family"
  },
  dateJoined: {
    type : Number,
    default : () => {return Date.now()}
  },  
});

//AUTHENTICATION

// hash passwords before saving a new user 
User.pre('save', function(next) { // don't use an arrow function here, we need the scope!
    var user = this; // this is why we can't use an arrow function  here, again we need the scope

    // only hash the password if it has been modified (for updating users)
    if( !user.isModified('pass') ) {
        return next();
    }
    // generate a salt value to encrypt our password
    bcrypt.genSalt(11, (saltErr, salt) => { // used to guarentee uniqueness
        if(saltErr) {
            return next(saltErr);
        }

        console.info('SALT generated!'.yellow, salt);

        // now let's hash this bad boy!
        bcrypt.hash(user.pass, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                return next(hashErr);
            }
            // over-ride the plain text password with the hashed one
            user.pass = hashedPassword;
            next();
        });
    });
});
//END AUTHENTICATION USING bcrypt and saltybits

//Export my model
module.exports = mongoose.model('User', userSchema);