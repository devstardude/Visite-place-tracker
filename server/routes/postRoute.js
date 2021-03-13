const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/checkAuth");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/post/:pId", postController.getSinglePost);
router.get("/myposts/:uId", postController.myPosts);

//Further routes are protected by Authentication 
router.use(checkAuth);
router.delete("/delete/:pid", postController.deletePost);
router.post(
  "/new",
  [
    check("title").isLength({ min: 4, max: 200 }),
    check("description").isLength({ min: 4, max: 400 }),
    check("content").isLength({ min: 4, }),
  ],
  postController.createPost
);

router.patch(
  "/update/:pid",
  [
    check("title").isLength({ min: 4, max: 200 }),
    check("description").isLength({ min: 4, max: 400 }),
    check("content").isLength({ min: 4, }),
  ],
  postController.updatePost
);
module.exports = router;