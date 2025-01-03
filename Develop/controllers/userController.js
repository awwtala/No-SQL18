// ObjectId() method for converting studentId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");
//changed student to user

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate([
        { path: "thoughts" },
        { path: "friends" },
      ]);

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT UPDATE USER FUNCTION
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User has been updated!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // ADDING A FRIEND

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $push: {
            friends: req.params.friendId,
          },
        },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User has been updated!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // REMOVING A FRIEND

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: {
            friends: req.params.friendId,
          },
        },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User has been updated!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
