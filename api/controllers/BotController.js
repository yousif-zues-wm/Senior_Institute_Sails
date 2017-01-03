/**
 * BotController
 *
 * @description :: Server-side logic for managing bots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
		index1: function(req, res, next){
			var id = req.param('id');
			User.find(id, {isEnabled: true}).exec(function(err, bot){
				if (err) {
					return res.serverError(err);
				}
					res.view({
						bot : bot
					});
			});
		}
};
