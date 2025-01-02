const { Thought, User } = require("../models");
//changed course to thought
module.exports = {
  // Get all thought
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().populate("thought");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.courseId,
      }).populate("thought");

      if (!thought) {
        return res.status(404).json({ message: "No course with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const course = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.courseId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No course with that ID" });
      }

      await User.deleteMany({ _id: { $in: thought.user } });
      res.json({ message: "Thought and students deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const course = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No course with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
