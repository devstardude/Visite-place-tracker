const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");
const User = require("../models/User");

const jwt_token = String(process.env.JWT);

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.find({ _id: userId }, { email: 0, password: 0, date: 0 });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!user) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.status(200).json({
    user,
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const { email, password, username, bio } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  //user exist
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  //user is new
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }
  //new user details
  const createdUser = new User({
    email,
    password: hashedPassword,
    username,
    bio,
    dp:
      "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
    likes: [],
    places: [],
    posts: [],
  });
  //save user
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  //creating 1hr valid token
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
      },
      jwt_token,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  //response
  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
    dp: createdUser.dp,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if user exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  //doesn't exist
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  //exist and password match
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }
  //exist but password doesn't match
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  //sending login token
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
      jwt_token,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  //response
  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    dp: existingUser.dp,
    token: token,
  });
};

const giveLike = async (req, res, next) => {
  const userId = req.params.userId;
  const likerId = req.userData.userId;
  let user;
  try {
    user = await User.findById(userId, { likes: 1 });
  } catch (err) {
    const error = new HttpError("Finding user failed, please try again.", 500);
    return next(error);
  }
  const alreadyLiked = user.likes.includes(likerId)
  if(alreadyLiked){
    const error = new HttpError("Already Liked !",500)
    return next(error);
  }
  try {
    user.likes.push(likerId);
    await user.save();
  } catch (err) {
    const error = new HttpError("Cannot like profile, please try again.", 500);
    return next(error);
  }
  res.status(200).json({message:"Profile Liked"})
};
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.giveLike = giveLike;
