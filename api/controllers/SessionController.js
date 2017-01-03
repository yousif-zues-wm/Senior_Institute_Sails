/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	newUser: function(req, res, next){
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 6000);
		// req.session.authenticated = true;
		// console.log(req.session);
		// res.view('session/new');
		// console.log(req.session.authenticated);
	res.view('session/new');

	},

		newSession : function(req, res, next){
			console.log('Action');
			User.findOne(req.param('email') ,{isEnabled: false}).exec(function(err, user){
				console.log(JSON.stringify(user));
				if(err){
					return res.serverError(err);
				}
				else{
					if (req.param('password') == user.password) {
						res.session.user = user;
						res.redirect('/');
					}
					else{
						res.render('login Jade', {error: "invalid Email/ Password"});
					}
				}

		})
		//
		// logout : function(req,res,next){
		// 	res.session.reset();
		// 	res.redirect('/');
		// }

		// 'test' : function(req, res, next){
		// 	res.view('/session/test');
		// 	console.log('working');
		// },

	}
};
