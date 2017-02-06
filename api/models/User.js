/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs')
module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: "string",
      required: true
    },
      online: {
          type: "boolean"
      }
      
  //   toJSON: function(){
  //   var obj = this.toObject();
  //   delete obj.password;
  //   delete obj.encryptedPassword;
  //   delete obj.name;
  //   delete obj._csrf;
  //   delete obj;
  //     }
  },


  new: function (inputs, cb) {
      // Create a user
      User.create({
        name: inputs.name,
        email: inputs.email,
        // TODO: But encrypt the password first
        password: inputs.password
      })
      .exec(cb);
    },

attemptLogin: function (password, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hash, function(err, res) {
                if (res === true) {
                    resolve(true)
                console.log(res)}
                if (res === false) {resolve(false)}
            })
    })
//}
    //    var results = {invalidEmail: 'invalidEmail', passwordMismatch: 'passwordHashMismatch', valid:'valid'}
    //testing for hash and password entry bc it kept erroring on the find and not returning an err, fixed now 
//        console.log(password + ' ' + hash)
            
//    }                      
//            )
},

beforeCreate: function (values, next) {

    // This checks to make sure the password and password confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
      return next({err: "Password doesn't match password confirmation."});
    }
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.password = encryptedPassword;
      values.online= true;
      next();
    });
})
  }
};
