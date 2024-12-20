const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      require: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'], 
      match: [/^\w+([\.-]?\w+)*@\w+(N.-]?\w+)*(\-\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: {
      type: String,
      required: true,
      max_length: 50,
    },
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('student', studentSchema);

module.exports = Student;
