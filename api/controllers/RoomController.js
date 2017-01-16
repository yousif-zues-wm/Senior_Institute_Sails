/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		new: function(req, res, next){
			if (req.cookies.uid === undefined) {
				res.redirect('/user/login')
			}
			else{

			User.findOne({sid: req.cookies.uid}).exec(function(err, user){
					if (err) {
						return res.serverError(err)
					}
					if (user !== undefined) {
						res.view({user : user});
						console.log(req.cookies.uid)
					}
					else{
						res.redirect('/user/login')
					}
		})

	}

		},
		create: function(req, res, next){
			User.findOne({sid: req.cookies.uid}).exec(function(err, users){
				if (err) {
					return res.serverError(err)
				}
				console.log(`Name ${users.name}`);
			Room.create(req.params.all()).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				console.log(room.title)
				res.redirect('/room/')
			})
		})

		},
		index: function(req, res){
			Room.find(req.param('id')).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				res.view({room: room})
			})
		},

};
