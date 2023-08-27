const path = require('path');
const rootDir = require('../util/path');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');


function generateToken(data){

    return jwt.sign(data, 'secretKey');
}

exports.getMain = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", 'main.html'));

}
