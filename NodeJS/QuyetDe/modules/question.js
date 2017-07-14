const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const utilities = require('../Utilities.js');
const questionmodel = require('./QuestionSchema.js')


/// Post
router.post('/:id', (req, res) => {
  let questionsList = utilities.getQuestionList();
  let id = req.params.id;
  let result = questionsList[id];

  if (req.body.answer == "yes") {
    result.yes = question.yes ? question.yes+1 : 1;
  } else {
    result.no = question.no ? question.no+1 : 1;
  }

  questionsList[id] = result;
  utilities.saveQuestionList(questionsList);
  res.redirect(`/question/${id}`);
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

/// Get
router.get('/', (req, res) => {
  //let questionsList = utilities.getQuestionList();
  res.render('home', {
    content : "Vinh có đẹp trai không?"
  })
})

router.get('/:id', (req, res) => {
  let questionsList = utilities.getQuestionList();
  let result = questionsList[req.params.id];

  res.send(result);
});



module.exports = router;
