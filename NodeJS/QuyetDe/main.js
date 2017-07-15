const fs = require('fs');
const express = require('express');
const questionRouter = require('./modules/question.js');
const bodyParser = require('body-parser');
const config = require('./helper/config.json');
const exhbs = require('express-handlebars');
const utilities = require('./modules/utilities.js');
const mongoose = require('mongoose');
const questionModel = require('./modules/questionSchema.js');

let app = express();
let hbs = exhbs.create({});
app.use(bodyParser.urlencoded({ extended : true }))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/api/question', questionRouter);

app.get('/', (req, res) => {
  questionModel.find(function (err, questions) {
    if (err) {
      console.error(err);
      return;
    }
    let randomNumber = utilities.getRandomInt(0, questions.length-1);
    let result = questions[randomNumber];

    res.render('home', {
      id      : randomNumber,
      content : result.content
    });
  });
})

app.get('/ask', (req, res) => {
  res.render('ask');
})

app.use('/question/:id', (req, res) => {
  let id = req.params.id;
  let query = { _id: id};

  questionModel.findOne(query, (err, question) => {
    res.render('question', question);
  });
})

app.listen(6969, () => {
  console.log('App is running');
})

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect db success');
  }
})
