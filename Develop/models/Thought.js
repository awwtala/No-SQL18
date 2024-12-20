const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtTexts: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: Schema.Tyoe.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    require: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    require: true,
  },
});

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
