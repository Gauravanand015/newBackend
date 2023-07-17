const express = require("express");
const { Quiz } = require("../model/quiz.model");
const quizRouter = express.Router();

quizRouter.get("/getAllQuestion", async (req, res) => {
  const data = await Quiz.find();
  res.send(data);
});

quizRouter.post("/createQuiz", async (req, res) => {
  const { creator, title, description, questions, leaderBoard } = req.body;
  try {
    const questionDetails = new Quiz({
      creator,
      title,
      description,
      questions,
      leaderBoard,
    });

    await questionDetails.save();
    res.send(questionDetails);
  } catch (error) {
    console.log(error);
    res.send("Error while creating quiz");
  }
});

quizRouter.patch("/addQuestionInSpecificQuiz/:quizID", async (req, res) => {
  const quizId = req.params.quizID;
  const quizDetails = await Quiz.find({ _id: quizId });
  const newQuestion = req.body;
  try {
    const updatingQuiz = await Quiz.updateOne(
      { _id: quizId },
      { $push: { questions: newQuestion } }
    );
    res.send(updatingQuiz);
  } catch (error) {
    console.log(error);
    res.send("Error while updating quiz");
  }
});

quizRouter.delete("/deleteQuiz/:quizID", async (req, res) => {
  const quizId = req.params.quizID;
  try {
    const deleteQuiz = await Quiz.deleteOne({ _id: quizId });
    res.send(deleteQuiz);
  } catch (error) {
    console.log(error);
    res.send("Error while deleting quiz");
  }
});

quizRouter.post("/takeQuiz/:quizId", async (req, res) => {
  const quizId = req.params.quizId;
  const { questionId, answerIndex, email, score } = req.body;

  try {
    const quiz = await Quiz.findOne({ _id: quizId });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    const question = quiz.questions.find(
      (q) => q._id.toString() === questionId
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const correctAnswer = question.correctOptions[0];
    const isAnswerCorrect = answerIndex === correctAnswer;
    const response = {
      isCorrect: isAnswerCorrect,
      correctAnswer: correctAnswer,
    };

    if (isAnswerCorrect) {
      const existingUserIndex = quiz.leaderBoard.findIndex(
        (user) => user.email === email
      );

      if (existingUserIndex !== -1) {
        quiz.leaderBoard[existingUserIndex].score += score;
      } else {
        quiz.leaderBoard.push({ email: email, score: score });
      }

      await quiz.save();

      res.json(response);
    }
  } catch (err) {
    console.error("Error retrieving quiz:", err);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

module.exports = {
  quizRouter,
};
