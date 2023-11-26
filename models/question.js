const { Schema, model, Types:{ObjectId} } = require("mongoose");

const question = new Schema({
    user_id: {
        type: ObjectId,
        ref: "User"
    },
    question: String,
    date: Date
});

const Question = model("Question", question);

module.exports = Question;