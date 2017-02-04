/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		new: function(req, res, next){
			if (req.cookies.uid ===
				 undefined) {
				res.redirect('/user/login')
			}
			else{

			User.findOne(req.cookies.uid).exec(function(err, user){
					if (err) {
						return res.serverError(err)
					}
					if (user !== undefined) {
						res.view({user: user});
						console.log(req.cookies.uid)
					}
					else{
						res.redirect('/user/login')
					}
		})

	}

		},
		create: function(req, res, next){
			User.findOne(req.cookies.uid).exec(function(err, users){
				if (err) {
					return res.serverError(err)
				}
				console.log(users.name);
				var mediaM = [];
				mediaM.push(req.param('media'));
				mediaM = mediaM.toString().split("=").pop();
				console.log(mediaM);
			Room.create({user: users.name, title: req.param('title'), media: mediaM, genre: req.param('genre')}).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				console.log(room.title)
				res.redirect('/room/')
			})
		})

		},
		index: function(req, res){
					if (req.cookies.uid === undefined) {
						res.redirect('/user/login')
					}
					else{
						User.findOne(req.cookies.uid).exec(function(err, user){

							if (err) {
								return res.serverError(err);
							}

			Room.find(req.param('id')).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				console.log(user.name);
				var name = user.name
					Room.find({user: name}).exec(function(err, yourRoom){
						if (err) {
							return res.serverError(err)
						}
						if (yourRoom === undefined) {
							res.view({room : room, user: user})
						}
						else{

						return res.view({yourRoom: yourRoom, room: room, user: user})
					}

					})
					// res.view({room : room})

				})
		})


}
		},
		like: function(req, res, next){

			User.findOne(req.cookies.uid).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				var userL = []
				var userL = user.likes;
				var z = 2;
				var id = req.param('id')


				if (userL.indexOf(req.param('id')) !== -1) {
					console.log(`User Already Likes This Room!!`);
					res.redirect('/room')
				}
				else{
					userL.push(id);
					user.likes = userL;

				console.log(userL);
				User.update(req.cookies.uid, {likes: userL}).exec(function(err, liked){
					if (err) {
						return res.serverError(err)
					}

			Room.findOne(req.param('id')).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				if (room === undefined) {
					res.redirect('/room')
					console.log('Room not found')
				}
				var likeV = parseInt(room.likes) + 1;
				Room.update(req.param('id'), {likes : likeV}).exec(function(err, roomF){
					if (err) {
						return res.serverError(err)
					}
					console.log(roomF.likes)
					res.redirect('/room')
				})
			})
		})
	}
	})

},

	dislike: function(req, res, next){
		User.findOne(req.cookies.uid).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			var userD = [];
			userD =  user.dislikes;
			user.dislikes = userD;

			if (userD.indexOf(req.param('id')) !== -1) {
					console.log(`User Already Dislikes This Room!!!`);
					res.redirect('/room')
				}
				else{
					userD.push(req.param('id'));

			Room.findOne(req.param('id')).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				var roomDD = 0;
				if (room.dislikes == undefined || room.dislikes == null) {
					room.dislikes = roomDD;
				}
				var roomD = parseInt(room.dislikes) + 1;
				User.update(req.cookies.uid, {"dislikes" : userD}).exec(function(err, usr){
					if (err) {
						return  res.serverError(err)
					}
					userD.push(req.param('id'));
					user.dislikes = userD;
					console.log(`User Dislikes: ${user.dislikes}`);
				Room.update(req.param('id'), {'dislikes' : roomD}).exec(function(err, roomDis){
					if (err) {
						return res.serverError(err)
					}
					console.log(`${room.title} Dislikes: ${room.dislikes}`);
					res.redirect('/room')
				})
			})
		})
	}


		})
	},

	join : function(req, res, next){
		User.findOne(req.cookies.uid).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (user === undefined) {
				res.redirect('/user/login')
			}

			Room.findOne(req.param('id')).exec(function(err, room){
				if (err) {
					return res.serverError(err)
				}
				res.view({ room : room })
			})
		})
	},
	audio: function(req, res, next){
		if (req.cookies.uid) {
			res.redirect('/')
		}
		User.findOne(req.cookies.uid).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}

		})
	},
	destroy: function(req, res, next){
		Room.destroy(req.param('id')).exec(function(err, room){
			if (err) {
				return res.serverError(err)
			}
			res.redirect('/room');
		})
	}

};
