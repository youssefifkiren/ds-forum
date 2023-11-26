const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const authMiddleware = require("./middlewares/auth");
const questionRouter = require("./routes/questionRoutes");
const reponseRouter = require("./routes/reponseRoutes");

(async () => await mongoose.connect(process.env.MONGODB_URI))();

// ola hadi if you're you're using node >= 21.2.0
// await mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(authMiddleware.user);

app.set("view engine", "pug");

app.use("/", userRouter);
app.use('/', questionRouter);
app.use('/', reponseRouter);

app.listen(3000, () => console.log("SERVER IS LIVE! Port: 3000"));
