module.exports = function (req, res, next) {
    if (req.headers.authorization === '123456') {
        next();
    } else {
        return res.forbidden('No valid Authorize header passed.');
    }
    
};
