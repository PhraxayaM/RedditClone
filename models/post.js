const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");


const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String},
  summary: { type: String, required: false },
  subreddit: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }],
  author : { type: Schema.Types.ObjectId, ref: "User", required: false }
});

// Always populate the author field
PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

PostSchema.pre("save", function(next) {
    const now = new Date();
    this.updateAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Post", PostSchema);
