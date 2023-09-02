const path = require("path");
const rootDir = require("../util/path");
const Message = require("../models/message");
const Friend = require("../models/friend");
const User = require('../models/user');

const { Op } = require("sequelize");

exports.getMain = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "main.html"));
};

exports.postMessage = async (req, res, next) => {
  try {
    const message = await Message.create({
      message: req.body.message,
      toUserId: req.body.toFriendId,
      userId: req.user.id
    });

    res.status(201).json({ message: message });
  } catch (err) {
    console.log(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const lastId = parseInt(req.params.lastId);

  try {
    if (lastId == 0) {
      const messages = await Message.findAll({
        where: {
          userId: req.user.id,
        },
      });

      res.status(201).json({ messages: messages });
    } else {
      const messages = await Message.findAll({
        where: {
          id: { [Op.gt]: lastId },
          userId: req.user.id,
        },
      });

      res.status(201).json({ messages: messages });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.makeNewFriend = async (req, res, next) => {

  try {
    const friendDetail = await User.findOne({where: {email: req.body.friendsEmail}});

    console.log(friendDetail);

    const friend = await req.user.createFriend({
        friendId: friendDetail.id
    });

    const connect = await friendDetail.createFriend({
      friendId: req.user.id
    })

    res.status(201).json({newFriend: friendDetail});
  } catch (err) {
    console.log(err);
  }
};


exports.getAllFriends = async (req, res, next)=>{

  try{

    const friends = await Friend.findAll({where: {userId: req.user.id}});

    const allFriends = [];

    for(let friend of friends){

      let frnd = await User.findOne({where: {id: friend.friendId}});

      allFriends.push(frnd);

    }

    res.status(201).json({friends: allFriends});

  }
  catch(err){
    console.log(err);
  }
}