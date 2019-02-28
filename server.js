const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express')
const app = express()
// const Post = require('../models/post');



var exphbs = require('express-handlebars');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set db
require('./data/reddit-db');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);


// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.send({posts})
// })




app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
module.exports = app;
// })
