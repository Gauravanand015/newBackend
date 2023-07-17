const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  creator: { type: String },
  title: { type: String },
  description: { type: String },
  questions: [
    {
      title: {type: String},
      answerOptions: { type: Array },
      correctOptions: { type: Array },
    },
  ],
  leaderBoard: [{email: {type: String},score: {type: Number}}]
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = {
    Quiz
};
