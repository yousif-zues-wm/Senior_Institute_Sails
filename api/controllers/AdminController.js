/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		all: function(req, res, next){

			var id = req.param('id');

			User.find(id, {isEnabled:true}).exec(function(err, user){
				if (err) {
					return res.serverError(err);
				}

				res.view({
					user : user
				});
			}),

			Bot.find(id).exec(function(err, bot){

					if (err) {
						return res.serverError(err);
					}

					res.view({

						bot : bot

					});
			});
		}
};
