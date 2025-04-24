const session = require('express-session');

const Sessions = {
    authSession: (req, res, next) => {
        if (req.session && req.session.user_id) {
            next(); //Confirms user is logged in.
        } else {
            res.status(401).json({ message: "No Active Session." })
        }
    }
}

module.exports = Sessions;