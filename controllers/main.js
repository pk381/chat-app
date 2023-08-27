const path = require('path');
const rootDir = require('../util/path');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');
const Message = require('../models/message');


// function generateToken(data){

//     return jwt.sign(data, 'secretKey');
// }

exports.getMain = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", 'main.html'));

}


exports.postMessage = async (req, res, next)=>{

    try{   
        
        const message = await Message.create({
            message: req.body.message,
            userId: req.user.id
        });

        res.status(201).json({message: message});

    }
    catch(err){
        console.log(err);
    }
}

exports.getMessages = async (req, res, next)=>{

    try{
        const messages = await  Message.findAll({where: {userId: req.user.id}});

        res.status(201).json({messages: messages})
    }
    catch(err){
        console.log(err);
    }
}
