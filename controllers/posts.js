const Post = require('../models/post');

module.exports = (app) => {

  // CREATE

  app.post('/posts/new', (req, res) => {
      console.log("button works")
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

};
