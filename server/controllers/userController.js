const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");
const User = require("../models/User");

const jwt_token = String(process.env.JWT);

// ---------------Get all users-----
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, { password: 0, date: 0 });
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// -----------Get single user by Id-------
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.find({ _id: userId }, { email: 0, password: 0 });
  } catch (err) {
    const error = new HttpError(
      "Fetching User failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!user) {
    return next(
      new HttpError("Could not find User for the provided user id.", 404)
    );
  }
  res.status(200).json({
    user,
  });
};
// ---------------Sign up new user-----------
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const { email, password, username, bio, dp } = req.body;

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
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
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
  const createdUser = new User({
    email,
    password: hashedPassword,
    username,
    bio,
    dp,
    likes: [],
    places: [],
    posts: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
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
  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
    dp: createdUser.dp,
    token,
  });
};

// -------------Login User----------
const login = async (req, res, next) => {
  const { email, password } = req.body;
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
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
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
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
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
  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    dp: existingUser.dp,
    token: token,
  });
};

// --------------Give like to user---------
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
  const alreadyLiked = user.likes.includes(likerId);
  if (alreadyLiked) {
    const error = new HttpError("Already Liked !", 500);
    return next(error);
  }
  try {
    user.likes.push(likerId);
    await user.save();
  } catch (err) {
    const error = new HttpError("Cannot like profile, please try again.", 500);
    return next(error);
  }
  res.status(200).json({ message: "Profile Liked" });
};

// --------------Update user---------
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const userId = req.userData.userId;
  const { username, bio } = req.body;
  try {
    user = await User.findById(userId, { username: 1, bio: 1 });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError("No user of that id.", 500);
    return next(error);
  }
  user.username = username;
  user.bio = bio;
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update User.",
      500
    );
    return next(error);
  }
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.giveLike = giveLike;
exports.updateUser = updateUser;
