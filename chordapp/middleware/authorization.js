const jwt = require('jsonwebtoken');

//will need to add function to refresh ACCESS TOKEN regularly

function authenticateToken(req, res, next) {
    const token = req.cookies?.token;
    res.locals.user = null;
    if (!token) {
        return next();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (!err && user) {
            res.locals.user = user;
            req.user = user;
            return next();
        }
        res.clearCookie('token');
        return res.status(400).redirect('/');
    });
};

function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'ADMIN') {
        return next();
    }
    return res.status(403).send('Access Forbidden.')
}

module.exports = { authenticateToken, checkAdmin }
