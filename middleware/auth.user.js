const jwt = require("jsonwebtoken");
const SignModel = require('../model/signUp');


//protecting the routes

module.exports.authUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log(err);
                res.redirect('/log');
            } else {
                console.log(decoded)
                next();
            }
        })
    } else {
        res.redirect('/log');
    }
}

//welcoming a particular user with their user name or email

module.exports.getUser = (request, response, next) => {
    const token = request.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                console.log(err);
                response.locals.user = null;
                next();
            } else {
                console.log(decoded);
                const user = await SignModel.findById(decoded.id);
                response.locals.user = user;
                next()
            }
        })
    } else {
        response.locals.user = null;
        next()
    }
}
