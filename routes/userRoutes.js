const { Router } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

userRouter.get('/login', userController.login);

userRouter.post("/login", userController.handleLogin);

userRouter.get('/register', userController.register);

userRouter.post('/register', userController.handleRegister);

userRouter.get("/logout", userController.logout);


module.exports = userRouter;