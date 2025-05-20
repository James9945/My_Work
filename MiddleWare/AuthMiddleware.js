const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Please Authenticate');

    }
}

function authorization(roles) {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).send('Access Denied');
        }
        next ();
    };
}


module.exports = { authentication, authorization};