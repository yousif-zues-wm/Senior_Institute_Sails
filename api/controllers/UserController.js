/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


		login: function(req, res, next){
			// console.log(req.param('password'))
			//res.view('/user/login')
			res.view('user/login');

		},

		signin: function(req, res, next){
			var emailAddr = req.param('email');
			var pass = req.param('password');
			User.findOne({email : req.param('email'), password: req.param('password'), isEnabled: false}).exec(function(err, user){
			if (err) {
				return req.flash('Error')
			}
			if (user === undefined) {
					res.redirect('/user/loginF')
			}
			else{
			console.log('Success');
			// req.session.regenerate(function(err) {
			//
			// 	console.log(req.sessionID)
			// 	User.update({email : req.param('email')}, {sid: req.sessionID}).exec(function(err, user) {
			// 		console.log('id ' + req.sessionID)
			// 		if (err) {
			// 		return res.serverError(err)}
			// 	})
			// })
			res.cookie('uid' , user.id , {httponly : true}).redirect('/user/succ');

			console.log('id' + user.sid);
		}

			// console.log(user.name);
		})

	},

	loginF: function(req, res, next){
		// console.log(req.param('password'))
		//res.view('/user/login')
		res.view('user/loginF');

	},
	// login: function(req, res, next){
	// 	// console.log(req.param('password'))
	// 	//res.view('/user/login')
	//     return res.login({
	//       email: req.param('email'),
	//       password: req.param('password'),
	//       successRedirect: '/',
	//       invalidRedirect: '/user/login'
	//     });



	logout: function (req, res, next) {
		// var sid = req.param('sid');
		if (req.cookies.uid === undefined) {
			res.redirect('/user/login')
		}
		else{
		User.findOne(req.cookies.uid).exec(function(err, user){
				if (err) {
						return res.serverError(err)
				}
				if (user === undefined) {
					res.redirect('/user/login')
				}
		var uid = req.cookies.uid
		User.findOne(uid).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			res.clearCookie("uid");
		console.log(`New Cookie ${uid}`)
    return res.redirect('/');
	})
});
	}
  },

		// newSession : function(req, res, next){
		// 	console.log('Action');
		// 	User.findOne(req.param('email')).exec(function(err, user){
		// 		console.log(req.param('email'));
		// 		if(err){
		// 			return res.serverError(err);
		// 		}
		// 		else{
		// 			if (req.param('password') == user.password) {
		// 				res.session.user = user;
		// 				res.redirect('/');
		// 			}
		// 			else{
		// 				res.render('login Jade', {error: "invalid Email/ Password"});
		// 			}
		// 		}
		//
		// })
		//
		// logout : function(req,res,next){
		// 	res.session.reset();
		// 	res.redirect('/');
		// }

		// 'test' : function(req, res, next){
		// 	res.view('/session/test');
		// 	console.log('working');
		// },


		succ : function(req, res, next){
			var uid = req.cookies.uid
			console.log(`Cookie ${uid}`)
			User.findOne(uid).exec(function(err, user){




				if (user === undefined) {
					console.log(`Failed`)
				}
				res.view({ user: user });
			})
		},


		find: function(req, res,next){
			var id = req.param('id');
			User.find(id, {isEnabled: false}).exec(function(err, user){
				if (err) {
					return res.serverError(err);
				}
				return res.jsonx(user);
			});
		},


		destroy: function(req,res,next){
			var id = req.param('id');
			if (!id) {
				return res.badRequest('No id passed');
		}
		User.update(id, {isEnabled: true}).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/user/index1');
		});
	},

	admin: function(req,res,next){
		var id = req.param('id');
		if (id) {
			return res.badRequest('Not an admin');
		}
		User.find(id, {admin: true}).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}

			return res.jsonx(user);
		});
	},

	update: function(req, res, next){
		if (!req.body) {
			return res.badRequest('No body data passed');
		}
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No Id');
		}

		User.update(id, req.body).exec(function(err, user){
			if (err) {
					return res.serverError(err);
			}
			return res.jsonx(user);
		});
	},

	create: function(req, res, next){

		if (!req.body) {
			return res.badRequest('No body data passed');
		}
		var id = req.param('id');
		User.findOne(req.param('email')).exec(function(err, userFOUND){
			if (err) {
				res.serverError(err)
			}
			if (userFOUND === undefined) {

		User.create(req.params.all()).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}
			res.cookie('uid', user.id)
			res.redirect('/user/show/' + req.cookies.uid);
		})
	}
		else{
			res.redirect('/user/new')

		}
	})

	},
	new: function(req, res, next){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	//  create: function(req, res, next){
	// 	 var emailF = req.param('email')
	// 	 var pw = req.param('password')
	// 	 User.find({email : emailF}).exec(function(err, fuser){
	// 		 	if (fuser === undefined) {
	// 				User.create(req.params.all(), function userCreated(err, user){
	// 					if(err){
	// 						return res.serverError(err);
	// 					}
	// 				 //  return res.redirect('/user/new');
	// 				 //  return res.jsonx(user);
	 //
	// 				 res.redirect('user/show/' + user.id);
	// 				 console.log(user.sid)
	// 				});
	// 		 	}
	// 			else{
	// 				console.log(`User Exists!!!`)
	// 				res.redirect('/')
	// 			}
	// 	 })
	 //
	//  },

	 nf: function(req,res,next){
		 User.find(req.param('id')).exec(function(err, user){
			 if (err) {
			 	return res.serverError(err)
			 }
				res.view({user: user})
		 })
	 },

	 show: function(req, res, next){
		 var id = req.param('id');
		 if (id == null || id == "") {
		 	res.redirect('user/nf')
		 }
		 User.findOne(id).exec(function(err, user){
			 if (err) {
			 	return res.serverError(err);
			 }
			 if (!user) {
			 	next();
			 }
			 res.view({
				 user: user
			 });

		 });
	 },

	 index1: function(req, res, next){
		 console.log(req.sessionID)
		 var id = req.param('id');
		 console.log(new Date());

		//  User.findOne({sid: req.sessionID}).exec(function(err, user){
		// 	 if (err) {
		// 		return serverError(err);
		// 	 }
		// 		 res.redirect('user/index1u')
		//  })

		 User.find(id, {isEnabled: false}).exec(function(err, users){


			 if (err) {
			 	return res.serverError(err);
			 }
			 var sid = req.param('sid')

			 User.findOne({sid: req.sessionID}).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}

				console.log(user);

				if (user != undefined) {
				// res.redirect('user/index1u')
				console.log('User Found!!')
			}
			// console.log(user.name)
			console.log('id ' + req.sessionID)
			console.log('sid:' + {sid: req.sessionID})


				// console.log(user.sid);
			 });

			 User.findOne({sid: req.sessionID}).exec(function(err, user1){
				 if (err) {
				 	return res.serverError(err)
				 }
				 if (user1 === undefined) {
				 		console.log('User Logged Out')
						console.log(req.sessionID)
						res.view({
							 users : users
						 });
				 }
				 else{
					 console.log(user1)
					 res.view({users: users},
						 {user1: user1})


				 }
			 });

		 });
	 },

	 index1u: function(req, res, next){
		 var id = req.param('id');
		 var sid = req.param('sid')
		 User.findOne({sid : sid}).exec(function(erro, me){
			 if (erro) {
				return res.serverError(erro);
			 }
			//  res.view({
			// 	 me: me
			//  })
			if (me === undefined) {
				res.redirect('user/index1')
			}
		 User.find(id, {isEnabled: false}).exec(function(err, users){
			 if (err) {
			 	return res.serverError(err);
			 }
			 res.view({
				 users : users
			 });

		 })
		 })
	 },



	 edit: function(req, res, next){
		 var id = req.param('id');
		 User.findOne(id, {isEnabled: false}).exec(function(err, user){
			 if (err) {
			 	return res.serverError(err);
			 }
			 if (!user) {
			 		return next();
			 }
			 res.view({
				 user: user
			 });
		 });
	 },

	 update: function(req,res,next){
		User.update(req.param('id'), req.params.all()).exec(function(err){
			if (err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	 }
};
