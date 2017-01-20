const SALTY_BITS = 10; //10 for strength is usually enough

var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    userSchema = mongoose.Schema({
      firstName : String,
      lastName  : String,
      email     : {type : String, required : true, unique : true},
      password       : {type : String, required : true},
      state     : String,
      country   :String,
      family    : {
        type : mongoose.Schema.ObjectId,
        ref  : "Family"
  },
      dateJoined: {
        type : Number,
        default : () => {return Date.now()
}
}
});


//AUTHENTICATION

// hash passwords before saving a new user
userSchema.pre('save', function(next) { // don't use an arrow function here, we need the scope!
    var user = this; // this is why we can't use an arrow function  here, again we need the scope

    // only hash the password if it has been modified (for updating users)
    if( !user.isModified('password') ) {
        return next();
    }
    // generate a salt value to encrypt our password
    bcrypt.genSalt(SALTY_BITS, (saltErr, salt) => { // used to guarentee uniqueness
        if(saltErr) {
            return next(saltErr);
        }

        console.info('SALT generated!'.yellow, salt);

        // now let's hash this bad boy!
        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                return next(hashErr);
            }
            // over-ride the plain text password with the hashed one
            user.password = hashedPassword;
            next();
        });
    });
});
//END AUTHENTICATION USING bcrypt and saltybits

//Export my model
module.exports = mongoose.model('User', userSchema);
