const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('../models/comment');


const CommentSchema = new Schema({
    content: { type: String, required: True }

});

module.exports = mongoose.model("comment", CommentSchema);
