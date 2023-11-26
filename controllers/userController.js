const User = require("../models/user");
const bcrypt = require("bcryptjs");

const userController = {
    login: (req, res) => {
        res.render('login');
    },
    handleLogin: async (req, res) => {
        const { email, password } = req.body;
        if(!email || !password){
            return res.render("login", {
                error:"Empty Fields",
                email,
                password
            });
        }
        const user = await User.findOne({ email });
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch || !user) {
            return res.render("login", {
                error: "Invalid Credentials",
                email,
                password
            });
        }
        req.session.user = user;
        req.session.save();
        res.redirect(302, "/");
    },
    register: (req, res) => {
        res.render('register');
    },
    handleRegister: async (req, res) => {
        const { nom, email, password, cfpassword } = req.body;
        const error = {};
        if(!nom || !email || !password) {
            error.global = "Empty Fields"
            return res.render("register", {
                    error,
                    ...req.body
                },
            )
        }
        if(password !== cfpassword) {
            error.cfpassword = "Password and confirmation does not match"
        }

        const doubleEmail = await User.findOne({ email });
        if (doubleEmail) {
            error.email = "Email already exists"
        }
        if(Object.keys(error).length) {
            return res.render("register", {
                error,
                ...req.body
            })
        }
        const user = new User({ nom, email, password });
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        req.session.user = user;
        req.session.save();
        res.redirect('/');
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    }
};

module.exports = userController;