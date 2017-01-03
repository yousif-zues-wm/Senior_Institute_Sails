/**
 * PopController
 *
 * @description :: Server-side logic for managing pops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index1: function(req,res,next){
		var id = req.param('id');
		Pop.find(id).exec(function(err, pop){
				if (err) {
					return res.serverError(err);
				}
				res.view({pop : pop})
		});
	}
};
