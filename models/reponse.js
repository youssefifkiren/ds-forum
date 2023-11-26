const { Schema, model, Types:{ObjectId} } = require("mongoose");

const reponse = new Schema({
    user_id: {
        type: ObjectId,
        ref: "User"
    },
    question_id: {
        type: ObjectId,
        ref: "Question"
    },
    reponse: String,
    date: Date
});

const Reponse = model("Reponse", reponse);

module.exports = Reponse;