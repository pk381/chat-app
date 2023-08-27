const path = require('path');
const rootDir = require('../util/path');

const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getSignUp = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", 'sign_up.html'));

}


exports.postSignUp = async (req, res, next)=>{

    try{
        const user = await User.findOne({where: {email: req.body.email}});

        if(user === null){

            bcrypt.hash(req.body.password, 10, async (err, hash)=>{

                if(err){
                    console.log(err);
                }
                else{

                    const newUser = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: hash
                    });


                    res.status(201).json({user: newUser, message: 'newUser'});
                }
            });
        }
        else{
            res.status(400).json({message: 'userExist'});
        }
        

    }
    catch(err){

        res.status(403).json({message: 'error', err: err});
        console.log(err);
    }

}