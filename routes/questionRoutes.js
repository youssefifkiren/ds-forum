const { Router } = require("express");
const Question = require("../models/question");
const Reponse = require("../models/reponse");
const authMiddleware = require("../middlewares/auth");
const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
    const questions = await Question.find().populate('user_id');
    res.render("home", {
        questions,
        user: req.user
    });
});

questionRouter.get("/question/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const question = await Question.findById(questionId);
    if(question) {
        const reponses = await Reponse.find({question_id: questionId}).populate('user_id');
        res.render("question", {
            user: req.user,
            question,
            reponses
        });
    }
    else {
        res.status(404).render("404", {
            user: req.user,
            message: `This question is not found or might be deleted`
        });
    }
})

questionRouter.post("/question", authMiddleware.verifyAuth, async (req, res) => {
    const { question } = req.body;

    const newQuestion = new Question({
        question,
        user_id: req.user,
        date: new Date() // utiliser date de cote serveur (best practices pour multi region apps)
    });
    // console.log(newQuestion);
    await newQuestion.save();
    res.redirect("/");
});

module.exports = questionRouter;