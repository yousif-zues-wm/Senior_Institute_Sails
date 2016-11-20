$(document).ready(function(){
  $('#sign-up-form').validate({
    rules: {
      name:{
        required: true
      },
      email:{
        required: true,
        email: true
      },
      password:{
        minlength: 6,
      }
    },
    success: function(element){
      element.text('OK!').addClass('valid');
    }
  });
});
