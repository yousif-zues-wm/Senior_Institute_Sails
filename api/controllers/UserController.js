/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


        login: function(req, res, next) {
            res.view('user/login');

        },

signin: function(req, res, next) {
    var email = req.param('email'),
        password = req.param('password')
    console.log(`email in controller ` + email)
    User.findOne({email: email}).exec(
        function(err, user) {
        console.log(`test for find in signin ` + user.password)
        if (err) return res.redirect('/user/loginF')
        User.attemptLogin(password, user.password).then(function(resolve) {
            if (resolve === false) {return res.redirect('/user/loginF')}
            if (resolve === true) {
                console.log('Passwords Match');
                console.log(user.sid + ' redirecting...')
                res.redirect('user/show/' + user.id)
            }
        }
                                                   )
        }
    )
    },

        loginF: function(req, res, next) {
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



        logout: function(req, res, next) {
            User.update({sid: req.sessionID}, {online:false}).exec(function (err, user){
                if (err) return serverError(err)
              req.session.destroy(function() {
                    if (req.sessionID === null) {
                        console.log(`Session destroy Successful \r\n`)
                        if (req.sessionID = null) {
                            console.log(`User cookie destroyed`)
                        return res.redirect('/');
                        }
                    }
                    
                })
            })
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


//        succ: function(req, res, next) {
//            User.find(sid).exec(
//                function(err, user) {
//                    if (user === undefined) {
//                        console.log(`Invalid SessionID attempt`)
//                    }
//                    res.view({
//                        user: user
//                    });
//                })
//        },

        destroy: function(req, res, next) {
            var id = req.param('id');
            if (!id) {
                return res.badRequest('No id passed');
            }
            User.update(id, {
                isEnabled: true
            }).exec(function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                return res.redirect('/user/index1');
            });
        },

update: function(req, res, next) {
            if (!req.body) {
                return res.badRequest('No body data passed');
            }
            var id = req.param('id');
            if (!id) {
                return res.badRequest('No Id');
            }

            User.update(id, req.body).exec(function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                return res.jsonx(user);
            });
        },

new: function(req, res, next) {
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
},

create: function(req, res, next) {
    var userObj = req.params.all()
    userObj.online = true
    User.create(userObj, function(err, user) {
        if (err) return res.serverError(err)
        else {
            req.session.regenerate(function(err) {
                console.log(req.sessionID)
                User.attemptLogin(userObj.password, user.password).then(function (resolve) {
                    if (resolve == true) {
                    console.log('id on session gen ' + req.sessionID)
                    user.sid = req.sessionID
                    user.save()
                    if (user.sid === req.sessionID) {
                        res.redirect('user/show/' + user.id);
                        console.log(user.sid)
                    }
                }
                })
                
            })

        }
    })

},

    nf: function(req, res, next) {
        User.find(req.param('id')).exec(function(err, user) {
            if (err) {
                return res.serverError(err)
            }
            res.view({
                user: user
            })
        })
    },

    show: function(req, res, next) {
        var id = req.param('id');
        if (id == null || id == "") {
            res.redirect('user/nf')
        }
        User.findOne(id).exec(function(err, user) {
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

    index1: function(req, res, next) {
        console.log(req.sessionID)
        var id = req.param('id');
        console.log(new Date());


        //  User.findOne({sid: req.sessionID}).exec(function(err, user){
        // 	 if (err) {
        // 		return serverError(err);
        // 	 }
        // 		 res.redirect('user/index1u')
        //  })

        User.find(id, {
            isEnabled: false
        }).exec(function(err, users) {


            if (err) {
                return res.serverError(err);
            }
            var sid = req.param('sid')

            User.find({
                sid: req.sessionID
            }).exec(function(err, user) {
                if (err) {
                    return res.serverError(err)
                }

                console.log(user);

                if (user !== undefined) {
                    console.log('User Found!!')
                }
                console.log('id ' + req.sessionID)
    
            });
//
//            User.find({
//                sid: req.sessionID
//            }).exec(function(err, user1) {
//                if (err) {
//                    return res.serverError(err)
//                }
//                if (user1 === undefined) {
//                    console.log('User Logged Out')
//                    console.log(req.sessionID)
//                    res.view({
//                        users: users
//                    });
//                } else {
//                    console.log(user1)
//                    res.view({
//                        users: users
//                    }, {
//                        user1: user1
//                    })
//
//
//                }
//            })

        })
    },

    index1u: function(req, res, next) {
        var id = req.param('id');
        var sid = req.param('sid')
        User.findOne({
            sid: sid
        }).exec(function(err, me) {
            if (err) {
                return res.serverError(err);
            }

            if (me === undefined) {
                res.redirect('user/index1')
            }
            User.find(id, {
                isEnabled: false
            }).exec(function(err, users) {
                if (err) {
                    return res.serverError(err);
                }
                res.view({
                    users: users
                });

            })
        })
    },



    edit: function(req, res, next) {
        var id = req.param('id');
        User.findOne(id, {
            isEnabled: false
        }).exec(function(err, user) {
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

    update: function(req, res, next) {
        User.update(req.param('id'), req.params.all()).exec(function(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }
            res.redirect('/user/show/' + req.param('id'));
        });
    }
};