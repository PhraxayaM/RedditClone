const Post = require('../models/post');
const expressValidator = require('express-validator');
const express = require('express')
const app = express()
const User = require("../models/users");




module.exports = (app) => {

    // INDEX
        app.get('/', (req, res) => {
            var currentUser = req.user;
            // res.render('home', {});
            console.log(req.cookies);
            Post.find().populate('author')
            .then(posts => {
                res.render('posts-index', { posts, currentUser });
                // res.render('home', {});
            }).catch(err => {
                console.log(err.message);
            })
        })

//
//     // CREATE
// app.post("/posts/new", (req, res) => {
//   if (req.user) {
//     var post = new Post(req.body);
//
//     post.save(function(err, post) {
//       return res.redirect(`/`);
//     });
//   } else {
//     return res.status(401); // UNAUTHORIZED
//   }
// });

    // CREATE

    // app.post('/posts/new', (req, res) => {
    //     console.log("button works")
    //     console.log(req.body)
    //   // INSTANTIATE INSTANCE OF POST MODEL
    //   const post = new Post(req.body);
    //   // SAVE INSTANCE OF POST MODEL TO DB
    //   post.save((err, post) => {
    //       if (err) {
    //           console.log(err)
    //       }
    //     // REDIRECT TO THE ROOT
    //     return res.redirect(`/`);
    //   })
    // });

    // CREATE
      app.post("/posts/new", (req, res) => {
          if (req.user) {
              var post = new Post(req.body);
              post.author = req.user._id;

              post.save()
                  .then(post => {
                      return User.findById(req.user._id);
                  })
                  .then(user => {
                      user.posts.unshift(post);
                      user.save();
                      // REDIRECT TO THE NEW POST
                      res.redirect(`/posts/${post._id}`);
                  })
                  .catch(err => {
                      console.log(err.message);
                  });
          } else {
              return res.status(401); // UNAUTHORIZED
          }

});

// Show
   app.get("/posts/:id", function(req, res) {
     // LOOK UP THE POST
     Post.findById(req.params.id)
       .then(post => {
           console.log(post)
         res.render("posts-new", { post });
       })
       .catch(err => {
         console.log(err.message);
       });
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
