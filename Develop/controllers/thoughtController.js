const { Thought, User } = require('../models');
//changed course to thought 
module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const courses = await Thought.find()
      .populate('students');
      res.json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const course = await Thought.findOne({ _id: req.params.courseId })
      .populate('students');

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const course = await Thought.create(req.body);
      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const course = await Thought.findOneAndDelete({ _id: req.params.courseId });

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      await User.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Thought and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const course = await Thought.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        return res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
