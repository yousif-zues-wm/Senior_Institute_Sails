module.exports = function(req, res, next){
  res.locals.flash = {};
if (!req.session.flash) return next();
res.locals.flash = _.clone(req.sesssion.flash);
req.session.flash = {};
next();
  }
