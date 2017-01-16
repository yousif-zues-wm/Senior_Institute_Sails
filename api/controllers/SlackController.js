/**
 * SlackController
 *
 * @description :: Server-side logic for managing slacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		index: function(req, res, next){
			Slack.find(req.param('id')).exec(function(err, slack){
				if (err) {
					return res.serverError(err)
				}
				res.view({slack: slack})
			});
		},
		view: function(req, res, next){
			Slack.find(req.param('id')).exec(function(err, slack){
				if (err) {
					return res.serverError(Err)
				}
				res.view({slack: slack})
			});
		}
};
