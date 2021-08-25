const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const requireAuth = require('../middleware/jwt-auth');



// // Edit UserInfo
router.patch("/:userId", async (req, res) => {
  if (req.body._id === req.params.userId) {
    // if a user wants to update the password the first thing done is hash the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const userInfoToUpdate = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
          // Put whatever you want in accordance to user schema and it should read off that
        },
        { new: true }
      );
      const { password, paymentInfo, ...info } = userInfoToUpdate._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Update failed");
  }
});

// Delete User
router.delete("/:userId", async (req, res) => {
  if (req.body._id === req.params.userId) {
    try {
      await User.findById(req.params.userId);
      try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("Account deletion failed");
  }
});

// Get User
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, paymentInfo, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(404).json("User not found");
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    let allUsers = await User.find({});
    allUsers = allUsers.map((user) => {
      const { password, paymentInfo, ...info } = user._doc;
      return info;
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
