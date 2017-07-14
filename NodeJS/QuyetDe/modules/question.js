const express = require('express');
const path = require('path');
const fs = require('fs');
const utilities = require('../modules/utilities.js');
const questionmodel = require('./QuestionSchema.js')
const router = express.Router();

router.post('/:id', (req, res) => {
  let questionsList = utilities.getQuestionList();
  let id = req.params.id;
  let result = questionsList[id];

  console.log(result);
  console.log(req.body.answer);

  if (req.body.answer == "yes") {
    result.yes = result.yes ? result.yes + 1 : 1;
  } else {
    result.no = result.no ? result.no + 1 : 1;
  }

  questionsList[id] = result;
  utilities.saveQuestionList(questionsList);
  res.redirect(`/question/${id}`);
})

router.get('/', (req, res) => {
  res.render('home', {
    content : "Vinh có đẹp trai không?"
  })
})

router.post('/', (req, res) => {
  let questionsList = utilities.getQuestionList();

  question = {
    content   : req.body.question
  };

  questionsList.push(question);

  utilities.saveQuestionList(questionsList);

  res.send(questionsList);
})

module.exports = router;
