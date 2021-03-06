const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  author: { type: Schema.Types.ObjectID, ref: 'User', required: true }, //User who asked the questions
  content: { type: String, required: true }, //Content of the question
  visibleTo: { type: String, required: true }, // Who it is visible to [ public, friends ]
  answers: [{ // Answers to the question
    author: { type: Schema.Types.ObjectID, ref: 'User' }, // Author of the answer
    content: { type: String, required: true }, // Answer content
    accepted: { type: Boolean, default: false }, // Answer was accepted

    // For future work on thumbs-up/down on questions and answers:

    // thumbsUp: [{ type: Schema.Types.ObjectID, ref: "User" }], // Array of users who thumbs up the answer
    // thumbsDown: [{ type: Schema.Types.ObjectID, ref: "User" }], // Array of users who thumbs down the answer
  }],
  // thumbsUp: [{ type: Schema.Types.ObjectID, ref: "User" }], // Array of users who thumbs up the question
  // thumbsDown: [{ type: Schema.Types.ObjectID, ref: "User" }], // Array of users who thumbs down the question
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;