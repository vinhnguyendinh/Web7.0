const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

let fileIndexHtml = path.join(__dirname, '../public/index.html');

/// Post
router.post('/api/question/0', (req, res) => {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  if (!questionsList) {
    questionsList = [];
  }

  question = {
    content   : req.body.content,
    yesOrNo   : req.body.submit
  };

  if (questionsList.length > 0) {
    questionsList[0] = question;
  } else {
    questionsList.push(question);
  }

  fs.writeFileSync('question.json', JSON.stringify(questionsList));
  res.redirect(`/question/0`);
})

router.post('/ask', (req, res) => {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  if (!questionsList) {
    questionsList = [];
  }

  question = {
    content   : req.body.question,
    yesOrNo   : ""
  };

  questionsList.push(question);
  fs.writeFileSync('question.json', JSON.stringify(questionsList));
  res.redirect(`/question/${questionsList.length-1}`);
})

/// Get
router.get('/ask', (req, res) => {
  res.sendFile(fileIndexHtml);
})

router.get('/api/question/0', (req, res) => {
  res.sendFile(fileIndexHtml);
})

router.get('/api/question/:id', (req, res) => {
  let result = getQuestionAtIndex(req.params.id);
  res.send(result);
});

router.get('/question/:id', (req, res) => {
  let result = getQuestionAtIndex(req.params.id);
  res.send(result);
});

/// Support
var getQuestionAtIndex = function(index) {
  let questionsList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }

  let result;
  if (index < 0 || index > questionsList.length-1) {
    result = 'out of bounds';
  } else {
    result = questionsList[index];
  }

  return result;
}

module.exports = router;
