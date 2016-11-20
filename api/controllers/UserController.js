/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
		User.create(req.body).exec(function(err, user){
			if (err) {
				return res.serverError(err);
			}
			var adminCheck = parseInt(req.param('id')) % 2;
			if( adminCheck == 0){
				User.update(id, {admin: true}).exec(function(err, user){
					if (err) {
						return res.serverError(err);
					}
				});
			}
			return res.jsonx(user);
		});

	},
	new: function(req, res, next){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	 create: function(req, res, next){
		 User.create(req.params.all(), function userCreated(err, user){
			 if(err){
				 return res.serverError(err);
			 }
			//  return res.redirect('/user/new');
			//  return res.jsonx(user);
			res.redirect('user/show/' + user.id);
		 });
	 },
	 show: function(req, res, next){
		 User.findOne(req.param('id')).exec(function(err, user){
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
		 var id = req.param('id');
		 User.find(id, {isEnabled: false}).exec(function(err, users){
			 if (err) {
			 	return res.serverError(err);
			 }
			 res.view({
				 users: users
			 });
		 });
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
