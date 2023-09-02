const Group = require("../models/group");
const GroupUser = require("../models/groupUser");
const User = require("../models/user");

exports.postCreateGroup = async (req, res, next) => {
  console.log("creating a group");

  try {
    const newGroup = await Group.create({
      groupName: req.body.groupName,
    });

    await GroupUser.create({
      groupUserId: req.user.id,
      isAdmin: true,
      groupId: newGroup.id,
    });

    res.status(201).json({ group: newGroup });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllGroups = async (req, res, next) => {
  console.log("all groups");

  try {
    const groups = await GroupUser.findAll({
      where: { groupUserId: req.user.id },
    });

    const userGroups = [];

    for (let grp of groups) {
      const group = await Group.findOne({
        where: {
          id: grp.id,
        },
      });

      userGroups.push(group);
    }

    res.status(201).json({ groups: userGroups });
  } catch (err) {
    console.log(err);
  }
};

exports.addUserToGroup = async (req, res, next) => {
  try {
    console.log("email<<<<<<<<", req.body.email);
    const newUserToGroup = await GroupUser.create({
      groupUserId: (
        await User.findOne({ where: { email: req.body.email } })
      ).id,
    });

    console.log(newUserToGroup);

    res.status(201).json(newUserToGroup);
  } catch (err) {
    console.log(err);
  }
};
