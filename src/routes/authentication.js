const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const AuthenticationService = require("./authentication-service");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    for (const field of ['username', 'email', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `missing ${field}`
        })

    const hashedPass = await AuthenticationService.hashPassword(password)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    });

    const usernameCheck = await User.findOne({ username: req.body.username });
    if (usernameCheck) return res.status(400).json("username already registered");

    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) return res.status(400).json("email already registered");

    const passwordError = AuthenticationService.validatePassword(username, email, password)
    if (passwordError) return res.status(400).json({ error: passwordError })

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(401).json("Wrong credentials!");

    const { password, paymentInfo, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
