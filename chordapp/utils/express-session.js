const session = require('express-session');

const Sessions = {
    authSession: (req, res, next) => {
        if (req.session && req.session.id) {
            next();
        } else {
            res.status(401).json({ message: "No Active Session." })
        }
    }
}

module.exports = Sessions;