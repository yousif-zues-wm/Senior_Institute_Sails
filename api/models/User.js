/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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

    attemptLogin: function (inputs, cb) {

    User.findOne({
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  }
    // toJSON: function(){
    //   var obj = this.toObject();
    //   delete obj.password;
    //   delete obj.encryptedPassword;
    //   delete obj._csrf;
    //   return obj;
    // }

};
