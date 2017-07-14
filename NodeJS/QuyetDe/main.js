const fs = require('fs');
const express = require('express');
const questionRouter = require('./modules/question.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./helper/config.json');
const exhbs = require('express-handlebars');
const utilities = require('./modules/utilities.js');

let app = express();
let hbs = exhbs.create({});
app.use(bodyParser.urlencoded({ extended : true }))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use('/api/question', questionRouter);

app.get('/', (req, res) => {
  res.render('home', {
    id      : 0,
    content : "Có nên bỏ bạn gái không?"
  })
})

app.get('/ask', (req, res) => {
  res.render('ask');
})

app.use('/question/:id', (req, res) => {
  let questionList = utilities.getQuestionList();
  let question = questionList[req.params.id];

  res.render('question', question);
})

app.listen(6969, () => {
  console.log('App is running');
})

// mongoose.connect(config.connectionString, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connect db success');
//   }
// })
