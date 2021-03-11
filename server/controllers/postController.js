const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../utils/httpError");
const Post = require("../models/Post");
const User = require("../models/User");

//---------Get All Posts----
const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching posts failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

//------Get Single Posts----
const getSinglePost = async (req, res, next) => {
  const postId = req.params.pId;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Fetching post failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) });
};

//-----------User's Post---
const myPosts = async (req, res, next) => {
  const userId = req.params.uId;
  let userPosts;
  try {
    userPosts = await Post.find(
      { creator: userId },
      { title: 1, description: 1, time: 1, tags: 1, creator: 1 }
    ).sort({ id: -1 });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find post.",
      500
    );
    return next(error);
  }
  res.status(200).json({
    userPosts: userPosts.map((userPost) =>
      userPost.toObject({ getters: true })
    ),
  });
};

//------------Create Post----
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, content, tags, image } = req.body;
  const createdPost = new Post({
    title,
    description,
    content,
    tags,
    time: String(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ),
    image,
    username: req.userData.username,
    email: req.userData.email,
    creator: req.userData.userId,
  });
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save();
    user.posts.push(createdPost);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not Save post.",
      500
    );
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};
// ------------Update post--------
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data. ", 422)
    );
  }
  const { title, description, content } = req.body;
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }
  post.title = title;
  post.description = description;
  post.content = content;
  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }
  res.status(200).json({ post: post.toObject({ getters: true }) });
};

// -----------Delete post-------
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete post.",
      500
    );
    return next(error);
  }
  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }

  if (post.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place.",
      401
    );
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Can't delete Post,try again later.", 401);
    return next(error);
  }

  res.status(200).json({ message: "Deleted post." });
};

exports.getPosts = getPosts;
exports.getSinglePost = getSinglePost;
exports.myPosts = myPosts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
