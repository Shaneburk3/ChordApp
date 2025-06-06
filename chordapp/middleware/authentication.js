const jwt = require('jsonwebtoken');

//will need to add function to refresh ACCESS TOKEN regularly

function authToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        console.log("No Token Present, acting as a non-signed in user.");
        return res.render("index", { title: "Login", formErrors: [], formData: {}, user: null });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Error verifying token: ", err)
            res.clearCookie('token');
            return next();
            //return res.status(401).json({ error: "Invalid Token." });
        }
        if (user) {
            console.log("User athenticated: ", user)
            res.locals.user = user;
            req.user = user;
        }
        return next();
    });
};

function authAdmin(req, res, next) {
    console.log(req.user, req.user.role)
    if (req.user && req.user.role === 'ADMIN') {
        console.log("Admin athenticated: ", req.user)
        return next();
        //return res.status(400).json({ error: "Header required."});
    }
    return res.status(403).send('Access Forbidden.')
};
function optionalAuth(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return next();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (!err) {
            res.locals.user = user;
        }
        return next();
    });
}

module.exports = { authToken, authAdmin, optionalAuth }
