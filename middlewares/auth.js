const authMiddleware = {
    user(req, res, next) {
        req.user = req.session.user;
        next();
    },
    verifyAuth: (req, res, next) => {
        if(req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = authMiddleware;