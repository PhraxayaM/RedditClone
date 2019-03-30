const Post = require('../models/post');
const expressValidator = require('express-validator');
const express = require('express')
const app = express()


module.exports = (app) => {



    app.get('/', (req, res) => {
        var currentUser = req.user;
    Post.find({})
        .then(posts => {
            res.render("posts-new", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message)
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
        var currentUser = req.user;
        // LOOK UP THE POST
  Post.findById(req.params.id).populate('comments').then((post) => {
    res.render('posts-show', { post, currentUser })
  }).catch((err) => {
    console.log(err.message)
  })
    });

    // SUBREDDIT
   app.get("/n/:subreddit", function(req, res) {
       var currentUser = req.user;

     Post.find({ subreddit: req.params.subreddit })
       .then(posts => {
         res.render("posts-index", { posts, currentUser });
       })
       .catch(err => {
         console.log(err);
       });
   });

}
