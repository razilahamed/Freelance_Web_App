import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) { 
    //next(err);
    console.error(err);
    res.status(500).send("something went wrong");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) return next(createError(404, "User not found!"));


    const webtoken = jwt.sign({
      id: user._id
    },process.env.TOKEN_KEY)

    const { password, ...info } = user._doc;
    res.cookie("loginToken",webtoken,{httpOnly:true}).status(200).send(info);
  } catch (err) {
    //next(err);
    res.status(500).send("something went wrong");
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("loginToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out successfuly.");
};
