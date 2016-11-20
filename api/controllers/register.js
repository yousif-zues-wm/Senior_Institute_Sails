module.exports = {
  find: function(req, res,next){
    var id = req.param('id');
    User.find(id, {isEnabled: false}).exec(function(err, user){
      if (err) {
        return res.serverError(err);
      }
      return res.jsonx(user);
    });
  }
}
