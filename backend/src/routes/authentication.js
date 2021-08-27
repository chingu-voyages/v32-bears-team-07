const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const AuthService = require("./auth-service");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    for (const field of ["username", "email", "password"])
      if (!req.body[field]) return res.status(400).json(`missing ${field}`);

    const hashedPass = await AuthService.hashPassword(password);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // checks for duplicate username
    const usernameCheck = await User.findOne({ username: req.body.username });
    if (usernameCheck)
      return res.status(400).json("username already registered");

    // checks for duplicate email
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) return res.status(400).json("email already registered");

    const passwordError = AuthService.validatePassword(
      username,
      email,
      password
    );
    if (passwordError) return res.status(400).json(passwordError);

    const user = await newUser.save();

    const { _id } = user._doc;
    const sub = `${_id}`;
    const payload = { user_id: User._id };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    for (const field of ["username", "password"])
      if (!req.body[field]) return res.status(400).json(`missing ${field}`);

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json("Wrong credentials!");

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) return res.status(401).json("Wrong credentials!");

    // Destructuring the _id field from the user._doc object
    const { _id } = user._doc;
    // Casting _id as a string so that it can be passed into .createJwt to have JWT sign it
    // JWT only accepts type string I think and when we get _id from destructuring it is not of type string
    const sub = `${_id}`;
    const payload = { user_id: User._id };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;