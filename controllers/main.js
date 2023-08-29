const path = require('path');
const rootDir = require('../util/path');
const Message = require('../models/message');

const { Op } = require("sequelize");

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

    const lastId = parseInt(req.params.lastId);

    try{

        if(lastId == 0){

            const messages = await Message.findAll({
                where: {
                    userId: req.user.id
                }
            });

            res.status(201).json({messages: messages});
        
        }
        else{

            const messages = await  Message.findAll({
                where: {
                    id: { [Op.gt]: lastId},
                    userId: req.user.id
                }
            });

            res.status(201).json({messages: messages});

        }
    }
    catch(err){
        console.log(err);
    }
}
