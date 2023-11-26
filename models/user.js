const { Schema, model } = require("mongoose");

const user = new Schema({
    nom: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const User = model("User", user);

module.exports = User;