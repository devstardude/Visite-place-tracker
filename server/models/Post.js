const mongoose = require("mongoose");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags:{
      type:[],
      required:true
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  time: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true
  },
  sanitizedContent: {
    type: String,
    required: true,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.content) {
    this.sanitizedContent = dompurify.sanitize(marked(this.content));
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
