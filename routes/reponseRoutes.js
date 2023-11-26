const { Router } = require('express');
const Question = require('../models/question');
const Reponse = require('../models/reponse');
const authMiddleware = require('../middlewares/auth');

const reponseRouter = Router()

reponseRouter.post("/question/:questionId", authMiddleware.verifyAuth, async (req, res) => {
    const { questionId } = req.params;
    const { reponse } = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
        return res.status(404).send("Question not found");
    }
    const newReponse = new Reponse({
        reponse,
        question_id: question,
        user_id: req.user,
        date: new Date() // utiliser date de cote serveur (best practices pour multi region apps)
    })
    await newReponse.save();
    res.redirect(`/question/${questionId}`);
});

module.exports = reponseRouter;