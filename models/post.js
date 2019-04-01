const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String},
  summary: { type: String, required: false },
  subreddit: { type: String },
  author : { type: Schema.Types.ObjectId, ref: "User", required: false }
});

PostSchema.pre("save", function(next) {
    const now = new Date();
    this.updateAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Post", PostSchema);
