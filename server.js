const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express')
const app = express()
require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

var exphbs = require('express-handlebars');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.get('/', (req, res) => {
    res.render('posts-new', { msg: 'Handlebars are Cool!' });
})


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
