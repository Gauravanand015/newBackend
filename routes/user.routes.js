const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email } = req.body;
  let data = await UserModel.find({ email: email });
  try {
    if (data.length > 0) {
      return res.json({message:"Email is already registered",email: email});
    } else {
      let userDetails = new UserModel({
        username,
        email,
      });

      await userDetails.save();
      res.json({ message: "User Registered", email: email });
    }
  } catch (error) {
    console.log(error);
    res.json("Something went wrong while registering user");
  }
});

module.exports = {
  userRouter,
};
