const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.authantication = async (req, res, next)=>{

    try{
        const token = req.header('Authorization');
        console.log("token ", token);
        const id = jwt.verify(token,'secretKey');
        const user = await User.findByPk(id);
        console.log(user.id);
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
    }
}