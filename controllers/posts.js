const Post = require('../models/post');
const expressValidator = require('express-validator');
const express = require('express')
const app = express()

module.exports = (app) => {

    app.get('/', (req, res) => {
        Post.find({})
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err.message);
    })
});

  // CREATE

  app.post('/posts/new', (req, res) => {
      console.log("button works")
      console.log(req.body)
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
        if (err) {
            console.log(err)
        }
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });
 // Show
    app.get("/posts/:id", function(req, res) {
      // LOOK UP THE POST
      Post.findById(req.params.id)
        .then(post => {
          res.render("posts-show", { post });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
    // SUBREDDIT
   app.get("/n/:subreddit", function(req, res) {
     Post.find({ subreddit: req.params.subreddit })
       .then(posts => {
         res.render("posts-index", { posts });
       })
       .catch(err => {
         console.log(err);
       });
   });


// app.get('/', (req, res) => {
//     Post.find({})
//   .then(posts => {
//     res.render("posts-index", { posts });
//   })
//   .catch(err => {
//     console.log(err.message);
// })