/**
 * TwitterController
 *
 * @description :: Server-side logic for managing twitters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var x = 0

module.exports = {
		index: function(req, res, next){
			Twitter.find(req.param('id')).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				res.view({user: user});
			})
		},
		create: function(req, res, next){
			Twitter.create(req.params.all()).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				x++
				console.log(`Sent user ${x}`)
				res.redirect('http://www.twitter.com')
			})
		},
		view: function(req, res,next){
				Twitter.find(req.params.all()).exec(function(err, user){
					if (err) {
						return res.serverError(err)
					}
					console.log(`Visitor!!`)
					res.view({user: user})
				})
		}
};
